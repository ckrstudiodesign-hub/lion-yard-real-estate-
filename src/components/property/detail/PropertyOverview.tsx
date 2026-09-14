"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * PROPERTY OVERVIEW — the lede and the description.
 *
 * The lede is set large and the body at a reading measure of roughly 62
 * characters; a full-width paragraph across 1440px is unreadable regardless of
 * how good the typeface is. Amenities sit alongside rather than beneath, so the
 * section reads as a spread and the page does not become a single column of
 * text blocks.
 */
export function PropertyOverview({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section
      ref={ref}
      data-surface="light"
      aria-labelledby="overview-heading"
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell py-[var(--spacing-section)]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40">
              <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
              Overview
            </p>

            <h2
              id="overview-heading"
              data-reveal="item"
              className="display-serif mt-7 max-w-[20ch] text-h2 leading-[1.04]"
            >
              {property.shortDescription}
            </h2>

            <p
              data-reveal="item"
              className="mt-9 max-w-[62ch] text-body leading-[1.85] text-ink/70"
            >
              {property.description}
            </p>

            <dl data-reveal="item" className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <dt className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/40">
                  Reference
                </dt>
                <dd className="mt-2.5 text-body-sm tabular-nums text-ink">
                  {property.reference}
                </dd>
              </div>
              {property.views.length > 0 ? (
                <div>
                  <dt className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/40">
                    Views
                  </dt>
                  <dd className="mt-2.5 text-body-sm text-ink">
                    {property.views.join(", ")}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/40">
                  Community
                </dt>
                <dd className="mt-2.5 text-body-sm text-ink">{property.community}</dd>
              </div>
            </dl>
          </div>

          {property.amenities.length > 0 ? (
            <div className="lg:col-span-5 lg:pt-16">
              <h3
                data-reveal="item"
                className="label-caps text-[0.55rem] tracking-[0.28em] text-ink/40"
              >
                Property features
              </h3>
              <ul
                data-reveal="item"
                className="mt-8 grid grid-cols-1 border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-1"
              >
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-baseline gap-4 border-b border-ink/12 py-4"
                  >
                    {/* A hairline rather than an icon. A set of small generic
                        glyphs beside eight amenities is the quickest way to make
                        an editorial page look like a feature comparison table. */}
                    <span aria-hidden="true" className="mt-2 block h-px w-4 shrink-0 bg-champagne" />
                    <span className="text-body-sm text-ink/75">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
