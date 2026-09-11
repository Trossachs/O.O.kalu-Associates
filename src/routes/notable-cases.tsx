import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/motion";
import { CASES } from "@/lib/firm-data";
import heroCases from "@/assets/hero-cases.jpg";

export const Route = createFileRoute("/notable-cases")({
  head: () => ({
    meta: [
      { title: "Notable Cases — Equity Chambers Nigeria" },
      {
        name: "description",
        content:
          "Representative matters from Equity Chambers: Nigerian acquisitions, Federal High Court judgments, arbitral awards, closed regulatory inquiries, and landmark developments.",
      },
      { property: "og:title", content: "Notable Cases — Equity Chambers Nigeria" },
      { property: "og:description", content: "Representative results across six practice groups in Nigeria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Representative Matters"
        title="A record, not a highlight reel"
        intro="A selection of matters we are permitted to describe. Prior results do not guarantee a similar outcome."
        image={heroCases}
        imageAlt="An empty Nigerian High Court courtroom with polished wooden benches"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <ol className="border-l border-border">
          {CASES.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 110} className="relative block pb-12 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="rule-label text-accent">{c.year}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.practice}</span>
              </div>
              <h2 className="mt-2 max-w-2xl text-2xl text-foreground">{c.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
              <p className="mt-3 inline-block border border-accent/50 px-3 py-1 text-xs uppercase tracking-widest text-foreground">
                {c.outcome}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
