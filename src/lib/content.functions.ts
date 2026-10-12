import { queryOptions } from "@tanstack/react-query";

import siteContent from "@/content/site-content.json";

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

export type ContentFile = { version: number; exportedAt: string; rows: ContentRow[] };

/** Field names editable in admin, discovered from the original site_content table. */
export const CONTENT_FIELDS = [
  "eyebrow",
  "title",
  "subtitle",
  "body",
  "meta",
  "bullets",
  "image_url",
  "link_url",
] as const;

export function sortRows(rows: ContentRow[]): ContentRow[] {
  return [...rows].sort(
    (a, b) => a.page.localeCompare(b.page) || a.section.localeCompare(b.section) || a.sort_order - b.sort_order,
  );
}

/** Published content, bundled from the repository's JSON file at build time. */
export const PUBLISHED_CONTENT = siteContent as ContentFile;

export const contentQueryOptions = queryOptions({
  queryKey: ["site-content"],
  queryFn: async () => sortRows(PUBLISHED_CONTENT.rows),
  staleTime: Infinity,
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
