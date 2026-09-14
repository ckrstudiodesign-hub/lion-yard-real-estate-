"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * useLayoutEffect warns during SSR. This picks the right one per environment.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subscribes to a media query. Returns `false` on the server and on the first
 * client paint, then settles — so never use it to gate content, only behaviour.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the visitor has asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True once the page has scrolled past `threshold` pixels.
 * Reads from the scroll event rather than Lenis so it also works without JS
 * smoothing (reduced-motion visitors, older browsers).
 */
export function useScrolledPast(threshold: number): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setPassed(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return passed;
}

/** Locks body scroll (used by the full-screen mobile menu). */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

export type Surface = "dark" | "light";

/**
 * Reports whether the section currently sitting under the header is dark or
 * light, so the header can invert instead of assuming a dark page forever.
 *
 * Sections opt in with `data-surface="dark" | "light"`. Positions are measured
 * once per layout change and compared against the scroll offset as plain
 * numbers, so the scroll handler never forces a layout — important, because this
 * runs alongside Lenis and the hero's scrubbed timeline.
 */
export function useSurfaceTheme(baseline: number, remeasureKey?: string): Surface {
  const [surface, setSurface] = useState<Surface>("dark");

  useEffect(() => {
    let bands: Array<{ top: number; bottom: number; surface: Surface }> = [];
    let frame = 0;

    const measure = () => {
      bands = Array.from(
        document.querySelectorAll<HTMLElement>("[data-surface]"),
      ).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return {
          top,
          bottom: top + el.offsetHeight,
          surface: el.dataset["surface"] === "light" ? "light" : "dark",
        };
      });
      read();
    };

    const read = () => {
      frame = 0;
      const line = window.scrollY + baseline;
      const band = bands.find((b) => line >= b.top && line < b.bottom);
      setSurface(band ? band.surface : "dark");
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    measure();

    // Fonts and images change section heights after first paint.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [baseline, remeasureKey]);

  return surface;
}

/**
 * True only for a precise pointer that can hover — a mouse or trackpad.
 * Used to gate the custom cursor off phones, tablets and hybrid devices being
 * driven by touch.
 */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
