"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * The shared section-entry animation.
 *
 * One hook rather than a timeline per section, so every section on the site
 * enters with the same rhythm and the same easing. Sections opt in by marking
 * their children:
 *
 *   data-reveal="item"   fade and rise 40px, staggered in DOM order
 *   data-reveal="media"  clip-path wipe upward, the same language as the hero
 *
 * Under `prefers-reduced-motion` nothing animates and everything is simply
 * shown — the pre-states live in CSS, so this hook only has to clear them.
 */
export function useSectionReveal(
  ref: RefObject<HTMLElement | null>,
  {
    stagger = 0.11,
    start = "top 78%",
  }: { stagger?: number; start?: string } = {},
) {
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal="item"]');
      const media = gsap.utils.toArray<HTMLElement>('[data-reveal="media"]');

      // `data-revealed` switches off the CSS pre-state, so the inline
      // transform can be cleared without the element snapping back down.
      const settle = (elements: HTMLElement[]) => {
        elements.forEach((element) => element.setAttribute("data-revealed", ""));
        gsap.set(elements, { clearProps: "transform,willChange" });
      };

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        gsap.set(media, { clipPath: "inset(0% 0% 0% 0%)" });
        settle(items);
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: GSAP_EASE.lux },
        scrollTrigger: { trigger: root, start, once: true },
        onComplete: () => settle(items),
      });

      if (media.length) {
        timeline.fromTo(
          media,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, stagger: stagger * 0.8 },
          0,
        );
      }

      if (items.length) {
        timeline.fromTo(
          items,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, stagger },
          media.length ? 0.15 : 0,
        );
      }

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, [ref, stagger, start]);
}
