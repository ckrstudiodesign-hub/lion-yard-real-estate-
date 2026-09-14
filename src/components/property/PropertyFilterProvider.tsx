"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { getAllProperties } from "@/data/properties";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  clearChip,
  filterProperties,
  hasActiveFilters,
  sortProperties,
  type ActiveChip,
  type PropertyFilters,
  type SortId,
} from "@/lib/filters";
import type { Property } from "@/types/property";

/**
 * One filter state, shared by everything that displays properties.
 *
 * On the homepage it links the quick search to the featured section and the
 * horizontal showcase; on /properties it links the filter bar, the drawer, the
 * chips and the grid. Narrowing a search moves every list on the page rather
 * than producing a second, parallel set of results somewhere else.
 *
 * The provider holds state and nothing else — the rules live in
 * `lib/filters.ts`, which has no React in it and is equally usable on a server.
 */
type FilterContextValue = {
  filters: PropertyFilters;
  sort: SortId;
  setFilter: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  /** Change several fields at once — a price band sets a min and a max. */
  patch: (partial: Partial<PropertyFilters>) => void;
  /** Replace everything, used when hydrating from the URL. */
  replaceAll: (filters: PropertyFilters, sort: SortId) => void;
  setSort: (sort: SortId) => void;
  clearOne: (key: ActiveChip["key"]) => void;
  reset: () => void;
  /** Matching properties, already sorted. */
  results: Property[];
  /** True once the visitor has narrowed anything. */
  narrowed: boolean;
  /** Every property, unfiltered — for the curated default view. */
  all: Property[];
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function PropertyFilterProvider({
  children,
  initialFilters = DEFAULT_FILTERS,
  initialSort = DEFAULT_SORT,
}: {
  children: React.ReactNode;
  initialFilters?: PropertyFilters;
  initialSort?: SortId;
}) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [sort, setSortState] = useState<SortId>(initialSort);
  const all = getAllProperties();

  const setFilter = useCallback<FilterContextValue["setFilter"]>((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const patch = useCallback((partial: Partial<PropertyFilters>) => {
    setFilters((current) => ({ ...current, ...partial }));
  }, []);

  const replaceAll = useCallback((next: PropertyFilters, nextSort: SortId) => {
    setFilters(next);
    setSortState(nextSort);
  }, []);

  const clearOne = useCallback((key: ActiveChip["key"]) => {
    setFilters((current) => clearChip(current, key));
  }, []);

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortState(DEFAULT_SORT);
  }, []);

  const results = useMemo(
    () => sortProperties(filterProperties(all, filters), sort),
    [all, filters, sort],
  );
  const narrowed = useMemo(() => hasActiveFilters(filters), [filters]);

  const value = useMemo<FilterContextValue>(
    () => ({
      filters,
      sort,
      setFilter,
      patch,
      replaceAll,
      setSort: setSortState,
      clearOne,
      reset,
      results,
      narrowed,
      all,
    }),
    [filters, sort, setFilter, patch, replaceAll, clearOne, reset, results, narrowed, all],
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function usePropertyFilters(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("usePropertyFilters must be used inside a <PropertyFilterProvider>.");
  }
  return context;
}
