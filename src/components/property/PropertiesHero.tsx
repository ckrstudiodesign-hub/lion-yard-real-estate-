"use client";

import { useRef } from "react";

import { PropertyImage } from "@/components/property/PropertyImage";
import { scroll } from "@/components/providers/SmoothScrollProvider";
import { heroMedia } from "@/data/media";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * /properties masthead.
 *
 * Deliberately shorter than the homepage hero — around two-thirds of the
 * viewport. A full-screen hero in front of a results page makes the visitor
 * scroll past a picture to reach the thing they came for; this establishes the
 * page and then gets out of the way, with the first row of results visible as
 * soon as it clears.
 *
 * It reuses the homepage's clip-path reveal and grade so the two pages read as
 * one publication.
 */
export function PropertiesHero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-ph="frame"]', { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set('[data-ph="line"] > *, [data-ph="sub"]', { yPercent: 0, y: 0, opacity: 1 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: GSAP_EASE.lux } })
        .fromTo(
          '[data-ph="frame"]',
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 },
          0,
        )
        .fromTo(
          '[data-ph="media"]',
          { scale: 1.12 },
          { scale: 1.04, duration: 1.9, ease: "power2.out" },
          0,
        )
        .fromTo(
          '[data-ph="eyebrow"]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.2,
        )
        .fromTo(
          '[data-ph="line"] > *',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 1.1 },
          0.35,
        )
        .fromTo(
          '[data-ph="sub"]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.7,
        );

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to('[data-ph="media"]', { scale: 1.12, yPercent: 6, ease: "none" }, 0)
          .to('[data-ph="copy"]', { yPercent: -14, opacity: 0.25, ease: "none" }, 0),
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-surface="dark"
      data-cursor="explore"
      aria-labelledby="properties-hero-heading"
      className="relative isolate flex h-[68svh] min-h-[26rem] w-full flex-col justify-end overflow-hidden bg-ink lg:h-[74svh] lg:min-h-[34rem]"
    >
      <div
        data-ph="frame"
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      >
        <div data-ph="media" className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.04)" }}>
          <PropertyImage
            image={heroMedia}
            fallbackLabel="Lion Yard Real Estate — Dubai"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(17,17,17,0.92)_0px,rgba(17,17,17,0.72)_180px,rgba(17,17,17,0.28)_340px,rgba(17,17,17,0.58)_100%)]"
      />

      <div
        data-ph="copy"
        className="shell relative pb-14 pt-32 sm:pb-20 lg:pb-24"
      >
        <p
          data-ph="eyebrow"
          className="label-caps mb-7 flex items-center gap-4 text-bone/70"
        >
          <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
          The collection
        </p>

        <h1
          data-ph="line"
          id="properties-hero-heading"
          className="display-serif text-display leading-[0.96] text-bone lg:leading-[0.9]"
        >
          <span className="reveal-line">
            <span className="block">Properties</span>
          </span>
        </h1>

        <p
          data-ph="sub"
          className="mt-8 max-w-[44ch] text-lead font-light text-bone/80 sm:mt-10"
        >
          Explore exceptional homes and investment opportunities across Dubai.
        </p>

        <button
          type="button"
          data-ph="sub"
          onClick={() => scroll.to("#results", -80)}
          className="group/btn label-caps mt-9 flex items-center gap-3 border-b border-bone/30 pb-2 text-bone/75 transition-colors duration-[400ms] hover:border-bone hover:text-bone"
        >
          Browse the collection
          <svg viewBox="0 0 10 20" aria-hidden="true" className="h-4 w-2 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-y-1">
            <path d="M5 0v18M1 14l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
      </div>
    </section>
  );
}
