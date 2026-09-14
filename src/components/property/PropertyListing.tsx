"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { FilterBar } from "@/components/property/FilterBar";
import { FilterChips } from "@/components/property/FilterChips";
import { FilterDrawer } from "@/components/property/FilterDrawer";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { ResultsCount } from "@/components/property/ResultsCount";
import { SelectField } from "@/components/property/SelectField";
import { ArrowRight, Button } from "@/components/ui/Button";
import { SORT_OPTIONS, filtersToParamsGuard } from "@/lib/listing";
import { useSectionReveal } from "@/lib/reveal";
import type { SortId } from "@/lib/filters";

/**
 * The /properties results section: header, filters, chips, grid.
 *
 * URL SYNC. Every filter change rewrites the query string with
 * `router.replace(..., { scroll: false })` — replace rather than push, so a
 * visitor narrowing a search four times does not have to press Back four times
 * to leave the page, and `scroll: false` because a filter change must not throw
 * the page back to the top while they are reading results.
 *
 * The initial state comes from the server, which parsed the same query string,
 * so a shared link renders its results in the first paint rather than flashing
 * the unfiltered set and then correcting itself.
 */
export function PropertyListing() {
  const { filters, sort, setSort, results, reset } = usePropertyFilters();
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const firstSync = useRef(true);

  useSectionReveal(sectionRef, { start: "top 85%" });

  useEffect(() => {
    // Skip the first run: the URL already says this, and rewriting it on mount
    // would replace the entry before the visitor has done anything.
    if (firstSync.current) {
      firstSync.current = false;
      return;
    }
    const query = filtersToParamsGuard(filters, sort);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [filters, sort, router, pathname]);

  const empty = results.length === 0;

  return (
    <section
      ref={sectionRef}
      id="results"
      data-surface="light"
      aria-labelledby="results-heading"
      className="relative z-20 bg-bone text-ink"
    >
      <div className="shell pb-[var(--spacing-section)] pt-14 sm:pt-20">
        {/* ---- Heading, count, sort ------------------------------------- */}
        <header className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <h2
              id="results-heading"
              data-reveal="item"
              className="display-serif text-h2 leading-[1.02]"
            >
              Properties in Dubai
            </h2>
            <div data-reveal="item" className="mt-5">
              <ResultsCount count={results.length} />
            </div>
          </div>

          <div data-reveal="item" className="lg:pb-1">
            <SelectField
              label="Sort by"
              variant="compact"
              align="right"
              value={sort}
              options={SORT_OPTIONS}
              onChange={(value) => setSort(value as SortId)}
            />
          </div>
        </header>

        {/* ---- Filters --------------------------------------------------- */}
        <div data-reveal="item" className="mt-10 sm:mt-12">
          <FilterBar />
          <FilterDrawer />
        </div>

        <div className="mt-8">
          <FilterChips />
        </div>

        {/* ---- Results --------------------------------------------------- */}
        {empty ? (
          <div className="mt-16 border-t border-ink/12 py-20 sm:mt-20 sm:py-28">
            <p className="label-caps text-[0.55rem] tracking-[0.28em] text-ink/40">
              No results
            </p>
            <h3 className="display-serif mt-6 max-w-[18ch] text-h2 leading-[1.02]">
              No properties match your search.
            </h3>
            <p className="mt-6 max-w-[46ch] text-lead font-light text-ink/55">
              Try adjusting your filters, or explore all properties across Dubai.
            </p>
            <Button type="button" onClick={reset} variant="outlineInk" className="mt-10">
              Reset Filters
              <ArrowRight />
            </Button>
          </div>
        ) : (
          <div className="mt-16 sm:mt-20">
            <PropertyGrid properties={results} />
          </div>
        )}
      </div>
    </section>
  );
}
