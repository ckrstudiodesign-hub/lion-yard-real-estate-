"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { usePointerFine, useReducedMotion } from "@/lib/hooks";

/**
 * Custom cursor — desktop only.
 *
 * A dot that tracks the pointer exactly, and a ring that lags behind it. The
 * ring is the expressive element: it grows over anything interactive, and grows
 * further over the hero to offer EXPLORE.
 *
 * Deliberate constraints, so it stays a detail rather than a gimmick:
 *   · only for a pointer that is both fine and hover-capable, so it never
 *     appears on phones, tablets, or a hybrid device being driven by touch
 *   · never under `prefers-reduced-motion`
 *   · the native cursor is only hidden once this component is actually live,
 *     so a visitor can never end up with no cursor at all
 *   · position is written with gsap.quickTo — one interpolated transform per
 *     frame, no React state in the move path
 *
 * Opt in to a labelled state with `data-cursor`:
 *   data-cursor="explore"  the hero
 *   data-cursor="view"     a property card
 */

type CursorMode = "default" | "hover" | "explore" | "view";

/** Labelled states show their word inside the expanded ring. */
const LABELS: Record<CursorMode, string | null> = {
  default: null,
  hover: null,
  explore: "Explore",
  view: "View",
};

function isCursorMode(value: string | undefined): value is "explore" | "view" {
  return value === "explore" || value === "view";
}
export function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      setVisible(true);

      // One `closest` call across both selector groups, so the NEAREST match
      // wins. That is what lets a button inside the hero read as "hover" while
      // the hero itself reads as "explore" — and a property card, which carries
      // its own data-cursor, override the generic interactive state.
      const target = event.target as Element | null;
      const zone = target?.closest?.(
        '[data-cursor], a[href], button:not([disabled]), [role="button"], input, textarea, select',
      ) as HTMLElement | null;

      if (!zone) {
        setMode("default");
        return;
      }

      const declared = zone.dataset["cursor"];
      setMode(isCursorMode(declared) ? declared : "hover");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = LABELS[mode];
  const ringSize =
    label !== null ? "h-[86px] w-[86px]" : mode === "hover" ? "h-12 w-12" : "h-8 w-8";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[140] hidden lg:block mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 220ms linear" }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={[
            "flex items-center justify-center rounded-full border",
            "transition-[width,height,background-color,border-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            // The EXPLORE state needs enough weight to hold its own over the
            // headline; the resting ring stays almost invisible.
            label !== null
              ? "border-bone/80 bg-ink/55 backdrop-blur-[2px]"
              : "border-bone/55 bg-transparent",
            ringSize,
          ].join(" ")}
        >
          <span
            className={[
              "label-caps text-[0.5rem] tracking-[0.28em] text-bone transition-opacity duration-[300ms]",
              label !== null ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {label ?? ""}
          </span>
        </div>
      </div>

      <div
        ref={dotRef}
        className={[
          "absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone will-change-transform",
          "transition-opacity duration-[300ms]",
          mode === "default" ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </div>
  );
}
