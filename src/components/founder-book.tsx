import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import founderPortrait from "@/assets/founder-oo-kalu.jpg";
import { Button } from "@/components/ui/button";

export function FounderBook() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [opened, setOpened] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(media.matches);
      if (media.matches) setOpened(true);
    };
    syncMotion();
    media.addEventListener("change", syncMotion);

    const section = sectionRef.current;
    if (!section || media.matches) return () => media.removeEventListener("change", syncMotion);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.setTimeout(() => setOpened(true), 260);
          observer.disconnect();
        }
      },
      { threshold: 0.38, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  const toggleBook = () => {
    if (!reducedMotion) setOpened((value) => !value);
  };

  return (
    <section ref={sectionRef} className="overflow-hidden bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div className="min-w-0">
            <p className="rule-label text-accent">Our Foundation</p>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">A legacy written for what comes next</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleBook}
            disabled={reducedMotion}
            aria-label={opened ? "Close the About Us book" : "Open the About Us book"}
            title={opened ? "Close book" : "Open book"}
            className="shrink-0 border border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <RotateCcw aria-hidden="true" />
          </Button>
        </div>

        <div className="book-stage mt-12 md:mt-16" data-open={opened ? "true" : "false"}>
          <button
            type="button"
            onClick={toggleBook}
            disabled={reducedMotion}
            className="book-object"
            aria-label={opened ? "Close the About Us book" : "Open the About Us book"}
            aria-pressed={opened}
          >
            <span className="book-ground-shadow" aria-hidden="true" />
            <span className="book-back-cover" aria-hidden="true" />
            <span className="book-page-block" aria-hidden="true">
              <span className="book-page-lines" />
            </span>

            <span className="book-spread">
              <span className="book-page book-page-left">
                <span className="book-page-number">I</span>
                <span className="book-portrait-frame">
                  <img
                    src={founderPortrait}
                    alt="Portrait of O.O. Kalu, Esq., founder of Equity Chambers"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </span>
                <span className="book-founder-name">O.O. Kalu, Esq.</span>
                <span className="book-founder-role">Founder · 1994</span>
              </span>

              <span className="book-page book-page-right">
                <span className="book-page-number">II</span>
                <span className="book-kicker">Equity Chambers</span>
                <span className="book-chapter">Principle before precedent</span>
                <span className="book-copy book-copy-desktop">
                  O.O. Kalu founded Equity Chambers on a simple conviction: consequential counsel must pair exacting
                  advocacy with an intimate understanding of the institutions shaping Nigerian enterprise. From one
                  Abuja office, that conviction grew into a national practice serving boards, families, and public
                  institutions across generations. Our mission remains to develop lawyers of uncommon judgment,
                  strengthen the rule of law, and help ambitious Nigerian businesses build with confidence across Africa.
                </span>
                <span className="book-copy book-copy-mobile">
                  Founded by O.O. Kalu in 1994, Equity Chambers pairs exacting advocacy with a deep understanding of
                  Nigerian enterprise. We develop lawyers of uncommon judgment, strengthen the rule of law, and help
                  ambitious businesses build confidently across Africa.
                </span>
                <span className="book-flourish" aria-hidden="true">§</span>
              </span>
            </span>

            <span className="book-front-cover" aria-hidden="true">
              <span className="book-cover-spine" />
              <span className="book-cover-frame">
                <span className="book-cover-mark">EC</span>
                <span className="book-cover-title">About Us</span>
                <span className="book-cover-rule" />
                <span className="book-cover-subtitle">Equity Chambers · Nigeria</span>
              </span>
            </span>
          </button>
        </div>
        <p className="mt-7 text-center text-xs uppercase tracking-widest text-ink-foreground/50">
          {opened ? "Tap the book to close" : "Tap the cover to open"}
        </p>
      </div>
    </section>
  );
}