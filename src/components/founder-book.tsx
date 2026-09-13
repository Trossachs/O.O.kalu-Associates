import { useEffect, useRef, useState } from "react";
import founderPortrait from "@/assets/founder-oo-kalu.jpg";

export function FounderBook() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [opened, setOpened] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);

    const section = sectionRef.current;
    if (!section || media.matches) {
      setOpened(true);
      return () => media.removeEventListener("change", syncMotion);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOpened(true);
          observer.disconnect();
        }
      },
      { threshold: 0.32, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 md:mb-14">
          <p className="rule-label text-accent">Our Foundation</p>
          <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">A legacy written for what comes next</h2>
        </div>

        <div className="relative mx-auto hidden max-w-5xl [perspective:2200px] md:block">
          <div
            className="relative aspect-[16/9] transition-[transform,filter] duration-[1800ms] [transform-style:preserve-3d]"
            style={{
              transform: opened ? "rotateX(1deg) translateY(0)" : "rotateX(7deg) translateY(24px)",
              filter: opened ? "drop-shadow(0 30px 35px color-mix(in oklab, var(--background) 12%, transparent))" : "none",
              transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            <div className="absolute inset-0 grid grid-cols-2 overflow-hidden rounded-sm border border-border bg-parchment text-foreground">
              <figure className="relative overflow-hidden border-r border-border bg-background p-8 lg:p-10">
                <div className="h-full overflow-hidden border border-border">
                  <img
                    src={founderPortrait}
                    alt="Portrait of O.O. Kalu, Esq., founder of Equity Chambers"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[20%]"
                  />
                </div>
                <figcaption className="absolute bottom-12 left-12 bg-background/90 px-4 py-3 backdrop-blur-sm lg:bottom-14 lg:left-14">
                  <span className="block font-display text-2xl">O.O. Kalu, Esq.</span>
                  <span className="rule-label mt-1 block text-accent">Founder</span>
                </figcaption>
              </figure>

              <div className="flex flex-col justify-center bg-parchment p-10 lg:p-14">
                <p className="rule-label text-accent">Since 1994</p>
                <h3 className="mt-4 text-4xl leading-tight">Principle before precedent</h3>
                <p className="mt-7 text-base leading-8 text-muted-foreground">
                  O.O. Kalu founded Equity Chambers on a simple conviction: consequential counsel must pair exacting
                  advocacy with an intimate understanding of the institutions shaping Nigerian enterprise. From a
                  single Abuja office, that conviction has grown into a national practice serving boards, families,
                  and public institutions across generations. Our vision remains forward-looking — to develop lawyers
                  of uncommon judgment, strengthen the rule of law, and help ambitious Nigerian businesses build with
                  confidence at home and across Africa.
                </p>
                <div className="mt-9 h-px w-20 bg-accent" aria-hidden="true" />
              </div>
            </div>

            {!reducedMotion && (
              <div
                aria-hidden="true"
                className="absolute inset-0 origin-left rounded-sm border border-accent/60 bg-ink [backface-visibility:hidden] [transform-style:preserve-3d]"
                style={{
                  transform: opened ? "rotateY(-178deg)" : "rotateY(0deg)",
                  transition: "transform 1900ms cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                <div className="absolute inset-5 flex items-center justify-center border border-accent/45">
                  <div className="text-center">
                    <span className="rule-label text-accent">Equity Chambers</span>
                    <p className="mt-6 font-display text-7xl text-ink-foreground">About Us</p>
                    <span className="mx-auto mt-8 block h-px w-24 bg-accent" />
                    <span className="rule-label mt-8 block text-ink-foreground/60">Est. 1994 · Nigeria</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-border bg-parchment text-foreground md:hidden">
          <img
            src={founderPortrait}
            alt="Portrait of O.O. Kalu, Esq., founder of Equity Chambers"
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div className="p-7">
            <p className="rule-label text-accent">Founder · Since 1994</p>
            <h3 className="mt-3 text-3xl">O.O. Kalu, Esq.</h3>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              O.O. Kalu founded Equity Chambers on the conviction that consequential counsel must pair exacting
              advocacy with a deep understanding of the institutions shaping Nigerian enterprise. Today, the firm
              carries that vision forward by developing lawyers of uncommon judgment and helping ambitious Nigerian
              businesses build with confidence across Africa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}