import type { Metadata } from "next";

import { PropertyFilterProvider } from "@/components/property/PropertyFilterProvider";
import { PropertyListing } from "@/components/property/PropertyListing";
import { PropertiesHero } from "@/components/property/PropertiesHero";
import { site } from "@/data/site";
import { paramsToFilters } from "@/lib/query";

export const metadata: Metadata = {
  title: "Dubai Properties for Sale",
  description:
    "Explore exceptional homes and investment opportunities across Dubai with Lion Yard Real Estate.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: `Properties | ${site.brand}`,
    description:
      "Explore exceptional homes and investment opportunities across Dubai.",
  },
};

/**
 * The listing page reads its filters from the query string ON THE SERVER and
 * seeds the provider with them, so a shared link such as
 * `/properties?location=dubai-marina&beds=2` renders the correct results in the
 * first paint. Parsing them on the client instead would flash the full set and
 * then correct itself, which looks like a bug.
 */
import { OffPlanCatalog } from "@/components/off-plan/OffPlanCatalog";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") params.set(key, value);
    else if (Array.isArray(value) && value[0]) params.set(key, value[0]);
  }

  const { filters, sort } = paramsToFilters(params);

  return (
    <>
      <PropertyFilterProvider initialFilters={filters} initialSort={sort}>
        <PropertiesHero />
        <PropertyListing />
      </PropertyFilterProvider>
      <OffPlanCatalog />
    </>
  );
}
