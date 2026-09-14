"use client";

import { useRef } from "react";

import { getInvestmentNotes } from "@/data/properties";
import { formatCompletion } from "@/lib/filters";
import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * PAYMENT PLAN and WHY THIS PROPERTY, in one dark block.
 *
 * The payment plan renders only when the record actually has one — a ready
 * property is bought outright, and inventing a three-stage plan for it would be
 * a material misstatement, not a layout convenience.
 *
 * The considerations are deliberately descriptive. No yields, no "guaranteed
 * ROI", no "best investment in Dubai" — a brokerage that publishes a return it
 * cannot evidence has a regulatory problem, not a marketing advantage. The
 * heading is "Why this property", and every note reads as something to weigh.
 */
export function PaymentAndValue({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  const notes = getInvestmentNotes(property);
  const plan = property.paymentPlan;
  const handover = formatCompletion(property.completionDate);

  return (
    <section
      ref={ref}
      data-surface="dark"
      aria-labelledby="value-heading"
      className="relative z-10 bg-ink text-bone"
    >
      <div className="shell py-[var(--spacing-section)]">
        {plan && plan.length > 0 ? (
          <div className="border-b border-bone/12 pb-14 sm:pb-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div>
                <p data-reveal="item" className="label-caps flex items-center gap-4 text-bone/40">
                  <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
                  Payment plan
                </p>
                <h2
                  data-reveal="item"
                  className="display-serif mt-7 text-h2 leading-[1.02]"
                >
                  Structured over the build
                </h2>
              </div>
              {handover ? (
                <p data-reveal="item" className="text-body font-light text-bone/55 lg:pb-2">
                  Handover scheduled for{" "}
                  <span className="text-bone">{handover}</span>
                </p>
              ) : null}
            </div>

            <ol data-reveal="item" className="mt-12 grid grid-cols-1 gap-px border border-bone/12 bg-bone/12 sm:mt-14 sm:grid-cols-3">
              {plan.map((stage, index) => (
                <li key={stage.label} className="bg-ink p-8 lg:p-10">
                  <p className="label-caps text-[0.5rem] tracking-[0.26em] text-bone/35">
                    Stage {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="display-serif mt-6 text-h2 leading-none text-bone">
                    {stage.percentage}%
                  </p>
                  <p className="label-caps mt-6 text-[0.55rem] tracking-[0.24em] text-bone/70">
                    {stage.label}
                  </p>
                  {stage.note ? (
                    <p className="mt-3 text-body-sm text-bone/45">{stage.note}</p>
                  ) : null}
                </li>
              ))}
            </ol>

            <p data-reveal="item" className="mt-7 max-w-[54ch] text-micro leading-relaxed text-bone/35">
              Sample payment structure shown for this demonstration listing. Actual
              terms are set by the developer and confirmed in the sales agreement.
            </p>
          </div>
        ) : null}

        {/* ---- Why this property ---------------------------------------- */}
        <div className={plan && plan.length > 0 ? "pt-14 sm:pt-20" : ""}>
          <p data-reveal="item" className="label-caps flex items-center gap-4 text-bone/40">
            <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
            Considerations
          </p>
          <h2
            id="value-heading"
            data-reveal="item"
            className="display-serif mt-7 max-w-[16ch] text-h2 leading-[1.02]"
          >
            Why this property
          </h2>

          <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:gap-x-16">
            {notes.map((note, index) => (
              <li key={note.heading} data-reveal="item" className="border-t border-bone/12 pt-7">
                <p className="label-caps text-[0.5rem] tracking-[0.26em] text-bone/30">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="display-serif mt-5 text-h3 leading-[1.05] text-bone">
                  {note.heading}
                </h3>
                <p className="mt-4 max-w-[46ch] text-body-sm leading-[1.8] text-bone/60">
                  {note.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
