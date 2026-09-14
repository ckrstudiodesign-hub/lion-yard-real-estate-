"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * "8 PROPERTIES FOUND" — the count set in the display serif, the label in
 * micro-caps, so it reads as part of the editorial furniture rather than as a
 * form's status text.
 *
 * The number counts to its new value rather than snapping, which makes a filter
 * change feel like a response. The tween writes to textContent directly — the
 * intermediate values never touch React state, so a fast sequence of filter
 * changes costs one animation, not thirty renders.
 *
 * The live region announces the settled count, not every intermediate frame.
 */
export function ResultsCount({ count }: { count: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(count);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    const from = previous.current;
    previous.current = count;

    if (from === count || prefersReducedMotion()) {
      node.textContent = String(count);
      return;
    }

    const proxy = { value: from };
    const tween = gsap.to(proxy, {
      value: count,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        node.textContent = String(Math.round(proxy.value));
      },
    });

    return () => {
      tween.kill();
      node.textContent = String(count);
    };
  }, [count]);

  return (
    <p className="flex items-baseline gap-3">
      <span
        ref={numberRef}
        data-results-count
        className="display-serif text-[1.4rem] leading-none tabular-nums text-ink"
      >
        {count}
      </span>
      <span className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/40">
        {count === 1 ? "Property found" : "Properties found"}
      </span>
      <span className="sr-only" aria-live="polite">
        {count} {count === 1 ? "property" : "properties"} match your search
      </span>
    </p>
  );
}
