"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionReveal } from "@/lib/reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/cn";
import type { Media } from "@/data/media";

export type FeatureBlock = {
  id: string;
  title: string;
  description?: string;
  image?: Media;
  href?: string;
};

export function FeatureBlocks({
  title,
  blocks,
  columns = 2,
  className,
}: {
  title: string;
  blocks: FeatureBlock[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 80%" });

  return (
    <section ref={ref} className={cn("shell py-[var(--spacing-section)]", className)}>
      <h2 data-reveal="item" className="display-serif text-h2 mb-16 lg:mb-24">
        {title}
      </h2>

      <div
        className={cn(
          "grid grid-cols-1 gap-y-16 sm:gap-x-8 lg:gap-x-12",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {blocks.map((block) => {
          const content = (
            <div className="flex h-full flex-col">
              {block.image && (
                <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden bg-charcoal">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    fill
                    sizes={`(min-width: 1024px) ${100 / columns}vw, (min-width: 768px) 50vw, 100vw`}
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className={cn("display-serif mb-4", block.image ? "text-h3" : "text-h2")}>
                {block.title}
              </h3>
              {block.description && (
                <p className="text-body text-ink/60">
                  {block.description}
                </p>
              )}
            </div>
          );

          return (
            <div key={block.id} data-reveal="item">
              {block.href ? (
                <TransitionLink
                  href={block.href}
                  className="group block h-full focus-visible:outline-offset-8"
                  data-cursor="explore"
                >
                  {content}
                </TransitionLink>
              ) : (
                <div className="h-full">{content}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
