"use client";

import { useRef } from "react";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";

export function EditorialCTA({
  headline,
  primaryCta,
  secondaryCta,
  className,
}: {
  headline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 85%" });

  return (
    <section ref={ref} className={cn("shell py-[var(--spacing-section)]", className)}>
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between border-t border-ink/10 pt-16 md:pt-24">
        <h2 data-reveal="item" className="display-serif text-h1 max-w-[14ch] leading-[0.98]">
          {headline}
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span data-reveal="item">
            <ButtonLink href={primaryCta.href} variant="solid" className="w-full sm:w-auto">
              {primaryCta.label}
              <ArrowRight />
            </ButtonLink>
          </span>
          {secondaryCta && (
            <span data-reveal="item">
              <ButtonLink href={secondaryCta.href} variant="outline" className="w-full sm:w-auto">
                {secondaryCta.label}
              </ButtonLink>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
