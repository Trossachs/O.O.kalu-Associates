import { createFileRoute, Link } from "@tanstack/react-router";
import { ATTORNEYS, CASES, FIRM, PRACTICE_AREAS, PUBLICATIONS, TESTIMONIALS } from "@/lib/firm-data";
import { ATTORNEY_PHOTOS } from "@/lib/attorney-photos";
import { Parallax, Reveal, TiltCard } from "@/components/motion";
import { HeroSlider } from "@/components/hero-slider";
import facade from "@/assets/facade.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Equity Chambers — Nigerian Commercial & Dispute Resolution Law Firm" },
      {
        name: "description",
        content:
          "Equity Chambers is a Nigerian law firm in Abuja, Lagos, and Port Harcourt advising boards, institutions, and families on transactions, litigation, arbitration, energy, and regulatory matters.",
      },
      { property: "og:title", content: "Equity Chambers — Nigerian Commercial & Dispute Resolution Law Firm" },
      {
        property: "og:description",
        content: "A Nigerian firm of advocates and transactional counsel, practising since 1994.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <HeroSlider />

      <section className="border-b border-border bg-parchment">
        <dl className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { k: "Years in practice", v: `${new Date().getFullYear() - FIRM.founded}` },
            { k: "Matters led to judgment or award", v: "180+" },
            { k: "Transaction value advised", v: "$4.1B" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 140}>
              <div className="border-t border-border pt-4">
                <dd className="font-display text-4xl text-accent">{s.v}</dd>
                <dt className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.k}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>


      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">Practice Areas</p>
              <h2 className="mt-3 text-4xl text-foreground">Where we are retained</h2>
            </div>
            <Link to="/practice-areas" className="story-link text-sm text-muted-foreground">
              All practice areas
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70}>
              <TiltCard className="h-full bg-background p-8">
                <h3 className="text-2xl text-foreground">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <Parallax speed={0.18} className="absolute inset-0 scale-125">
          <img
            src={facade}
            alt="Stone colonnade of the chambers building in Abuja at dusk"
            width={1400}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover opacity-35"
          />
        </Parallax>
        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <Reveal>
            <p className="rule-label text-accent">Abuja · Lagos · Port Harcourt</p>
            <p className="mt-5 max-w-2xl font-display text-3xl leading-snug md:text-4xl">
              Three offices, one bench: the Federal Capital Territory, the commercial capital, and the oil rivers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="rule-label text-accent">The Bench</p>
                <h2 className="mt-3 text-4xl text-foreground">Partners lead every matter</h2>
              </div>
              <Link to="/attorneys" className="story-link text-sm text-muted-foreground">
                All attorneys
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ATTORNEYS.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <TiltCard className="h-full overflow-hidden bg-background" max={6}>
                  <div className="overflow-hidden">
                    <img
                      src={ATTORNEY_PHOTOS[a.slug]}
                      alt={`Portrait of ${a.name}, ${a.role} at Equity Chambers`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl text-foreground">{a.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-foreground">{a.bio}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">Notable Cases</p>
              <h2 className="mt-3 text-4xl text-foreground">Representative results</h2>
            </div>
            <Link to="/notable-cases" className="story-link text-sm text-muted-foreground">
              Full record
            </Link>
          </div>
        </Reveal>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {CASES.slice(0, 4).map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80}>
              <div className="grid gap-3 py-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[5rem_1fr_12rem] md:items-baseline">
                <span className="rule-label text-accent">{c.year}</span>
                <span className="text-lg text-foreground">{c.title}</span>
                <span className="text-sm text-muted-foreground md:text-right">{c.outcome}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="rule-label text-accent">Client Accounts</p>
            <blockquote className="mt-6 max-w-4xl font-display text-3xl leading-snug md:text-4xl">
              “{TESTIMONIALS[0]!.quote}”
            </blockquote>
            <p className="mt-6 text-sm text-ink-foreground/70">
              {TESTIMONIALS[0]!.author} — {TESTIMONIALS[0]!.org}
            </p>
            <Link
              to="/testimonials"
              className="mt-10 inline-block border-b border-accent pb-1 text-sm text-accent transition-opacity hover:opacity-80"
            >
              More client accounts
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">Publications</p>
              <h2 className="mt-3 text-4xl text-foreground">Recent writing</h2>
            </div>
            <Link to="/publications" className="story-link text-sm text-muted-foreground">
              All publications
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {PUBLICATIONS.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <TiltCard className="h-full bg-background p-8" max={5}>
                <p className="rule-label text-accent">{p.date}</p>
                <h3 className="mt-3 text-xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-parchment">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-20">
          <Reveal>
            <h2 className="max-w-xl text-4xl text-foreground">Bring us the matter you cannot afford to lose.</h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              Confidential consultations, reviewed by a partner, answered within one business day.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/consultation"
              className="inline-block rounded-sm bg-ink px-8 py-4 text-sm text-ink-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-ink/90"
            >
              Book a consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
