"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  childrenTop: React.ReactNode;
  childrenBottom: React.ReactNode;
};

export default function HeroScrollGate({ childrenTop, childrenBottom }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPhase(2);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || phase === 2) return;

    let touchStartY = 0;

    const advance = () => setPhase((p) => (p === 0 ? 1 : 2));

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.preventDefault();
        advance();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const keys = ["ArrowDown", "PageDown", "Space"];
      if (keys.includes(e.code)) {
        e.preventDefault();
        advance();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = (e.touches[0]?.clientY ?? 0) - touchStartY;
      if (dy < -12) {
        e.preventDefault();
        advance();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.style.overflow = prev;
    };
  }, [active, phase]);

  useEffect(() => {
    if (phase !== 2) return;
    const t = setTimeout(() => {
      document.documentElement.style.overflow = "";
    }, 50);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section ref={wrapRef} className="relative h-[100svh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden={phase < 1}
          className={`transition-all duration-700 will-change-transform ${
            phase >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {childrenTop}
        </div>

        <div
          aria-hidden={phase < 2}
          className={`mt-6 transition-all duration-700 will-change-transform ${
            phase >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {childrenBottom}
        </div>
      </div>
    </section>
  );
}
