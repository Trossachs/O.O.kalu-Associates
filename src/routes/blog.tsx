import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/motion";
import { PUBLICATIONS } from "@/lib/firm-data";
import heroPublications from "@/assets/hero-publications.jpg";
import { text } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/use-content";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — O.O. Kalu & Associates Nigeria" },
      {
        name: "description",
        content:
          "Articles and commentary from O.O. Kalu & Associates partners on Nigerian deal terms, advocacy, CBN compliance, the Petroleum Industry Act, and succession.",
      },
      { property: "og:title", content: "Publications — O.O. Kalu & Associates Nigeria" },
      { property: "og:description", content: "Writing from the partners of O.O. Kalu & Associates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const { block, list } = useSiteContent();
  const header = block("publications", "header");
  const rows = list("publications", "publication");

  const publications = rows.length
    ? rows.map((row) => ({
        key: row.id,
        date: text(row.eyebrow, ""),
        title: text(row.title, ""),
        byline: text(row.subtitle, ""),
        summary: text(row.body, ""),
      }))
    : PUBLICATIONS.map((p) => ({
        key: p.title,
        date: p.date,
        title: p.title,
        byline: `${p.author} · ${p.venue}`,
        summary: p.summary,
      }));

  return (
    <div>
      <PageHeader
        eyebrow={text(header?.eyebrow, "Writing")}
        title={text(header?.title, "Where our thinking is on the record")}
        intro={text(header?.body, "Partners publish on the questions clients keep asking. Reprints are available on request.")}
        image={text(header?.image_url, heroPublications)}
        imageAlt="Nigerian law reports stacked beside an open journal and a brass desk lamp"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <ul className="divide-y divide-border border-y border-border">
          {publications.map((p, i) => (
            <Reveal as="li" key={p.key} delay={(i % 3) * 110} className="grid gap-4 py-8 md:grid-cols-[10rem_1fr]">
              <div className="rule-label text-accent">{p.date}</div>
              <div>
                <h2 className="text-2xl text-foreground">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.byline}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">{p.summary}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
