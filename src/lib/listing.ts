import type { PropertyFilters, SortId } from "@/lib/filters";
import { filtersToParams } from "@/lib/query";

export { SORT_OPTIONS } from "@/lib/filters";

/**
 * Query string for the current filters, or an empty string when nothing has
 * been narrowed — so a default search keeps a clean `/properties` URL rather
 * than a trailing `?`.
 */
export function filtersToParamsGuard(filters: PropertyFilters, sort: SortId): string {
  return filtersToParams(filters, sort).toString();
}
