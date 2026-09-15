import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

export type ContentRow = {
  id: string;
  page: string;
  section: string;
  sort_order: number;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  meta: string | null;
  bullets: string | null;
  image_url: string | null;
  link_url: string | null;
};

export const CONTENT_COLUMNS =
  "id, page, section, sort_order, eyebrow, title, subtitle, body, meta, bullets, image_url, link_url";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<ContentRow[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const client = createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await client
    .from("site_content")
    .select(CONTENT_COLUMNS)
    .order("page")
    .order("section")
    .order("sort_order");

  if (error) {
    console.error("site_content read failed", error.message);
    return [];
  }
  return (data ?? []) as ContentRow[];
});

export const contentQueryOptions = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
});

export function one(rows: ContentRow[], page: string, section: string): ContentRow | undefined {
  return rows.find((r) => r.page === page && r.section === section);
}

export function many(rows: ContentRow[], page: string, section: string): ContentRow[] {
  return rows.filter((r) => r.page === page && r.section === section).sort((a, b) => a.sort_order - b.sort_order);
}

export function lines(value?: string | null): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function text(value: string | null | undefined, fallback: string): string {
  return value && value.trim() ? value : fallback;
}
