import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Plus, Trash2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  adminDeleteMessage,
  adminListMessages,
  adminLogin,
  adminLogout,
  adminSession,
  publishContent,
  publishStatus,
} from "@/lib/admin.functions";
import { PUBLISHED_CONTENT, sortRows, type ContentRow } from "@/lib/content.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Site Administration — O.O. Kalu & Associates" },
      { name: "description", content: "Private content administration for O.O. Kalu & Associates." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Site Administration — O.O. Kalu & Associates" },
      { property: "og:description", content: "Private content administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const FIELDS: { key: "eyebrow" | "title" | "subtitle" | "body" | "meta" | "bullets" | "image_url" | "link_url"; label: string; multiline?: boolean }[] = [
  { key: "eyebrow", label: "Label / eyebrow" },
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "body", label: "Body text", multiline: true },
  { key: "meta", label: "Extra detail", multiline: true },
  { key: "bullets", label: "List items (one per line)", multiline: true },
  { key: "image_url", label: "Image URL" },
  { key: "link_url", label: "Link URL" },
];

const inputClass =
  "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";

function AdminPage() {
  const session = useQuery({ queryKey: ["admin-session"], queryFn: () => adminSession() });

  if (session.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return session.data?.admin ? <Dashboard email={session.data.email} /> : <LoginCard />;
}

function LoginCard() {
  const queryClient = useQueryClient();
  const login = useServerFn(adminLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => login({ data: { email, password } }),
    onSuccess: (result) => {
      if (result.ok) {
        setError(null);
        queryClient.invalidateQueries({ queryKey: ["admin-session"] });
      } else {
        setError(result.error);
      }
    },
    onError: () => setError("Something went wrong. Please try again."),
  });

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="rule-label text-accent">Administration</p>
      <h1 className="mt-3 text-3xl text-foreground">Sign in to edit the site</h1>
      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <label className="block text-sm text-muted-foreground">
          Email
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className="block text-sm text-muted-foreground">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({ email }: { email: string | null }) {
  const queryClient = useQueryClient();
  const logout = useServerFn(adminLogout);
  const [tab, setTab] = useState<"content" | "messages">("content");
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rule-label text-accent">Administration</p>
          <h1 className="mt-2 text-3xl text-foreground">Site content</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {email ?? "administrator"}</p>
        </div>
        <Button variant="outline" onClick={async () => { await logout({}); queryClient.invalidateQueries({ queryKey: ["admin-session"] }); }}>
          <LogOut aria-hidden="true" /> Sign out
        </Button>
      </div>
      <div className="mt-8 flex gap-2">
        <Button variant={tab === "content" ? "default" : "outline"} onClick={() => setTab("content")}>Content</Button>
        <Button variant={tab === "messages" ? "default" : "outline"} onClick={() => setTab("messages")}>✉️ Messages</Button>
      </div>
      {tab === "messages" ? <MessagesInbox /> : <ContentManager />}
    </div>
  );
}


function MessagesInbox() {
  const queryClient = useQueryClient();
  const remove = useServerFn(adminDeleteMessage);
  const messages = useQuery({ queryKey: ["admin-messages"], queryFn: () => adminListMessages() });
  const del = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  if (messages.isLoading)
    return (
      <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading messages…
      </div>
    );
  if (messages.error) return <p className="mt-10 text-sm text-destructive">{(messages.error as Error).message}</p>;
  const list = messages.data ?? [];

  return (
    <div className="mt-8 space-y-4">
      <p className="text-sm text-muted-foreground">
        {list.length} message{list.length === 1 ? "" : "s"} from the consultation form
      </p>
      {list.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No messages yet.
        </p>
      ) : null}
      {list.map((m) => (
        <article key={m.id} className="rounded-sm border border-border bg-background p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg text-foreground">{m.name}</h2>
              <p className="break-all text-sm text-muted-foreground">
                <a href={`mailto:${m.email}`} className="underline">{m.email}</a>
                {m.phone ? ` · ${m.phone}` : ""}
                {m.organization ? ` · ${m.organization}` : ""}
              </p>
            </div>
            <time className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</time>
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest text-accent">
            {[m.practice, m.preferred_date, m.preferred_time].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
          <Button
            variant="outline"
            className="mt-4 text-destructive"
            disabled={del.isPending}
            onClick={() => {
              if (window.confirm("Delete this message permanently?")) del.mutate(m.id);
            }}
          >
            <Trash2 aria-hidden="true" /> Delete
          </Button>
        </article>
      ))}
    </div>
  );
}

type Upload = { path: string; base64: string; preview: string };
const DRAFT_KEY = "kalu-content-draft";
const blank = (page: string): ContentRow => ({
  id: crypto.randomUUID(), page, section: "", sort_order: 0, eyebrow: null, title: null,
  subtitle: null, body: null, meta: null, bullets: null, image_url: null, link_url: null,
});

