import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FIRM } from "@/lib/firm-data";

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
          <p className="rule-label text-accent">Chambers</p>
          <address className="mt-3 space-y-1 text-sm not-italic text-ink-foreground/80">
            <p>{FIRM.address}</p>
            <p>{FIRM.phone}</p>
            <p>{FIRM.email}</p>
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
        © {new Date().getFullYear()} {FIRM.name}. Attorney advertising. Prior results do not guarantee a similar outcome.
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
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
