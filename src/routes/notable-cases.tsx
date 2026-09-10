import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { CASES } from "@/lib/firm-data";

export const Route = createFileRoute("/notable-cases")({
  head: () => ({
    meta: [
      { title: "Notable Cases — Equity Chambers" },
      {
        name: "description",
        content:
          "Representative matters from Equity Chambers: acquisitions, trial verdicts, closed enforcement inquiries, and landmark developments.",
      },
      { property: "og:title", content: "Notable Cases — Equity Chambers" },
      { property: "og:description", content: "Representative results across six practice groups." },
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
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <ol className="border-l border-border">
          {CASES.map((c) => (
            <li key={c.title} className="relative pb-12 pl-8 last:pb-0">
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
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
