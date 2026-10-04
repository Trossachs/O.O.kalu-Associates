import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

import { CONTENT_COLUMNS, type ContentRow } from "./content.functions";

type AdminSession = { admin?: boolean; email?: string };

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

export type ContentInput = {
  id?: string | null;
  page: string;
  section: string;
  sort_order: number;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  meta?: string | null;
  bullets?: string | null;
  image_url?: string | null;
  link_url?: string | null;
};

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const email = process.env["ADMIN_EMAIL"] ?? "";
    const password = process.env["ADMIN_PASSWORD"] ?? "";
    if (!email || !password) return { ok: false as const, error: "Admin access is not configured." };

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
  const session = await useSession<AdminSession>(sessionConfig());
  return { admin: Boolean(session.data.admin), email: session.data.email ?? null };
});

export const adminListContent = createServerFn({ method: "GET" }).handler(async (): Promise<ContentRow[]> => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("site_content")
    .select(CONTENT_COLUMNS)
    .order("page")
    .order("section")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as ContentRow[];
});

export const adminSaveContent = createServerFn({ method: "POST" })
  .inputValidator((data: ContentInput) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const payload = {
      page: data.page.trim(),
      section: data.section.trim(),
      sort_order: Number.isFinite(data.sort_order) ? data.sort_order : 0,
      eyebrow: data.eyebrow ?? null,
      title: data.title ?? null,
      subtitle: data.subtitle ?? null,
      body: data.body ?? null,
      meta: data.meta ?? null,
      bullets: data.bullets ?? null,
      image_url: data.image_url ?? null,
      link_url: data.link_url ?? null,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("site_content").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("site_content")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: inserted?.id as string };
  });

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

export const adminListMessages = createServerFn({ method: "GET" }).handler(async (): Promise<ContactMessage[]> => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactMessage[];
});

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminDeleteContent = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_content").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
