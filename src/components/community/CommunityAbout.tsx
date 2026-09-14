"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/reveal";
import type { Community } from "@/types/community";

export function CommunityAbout({ community }: { community: Community }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} id="about" className="bg-bone text-ink py-[var(--spacing-section)] relative z-10">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          <div className="lg:col-span-7">
            <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40 mb-8">
              <span aria-hidden="true" className="block h-px w-10 bg-ink/20 sm:w-14" />
              About the Community
            </p>
            <h2 data-reveal="item" className="display-serif text-h3 leading-[1.02] max-w-[20ch]">
              {community.shortDescription}
            </h2>
            <p data-reveal="item" className="mt-8 text-body text-ink/70 max-w-[50ch] leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <h3 data-reveal="item" className="label-caps text-ink/40 mb-8 border-b border-ink/10 pb-4">
              Why Live Here
            </h3>
            <ul className="space-y-6">
              {community.highlights.map((highlight, index) => (
                <li key={highlight} data-reveal="item" className="flex items-start gap-4">
                  <span className="text-champagne font-serif text-xl">0{index + 1}</span>
                  <span className="text-body font-medium pt-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
