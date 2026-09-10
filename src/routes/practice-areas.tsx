import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { PRACTICE_AREAS } from "@/lib/firm-data";

export const Route = createFileRoute("/practice-areas")({
  head: () => ({
    meta: [
      { title: "Practice Areas — Equity Chambers" },
      {
        name: "description",
        content:
          "Corporate and M&A, complex litigation, regulatory enforcement, intellectual property, private client, and real estate counsel at Equity Chambers.",
      },
      { property: "og:title", content: "Practice Areas — Equity Chambers" },
      {
        property: "og:description",
        content: "Six practice groups serving boards, institutions, and families in consequential matters.",
      },
    ],
  }),
  component: PracticeAreasPage,
});

function PracticeAreasPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Practice Areas"
        title="Six groups, one standard of preparation"
        intro="Our practice groups work as a single bench. A transaction that turns into a dispute does not change hands; it gains litigators."
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {PRACTICE_AREAS.map((area) => (
            <article key={area.slug} className="bg-background p-8">
              <h2 className="text-3xl text-foreground">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.detail}</p>
              <ul className="mt-6 space-y-2">
                {area.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <p className="max-w-md text-sm text-muted-foreground">
            Unsure which group fits your matter? Describe it and we will route it correctly.
          </p>
          <Link
            to="/consultation"
            className="rounded-sm bg-ink px-6 py-3 text-sm text-ink-foreground transition-colors hover:bg-ink/90"
          >
            Request a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
