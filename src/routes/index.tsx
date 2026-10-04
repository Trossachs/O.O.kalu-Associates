import { createFileRoute, Link } from "@tanstack/react-router";
import { ATTORNEYS, CASES, FIRM, PRACTICE_AREAS, PUBLICATIONS, TESTIMONIALS, type NotableCase } from "@/lib/firm-data";
import { Parallax, Reveal, TiltCard } from "@/components/motion";
import { HeroSlider, type Slide } from "@/components/hero-slider";
import { FounderBook } from "@/components/founder-book";
import { CasesCarousel } from "@/components/cases-carousel";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Building2, Landmark, Scale } from "lucide-react";
import facade from "@/assets/facade.jpg";
import { text } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/use-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O.O. Kalu & Associates — Nigerian Commercial & Dispute Resolution Law Firm" },
      {
        name: "description",
        content:
          "O.O. Kalu & Associates is a Nigerian law firm based in Owerri, Imo State, advising boards, institutions, and families on transactions, litigation, arbitration, energy, and regulatory matters.",
      },
      { property: "og:title", content: "O.O. Kalu & Associates — Nigerian Commercial & Dispute Resolution Law Firm" },
      {
        property: "og:description",
        content: "A Nigerian firm of advocates and transactional counsel based in Owerri, Imo State.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { block, list } = useSiteContent();
  const benchIcons = [Scale, BriefcaseBusiness, Landmark, Building2];

  const hero = block("home", "hero");
  const practiceIntro = block("home", "practice-intro");
  const quote = block("home", "quote-band");
  const benchIntro = block("home", "bench-intro");
  const casesIntro = block("home", "cases-intro");
  const pubIntro = block("home", "publications-intro");

  const statRows = list("home", "stat");
  const stats = statRows.length
    ? statRows.map((row) => ({ k: text(row.subtitle, ""), v: text(row.title, "") }))
    : [
        { k: "Legal tradition", v: "Established" },
        { k: "Matters led to judgment or award", v: "180+" },
        { k: "Transaction value advised", v: "$4.1B" },
      ];

  const areaRows = list("practice-areas", "area");
  const areas = areaRows.length
    ? areaRows.map((row) => ({ slug: row.id, title: text(row.title, ""), summary: text(row.body, "") }))
    : PRACTICE_AREAS.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary }));

  const attorneyRows = list("attorneys", "attorney");
  const bench = (
    attorneyRows.length
      ? attorneyRows.map((row) => ({
          slug: row.id,
          name: text(row.title, ""),
          role: text(row.subtitle, ""),
          focus: text(row.eyebrow, ""),
        }))
      : ATTORNEYS.map((a) => ({ slug: a.slug, name: a.name, role: a.role, focus: a.focus }))
  ).slice(0, 4);

  const slideRows = list("home", "slide");
  const slides: Slide[] | undefined = slideRows.length
    ? slideRows.map((row) => ({
        image: text(row.image_url, facade),
        alt: text(row.title, "Chambers photograph"),
        eyebrow: text(row.eyebrow, ""),
        title: text(row.title, ""),
        body: text(row.body, ""),
      }))
    : undefined;

  const caseRows = list("home", "case");
  const cases: NotableCase[] = caseRows.length
    ? caseRows.map((row) => ({
        year: text(row.eyebrow, ""),
        title: text(row.title, ""),
        practice: text(row.subtitle, ""),
        outcome: text(row.meta, ""),
        detail: text(row.body, ""),
      }))
    : CASES;

  const testimonialRows = list("home", "testimonial");
  const firstTestimonial = testimonialRows[0];
  const testimonial = firstTestimonial
    ? {
        quote: text(firstTestimonial.body, ""),
        author: text(firstTestimonial.title, ""),
        org: text(firstTestimonial.subtitle, ""),
      }
    : { quote: TESTIMONIALS[0]!.quote, author: TESTIMONIALS[0]!.author, org: TESTIMONIALS[0]!.org };

  const pubRows = list("publications", "publication");
  const publications = (
    pubRows.length
      ? pubRows.map((row) => ({
          key: row.id,
          date: text(row.eyebrow, ""),
          title: text(row.title, ""),
          summary: text(row.body, ""),
        }))
      : PUBLICATIONS.map((p) => ({ key: p.title, date: p.date, title: p.title, summary: p.summary }))
  ).slice(0, 3);

  return (
    <div>
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink text-center text-ink-foreground lg:h-screen">
        <img
          src={text(hero?.image_url, facade)}
          alt="The O.O. Kalu & Associates chambers building"
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/50" aria-hidden="true" />
        <Reveal className="mx-auto max-w-5xl px-6">
          <p className="rule-label text-accent">{text(hero?.eyebrow, "O.O. Kalu & Associates · Nigeria")}</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] text-ink-foreground md:text-7xl lg:text-8xl">
            {text(hero?.title, "Bring us the matter you cannot afford to lose.")}
          </h1>
          <Button asChild size="lg" className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/consultation">{text(hero?.body, "Book a Consultation")}</Link>
          </Button>
        </Reveal>
      </section>

      <section className="border-b border-border bg-parchment">
        <dl className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={`${s.k}-${i}`} delay={i * 140}>
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
              <p className="rule-label text-accent">{text(practiceIntro?.eyebrow, "Practice Areas")}</p>
              <h2 className="mt-3 text-4xl text-foreground">{text(practiceIntro?.title, "Where we are retained")}</h2>
            </div>
            <Link to="/practice-areas" className="story-link text-sm text-muted-foreground">
              All practice areas
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70}>
              <Link
                to="/practice-areas"
                hash={`area-${a.slug}`}
                className="group block h-full focus-visible:outline-2 focus-visible:outline-accent"
              >
                <TiltCard className="h-full bg-background p-8 transition-colors group-hover:bg-parchment">
                  <h3 className="text-2xl text-foreground">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
                  <span className="mt-5 inline-block text-xs uppercase tracking-widest text-accent">
                    Learn more →
                  </span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <Parallax speed={0.18} className="absolute inset-0 scale-125">
          <img
            src={text(quote?.image_url, facade)}
            alt="Stone colonnade of the chambers building in Abuja at dusk"
            loading="lazy"
            className="h-full w-full object-cover opacity-35"
          />
        </Parallax>
        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <Reveal>
            <p className="rule-label text-accent">{text(quote?.eyebrow, "Abuja · Lagos · Port Harcourt")}</p>
            <p className="mt-5 max-w-2xl font-display text-3xl leading-snug md:text-4xl">
              {text(
                quote?.body,
                "Three offices, one bench: the Federal Capital Territory, the commercial capital, and the oil rivers.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="rule-label text-accent">{text(benchIntro?.eyebrow, "The Bench")}</p>
                <h2 className="mt-3 text-4xl text-foreground">{text(benchIntro?.title, "Partners lead every matter")}</h2>
              </div>
              <Link to="/attorneys" className="story-link text-sm text-muted-foreground">
                All attorneys
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {bench.map((a, i) => {
              const Icon = benchIcons[i] ?? Scale;
              return (
                <Reveal key={a.slug} delay={i * 100}>
                  <article className="group h-full min-h-56 border border-border bg-background p-5 transition-all duration-500 sm:p-7 lg:hover:-translate-y-1 lg:hover:border-accent/60 lg:hover:shadow-lg">
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
        <HeroSlider slides={slides} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">{text(casesIntro?.eyebrow, "Notable Cases")}</p>
              <h2 className="mt-3 text-4xl text-foreground">{text(casesIntro?.title, "Representative results")}</h2>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <CasesCarousel cases={cases} />
        </Reveal>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="rule-label text-accent">Client Accounts</p>
            <blockquote className="mt-6 max-w-4xl font-display text-3xl leading-snug md:text-4xl">
              “{testimonial.quote}”
            </blockquote>
            <p className="mt-6 text-sm text-ink-foreground/70">
              {testimonial.author} — {testimonial.org}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">{text(pubIntro?.eyebrow, "Blog")}</p>
              <h2 className="mt-3 text-4xl text-foreground">{text(pubIntro?.title, "Recent writing")}</h2>
            </div>
            <Link to="/blog" className="story-link text-sm text-muted-foreground">
              All blog posts
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {publications.map((p, i) => (
            <Reveal key={p.key} delay={i * 90}>
              <TiltCard className="h-full bg-background p-8" max={5}>
                <p className="rule-label text-accent">{p.date}</p>
                <h3 className="mt-3 text-xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
