import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FIRM } from "@/lib/firm-data";
import { Reveal, ScrollProgress, ZoomImage } from "@/components/motion";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/attorneys", label: "Attorneys" },
  { to: "/notable-cases", label: "Notable Cases" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/publications", label: "Publications" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/90 backdrop-blur transition-all duration-500 ${
        scrolled ? "border-border shadow-[0_10px_30px_-24px_rgba(0,0,0,0.6)]" : "border-border/50"
      }`}
    >
      <ScrollProgress />
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-2xl tracking-tight text-foreground">{FIRM.name}</span>
          <span className="hidden rule-label text-accent sm:inline">Est. {FIRM.founded}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/consultation"
            className="rounded-sm bg-ink px-4 py-2 text-sm text-ink-foreground transition-colors hover:bg-ink/90"
          >
            Book a consultation
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rule-label text-muted-foreground lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={() => setOpen(false)} className="text-sm text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/consultation" onClick={() => setOpen(false)} className="text-sm text-accent">
                Book a consultation
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{FIRM.name}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-foreground/70">{FIRM.tagline}</p>
        </div>
        <div>
          <p className="rule-label text-accent">Offices</p>
          <address className="mt-3 space-y-3 text-sm not-italic text-ink-foreground/80">
            {FIRM.offices.map((o) => (
              <div key={o.city}>
                <p className="text-xs uppercase tracking-widest text-ink-foreground/60">{o.city}</p>
                <p>{o.detail}</p>
              </div>
            ))}
            <div>
              <p>{FIRM.phone}</p>
              <p>{FIRM.email}</p>
            </div>
          </address>
        </div>
        <div>
          <p className="rule-label text-accent">Navigate</p>
          <ul className="mt-3 space-y-1 text-sm text-ink-foreground/80">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} {FIRM.name}. Regulated by the Nigerian Bar Association and the Rules of Professional
        Conduct. Prior results do not guarantee a similar outcome.
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
}) {
  if (!image) {
    return (
      <section className="border-b border-border bg-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="rule-label text-accent">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] text-foreground md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-ink text-ink-foreground">
      <ZoomImage
        src={image}
        alt={imageAlt ?? ""}
        priority
        className="absolute inset-0 -z-10"
        imgClassName="opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--ink)_15%,color-mix(in_oklab,var(--ink)_72%,transparent)_65%,transparent)]"
      />
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <p className="rule-label text-accent">{eyebrow}</p>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] md:text-6xl">{title}</h1>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-foreground/80">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
