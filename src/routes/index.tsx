import { createFileRoute, Link } from "@tanstack/react-router";
import { ATTORNEYS, CASES, FIRM, PRACTICE_AREAS, PUBLICATIONS, TESTIMONIALS, type NotableCase } from "@/lib/firm-data";
import { Parallax, Reveal, TiltCard } from "@/components/motion";
import { HeroSlider, type Slide } from "@/components/hero-slider";
import { FounderBook } from "@/components/founder-book";
import { CasesCarousel } from "@/components/cases-carousel";
import { TeamCarousel, type TeamMember } from "@/components/team-carousel";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import facade from "@/assets/facade.jpg";
import heroCases from "@/assets/hero-cases.jpg";
import heroChambers from "@/assets/hero-chambers.jpg";
import slideLibrary from "@/assets/slide-library.jpg";
import { ATTORNEY_PHOTOS } from "@/lib/attorney-photos";
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

  const hero = block("home", "hero");
  const practiceIntro = block("home", "practice-intro");
  const quote = block("home", "quote-band");
  const benchIntro = block("home", "bench-intro");
  const casesIntro = block("home", "cases-intro");
  const pubIntro = block("home", "publications-intro");
  const footer = block("global", "footer");
  const [footerPhone, footerEmail] = text(footer?.meta, `${FIRM.phone} · ${FIRM.email}`)
    .split("·")
    .map((value) => value.trim());
  const phone = footerPhone || FIRM.phone;
  const email = footerEmail || FIRM.email;
  const location = text(footer?.body, FIRM.address);

  const areaRows = list("practice-areas", "area");
  const areas = areaRows.length
    ? areaRows.map((row) => ({ slug: row.id, title: text(row.title, ""), summary: text(row.body, "") }))
    : PRACTICE_AREAS.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary }));

  const attorneyRows = list("attorneys", "attorney");
  const bench: TeamMember[] = (
    attorneyRows.length
      ? attorneyRows.map((row) => ({
          slug: row.id,
          name: text(row.title, ""),
          role: text(row.subtitle, ""),
          focus: text(row.eyebrow, ""),
          photo: text(row.image_url, facade),
        }))
      : ATTORNEYS.map((a) => ({
          slug: a.slug,
          name: a.name,
          role: a.role,
          focus: a.focus,
          photo: ATTORNEY_PHOTOS[a.slug] ?? facade,
        }))
  );

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
  const caseFallbacks = [heroCases, heroChambers, slideLibrary];
  const cases: NotableCase[] = caseRows.length
    ? caseRows.map((row, index) => ({
        year: text(row.eyebrow, ""),
        title: text(row.title, ""),
        practice: text(row.subtitle, ""),
        outcome: text(row.meta, ""),
        detail: text(row.body, ""),
        image: text(row.image_url, caseFallbacks[index % caseFallbacks.length] ?? heroCases),
      }))
    : CASES.map((item, index) => ({
        ...item,
        image: caseFallbacks[index % caseFallbacks.length] ?? heroCases,
      }));

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
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="group flex min-w-0 items-center gap-3">
                <Phone className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0 break-words font-display text-xl text-foreground group-hover:text-accent">{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="group flex min-w-0 items-center gap-3">
                <Mail className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0 break-all font-display text-xl text-foreground group-hover:text-accent">{email}</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-start gap-3 border-t border-border pt-5 md:max-w-sm md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="rule-label text-accent">Owerri office</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/45 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
              <div className="min-w-0">
                <p className="rule-label text-accent">{text(practiceIntro?.eyebrow, "Practice Areas")}</p>
                <h2 className="mt-3 text-4xl text-foreground">{text(practiceIntro?.title, "Where we are retained")}</h2>
              </div>
              <Link to="/practice-areas" className="story-link shrink-0 text-sm text-muted-foreground">
                All areas
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 border border-border bg-border p-px shadow-sm">
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
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
                      <span className="mt-5 inline-block text-xs uppercase tracking-widest text-accent">Learn more →</span>
                    </TiltCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
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
          <Reveal delay={100} className="mt-10">
            <TeamCarousel members={bench} />
          </Reveal>
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

      <section className="bg-muted/45 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
              <div className="min-w-0">
                <p className="rule-label text-accent">{text(pubIntro?.eyebrow, "Blog")}</p>
                <h2 className="mt-3 text-4xl text-foreground">{text(pubIntro?.title, "Recent writing")}</h2>
              </div>
              <Link to="/blog" className="story-link shrink-0 text-sm text-muted-foreground">All posts</Link>
            </div>
          </Reveal>
          <div className="mt-10 border border-border bg-border p-px shadow-sm">
            <div className="grid gap-px bg-border md:grid-cols-3">
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
          </div>
        </div>
      </section>
    </div>
  );
}
