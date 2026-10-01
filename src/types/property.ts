/**
 * The property model.
 *
 * This is the contract the whole property system is built against — cards,
 * search, the showcase, and the detail pages in a later phase. It is shaped to
 * map onto a CMS or a portal API (Property Finder, Bayut, a headless CMS)
 * without changing any component: swap the source of `properties`, keep the
 * shape.
 */

export const PROPERTY_TYPES = ["Apartment", "Villa", "Townhouse", "Penthouse"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const LISTING_TYPES = ["For Sale", "For Rent"] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

export const PROPERTY_STATUSES = ["Ready", "Off-plan"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

/** The Dubai communities Lion Yard covers. Drives the location filter. */
export const COMMUNITIES = [
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "Dubai Hills",
  "Jumeirah",
  "Dubai Creek Harbour",
  "JVC",
  "Dubai Land",
  "Dubai South",
  "Dubai Maritime City",
  "Meydan",
  "Jumeirah Village Triangle",
  "Business Bay",
  "Al Jaddaf",
  "Dubai Healthcare City",
  "Dubai Production City",
  "Dubai Studio City",
] as const;
export type Community = (typeof COMMUNITIES)[number];

export type PaymentPlanStage = {
  label: string;
  /** Percentage of the total price due at this stage. */
  percentage: number;
  note?: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PropertyImage = {
  src: string;
  alt: string;
};

/**
 * A point of interest near the property.
 *
 * `minutes` is only ever populated from supplied data. Travel times are a
 * factual claim about a real place, so the UI renders the category without a
 * time rather than inventing one, and demo records are flagged `illustrative`
 * so the page can say so out loud.
 */
export type NearbyPlace = {
  category:
    | "Metro"
    | "Schools"
    | "Shopping"
    | "Restaurants"
    | "Beach"
    | "Airport"
    | "Business district";
  name: string;
  minutes: number | null;
  illustrative: boolean;
};

/** Furnishing state. `null` where the record does not say. */
export type Furnishing = "Furnished" | "Unfurnished" | null;

export type Property = {
  id: string;
  slug: string;
  title: string;
  /** Compact form for breadcrumbs, sticky bars and related-property rails. */
  shortTitle: string;
  /** Human-readable location line shown on cards. */
  location: string;
  community: Community;
  price: number;
  currency: "AED";
  propertyType: PropertyType;
  listingType: ListingType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: "sq ft";
  status: PropertyStatus;
  developer: string;
  featured: boolean;
  /** Recently listed — drives the NEW chip and the "Newest" sort. */
  newListing: boolean;
  /** Agency reference shown on the detail page and carried into enquiries. */
  reference: string;
  furnished: Furnishing;
  /** Allocated parking bays. `null` where the record does not say. */
  parking: number | null;
  /** Floor level for apartments; `null` for villas and townhouses. */
  floor: number | null;
  /** Outlook, e.g. ["Skyline", "Marina"]. May be empty. */
  views: string[];
  /** Card and hero image. */
  image: PropertyImage;
  /** Gallery, used by the detail page in a later phase. */
  images: PropertyImage[];
  /** Optional walkthrough film. None of the demo records have one. */
  video: string | null;
  /** One sentence, used on the detail page lede and in metadata. */
  shortDescription: string;
  description: string;
  amenities: string[];
  /** ISO month for off-plan handover; null when the property is ready. */
  completionDate: string | null;
  paymentPlan: PaymentPlanStage[] | null;
  coordinates: Coordinates;
  /** May be empty — the location section renders without it. */
  nearby: NearbyPlace[];
  
  // Added for investment projects
  investmentFocused?: boolean;
  priceOnRequest?: boolean;
  categories?: string[];
  logo?: string;
  brochure?: string;
  floorPlans?: string[];
  highlights?: string[];
  developerSlug?: string;
};

/**
 * A short, non-promissory note about what makes a property worth considering.
 * Deliberately framed as a consideration, never as a guarantee or a yield.
 */
export type InvestmentNote = {
  heading: "Location" | "Design" | "Lifestyle" | "Investment potential";
  body: string;
};
