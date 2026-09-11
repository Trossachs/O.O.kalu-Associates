import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/motion";
import { TESTIMONIALS } from "@/lib/firm-data";
import heroTestimonials from "@/assets/hero-testimonials.jpg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — Equity Chambers Nigeria" },
      {
        name: "description",
        content:
          "What Nigerian managing directors, general counsel, and private clients say about working with Equity Chambers in Abuja, Lagos, and Port Harcourt.",
      },
      { property: "og:title", content: "Client Testimonials — Equity Chambers Nigeria" },
      { property: "og:description", content: "Client accounts of transactions, trials, and regulatory defence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        image={heroTestimonials}
        imageAlt="Two leather chairs facing each other in a quiet law firm lounge"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.quote} delay={(i % 2) * 130}>
              <figure className="h-full bg-background p-10">
                <span className="font-display text-6xl leading-none text-accent" aria-hidden="true">
                  “
                </span>
                <blockquote className="mt-2 font-display text-2xl leading-snug text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  <span className="text-foreground">{t.author}</span> — {t.org}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
