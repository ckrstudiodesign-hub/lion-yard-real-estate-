import {
  ANY,
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  isSortId,
  type BathroomFilter,
  type BedroomFilter,
  type PropertyFilters,
  type SortId,
} from "@/lib/filters";
import { COMMUNITIES, LISTING_TYPES, PROPERTY_STATUSES, PROPERTY_TYPES } from "@/types/property";
import type { PropertyStatus, PropertyType } from "@/types/property";
import { CATEGORY_OPTIONS, DEVELOPER_OPTIONS } from "@/lib/filters";

/**
 * Filters ⇄ URL search parameters, so a filtered search is a shareable link.
 *
 * Two rules make this safe:
 *
 *   1. ONLY NON-DEFAULT VALUES ARE WRITTEN. A default search produces a clean
 *      `/properties` with no query string, and the URL stays short and readable.
 *   2. EVERY VALUE READ BACK IS VALIDATED against the domain vocabulary. Query
 *      strings are user input — someone will paste `?beds=banana` — so an
 *      unrecognised value falls back to the default rather than reaching the
 *      filter functions and quietly matching nothing.
 *
 * Slugs are used in the URL (`dubai-marina`) rather than raw labels, so links
 * stay legible and survive a label change.
 */

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Bidirectional maps between display labels and URL slugs. */
const buildMap = <T extends string>(values: readonly T[]) => {
  const toSlug = new Map<T, string>();
  const fromSlug = new Map<string, T>();
  for (const value of values) {
    const slug = slugify(value);
    toSlug.set(value, slug);
    fromSlug.set(slug, value);
  }
  return { toSlug, fromSlug };
};

const COMMUNITY_MAP = buildMap(COMMUNITIES);
const TYPE_MAP = buildMap(PROPERTY_TYPES);
const STATUS_MAP = buildMap(PROPERTY_STATUSES);
const LISTING_MAP = buildMap(LISTING_TYPES);

const DEVELOPER_MAP = buildMap(DEVELOPER_OPTIONS.filter(o => o.value !== ANY).map(o => o.value));
const CATEGORY_MAP = buildMap(CATEGORY_OPTIONS.filter(o => o.value !== ANY).map(o => o.value));

const KEYS = {
  listing: "listing",
  type: "type",
  location: "location",
  beds: "beds",
  baths: "baths",
  priceMin: "price-min",
  priceMax: "price-max",
  areaMin: "area-min",
  areaMax: "area-max",
  status: "status",
  furnished: "furnished",
  featured: "featured",
  sort: "sort",
  developer: "developer",
  category: "category",
} as const;

/** Serialise to a query string. Empty when nothing differs from the default. */
export function filtersToParams(filters: PropertyFilters, sort: SortId): URLSearchParams {
  const params = new URLSearchParams();
  const set = (key: string, value: string | null | undefined) => {
    if (value) params.set(key, value);
  };

  if (filters.listingType !== DEFAULT_FILTERS.listingType) {
    set(KEYS.listing, LISTING_MAP.toSlug.get(filters.listingType));
  }
  if (filters.propertyType !== ANY) {
    set(KEYS.type, TYPE_MAP.toSlug.get(filters.propertyType));
  }
  if (filters.community !== ANY) {
    set(KEYS.location, COMMUNITY_MAP.toSlug.get(filters.community as never));
  }
  if (filters.bedrooms !== ANY) set(KEYS.beds, filters.bedrooms);
  if (filters.bathrooms !== ANY) set(KEYS.baths, filters.bathrooms);
  if (filters.priceMin !== null) set(KEYS.priceMin, String(filters.priceMin));
  if (filters.priceMax !== null) set(KEYS.priceMax, String(filters.priceMax));
  if (filters.areaMin !== null) set(KEYS.areaMin, String(filters.areaMin));
  if (filters.areaMax !== null) set(KEYS.areaMax, String(filters.areaMax));
  if (filters.status !== ANY) set(KEYS.status, STATUS_MAP.toSlug.get(filters.status));
  if (filters.furnished !== ANY) set(KEYS.furnished, slugify(filters.furnished));
  if (filters.featuredOnly) set(KEYS.featured, "1");
  if (filters.developer !== ANY) {
    set(KEYS.developer, DEVELOPER_MAP.toSlug.get(filters.developer as never));
  }
  if (filters.category !== ANY) {
    set(KEYS.category, CATEGORY_MAP.toSlug.get(filters.category as never));
  }
  if (sort !== DEFAULT_SORT) set(KEYS.sort, sort);

  return params;
}

type ParamSource = URLSearchParams | { get(name: string): string | null };

const positiveInt = (raw: string | null): number | null => {
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
};

/** Parse a query string back into filters + sort, validating every value. */
export function paramsToFilters(params: ParamSource): {
  filters: PropertyFilters;
  sort: SortId;
} {
  const get = (key: string) => params.get(key);

  const listing = LISTING_MAP.fromSlug.get(get(KEYS.listing) ?? "");
  const type = TYPE_MAP.fromSlug.get(get(KEYS.type) ?? "");
  const community = COMMUNITY_MAP.fromSlug.get(get(KEYS.location) ?? "");
  const status = STATUS_MAP.fromSlug.get(get(KEYS.status) ?? "");
  const developer = DEVELOPER_MAP.fromSlug.get(get(KEYS.developer) ?? "");
  const category = CATEGORY_MAP.fromSlug.get(get(KEYS.category) ?? "");

  const bedsRaw = get(KEYS.beds);
  const beds = BEDROOM_OPTIONS.includes(bedsRaw as BedroomFilter)
    ? (bedsRaw as BedroomFilter)
    : ANY;

  const bathsRaw = get(KEYS.baths);
  const baths = BATHROOM_OPTIONS.includes(bathsRaw as BathroomFilter)
    ? (bathsRaw as BathroomFilter)
    : ANY;

  const furnishedRaw = get(KEYS.furnished);
  const furnished =
    furnishedRaw === "furnished"
      ? "Furnished"
      : furnishedRaw === "unfurnished"
        ? "Unfurnished"
        : ANY;

  let priceMin = positiveInt(get(KEYS.priceMin));
  let priceMax = positiveInt(get(KEYS.priceMax));
  // A reversed range is a typo, not an intention — swap rather than return zero
  // results with no explanation.
  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    [priceMin, priceMax] = [priceMax, priceMin];
  }

  let areaMin = positiveInt(get(KEYS.areaMin));
  let areaMax = positiveInt(get(KEYS.areaMax));
  if (areaMin !== null && areaMax !== null && areaMin > areaMax) {
    [areaMin, areaMax] = [areaMax, areaMin];
  }

  const sortRaw = get(KEYS.sort);

  return {
    filters: {
      listingType: listing ?? DEFAULT_FILTERS.listingType,
      propertyType: (type as PropertyType | undefined) ?? ANY,
      community: community ?? ANY,
      bedrooms: beds,
      bathrooms: baths,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      status: (status as PropertyStatus | undefined) ?? ANY,
      furnished,
      featuredOnly: get(KEYS.featured) === "1",
      developer: developer ?? ANY,
      category: category ?? ANY,
    },
    sort: isSortId(sortRaw) ? sortRaw : DEFAULT_SORT,
  };
}

/** `/properties` or `/properties?location=dubai-marina` — never a bare `?`. */
export function propertiesHref(filters: PropertyFilters, sort: SortId): string {
  const query = filtersToParams(filters, sort).toString();
  return query ? `/properties?${query}` : "/properties";
}
