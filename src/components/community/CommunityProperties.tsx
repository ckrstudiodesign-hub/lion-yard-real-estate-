"use client";

import { useRef } from "react";
import { getAllProperties } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useSectionReveal } from "@/lib/reveal";
import type { Community } from "@/types/community";

export function CommunityProperties({ community }: { community: Community }) {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  const properties = getAllProperties().filter(
    (p) => p.community.toLowerCase() === community.name.toLowerCase() || p.location.toLowerCase() === community.name.toLowerCase()
  );

  return (
    <section
      ref={sectionRef}
      id="properties"
      data-surface="light"
      className="relative z-10 bg-bone text-ink py-[var(--spacing-section)]"
    >
      <div className="shell">
        <header className="border-t border-ink/12 pt-12 sm:pt-16 mb-16 sm:mb-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div>
              <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40">
                <span aria-hidden="true" className="block h-px w-10 bg-ink/20 sm:w-14" />
                Properties
              </p>
              <h2
                data-reveal="item"
                className="display-serif mt-7 text-h2 leading-[1.02]"
              >
                Available in {community.name}
              </h2>
            </div>
            
            {properties.length > 0 && (
              <TransitionLink
                data-reveal="item"
                href={`/properties?location=${community.slug}`}
                className="group/btn label-caps flex items-center gap-3 self-start border-b border-ink/25 pb-2 text-ink/65 transition-colors duration-[400ms] hover:border-ink hover:text-ink lg:self-auto"
              >
                View all properties
                <ArrowRight />
              </TransitionLink>
            )}
          </div>
        </header>

        {properties.length === 0 ? (
          <div data-reveal="item" className="flex flex-col items-start py-12">
            <h3 className="display-serif text-h3 mb-4">Properties coming soon</h3>
            <p className="text-body text-ink/60 max-w-[50ch] mb-8">
              Our current selection does not include properties in this community. Check back soon or explore our full portfolio.
            </p>
            <TransitionLink
              href="/properties"
              className="group/btn label-caps flex items-center gap-3 text-ink/60 transition-colors hover:text-ink border border-ink/10 px-6 py-4 hover:border-ink/30"
            >
              Explore all properties
              <ArrowRight />
            </TransitionLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} data-reveal="item">
                <PropertyCard
                  property={property}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
