"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export function ProcessSteps({
  title,
  steps,
  className,
}: {
  title: string;
  steps: ProcessStep[];
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 80%" });

  return (
    <section ref={ref} className={cn("shell py-[var(--spacing-section)]", className)}>
      <h2 data-reveal="item" className="display-serif text-h2 mb-16 lg:mb-24">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-12">
        {steps.map((step, index) => (
          <div key={index} data-reveal="item" className="flex flex-col border-t border-ink/10 pt-8">
            <span className="label-caps text-ink/30 mb-8 block">
              {step.step}
            </span>
            <h3 className="display-serif text-h4 mb-4">
              {step.title}
            </h3>
            <p className="text-body text-ink/60 max-w-[32ch]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
