"use client";

import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { SelectField } from "@/components/property/SelectField";
import {
  ANY,
  AREA_MAX_OPTIONS,
  AREA_MIN_OPTIONS,
  BATHROOM_OPTION_LIST,
  BEDROOM_OPTION_LIST,
  COMMUNITY_OPTIONS,
  FURNISHED_OPTIONS,
  PRICE_MAX_OPTIONS,
  PRICE_MIN_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  STATUS_OPTIONS,
  type BathroomFilter,
  type BedroomFilter,
} from "@/lib/filters";
import type { Furnishing, PropertyStatus, PropertyType } from "@/types/property";

/**
 * The individual filter controls, defined once and used by both the desktop
 * bar and the mobile drawer.
 *
 * Two surfaces rendering the same filters from two hand-written copies is how
 * they drift — a field added to one and forgotten in the other. Here the field
 * set is the single definition and each surface arranges it.
 */

const numeric = (value: string): number | null => (value === ANY ? null : Number(value));
const toParam = (value: number | null): string => (value === null ? ANY : String(value));

export function LocationField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Location"
      value={filters.community}
      options={COMMUNITY_OPTIONS}
      onChange={(value) => setFilter("community", value)}
    />
  );
}

export function PropertyTypeField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Property type"
      value={filters.propertyType}
      options={PROPERTY_TYPE_OPTIONS}
      onChange={(value) => setFilter("propertyType", value as PropertyType | typeof ANY)}
    />
  );
}

export function BedroomsField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Bedrooms"
      value={filters.bedrooms}
      options={BEDROOM_OPTION_LIST}
      onChange={(value) => setFilter("bedrooms", value as BedroomFilter)}
    />
  );
}

export function BathroomsField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Bathrooms"
      value={filters.bathrooms}
      options={BATHROOM_OPTION_LIST}
      onChange={(value) => setFilter("bathrooms", value as BathroomFilter)}
    />
  );
}

export function PriceMinField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Minimum price"
      value={toParam(filters.priceMin)}
      options={PRICE_MIN_OPTIONS}
      onChange={(value) => setFilter("priceMin", numeric(value))}
    />
  );
}

export function PriceMaxField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Maximum price"
      value={toParam(filters.priceMax)}
      options={PRICE_MAX_OPTIONS}
      onChange={(value) => setFilter("priceMax", numeric(value))}
    />
  );
}

export function AreaMinField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Minimum area"
      value={toParam(filters.areaMin)}
      options={AREA_MIN_OPTIONS}
      onChange={(value) => setFilter("areaMin", numeric(value))}
    />
  );
}

export function AreaMaxField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Maximum area"
      value={toParam(filters.areaMax)}
      options={AREA_MAX_OPTIONS}
      onChange={(value) => setFilter("areaMax", numeric(value))}
    />
  );
}

export function StatusField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Status"
      value={filters.status}
      options={STATUS_OPTIONS}
      onChange={(value) => setFilter("status", value as PropertyStatus | typeof ANY)}
    />
  );
}

export function FurnishedField() {
  const { filters, setFilter } = usePropertyFilters();
  return (
    <SelectField
      label="Furnished"
      value={filters.furnished}
      options={FURNISHED_OPTIONS}
      onChange={(value) =>
        setFilter("furnished", value as NonNullable<Furnishing> | typeof ANY)
      }
    />
  );
}

/** Featured is a toggle rather than a select — it has exactly two states. */
export function FeaturedToggle() {
  const { filters, setFilter } = usePropertyFilters();
  const on = filters.featuredOnly;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setFilter("featuredOnly", !on)}
      className="group flex min-h-11 w-full items-center justify-between gap-4 text-left"
    >
      <span className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/50">
        Featured only
      </span>
      <span
        aria-hidden="true"
        className={`relative block h-5 w-10 shrink-0 border transition-colors duration-[300ms] ${
          on ? "border-ink bg-ink" : "border-ink/25 bg-transparent"
        }`}
      >
        <span
          className={`absolute top-1/2 block h-3 w-3 -translate-y-1/2 transition-[left,background-color] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            on ? "left-[1.375rem] bg-bone" : "left-[0.1875rem] bg-ink/35"
          }`}
        />
      </span>
    </button>
  );
}
