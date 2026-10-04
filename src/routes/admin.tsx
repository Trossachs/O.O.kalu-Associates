import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  adminDeleteContent,
  adminDeleteMessage,
  adminListContent,
  adminListMessages,
  adminLogin,
  adminLogout,
  adminSaveContent,
  adminSession,
  type ContentInput,
} from "@/lib/admin.functions";
import type { ContentRow } from "@/lib/content.functions";

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

const FIELDS: { key: keyof ContentInput; label: string; multiline?: boolean }[] = [
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
  const rows = useQuery({ queryKey: ["admin-content"], queryFn: () => adminListContent() });
  const [activePage, setActivePage] = useState<string | null>(null);

  const pages = useMemo(() => {
    const list = Array.from(new Set((rows.data ?? []).map((row) => row.page)));
    return list.sort();
  }, [rows.data]);

  const currentPage = activePage ?? pages[0] ?? "home";
  const pageRows = (rows.data ?? []).filter((row) => row.page === currentPage);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-content"] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rule-label text-accent">Administration</p>
          <h1 className="mt-2 text-3xl text-foreground">Site content</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {email ?? "administrator"}</p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await logout({});
            queryClient.invalidateQueries({ queryKey: ["admin-session"] });
          }}
        >
          <LogOut aria-hidden="true" /> Sign out
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActivePage(MESSAGES_TAB)}
          className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
            currentPage === MESSAGES_TAB
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted-foreground hover:border-accent/60"
          }`}
        >
          ✉️ Messages
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setActivePage(page)}
            className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
              page === currentPage
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent/60"
            }`}
          >
            {page === "publications" ? "blog" : page}
          </button>
        ))}
      </div>

      {currentPage === MESSAGES_TAB ? (
        <MessagesInbox />
      ) : (
        <>
          {rows.isLoading ? (
            <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading content…
            </div>
          ) : null}
          {rows.error ? <p className="mt-10 text-sm text-destructive">{(rows.error as Error).message}</p> : null}

          <div className="mt-8 space-y-6">
            {pageRows.map((row) => (
              <ContentCard key={row.id} row={row} onChanged={refresh} />
            ))}
            <NewSectionCard page={currentPage} onChanged={refresh} />
          </div>
        </>
      )}
    </div>
  );
}

const MESSAGES_TAB = "__messages";

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

function toInput(row: ContentRow): ContentInput {
  return {
    id: row.id,
    page: row.page,
    section: row.section,
    sort_order: row.sort_order,
    eyebrow: row.eyebrow,
    title: row.title,
    subtitle: row.subtitle,
    body: row.body,
    meta: row.meta,
    bullets: row.bullets,
    image_url: row.image_url,
    link_url: row.link_url,
  };
}

function ContentCard({ row, onChanged }: { row: ContentRow; onChanged: () => void }) {
  const save = useServerFn(adminSaveContent);
  const remove = useServerFn(adminDeleteContent);
  const [draft, setDraft] = useState<ContentInput>(() => toInput(row));
  const [status, setStatus] = useState<string | null>(null);

  const saveMutation = useMutation({
    mutationFn: () => save({ data: draft }),
    onSuccess: () => {
      setStatus("Saved");
      onChanged();
    },
    onError: (error: Error) => setStatus(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: () => remove({ data: { id: row.id } }),
    onSuccess: onChanged,
  });

  return (
    <article className="rounded-sm border border-border bg-background p-5 sm:p-6">
      <Editor draft={draft} setDraft={setDraft} />
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          <Save aria-hidden="true" /> {saveMutation.isPending ? "Saving…" : "Save"}
        </Button>
        <Button
          variant="outline"
          className="text-destructive"
          onClick={() => {
            if (window.confirm("Delete this section permanently?")) deleteMutation.mutate();
          }}
          disabled={deleteMutation.isPending}
        >
          <Trash2 aria-hidden="true" /> Delete
        </Button>
        {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
      </div>
    </article>
  );
}

function NewSectionCard({ page, onChanged }: { page: string; onChanged: () => void }) {
  const save = useServerFn(adminSaveContent);
  const empty: ContentInput = { page, section: "", sort_order: 0 };
  const [draft, setDraft] = useState<ContentInput>(empty);
  const [status, setStatus] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => save({ data: { ...draft, page } }),
    onSuccess: () => {
      setDraft({ page, section: "", sort_order: 0 });
      setStatus("Added");
      onChanged();
    },
    onError: (error: Error) => setStatus(error.message),
  });

  return (
    <article className="rounded-sm border border-dashed border-accent/50 bg-parchment/40 p-5 sm:p-6">
      <h2 className="text-lg text-foreground">Add a new item to “{page}”</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Use the same section name as an existing item to add another card to that group.
      </p>
      <div className="mt-4">
        <Editor draft={draft} setDraft={setDraft} />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || !draft.section.trim()}>
          <Plus aria-hidden="true" /> {mutation.isPending ? "Adding…" : "Add item"}
        </Button>
        {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
      </div>
    </article>
  );
}

function Editor({
  draft,
  setDraft,
}: {
  draft: ContentInput;
  setDraft: (value: ContentInput) => void;
}) {
  const update = (key: keyof ContentInput, value: string) =>
    setDraft({ ...draft, [key]: key === "sort_order" ? Number(value) || 0 : value });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        Section
        <input
          value={draft.section}
          onChange={(event) => update("section", event.target.value)}
          className={`mt-1 ${inputClass}`}
        />
      </label>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        Order
        <input
          type="number"
          value={draft.sort_order}
          onChange={(event) => update("sort_order", event.target.value)}
          className={`mt-1 ${inputClass}`}
        />
      </label>

      {FIELDS.map((field) => (
        <label
          key={field.key as string}
          className={`block text-xs uppercase tracking-widest text-muted-foreground ${
            field.multiline ? "md:col-span-2" : ""
          }`}
        >
          {field.label}
          {field.multiline ? (
            <textarea
              rows={4}
              value={(draft[field.key] as string | null) ?? ""}
              onChange={(event) => update(field.key, event.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          ) : (
            <input
              value={(draft[field.key] as string | null) ?? ""}
              onChange={(event) => update(field.key, event.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          )}
        </label>
      ))}

      {draft.image_url ? (
        <div className="md:col-span-2">
          <img
            src={draft.image_url}
            alt="Preview of the image entered above"
            className="h-40 w-full max-w-xs rounded-sm border border-border object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
