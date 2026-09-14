"use client";

import { useRef } from "react";

import { Breadcrumbs } from "@/components/property/detail/Breadcrumbs";
import { PropertyImage } from "@/components/property/PropertyImage";
import { scroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { formatPrice } from "@/lib/filters";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/types/property";

/**
 * Property hero.
 *
 * A true shared-element transition from the card image was considered and
 * rejected: the card and the hero live in different routes with different
 * aspect ratios, and a FLIP that misses — which it does whenever the grid has
 * scrolled or the image has not decoded — looks far worse than no transition at
 * all. Instead the hero uses the same clip-path reveal language as every other
 * image on the site, arriving behind the page-transition cover so the change of
 * route still reads as cinematic rather than as a reload.
 *
 * 88svh rather than a full screen: enough to be a statement, short enough that
 * the specification bar is visible at the bottom edge and the page announces
 * that it continues.
 */
export function PropertyHero({ property }: { property: Property }) {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-dh="frame"]', { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set('[data-dh="line"] > *, [data-dh="item"]', {
          yPercent: 0,
          y: 0,
          opacity: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: GSAP_EASE.lux } })
        .fromTo(
          '[data-dh="frame"]',
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35 },
          0,
        )
        .fromTo(
          '[data-dh="media"]',
          { scale: 1.12 },
          { scale: 1.04, duration: 2, ease: "power2.out" },
          0,
        )
        .fromTo(
          '[data-dh="crumbs"]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.25,
        )
        .fromTo(
          '[data-dh="line"] > *',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 1.1 },
          0.4,
        )
        .fromTo(
          '[data-dh="item"]',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 },
          0.7,
        );

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to('[data-dh="media"]', { scale: 1.12, yPercent: 6, ease: "none" }, 0)
          .to('[data-dh="copy"]', { yPercent: -12, opacity: 0.25, ease: "none" }, 0),
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, [property.slug]);

  return (
    <section
      ref={rootRef}
      data-surface="dark"
      data-cursor="explore"
      aria-labelledby="property-heading"
      className="relative isolate flex h-[88svh] min-h-[32rem] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      <div
        data-dh="frame"
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      >
        <div
          data-dh="media"
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(1.04)" }}
        >
          <PropertyImage
            image={property.image}
            fallbackLabel={`${property.title} — ${property.location}`}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(17,17,17,0.94)_0px,rgba(17,17,17,0.78)_220px,rgba(17,17,17,0.30)_420px,rgba(17,17,17,0.14)_620px,rgba(17,17,17,0.58)_100%)]"
      />

      {/* Back link, clear of the header. */}
      <div className="shell absolute inset-x-0 top-[calc(var(--header-h,88px)+1.5rem)] z-10">
        <TransitionLink
          href="/properties"
          className="group/btn label-caps inline-flex items-center gap-3 text-[0.55rem] tracking-[0.24em] text-bone/80 transition-colors duration-[300ms] hover:text-bone"
        >
          <svg viewBox="0 0 20 10" aria-hidden="true" className="h-2 w-4 rotate-180 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-x-1">
            <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          All Properties
        </TransitionLink>
      </div>

      <div data-dh="copy" className="shell relative pb-12 pt-32 sm:pb-16 lg:pb-20">
        <div data-dh="crumbs" className="mb-8 text-bone">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: property.community, href: `/properties?location=${property.community.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
              { label: property.shortTitle },
            ]}
          />
        </div>

        <p data-dh="item" className="label-caps mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.55rem] tracking-[0.28em] text-bone/70">
          <span className="bg-bone px-3 py-1.5 text-ink">{property.listingType}</span>
          <span>{property.status}</span>
          {property.newListing ? <span className="text-champagne">New listing</span> : null}
        </p>

        <h1
          data-dh="line"
          id="property-heading"
          className="display-serif max-w-[16ch] text-h1 leading-[0.98] text-bone"
        >
          <span className="reveal-line">
            <span className="block">{property.title}</span>
          </span>
        </h1>

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div data-dh="item">
            <p className="label-caps text-[0.6rem] tracking-[0.28em] text-bone/60">
              {property.location}
            </p>
            <p className="display-serif mt-4 text-h2 leading-none text-bone">
              {formatPrice(property)}
            </p>
          </div>

          <div data-dh="item" className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="#enquire" variant="solid" className="w-full sm:w-auto">
              Enquire Now
              <ArrowRight />
            </ButtonLink>
            <button
              type="button"
              onClick={() => scroll.to("#gallery", -80)}
              className="group/btn label-caps relative inline-flex h-12 w-full items-center justify-center overflow-hidden border border-bone/35 px-7 text-bone transition-colors duration-[400ms] hover:border-bone hover:text-ink sm:h-[3.25rem] sm:w-auto sm:px-9"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100"
              />
              <span className="relative z-10">View Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
