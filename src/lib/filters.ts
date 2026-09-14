import type {
  Furnishing,
  ListingType,
  Property,
  PropertyStatus,
  PropertyType,
} from "@/types/property";
import { COMMUNITIES, PROPERTY_TYPES } from "@/types/property";

/**
 * Property filtering and sorting — pure functions, no React, no DOM.
 *
 * Deliberately framework-free so the same rules back the homepage quick search,
 * the /properties listing page, and any server-side filtering added when this is
 * wired to a real feed. Components own presentation; this file owns the rules.
 *
 * PRICE IS ALWAYS A RANGE. The homepage offers preset bands and the listing page
 * offers explicit minimum and maximum, but both write to the same `priceMin` and
 * `priceMax`. Keeping two parallel representations of "price" is how a filter
 * system starts disagreeing with itself.
 */

export const ANY = "any" as const;

// ---------------------------------------------------------------------------
// Option vocabularies
// ---------------------------------------------------------------------------

export const BEDROOM_OPTIONS = [ANY, "1", "2", "3", "4", "5"] as const;
export type BedroomFilter = (typeof BEDROOM_OPTIONS)[number];

/** Bathroom choices are "N or more". */
export const BATHROOM_OPTIONS = [ANY, "1", "2", "3", "4"] as const;
export type BathroomFilter = (typeof BATHROOM_OPTIONS)[number];

export type PriceBand = {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
};

export const PRICE_BANDS: PriceBand[] = [
  { id: ANY, label: "Any price", min: null, max: null },
  { id: "under-1m", label: "Under AED 1M", min: null, max: 1_000_000 },
  { id: "1m-3m", label: "AED 1M – 3M", min: 1_000_000, max: 3_000_000 },
  { id: "3m-5m", label: "AED 3M – 5M", min: 3_000_000, max: 5_000_000 },
  { id: "5m-plus", label: "AED 5M+", min: 5_000_000, max: null },
];

/** Discrete steps for the listing page's minimum / maximum selects. */
export const PRICE_STEPS = [
  500_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000,
  7_500_000, 10_000_000, 15_000_000,
];

export const AREA_STEPS = [500, 750, 1_000, 1_500, 2_000, 3_000, 4_000, 6_000, 8_000];

// ---------------------------------------------------------------------------
// The filter model
// ---------------------------------------------------------------------------

export type PropertyFilters = {
  listingType: ListingType;
  propertyType: PropertyType | typeof ANY;
  community: string;
  bedrooms: BedroomFilter;
  bathrooms: BathroomFilter;
  priceMin: number | null;
  priceMax: number | null;
  areaMin: number | null;
  areaMax: number | null;
  status: PropertyStatus | typeof ANY;
  furnished: NonNullable<Furnishing> | typeof ANY;
  featuredOnly: boolean;
};

export const DEFAULT_FILTERS: PropertyFilters = {
  listingType: "For Sale",
  propertyType: ANY,
  community: ANY,
  bedrooms: ANY,
  bathrooms: ANY,
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  status: ANY,
  furnished: ANY,
  featuredOnly: false,
};

// ---------------------------------------------------------------------------
// Option lists for the controls, derived from the domain types
// ---------------------------------------------------------------------------

export type Option = { value: string; label: string };

export const PROPERTY_TYPE_OPTIONS: Option[] = [
  { value: ANY, label: "Any type" },
  ...PROPERTY_TYPES.map((type) => ({ value: type, label: type })),
];

export const COMMUNITY_OPTIONS: Option[] = [
  { value: ANY, label: "All of Dubai" },
  ...COMMUNITIES.map((community) => ({ value: community, label: community })),
];

export const BEDROOM_LABELS: Record<BedroomFilter, string> = {
  [ANY]: "Any beds",
  "1": "1 bed",
  "2": "2 beds",
  "3": "3 beds",
  "4": "4 beds",
  "5": "5+ beds",
};

export const BEDROOM_OPTION_LIST: Option[] = BEDROOM_OPTIONS.map((value) => ({
  value,
  label: BEDROOM_LABELS[value],
}));

export const BATHROOM_LABELS: Record<BathroomFilter, string> = {
  [ANY]: "Any baths",
  "1": "1+ baths",
  "2": "2+ baths",
  "3": "3+ baths",
  "4": "4+ baths",
};

export const BATHROOM_OPTION_LIST: Option[] = BATHROOM_OPTIONS.map((value) => ({
  value,
  label: BATHROOM_LABELS[value],
}));

export const PRICE_OPTIONS: Option[] = PRICE_BANDS.map((band) => ({
  value: band.id,
  label: band.label,
}));

