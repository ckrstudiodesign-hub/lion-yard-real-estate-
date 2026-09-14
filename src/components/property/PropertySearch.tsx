"use client";

import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { ResultsCount } from "@/components/property/ResultsCount";
import { SelectField } from "@/components/property/SelectField";
import { scroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  ANY,
  BEDROOM_OPTION_LIST,
  COMMUNITY_OPTIONS,
  PRICE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  bandToRange,
  rangeToBand,
  type BedroomFilter,
} from "@/lib/filters";
import { cn } from "@/lib/cn";
import { useSectionReveal } from "@/lib/reveal";
import type { ListingType, PropertyType } from "@/types/property";
import { useRef } from "react";

/**
 * FIND YOUR NEXT ADDRESS — the property search.
 *
 * COMPOSED AS AN INDEX, NOT A FORM. There is no boxed widget: two hairlines
 * bound a single row, the values are set in the display serif at a size you
 * read rather than squint at, and the only heavy element is the ink block that
 * ends the row. A white card with four bordered cells and 13px sans values is
 * what a booking widget looks like, and it is the fastest way to make a luxury
 * property site read as a template.
 *
 * Two behavioural decisions worth knowing about:
 *
 * 1. FILTERING IS LIVE. Changing a field updates the count and the properties
 *    below immediately. SEARCH PROPERTIES is still a real action — it carries
 *    the visitor to the results — but nothing on this page is gated behind
 *    pressing it, because a luxury search that makes you commit before showing
 *    you anything is a worse tool. The form still submits on Enter.
 *
 * 2. SELL IS NOT A SEARCH MODE. Buying and renting are searches over stock;
 *    selling is a service. The Sell tab therefore navigates to /sell rather
 *    than pretending to filter, which is also why it is the only tab that is a
 *    link instead of a button.
 */

type Tab =
  | { label: string; kind: "filter"; value: ListingType }
  | { label: string; kind: "link"; href: string };

const TABS: Tab[] = [
  { label: "Buy", kind: "filter", value: "For Sale" },
  { label: "Rent", kind: "filter", value: "For Rent" },
  { label: "Sell", kind: "link", href: "/sell" },
];

const FIELD =
  "relative px-0 py-6 lg:px-8 lg:py-7 first:lg:pl-0 border-b border-ink/10 lg:border-b-0 lg:border-r lg:border-ink/10";

export function PropertySearch({ id, resultsId }: { id: string; resultsId: string }) {
  const { filters, setFilter, patch, results } = usePropertyFilters();
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-surface="light"
      aria-labelledby={`${id}-heading`}
      // z-20: the search sits above the sections beneath it so an open dropdown
      // panel is never painted behind the next section. The reveal animation
      // puts a transform on the form, and a transform creates a stacking
      // context that would otherwise trap the panel's own z-index.
      className="relative z-20 bg-bone text-ink"
    >
      <div className="shell py-[var(--spacing-section)]">
        {/* Heading left, supporting line right on the baseline. Stacking both
            at the left leaves the right half of a 1440 screen empty, which
            reads as an unfinished layout rather than as whitespace. */}
        <header>
          <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/45">
            <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
            Search
          </p>
          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <h2
              id={`${id}-heading`}
              data-reveal="item"
              className="display-serif text-h2 leading-[1.02]"
            >
              Find Your Next Address
            </h2>
            <p
              data-reveal="item"
              className="max-w-[34ch] text-body font-light text-ink/55 lg:pb-2 lg:text-lead"
            >
              Explore carefully selected properties across Dubai.
            </p>
          </div>
        </header>

        <form
          data-reveal="item"
          onSubmit={(event) => {
            event.preventDefault();
            scroll.to(`#${resultsId}`, -96);
          }}
          className="mt-12 sm:mt-16"
        >
          {/* ---- Mode + live count ---------------------------------------- */}
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <div role="group" aria-label="What would you like to do?" className="flex items-center gap-9 sm:gap-11">
              {TABS.map((tab) => {
                if (tab.kind === "link") {
                  return (
                    <TransitionLink
                      key={tab.label}
                      href={tab.href}
                      className="label-caps relative flex h-11 items-center text-ink/40 transition-colors duration-[220ms] hover:text-ink"
                    >
                      {tab.label}
                    </TransitionLink>
                  );
                }
                const active = filters.listingType === tab.value;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter("listingType", tab.value)}
                    className={cn(
                      // h-11 = 44px: the smallest controls in the search, and
                      // they have to stay thumb-sized on a phone.
                      "label-caps relative flex h-11 items-center transition-colors duration-[220ms]",
                      active ? "text-ink" : "text-ink/40 hover:text-ink",
                    )}
                  >
                    {tab.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-1.5 left-0 block h-px w-full origin-left bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <ResultsCount count={results.length} />
          </div>

          {/* ---- The row --------------------------------------------------
              Two hairlines and four fields. Mobile stacks them full width;
              nothing is boxed at either size. */}
          <div className="mt-6 grid grid-cols-1 border-y border-ink/15 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
            <div className={FIELD}>
              <SelectField
                label="Property type"
                value={filters.propertyType}
                options={PROPERTY_TYPE_OPTIONS}
                onChange={(value) =>
                  setFilter("propertyType", value as PropertyType | typeof ANY)
                }
              />
            </div>

            <div className={FIELD}>
              <SelectField
                label="Location"
                value={filters.community}
                options={COMMUNITY_OPTIONS}
                onChange={(value) => setFilter("community", value)}
              />
            </div>

            <div className={FIELD}>
              <SelectField
                label="Bedrooms"
                value={filters.bedrooms}
                options={BEDROOM_OPTION_LIST}
                onChange={(value) => setFilter("bedrooms", value as BedroomFilter)}
              />
            </div>

            <div className={FIELD}>
              <SelectField
                label="Price"
                // The homepage offers bands; /properties offers an explicit
                // minimum and maximum. Both write the same range, so a search
                // started here survives the jump to the listing page.
                value={rangeToBand(filters.priceMin, filters.priceMax)}
                options={PRICE_OPTIONS}
                onChange={(value) => patch(bandToRange(value))}
              />
            </div>

            <button
              type="submit"
              className={cn(
                "group/btn label-caps relative -mx-[var(--spacing-gutter)] flex h-16 items-center justify-center gap-3 overflow-hidden bg-ink px-8 text-bone",
                "lg:mx-0 lg:h-auto lg:min-w-[16rem]",
                "transition-colors duration-[400ms] hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
              />
              <span className="relative z-10 flex items-center gap-3">
                Search Properties
                <ArrowRight />
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
