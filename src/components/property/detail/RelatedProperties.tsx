"use client";

import { useRef } from "react";

import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * YOU MAY ALSO LIKE.
 *
 * The selection is ranked in `getRelatedProperties` — same community first,
 * then same type, then nearest by price. A rail of randomly chosen stock is
 * worse than no rail: it tells the visitor the site has no idea what they are
 * looking at.
 */
export function RelatedProperties({ properties }: { properties: Property[] }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  if (properties.length === 0) return null;

  return (
    <section
      ref={ref}
      data-surface="light"
      aria-labelledby="related-heading"
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell pb-[var(--spacing-section)]">
        <header className="flex flex-col gap-6 border-t border-ink/12 pt-14 sm:pt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2
            id="related-heading"
            data-reveal="item"
            className="display-serif text-h2 leading-[1.02]"
          >
            You may also like
          </h2>

          <TransitionLink
            data-reveal="item"
            href="/properties"
            className="group/btn label-caps flex items-center gap-3 self-start text-ink/50 transition-colors duration-[400ms] hover:text-ink lg:self-auto lg:pb-2"
          >
            View All Properties
            <ArrowRight />
          </TransitionLink>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {properties.map((property) => (
            <div key={property.id} data-reveal="item">
              <PropertyCard
                property={property}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
