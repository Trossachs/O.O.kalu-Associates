import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import slideLibrary from "@/assets/slide-library.jpg";
import slideLagos from "@/assets/slide-lagos.jpg";
import slideAbuja from "@/assets/slide-abuja.jpg";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    image: slideAbuja,
    alt: "Colonnaded Nigerian courthouse in Abuja lit at dusk",
    eyebrow: "Abuja · Lagos · Port Harcourt",
    title: "Counsel for the matters that decide the decade.",
    body: "Equity Chambers represents boards, institutions, and families across Nigeria when the transaction is complicated, the exposure is real, and the outcome cannot be delegated.",
  },
  {
    image: slideLagos,
    alt: "The Lagos Victoria Island skyline at dusk seen across the lagoon",
    eyebrow: "Corporate & Commercial",
    title: "Deals that survive the first hard quarter.",
    body: "CAMA structuring, FCCPC clearance, SEC Nigeria approvals, and the negotiation discipline that keeps a transaction alive when the economics move.",
  },
  {
    image: slideLibrary,
    alt: "The chambers reading room lined with Nigerian law reports under brass lamps",
    eyebrow: "Disputes & Arbitration",
    title: "Prepared for hearing from the first week.",
    body: "Advocacy before the Federal High Court, the Court of Appeal, and the Supreme Court of Nigeria, and in arbitrations seated in Lagos, Abuja, and London.",
  },
];

const INTERVAL = 7000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index]);

  return (
    <section
      className="relative isolate overflow-hidden bg-ink text-ink-foreground [perspective:1600px]"
      aria-roledescription="carousel"
      aria-label="Equity Chambers introduction"
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.title}
            aria-hidden={!active}
            className="absolute inset-0 -z-10 [transform-style:preserve-3d] transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              opacity: active ? 1 : 0,
              transform: active
                ? "translate3d(0,0,0) rotateY(0deg) scale(1)"
                : `translate3d(${dir > 0 ? "12%" : "-12%"},0,-320px) rotateY(${dir > 0 ? -18 : 18}deg) scale(1.12)`,
              pointerEvents: "none",
            }}
          >
            <img
              src={s.image}
              alt={s.alt}
              width={1600}
              height={1000}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover opacity-45"
            />
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--ink)_18%,color-mix(in_oklab,var(--ink)_70%,transparent)_62%,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.title}
              className={cn(
                "max-w-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] [transform-style:preserve-3d]",
                active ? "relative" : "pointer-events-none absolute inset-x-6 top-32 lg:top-44",
              )}
              style={{
                opacity: active ? 1 : 0,
                transform: active
                  ? "translate3d(0,0,0) rotateY(0deg)"
                  : `translate3d(${dir > 0 ? "40px" : "-40px"},0,-120px) rotateY(${dir > 0 ? -10 : 10}deg)`,
                filter: active ? "blur(0px)" : "blur(10px)",
              }}
            >
              <p className="rule-label text-accent">{s.eyebrow}</p>
              <h2 className="mt-6 text-5xl leading-[1.02] md:text-7xl">{s.title}</h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/80">{s.body}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/consultation"
                  className="rounded-sm bg-accent px-7 py-3 text-sm text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Book a consultation
                </Link>
                <Link
                  to="/practice-areas"
                  className="rounded-sm border border-white/25 px-7 py-3 text-sm text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
                >
                  Explore practice areas
                </Link>
              </div>
            </div>
          );
        })}

        <div className="mt-14 flex items-center gap-5">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1, -1)}
            className="rounded-sm border border-white/25 px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1, 1)}
            className="rounded-sm border border-white/25 px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            →
          </button>
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={cn(
                  "h-px w-10 transition-all duration-500",
                  i === index ? "bg-accent shadow-[0_0_0_1px_var(--accent)]" : "bg-white/30 hover:bg-white/60",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