function ContentManager() {
  const publish = useServerFn(publishContent);
  const status = useServerFn(publishStatus);
  const [rows, setRows] = useState<ContentRow[]>(() => sortRows(PUBLISHED_CONTENT.rows));
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [activePage, setActivePage] = useState<string>("home");
  const [note, setNote] = useState<string | null>(null);
  const [deploy, setDeploy] = useState<{ sha: string; url: string; state: string } | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(DRAFT_KEY);
    if (saved) try { setRows(JSON.parse(saved) as ContentRow[]); setNote("Unpublished draft restored from this browser."); } catch { /* ignore */ }
  }, []);
  const update = (next: ContentRow[]) => { setRows(next); window.localStorage.setItem(DRAFT_KEY, JSON.stringify(next)); setNote("Draft saved in this browser — not published yet."); };

  useEffect(() => {
    if (!deploy || deploy.state === "live" || deploy.state === "failed") return;
    const t = window.setInterval(async () => {
      try { const s = await status({ data: { sha: deploy.sha } }); setDeploy((d) => (d ? { ...d, state: s.state } : d)); } catch { /* keep polling */ }
    }, 10000);
    return () => window.clearInterval(t);
  }, [deploy, status]);

  const mutation = useMutation({
    mutationFn: () => publish({ data: { rows, uploads: uploads.map(({ path, base64 }) => ({ path, base64 })) } }),
    onSuccess: (r) => { window.localStorage.removeItem(DRAFT_KEY); setUploads([]); setNote("Committed to GitHub."); setDeploy({ sha: r.sha, url: r.url, state: "pending" }); },
    onError: (e: Error) => setNote(e.message),
  });

  const pages = Array.from(new Set(rows.map((r) => r.page))).sort();
  const pageRows = rows.filter((r) => r.page === activePage);
  const previewFor = (url: string | null) => uploads.find((u) => "/" + u.path.replace(/^public\//, "") === url)?.preview ?? url;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-sm border border-border bg-parchment/40 p-4">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          <UploadCloud aria-hidden="true" /> {mutation.isPending ? "Publishing…" : "Publish to live site"}
        </Button>
        {note ? <span className="text-xs text-muted-foreground">{note}</span> : null}
        {deploy ? (
          <span className="text-xs text-foreground">
            Deployment: <strong>{deploy.state}</strong> · <a className="underline" href={deploy.url} target="_blank" rel="noreferrer">commit</a>
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {pages.map((page) => (
          <button key={page} type="button" onClick={() => setActivePage(page)}
            className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-widest ${page === activePage ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground"}`}>
            {page === "publications" ? "blog" : page}
          </button>
        ))}
      </div>
      <div className="mt-8 space-y-6">
        {pageRows.map((row) => (
          <article key={row.id} className="rounded-sm border border-border bg-background p-5 sm:p-6">
            <Editor row={row} preview={previewFor(row.image_url)}
              onChange={(next) => update(rows.map((r) => (r.id === row.id ? next : r)))}
              onUpload={(u) => setUploads((list) => [...list.filter((x) => x.path !== u.path), u])} />
            <Button variant="outline" className="mt-4 text-destructive"
              onClick={() => { if (window.confirm("Delete this item?")) update(rows.filter((r) => r.id !== row.id)); }}>
              <Trash2 aria-hidden="true" /> Delete
            </Button>
          </article>
        ))}
        <Button variant="outline" onClick={() => update([...rows, blank(activePage)])}>
          <Plus aria-hidden="true" /> Add item to “{activePage}”
        </Button>
      </div>
    </>
  );
}

function Editor({ row, preview, onChange, onUpload }: {
  row: ContentRow; preview: string | null; onChange: (r: ContentRow) => void; onUpload: (u: Upload) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const set = (key: keyof ContentRow, value: string) =>
    onChange({ ...row, [key]: key === "sort_order" ? Number(value) || 0 : key === "section" || key === "page" ? value : value === "" ? null : value });

  const handleFile = (file: File) => {
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return setError("Use a JPG, PNG, WebP or GIF image.");
    if (file.size > 3 * 1024 * 1024) return setError("Images must be 3 MB or smaller.");
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const name = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`.slice(0, 100);
      const path = `public/uploads/${name}`;
      onUpload({ path, base64: dataUrl.split(",")[1] ?? "", preview: dataUrl });
      onChange({ ...row, image_url: `/uploads/${name}` });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">Section
        <input value={row.section} onChange={(e) => set("section", e.target.value)} className={`mt-1 ${inputClass}`} />
      </label>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">Order
        <input type="number" value={row.sort_order} onChange={(e) => set("sort_order", e.target.value)} className={`mt-1 ${inputClass}`} />
      </label>
      {FIELDS.map((field) => (
        <label key={field.key} className={`block text-xs uppercase tracking-widest text-muted-foreground ${field.multiline ? "md:col-span-2" : ""}`}>
          {field.label}
          {field.multiline ? (
            <textarea rows={4} value={row[field.key] ?? ""} onChange={(e) => set(field.key, e.target.value)} className={`mt-1 ${inputClass}`} />
          ) : (
            <input value={row[field.key] ?? ""} onChange={(e) => set(field.key, e.target.value)} className={`mt-1 ${inputClass}`} />
          )}
        </label>
      ))}
      <label className="block text-xs uppercase tracking-widest text-muted-foreground md:col-span-2">Upload image
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="mt-1 block text-sm"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        {error ? <span className="mt-1 block normal-case text-destructive">{error}</span> : null}
      </label>
      {preview ? (
        <div className="md:col-span-2">
          <img src={preview} alt="Preview of this item's image" className="h-40 w-full max-w-xs rounded-sm border border-border object-cover" />
        </div>
      ) : null}
    </div>
  );
}
