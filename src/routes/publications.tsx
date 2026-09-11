import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/motion";
import { PUBLICATIONS } from "@/lib/firm-data";
import heroPublications from "@/assets/hero-publications.jpg";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Equity Chambers Nigeria" },
      {
        name: "description",
        content:
          "Articles and commentary from Equity Chambers partners on Nigerian deal terms, advocacy, CBN compliance, the Petroleum Industry Act, and succession.",
      },
      { property: "og:title", content: "Publications — Equity Chambers Nigeria" },
      { property: "og:description", content: "Writing from the partners of Equity Chambers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Writing"
        title="Where our thinking is on the record"
        intro="Partners publish on the questions clients keep asking. Reprints are available on request."
        image={heroPublications}
        imageAlt="Nigerian law reports stacked beside an open journal and a brass desk lamp"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <ul className="divide-y divide-border border-y border-border">
          {PUBLICATIONS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 110} className="grid gap-4 py-8 md:grid-cols-[10rem_1fr]">
              <div className="rule-label text-accent">{p.date}</div>
              <div>
                <h2 className="text-2xl text-foreground">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.author} · {p.venue}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">{p.summary}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
