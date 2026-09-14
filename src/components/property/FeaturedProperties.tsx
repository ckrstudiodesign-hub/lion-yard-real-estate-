"use client";

import { useRef } from "react";

import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowRight, Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * FEATURED PROPERTIES / search results.
 *
 * One section, two states. With no filters applied it is the curated selection;
 * the moment the visitor narrows anything it becomes the result set, heading
 * included. That is the whole point of §26 — the search has to move the page it
 * sits on, not populate a second list somewhere else.
 *
 * LAYOUT — deliberately not a uniform grid. Cards run in pairs across twelve
 * columns, alternating 7/5 and 5/7, and the narrower card in each pair drops by
 * a fifth of a viewport. The result reads as a spread rather than a listing
 * page, and it composes correctly for any number of cards because the pattern
 * is derived from the index rather than hard-coded.
 */


export function FeaturedProperties({ id }: { id: string }) {
  const { results, narrowed, reset, all } = usePropertyFilters();
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  const curated: Property[] = all.filter((property) => property.featured).slice(0, 4);
  const shown = narrowed ? results : curated;
  const empty = shown.length === 0;

  return (
    <section
      ref={sectionRef}
      id={id}
      data-surface="light"
      aria-labelledby={`${id}-heading`}
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell pb-[var(--spacing-section)]">
        {/* Heading on the left, supporting line and the index link on the
            right — the same two-column masthead the showcase uses, so the two
            sections read as one publication. Stacking everything at the left
            left the right half of a wide screen empty. */}
        <header className="border-t border-ink/12 pt-12 sm:pt-16">
          <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40 mb-6">
            <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
            Featured
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <h2
              id={`${id}-heading`}
              data-reveal="item"
              className="display-serif text-h2 leading-[1.02]"
            >
              {narrowed ? "Matching Properties" : "Featured Properties"}
            </h2>

            <div className="flex flex-col gap-6 lg:max-w-[34ch] lg:items-start lg:pb-2">
              <p data-reveal="item" className="text-body font-light text-ink/55 lg:text-lead">
                {narrowed
                  ? "Properties matching your search across Dubai."
                  : "Exceptional homes selected for exceptional lifestyles."}
              </p>
              <TransitionLink
                data-reveal="item"
                href="/properties"
                className="group/btn label-caps flex items-center gap-3 text-ink/50 transition-colors duration-[400ms] hover:text-ink"
              >
                View All Properties
                <ArrowRight />
              </TransitionLink>
            </div>
          </div>
        </header>

        {empty ? (
          <div
            data-reveal="item"
            className="flex min-h-[36vh] flex-col items-start justify-center border-b border-ink/12 py-16"
          >
            <p className="display-serif text-h3 text-ink">
              No properties match your search.
            </p>
            <p className="mt-4 max-w-[46ch] text-body text-ink/55">
              {/* Honest about the demo dataset rather than implying the site is broken. */}
              The demo dataset contains sale listings only, so a rental search
              returns nothing. Adjust your filters, or reset and start again.
            </p>
            <Button
              type="button"
              onClick={reset}
              variant="outlineInk"
              className="mt-9"
            >
              Reset Filters
              <ArrowRight />
            </Button>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {shown.map((property, index) => (
              <div
                key={property.id}
                data-reveal="item"
                // Optional: we can add custom stagger delay class if we want, but reveal system typically handles it
                className="w-full"
              >
                <PropertyCard
                  property={property}
                  priority={index < 4}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
