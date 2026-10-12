import type { Property, PropertyImage } from "@/types/property";

const localImage = (src: string, alt: string): PropertyImage => ({ src, alt });

/**
 * Plot opportunities are kept separate from the residential search catalogue.
 * Only details supplied for a project are shown; commercial terms remain on
 * request until the listing is connected to a live source.
 */
export const PLOT_PROPERTIES: Property[] = [
  {
    id: "LY-PLOT-001",
    slug: "rak-oasis",
    title: "RAK Oasis",
    shortTitle: "RAK Oasis",
    location: "Ras Al Khaimah, UAE",
    emirate: "Ras Al Khaimah",
    community: "Dubai Land",
    plotType: "Land / plot opportunity",
    price: 0,
    currency: "AED",
    propertyType: "Plot",
    listingType: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "RAK Oasis",
    featured: true,
    newListing: true,
    reference: "LY-RAK-OASIS",
    furnished: null,
    parking: null,
    floor: null,
    views: [],
    image: localImage(
      "/property images/DAMAC/DAMAC Islands/damac-islands_56syt_xl.jpg",
      "Waterfront development image from the existing local property library",
    ),
    images: [],
    video: null,
    shortDescription: "A land and plot opportunity in Ras Al Khaimah.",
    description:
      "RAK Oasis is presented as a Ras Al Khaimah land and plot opportunity. Project terms, plot dimensions, ownership, infrastructure, availability and pricing are available from the Lion Yard advisory team on request.",
    amenities: [],
    completionDate: null,
    paymentPlan: null,
    coordinates: null,
    nearby: [],
    priceOnRequest: true,
    categories: ["PLOTS", "LAND"],
  },
];

export function getPlotBySlug(slug: string): Property | undefined {
  return PLOT_PROPERTIES.find((property) => property.slug === slug);
}
