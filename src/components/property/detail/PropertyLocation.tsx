"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * LOCATION and WHAT'S NEARBY.
 *
 * THE MAP IS A DECLARED PLACEHOLDER, not a fake map. No tile provider is
 * configured, and drawing invented streets under a real coordinate would be a
 * misrepresentation of where a property is. Instead the panel plots the actual
 * coordinate on a neutral field, states the coordinate, and offers the one thing
 * that genuinely works today — opening the point in the visitor's own maps app.
 *
 * TO WIRE A REAL MAP: replace the inner panel with the provider's component and
 * pass `property.coordinates`. Nothing else in this file needs to change.
 *
 * Travel times carry an explicit "illustrative" qualifier whenever the data is
 * demo data. A travel time is a factual claim about a real place; presenting an
 * invented one as fact is the kind of detail that costs a brokerage its
 * credibility.
 */
export function PropertyLocation({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  const { latitude, longitude } = property.coordinates;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const anyIllustrative = property.nearby.some((place) => place.illustrative);

  return (
    <section
      ref={ref}
      data-surface="light"
      aria-labelledby="location-heading"
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell py-[var(--spacing-section)]">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40">
              <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
              Location
            </p>
            <h2
              id="location-heading"
              data-reveal="item"
              className="display-serif mt-7 text-h2 leading-[1.02]"
            >
              {property.community}
            </h2>
          </div>

          <a
            data-reveal="item"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn label-caps flex items-center gap-3 self-start border-b border-ink/25 pb-2 text-ink/55 transition-colors duration-[400ms] hover:border-ink hover:text-ink lg:self-auto"
          >
            Open in maps
            <svg viewBox="0 0 14 14" aria-hidden="true" className="h-3 w-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </a>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 sm:mt-16 lg:grid-cols-12">
          {/* ---- Map panel --------------------------------------------- */}
          <div data-reveal="media" className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-ink/15 bg-[#E2DFD7]">
              {/* A quiet field of rules — not a drawn city. It reads as a plan
                  without pretending to be a survey. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(17,17,17,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.13) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(55% 55% at 50% 45%, rgba(184,164,122,0.30) 0%, transparent 72%)",
                }}
              />

              {/* The plotted point. */}
              <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span className="absolute h-7 w-7 rounded-full border border-ink/25" />
                  <span className="absolute h-3.5 w-3.5 rounded-full border border-ink/50" />
                  <span className="block h-2 w-2 rounded-full bg-ink" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
                <div>
                  <p className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/45">
                    Coordinates
                  </p>
                  <p className="mt-2 text-body-sm tabular-nums text-ink/70">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </p>
                </div>
                <p className="label-caps text-[0.5rem] tracking-[0.22em] text-ink/35">
                  Interactive map not yet connected
                </p>
              </div>
            </div>
          </div>

          {/* ---- Nearby ------------------------------------------------- */}
          {property.nearby.length > 0 ? (
            <div className="lg:col-span-5">
              <h3
                data-reveal="item"
                className="label-caps text-[0.55rem] tracking-[0.28em] text-ink/40"
              >
                What&rsquo;s nearby
              </h3>

              <ul data-reveal="item" className="mt-8 border-t border-ink/12">
                {property.nearby.map((place) => (
                  <li
                    key={`${place.category}-${place.name}`}
                    className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4"
                  >
                    <span>
                      <span className="label-caps block text-[0.5rem] tracking-[0.24em] text-ink/40">
                        {place.category}
                      </span>
                      <span className="mt-1.5 block text-body-sm text-ink/75">
                        {place.name}
                      </span>
                    </span>
                    {place.minutes !== null ? (
                      <span className="display-serif shrink-0 text-[1.15rem] leading-none tabular-nums text-ink/80">
                        {place.minutes} min
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              {anyIllustrative ? (
                <p data-reveal="item" className="mt-6 max-w-[42ch] text-micro leading-relaxed text-ink/40">
                  Travel times shown are illustrative and are not verified journey
                  times. They will be replaced with measured figures when the
                  listing data is supplied.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
