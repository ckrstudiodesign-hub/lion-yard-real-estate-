"use client";

import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { activeChips } from "@/lib/filters";

/**
 * Active filters, each removable on its own.
 *
 * Set as hairline-bounded labels rather than rounded pills — a row of grey
 * capsules is the single most recognisable "generic dashboard" tell, and this
 * row sits directly above editorial property cards.
 */
export function FilterChips() {
  const { filters, clearOne, reset } = usePropertyFilters();
  const chips = activeChips(filters);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      <span className="label-caps mr-1 text-[0.55rem] tracking-[0.26em] text-ink/40">
        Filtered by
      </span>

      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.label}`}
          type="button"
          onClick={() => clearOne(chip.key)}
          aria-label={`Remove filter: ${chip.label}`}
          className="group label-caps flex h-9 items-center gap-3 border border-ink/20 px-4 text-[0.55rem] tracking-[0.2em] text-ink transition-colors duration-[300ms] hover:border-ink hover:bg-ink hover:text-bone"
        >
          {chip.label}
          <span aria-hidden="true" className="relative block h-2.5 w-2.5">
            <span className="absolute top-1 block h-px w-full rotate-45 bg-current" />
            <span className="absolute top-1 block h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={reset}
        className="label-caps ml-1 flex h-9 items-center border-b border-ink/25 text-[0.55rem] tracking-[0.2em] text-ink/55 transition-colors duration-[300ms] hover:border-ink hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}
