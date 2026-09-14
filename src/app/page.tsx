import { FeaturedProperties } from "@/components/property/FeaturedProperties";
import { HorizontalShowcase } from "@/components/property/HorizontalShowcase";
import { PropertyFilterProvider } from "@/components/property/PropertyFilterProvider";
import { PropertySearch } from "@/components/property/PropertySearch";
import { ExploreDubai } from "@/components/community/ExploreDubai";
import { Hero } from "@/components/hero/Hero";

/**
 * Homepage flow:
 *
 *   cinematic hero (dark)
 *     ↓
 *   find your next address / search (light)
 *     ↓
 *   featured properties, or the visitor's results (light)
 *     ↓
 *   discover more — horizontal showcase (dark)
 *
 * The surface alternates dark → light → dark so the page has a rhythm, and the
 * header inverts with it. Search, featured and the showcase all sit inside one
 * filter provider, so narrowing the search moves everything beneath it.
 */
const SEARCH_ID = "search";
const RESULTS_ID = "properties";
const COMMUNITIES_ID = "communities";
const SHOWCASE_ID = "discover";

export default function HomePage() {
  return (
    <PropertyFilterProvider>
      <Hero nextSectionId={SEARCH_ID} />
      <PropertySearch id={SEARCH_ID} resultsId={RESULTS_ID} />
      <FeaturedProperties id={RESULTS_ID} />
      <ExploreDubai id={COMMUNITIES_ID} />
      <HorizontalShowcase id={SHOWCASE_ID} />
    </PropertyFilterProvider>
  );
}
