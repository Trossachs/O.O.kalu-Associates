import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

import { publicDb } from "./public-db";
import { sortRows, type ContentFile } from "./content.functions";

type AdminSession = { admin?: boolean; email?: string };

const CONTENT_PATH = "src/content/site-content.json";
const GITHUB_API = "https://api.github.com";

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "kalu-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.admin) throw new Error("Not signed in as administrator.");
  return session;
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const email = process.env["ADMIN_EMAIL"] ?? "";
    const password = process.env["ADMIN_PASSWORD"] ?? "";
    if (!email || !password || !process.env["ADMIN_SESSION_SECRET"])
      return { ok: false as const, error: "Admin access is not configured." };

    const okEmail = matches(data.email.trim().toLowerCase(), email.trim().toLowerCase());
    const okPassword = matches(data.password, password);
    if (!okEmail || !okPassword) return { ok: false as const, error: "Incorrect email or password." };

    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ admin: true, email: email.trim() });
    return { ok: true as const, email: email.trim() };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminSession = createServerFn({ method: "GET" }).handler(async () => {
  if (!process.env["ADMIN_SESSION_SECRET"]) return { admin: false, email: null };
  const session = await useSession<AdminSession>(sessionConfig());
  return { admin: Boolean(session.data.admin), email: session.data.email ?? null };
});

/* ---------- Consultation messages (private, stay in the database) ---------- */

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  phone: string | null;
  practice: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string;
  created_at: string;
};

function inboxKey() {
  const key = process.env["INBOX_KEY"];
  if (!key) throw new Error("The message inbox key is not configured.");
  return key;
}

export const adminListMessages = createServerFn({ method: "GET" }).handler(async (): Promise<ContactMessage[]> => {
  await requireAdmin();
  const { data, error } = await publicDb().rpc("admin_list_messages", { p_key: inboxKey() });
  if (error) throw new Error("Could not load messages.");
  return (data ?? []) as ContactMessage[];
});

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { error } = await publicDb().rpc("admin_delete_message", { p_key: inboxKey(), p_id: data.id });
    if (error) throw new Error("Could not delete the message.");
    return { ok: true as const };
  });

/* ---------- Content publishing to GitHub ---------- */

const nullableText = z.string().max(20000).nullable();
const rowSchema = z.object({
  id: z.string().min(1).max(64),
  page: z.string().trim().min(1).max(60),
  section: z.string().trim().min(1).max(80),
  sort_order: z.number().int().min(-10000).max(10000),
  eyebrow: nullableText,
  title: nullableText,
  subtitle: nullableText,
  body: nullableText,
  meta: nullableText,
  bullets: nullableText,
  image_url: z.string().max(2000).nullable(),
  link_url: z.string().max(2000).nullable(),
});

const uploadSchema = z.object({
  path: z.string().regex(/^public\/uploads\/[a-z0-9][a-z0-9._-]{0,120}\.(jpg|jpeg|png|webp|gif)$/),
  base64: z.string().max(4_200_000),
});

const publishSchema = z.object({
  rows: z.array(rowSchema).max(2000),
  uploads: z.array(uploadSchema).max(10),
  message: z.string().trim().max(200).optional(),
});

function githubConfig() {
  const token = process.env["GITHUB_TOKEN"];
  const repo = process.env["GITHUB_REPO"];
  const branch = process.env["GITHUB_BRANCH"] || "main";
  if (!token || !repo) throw new Error("Publishing is not configured (GitHub key or repository missing).");
  return { token, repo, branch };
}

async function gh<T>(token: string, path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "kalu-site-admin",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
    ...(init?.body ? { body: JSON.stringify(init.body) } : {}),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error(`GitHub ${path} failed [${response.status}]: ${text}`);
    throw new Error(`GitHub rejected the request (${response.status}). ${text.slice(0, 200)}`);
  }
  return (await response.json()) as T;
}

export const publishContent = createServerFn({ method: "POST" })
  .inputValidator((data: z.input<typeof publishSchema>) => publishSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { token, repo, branch } = githubConfig();

    const ids = new Set<string>();
    for (const row of data.rows) {
      if (ids.has(row.id)) throw new Error(`Duplicate item id ${row.id}.`);
      ids.add(row.id);
    }
    for (const upload of data.uploads) {
      if (Math.floor((upload.base64.length * 3) / 4) > 3 * 1024 * 1024)
        throw new Error("Each image must be 3 MB or smaller.");
    }

    const file: ContentFile = { version: 1, exportedAt: new Date().toISOString(), rows: sortRows(data.rows) };
    const ref = await gh<{ object: { sha: string } }>(token, `/repos/${repo}/git/ref/heads/${branch}`);
    const parent = await gh<{ tree: { sha: string } }>(token, `/repos/${repo}/git/commits/${ref.object.sha}`);

    const tree: { path: string; mode: "100644"; type: "blob"; sha: string }[] = [];
    const contentBlob = await gh<{ sha: string }>(token, `/repos/${repo}/git/blobs`, {
      method: "POST",
      body: { content: JSON.stringify(file, null, 2) + "\n", encoding: "utf-8" },
    });
    tree.push({ path: CONTENT_PATH, mode: "100644", type: "blob", sha: contentBlob.sha });
    for (const upload of data.uploads) {
      const blob = await gh<{ sha: string }>(token, `/repos/${repo}/git/blobs`, {
        method: "POST",
        body: { content: upload.base64, encoding: "base64" },
      });
      tree.push({ path: upload.path, mode: "100644", type: "blob", sha: blob.sha });
    }

    const newTree = await gh<{ sha: string }>(token, `/repos/${repo}/git/trees`, {
      method: "POST",
      body: { base_tree: parent.tree.sha, tree },
    });
    const commit = await gh<{ sha: string; html_url: string }>(token, `/repos/${repo}/git/commits`, {
      method: "POST",
      body: { message: data.message || "Update website content from admin", tree: newTree.sha, parents: [ref.object.sha] },
    });
    await gh(token, `/repos/${repo}/git/refs/heads/${branch}`, { method: "PATCH", body: { sha: commit.sha } });

    return { ok: true as const, sha: commit.sha, url: commit.html_url };
  });

export type DeployState = "pending" | "building" | "live" | "failed" | "unknown";

/** Reads the deployment Vercel reports back to GitHub for a commit. */
export const publishStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { sha: string }) => z.object({ sha: z.string().regex(/^[a-f0-9]{40}$/) }).parse(data))
  .handler(async ({ data }): Promise<{ state: DeployState; url: string | null }> => {
    await requireAdmin();
    const { token, repo } = githubConfig();
    const deployments = await gh<{ id: number; environment: string }[]>(
      token,
      `/repos/${repo}/deployments?sha=${data.sha}&per_page=10`,
    );
    const deployment = deployments.find((d) => /production/i.test(d.environment)) ?? deployments[0];
    if (!deployment) return { state: "pending", url: null };
    const statuses = await gh<{ state: string; environment_url?: string; target_url?: string }[]>(
      token,
      `/repos/${repo}/deployments/${deployment.id}/statuses?per_page=1`,
    );
    const latest = statuses[0];
    if (!latest) return { state: "pending", url: null };
    const url = latest.environment_url || latest.target_url || null;
    if (latest.state === "success") return { state: "live", url };
    if (latest.state === "failure" || latest.state === "error") return { state: "failed", url };
    if (latest.state === "in_progress" || latest.state === "queued") return { state: "building", url };
    return { state: "unknown", url };
  });
