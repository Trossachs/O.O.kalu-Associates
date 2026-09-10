import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
    opacity: shown ? 1 : 0,
  };

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Moves a layer slightly against the scroll direction. */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Card that tips in 3D toward the pointer with a travelling sheen. */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.setProperty("--sheen", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (reduced) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(1100px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateZ(12px)`;
        el.style.setProperty("--sheen-x", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--sheen-y", `${(py * 100).toFixed(1)}%`);
        el.style.setProperty("--sheen", "1");
      }}
      onPointerLeave={reset}
      className={cn(
        "relative transition-transform duration-500 ease-out [transform-style:preserve-3d]",
        "after:pointer-events-none after:absolute after:inset-0 after:opacity-[var(--sheen,0)] after:transition-opacity after:duration-500",
        "after:bg-[radial-gradient(600px_circle_at_var(--sheen-x,50%)_var(--sheen-y,50%),color-mix(in_oklab,var(--brass)_22%,transparent),transparent_60%)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Thin brass progress rule pinned under the header. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p)).toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent"
    />
  );
}
