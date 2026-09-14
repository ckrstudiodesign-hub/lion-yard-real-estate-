"use client";

import { useEffect, useRef, useState } from "react";

import { PropertyCard } from "@/components/property/PropertyCard";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/types/property";

/**
 * The results grid.
 *
 * FILTER CHANGES CROSS-FADE RATHER THAN SNAP. The grid keeps its own copy of
 * what is on screen; when the results change it animates the current cards out,
 * swaps the list, then animates the new ones in with a stagger. Replacing the
 * children directly makes a filter change read as a page flash, which is the
 * fastest way to make a considered site feel cheap.
 *
 * The container's height is pinned for the duration of the swap, so the page
 * cannot jump under the visitor's cursor while the out-animation is still
 * playing.
 *
 * THREE COLUMNS, NOT FOUR. Four columns at 1440 gives roughly 300px of image
 * per card — too small for photography to carry a card. Three keeps the image
 * dominant, which is the whole premise of the card.
 */
export function PropertyGrid({ properties }: { properties: Property[] }) {
  const [displayed, setDisplayed] = useState(properties);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const swapping = useRef(false);

  // Animate out, swap, then let the layout effect below animate in.
  useEffect(() => {
    if (properties === displayed) return;
    const container = containerRef.current;

    if (!container || prefersReducedMotion()) {
      setDisplayed(properties);
      return;
    }

    const cards = container.querySelectorAll('[data-grid-item]');
    if (cards.length === 0) {
      setDisplayed(properties);
      return;
    }

    swapping.current = true;
    // Hold the height so the page does not collapse mid-transition.
    container.style.minHeight = `${container.offsetHeight}px`;

    const tween = gsap.to(cards, {
      opacity: 0,
      y: 14,
      duration: 0.26,
      ease: GSAP_EASE.luxIn,
      stagger: 0.015,
      onComplete: () => setDisplayed(properties),
    });

    return () => {
      tween.kill();
    };
  }, [properties, displayed]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion()) {
      gsap.set(container.querySelectorAll("[data-grid-item]"), { opacity: 1, y: 0 });
      container.style.minHeight = "";
      return;
    }

    const cards = container.querySelectorAll("[data-grid-item]");
    if (cards.length === 0) {
      container.style.minHeight = "";
      return;
    }

    // First paint is handled by the section reveal; only swaps animate here.
    if (firstRender.current) {
      firstRender.current = false;
      if (!swapping.current) return;
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: GSAP_EASE.lux,
        stagger: 0.06,
        onComplete: () => {
          swapping.current = false;
          container.style.minHeight = "";
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [displayed]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20"
    >
      {displayed.map((property, index) => (
        <div key={property.id} data-grid-item data-reveal="item">
          <PropertyCard
            property={property}
            priority={index < 3}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
