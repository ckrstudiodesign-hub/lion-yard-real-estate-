"use client";

import { useRef } from "react";
import { getFeaturedCommunities } from "@/data/communities";
import { CommunityCard } from "@/components/community/CommunityCard";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useSectionReveal } from "@/lib/reveal";

export function ExploreDubai({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  const featured = getFeaturedCommunities();
  if (featured.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id={id}
      data-surface="light"
      aria-labelledby={`${id}-heading`}
      className="relative z-10 bg-bone text-ink py-[var(--spacing-section)]"
    >
      <div className="shell">
        <header className="border-t border-ink/12 pt-12 sm:pt-16 mb-16 sm:mb-24">
          <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40 mb-6">
            <span aria-hidden="true" className="block h-px w-10 bg-ink/20 sm:w-14" />
            Communities
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <h2
              id={`${id}-heading`}
              data-reveal="item"
              className="display-serif text-h2 leading-[1.02]"
            >
              Explore Dubai
            </h2>

            <div className="flex flex-col gap-6 lg:max-w-[34ch] lg:items-start lg:pb-2">
              <p data-reveal="item" className="text-body font-light text-ink/55 lg:text-lead">
                Discover the communities shaping the way Dubai lives, works and grows.
              </p>
              <TransitionLink
                data-reveal="item"
                href="/communities"
                className="group/btn label-caps flex items-center gap-3 text-ink/50 transition-colors duration-[400ms] hover:text-ink"
              >
                Explore All Communities
                <ArrowRight />
              </TransitionLink>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((community, index) => (
            <div key={community.id} data-reveal="item" className="w-full">
              <CommunityCard
                community={community}
                priority={index < 4}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
