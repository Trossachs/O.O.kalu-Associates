import { createFileRoute, Link } from "@tanstack/react-router";
import { ATTORNEYS, CASES, FIRM, PRACTICE_AREAS, PUBLICATIONS, TESTIMONIALS } from "@/lib/firm-data";
import { Parallax, Reveal, TiltCard } from "@/components/motion";
import { HeroSlider } from "@/components/hero-slider";
import { FounderBook } from "@/components/founder-book";
import { CasesCarousel } from "@/components/cases-carousel";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Building2, Landmark, Scale } from "lucide-react";
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
  const benchIcons = [Scale, BriefcaseBusiness, Landmark, Building2];

  return (
    <div>
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink text-center text-ink-foreground lg:h-screen">
        <img
          src={facade}
          alt="Equity Chambers building in Abuja"
          width={1400}
          height={900}
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/50" aria-hidden="true" />
        <Reveal className="mx-auto max-w-5xl px-6">
          <p className="rule-label text-accent">Equity Chambers · Nigeria</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] text-ink-foreground md:text-7xl lg:text-8xl">
            Bring us the matter you cannot afford to lose.
          </h1>
          <Button asChild size="lg" className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/consultation">Book a Consultation</Link>
          </Button>
        </Reveal>
      </section>

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
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {ATTORNEYS.slice(0, 4).map((a, i) => {
              const Icon = benchIcons[i] ?? Scale;
              return (
              <Reveal key={a.slug} delay={i * 100}>
                <article className="group h-full min-h-56 border border-border bg-background p-5 transition-all duration-500 lg:hover:-translate-y-1 lg:hover:border-accent/60 lg:hover:shadow-lg sm:p-7">
                  <span className="grid size-10 place-items-center border border-accent/40 text-accent transition-colors duration-500 lg:group-hover:bg-accent lg:group-hover:text-accent-foreground">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl leading-tight text-foreground sm:text-2xl">{a.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {a.role}. {a.focus} counsel for consequential Nigerian matters.
                  </p>
                </article>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FounderBook />

      <div className="py-20">
        <HeroSlider />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">Notable Cases</p>
              <h2 className="mt-3 text-4xl text-foreground">Representative results</h2>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <CasesCarousel cases={CASES} />
        </Reveal>
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
