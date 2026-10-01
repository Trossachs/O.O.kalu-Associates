import { useSuspenseQuery } from "@tanstack/react-query";

import { contentQueryOptions, many, one, type ContentRow } from "./content.functions";

/** Reads the editable site content, primed during SSR by the root loader. */
export function useSiteContent() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  const rows: ContentRow[] = data ?? [];

  return {
    rows,
    block: (page: string, section: string) => one(rows, page, section),
    list: (page: string, section: string) => many(rows, page, section),
  };
}