export const STATUS_OPTIONS: Option[] = [
  { value: ANY, label: "Any status" },
  { value: "Ready", label: "Ready" },
  { value: "Off-plan", label: "Off-plan" },
];

export const FURNISHED_OPTIONS: Option[] = [
  { value: ANY, label: "Any" },
  { value: "Furnished", label: "Furnished" },
  { value: "Unfurnished", label: "Unfurnished" },
];

/** Compact money label for range controls: "AED 2M", "AED 750K". */
export function compactPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `AED ${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  return `AED ${Math.round(value / 1000)}K`;
}

export const PRICE_MIN_OPTIONS: Option[] = [
  { value: ANY, label: "No minimum" },
  ...PRICE_STEPS.map((value) => ({ value: String(value), label: compactPrice(value) })),
];

export const PRICE_MAX_OPTIONS: Option[] = [
  { value: ANY, label: "No maximum" },
  ...PRICE_STEPS.map((value) => ({ value: String(value), label: compactPrice(value) })),
];

export const AREA_MIN_OPTIONS: Option[] = [
  { value: ANY, label: "No minimum" },
  ...AREA_STEPS.map((value) => ({
    value: String(value),
    label: `${value.toLocaleString("en-AE")} sq ft`,
  })),
];

export const AREA_MAX_OPTIONS: Option[] = [
  { value: ANY, label: "No maximum" },
  ...AREA_STEPS.map((value) => ({
    value: String(value),
    label: `${value.toLocaleString("en-AE")} sq ft`,
  })),
];

// ---------------------------------------------------------------------------
// Price bands ↔ range, so the homepage and the listing page agree
// ---------------------------------------------------------------------------

export function bandToRange(bandId: string): Pick<PropertyFilters, "priceMin" | "priceMax"> {
  const band = PRICE_BANDS.find((candidate) => candidate.id === bandId);
  return { priceMin: band?.min ?? null, priceMax: band?.max ?? null };
}

/** The band matching an exact range, or `any` when the range is custom. */
export function rangeToBand(priceMin: number | null, priceMax: number | null): string {
  const match = PRICE_BANDS.find(
    (band) => band.min === priceMin && band.max === priceMax,
  );
  return match?.id ?? ANY;
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/**
 * The single filtering rule set.
 *
 * Bedrooms "5" means five or more; bathrooms are always "N or more"; price and
 * area bounds are inclusive of the minimum and exclusive of the maximum so
 * adjacent bands never both claim the same property.
 */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  return properties.filter((property) => {
    if (property.listingType !== filters.listingType) return false;

    if (filters.propertyType !== ANY && property.propertyType !== filters.propertyType) {
      return false;
    }

    if (filters.community !== ANY && property.community !== filters.community) {
      return false;
    }

    if (filters.bedrooms !== ANY) {
      const wanted = Number(filters.bedrooms);
      const matches = wanted === 5 ? property.bedrooms >= 5 : property.bedrooms === wanted;
      if (!matches) return false;
    }

    if (filters.bathrooms !== ANY && property.bathrooms < Number(filters.bathrooms)) {
      return false;
    }

    if (filters.priceMin !== null && property.price < filters.priceMin) return false;
    if (filters.priceMax !== null && property.price >= filters.priceMax) return false;

    if (filters.areaMin !== null && property.area < filters.areaMin) return false;
    if (filters.areaMax !== null && property.area >= filters.areaMax) return false;

    if (filters.status !== ANY && property.status !== filters.status) return false;

    if (filters.furnished !== ANY && property.furnished !== filters.furnished) return false;

    if (filters.featuredOnly && !property.featured) return false;

    return true;
  });
}

/** True when the visitor has narrowed anything beyond the default Buy view. */
export function hasActiveFilters(filters: PropertyFilters): boolean {
  return (
    filters.listingType !== DEFAULT_FILTERS.listingType ||
    filters.propertyType !== ANY ||
    filters.community !== ANY ||
    filters.bedrooms !== ANY ||
    filters.bathrooms !== ANY ||
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.areaMin !== null ||
    filters.areaMax !== null ||
    filters.status !== ANY ||
    filters.furnished !== ANY ||
    filters.featuredOnly
  );
}

// ---------------------------------------------------------------------------
// Active-filter chips
// ---------------------------------------------------------------------------

/** A removable filter, as shown in the chip row. */
export type ActiveChip = {
  /** Which key to reset; price and area reset as a pair. */
  key: keyof PropertyFilters | "price" | "area";
  label: string;
};

export function activeChips(filters: PropertyFilters): ActiveChip[] {
  const chips: ActiveChip[] = [];

  if (filters.listingType !== DEFAULT_FILTERS.listingType) {
    chips.push({ key: "listingType", label: filters.listingType });
  }
  if (filters.propertyType !== ANY) {
    chips.push({ key: "propertyType", label: filters.propertyType });
  }
  if (filters.community !== ANY) {
    chips.push({ key: "community", label: filters.community });
  }
  if (filters.bedrooms !== ANY) {
    chips.push({ key: "bedrooms", label: BEDROOM_LABELS[filters.bedrooms] });
  }
  if (filters.bathrooms !== ANY) {
    chips.push({ key: "bathrooms", label: BATHROOM_LABELS[filters.bathrooms] });
  }
  if (filters.priceMin !== null || filters.priceMax !== null) {
    const min = filters.priceMin === null ? null : compactPrice(filters.priceMin);
    const max = filters.priceMax === null ? null : compactPrice(filters.priceMax);
    const label =
      min && max ? `${min} – ${max}` : min ? `From ${min}` : `Up to ${max}`;
    chips.push({ key: "price", label });
  }
  if (filters.areaMin !== null || filters.areaMax !== null) {
    const fmt = (value: number) => `${value.toLocaleString("en-AE")} sq ft`;
    const min = filters.areaMin === null ? null : fmt(filters.areaMin);
    const max = filters.areaMax === null ? null : fmt(filters.areaMax);
    const label =
      min && max ? `${min} – ${max}` : min ? `From ${min}` : `Up to ${max}`;
    chips.push({ key: "area", label });
  }
  if (filters.status !== ANY) chips.push({ key: "status", label: filters.status });
  if (filters.furnished !== ANY) chips.push({ key: "furnished", label: filters.furnished });
  if (filters.featuredOnly) chips.push({ key: "featuredOnly", label: "Featured only" });

  return chips;
}

/** Reset one chip back to its default. */
export function clearChip(filters: PropertyFilters, key: ActiveChip["key"]): PropertyFilters {
  if (key === "price") return { ...filters, priceMin: null, priceMax: null };
  if (key === "area") return { ...filters, areaMin: null, areaMax: null };
  return { ...filters, [key]: DEFAULT_FILTERS[key] };
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export const SORT_OPTIONS: Option[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price low → high" },
  { value: "price-desc", label: "Price high → low" },
];

export type SortId = "featured" | "newest" | "price-asc" | "price-desc";
export const DEFAULT_SORT: SortId = "featured";

export function isSortId(value: string | null | undefined): value is SortId {
  return (
    value === "featured" ||
    value === "newest" ||
    value === "price-asc" ||
    value === "price-desc"
  );
}

/**
 * Sorting is stable and total — every comparator falls through to price and
 * then to id, so the same filter set always produces the same order rather than
 * shuffling equal items on each render.
 */
export function sortProperties(properties: Property[], sort: SortId): Property[] {
  const list = [...properties];

  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
    case "price-desc":
      return list.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
    case "newest":
      return list.sort(
        (a, b) =>
          Number(b.newListing) - Number(a.newListing) ||
          b.id.localeCompare(a.id),
      );
    case "featured":
    default:
      return list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.newListing) - Number(a.newListing) ||
          a.id.localeCompare(b.id),
      );
  }
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** AED 2,450,000 — no decimals, grouped, currency first. */
export function formatPrice(
  property: Pick<Property, "price" | "currency" | "listingType">,
): string {
  const amount = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(
    property.price,
  );
  const suffix = property.listingType === "For Rent" ? " / year" : "";
  return `${property.currency} ${amount}${suffix}`;
}

/** 1,240 sq ft */
export function formatArea(property: Pick<Property, "area" | "areaUnit">): string {
  return `${new Intl.NumberFormat("en-AE").format(property.area)} ${property.areaUnit}`;
}

/** Apartment · 2 Beds · 2 Baths · 1,240 sq ft */
export function formatSpecLine(property: Property): string {
  const beds = `${property.bedrooms} ${property.bedrooms === 1 ? "Bed" : "Beds"}`;
  const baths = `${property.bathrooms} ${property.bathrooms === 1 ? "Bath" : "Baths"}`;
  return [property.propertyType, beds, baths, formatArea(property)].join("  ·  ");
}

/** "Q4 2027" from an ISO year-month, for off-plan handover. */
export function formatCompletion(completionDate: string | null): string | null {
  if (!completionDate) return null;
  const [year, month] = completionDate.split("-");
  if (!year || !month) return null;
  const quarter = Math.ceil(Number(month) / 3);
  return `Q${quarter} ${year}`;
}
