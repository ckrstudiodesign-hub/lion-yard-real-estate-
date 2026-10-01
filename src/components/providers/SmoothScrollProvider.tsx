"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so that scroll-linked
 * animations and the scroll position are updated in the same frame (this is
 * what prevents the classic one-frame jitter between Lenis and ScrollTrigger).
 *
 * Disabled entirely for visitors who prefer reduced motion — they get the
 * browser's native scrolling, which is the correct behaviour, not a fallback.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.8,
      // Matches --ease-lux closely enough to feel like one system.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Imperative helpers for components that need to pause or move the page. */
export const scroll = {
  stop() {
    window.__lenis?.stop();
  },
  start() {
    window.__lenis?.start();
  },
  to(target: string | number | HTMLElement, offset = 0) {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 });
      return;
    }
    // Reduced-motion / no-Lenis path.
    if (typeof target === "number") {
      window.scrollTo({ top: target + offset });
      return;
    }
    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    element?.scrollIntoView({ block: "start" });
  },
};
