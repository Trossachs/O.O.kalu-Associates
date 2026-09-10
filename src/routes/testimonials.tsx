import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { TESTIMONIALS } from "@/lib/firm-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — Equity Chambers" },
      {
        name: "description",
        content: "What chief executives, general counsel, and private clients say about working with Equity Chambers.",
      },
      { property: "og:title", content: "Client Testimonials — Equity Chambers" },
      { property: "og:description", content: "Client accounts of transactions, trials, and regulatory defense." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Client Accounts"
        title="Said by the people who signed the engagement letter"
        intro="Clients are identified by role and sector; names are withheld under our confidentiality practice."
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="bg-background p-10">
              <span className="font-display text-6xl leading-none text-accent" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-2 font-display text-2xl leading-snug text-foreground">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="text-foreground">{t.author}</span> — {t.org}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
