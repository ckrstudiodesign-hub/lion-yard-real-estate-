"use client";

import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowDown } from "@/components/ui/Button";
import type { Community } from "@/types/community";

export function CommunityHero({ community }: { community: Community }) {
  const scrollToContent = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden bg-charcoal pb-12 sm:pb-24 lg:min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-reveal-scale bg-charcoal motion-reduce:animate-none">
          <PropertyImage
            image={community.heroImage}
            fallbackLabel={community.name}
            sizes="100vw"
            priority
            className="opacity-70 transition-opacity duration-1000"
          />
        </div>
        {/* Gradient wash to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      </div>

      <div className="shell relative z-10 text-bone">
        <div className="flex flex-col items-start lg:max-w-4xl">
          <p
            className="label-caps mb-6 text-bone/70 animate-reveal-up opacity-0"
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
          >
            {community.location}
          </p>

          <h1
            className="display-serif text-h1 leading-[1.02] animate-reveal-up opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            {community.name}
          </h1>

          <p
            className="mt-6 max-w-[44ch] text-lead font-light text-bone/80 animate-reveal-up opacity-0"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            {community.shortDescription}
          </p>

          <button
            type="button"
            onClick={scrollToContent}
            className="group/btn mt-12 flex items-center gap-4 label-caps text-bone/60 transition-colors hover:text-bone animate-reveal-up opacity-0"
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            Explore Community
            <ArrowDown className="transition-transform duration-500 group-hover/btn:translate-y-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
