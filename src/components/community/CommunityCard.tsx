"use client";

import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/cn";
import type { Community } from "@/types/community";

export function CommunityCard({
  community,
  sizes,
  priority = false,
  className,
  imageClassName,
  large = false,
}: {
  community: Community;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  large?: boolean;
}) {
  return (
    <article className={cn("group/card w-full", className)}>
      <TransitionLink
        href={`/communities/${community.slug}`}
        data-cursor="explore"
        className="block focus-visible:outline-offset-8"
        aria-label={`${community.name}, ${community.location}. Explore community.`}
      >
        <div
          data-card-media
          className={cn(
            "relative w-full overflow-hidden bg-charcoal",
            large ? "aspect-[16/9] lg:aspect-[4/5]" : "aspect-[4/5]",
            imageClassName,
          )}
        >
          <div
            data-card-zoom
            className={cn(
              "absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/card:scale-[1.05] group-focus-within/card:scale-[1.05]",
              "motion-reduce:transform-none motion-reduce:transition-none",
            )}
          >
            <PropertyImage
              image={community.heroImage}
              fallbackLabel={`${community.name} — ${community.location}`}
              sizes={sizes}
              priority={priority}
            />
          </div>
        </div>

        <div data-card-body className="pt-6 flex flex-col items-start text-left">
          <h3 className="display-serif text-h3 leading-[1.02] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
            {community.name}
          </h3>

          <p className="mt-2 text-body text-current/60">
            {community.location}
          </p>

          <div className="mt-6">
            <span className="group/btn label-caps flex items-center gap-3 text-current/40 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-current">
              Explore
              <ArrowRight className="transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-2" />
            </span>
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
