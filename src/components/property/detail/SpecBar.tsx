"use client";

import { useRef } from "react";

import { formatArea, formatCompletion, formatPrice } from "@/lib/filters";
import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * The specification bar, directly under the hero.
 *
 * The six facts a buyer checks first, set as an editorial run of figures rather
 * than as an icon grid. Optional fields are dropped entirely rather than shown
 * as "—", so the bar never advertises what the record does not contain.
 *
 * On narrow screens it becomes a horizontal rail with the first item flush to
 * the gutter, which reads as intentional and keeps the figures at full size —
 * stacking six labelled numbers vertically would push the description below two
 * screens of specification.
 */
export function SpecBar({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 92%", stagger: 0.06 });

  const handover = formatCompletion(property.completionDate);

  const specs: Array<{ label: string; value: string }> = [
    { label: "Price", value: formatPrice(property) },
    { label: "Bedrooms", value: String(property.bedrooms) },
    { label: "Bathrooms", value: String(property.bathrooms) },
    { label: "Area", value: formatArea(property) },
    { label: "Property type", value: property.propertyType },
    { label: "Status", value: property.status },
  ];

  if (handover) specs.push({ label: "Handover", value: handover });
  if (property.furnished) specs.push({ label: "Furnishing", value: property.furnished });
  if (property.floor !== null) specs.push({ label: "Floor", value: String(property.floor) });
  if (property.parking !== null) {
    specs.push({ label: "Parking", value: `${property.parking} ${property.parking === 1 ? "bay" : "bays"}` });
  }

  return (
    <section
      ref={ref}
      data-surface="light"
      aria-label="Property specification"
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell border-b border-ink/12 py-10 sm:py-12">
        <dl
          className="-mx-[var(--spacing-gutter)] flex snap-x snap-mandatory gap-10 overflow-x-auto px-[var(--spacing-gutter)] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-10 sm:gap-y-9 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden"
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              data-reveal="item"
              className="min-w-[8.5rem] shrink-0 snap-start sm:min-w-0"
            >
              <dt className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/40">
                {spec.label}
              </dt>
              <dd className="display-serif mt-3 text-[1.35rem] leading-none text-ink">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
