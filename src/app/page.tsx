import { FeaturedProperties } from "@/components/property/FeaturedProperties";
import { HorizontalShowcase } from "@/components/property/HorizontalShowcase";
import { PropertyFilterProvider } from "@/components/property/PropertyFilterProvider";
import { Hero } from "@/components/hero/Hero";
import { Partners } from "@/components/partners/Partners";
import { OffPlanLuxuryCollection } from "@/components/off-plan/OffPlanLuxuryCollection";

import { ManagingDirector } from "@/components/editorial/ManagingDirector";

/**
 * Homepage flow:
 *
 *   cinematic hero (dark)
 *     ↓
 *   partners (light)
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
const RESULTS_ID = "properties";
const COMMUNITIES_ID = "communities";
const SHOWCASE_ID = "discover";

export default function HomePage() {
  return (
    <PropertyFilterProvider>
      {/* Search is removed, so Hero scroll-down arrow points to the featured properties section instead. */}
      <Hero nextSectionId={RESULTS_ID} />
      <Partners />
      <OffPlanLuxuryCollection />
      <ManagingDirector />
      <FeaturedProperties id={RESULTS_ID} />
      <HorizontalShowcase id={SHOWCASE_ID} />
    </PropertyFilterProvider>
  );
}
