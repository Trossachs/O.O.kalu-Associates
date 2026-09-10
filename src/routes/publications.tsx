import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { PUBLICATIONS } from "@/lib/firm-data";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Equity Chambers" },
      {
        name: "description",
        content: "Articles and commentary from Equity Chambers partners on deal terms, trial practice, compliance, and succession.",
      },
      { property: "og:title", content: "Publications — Equity Chambers" },
      { property: "og:description", content: "Writing from the partners of Equity Chambers." },
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
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <ul className="divide-y divide-border border-y border-border">
          {PUBLICATIONS.map((p) => (
            <li key={p.title} className="grid gap-4 py-8 md:grid-cols-[10rem_1fr]">
              <div className="rule-label text-accent">{p.date}</div>
              <div>
                <h2 className="text-2xl text-foreground">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.author} · {p.venue}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">{p.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
