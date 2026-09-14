import type {
  InvestmentNote,
  NearbyPlace,
  Property,
  PropertyImage,
} from "@/types/property";

/**
 * ============================================================================
 * DEMO DATA — NOT REAL LION YARD LISTINGS
 * ============================================================================
 *
 * Every record below is invented for the purpose of building and reviewing the
 * interface. The names, prices, sizes, references and handover dates are
 * plausible for the communities they sit in, but none of them is a property
 * Lion Yard holds, has sold, or is marketing. Nothing on this site claims
 * otherwise, and the property pages say so on the page itself.
 *
 * Nearby-place travel times are marked `illustrative` and the UI labels them as
 * such — a travel time is a factual claim about a real place, and inventing one
 * silently would be a lie rather than a placeholder.
 *
 * Photography is free-licence imagery from Unsplash used to establish tone. It
 * is not owned by Lion Yard and must be replaced before launch.
 *
 * TO GO LIVE: replace the contents of this file with real listings from the CRM
 * or portal feed. Nothing else has to change — every component reads the
 * `Property` type, not this array.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const img = (id: string, alt: string, w = 1600): PropertyImage => ({
  src: unsplash(id, w),
  alt,
});

/** Interior frames reused across records so every gallery has real depth. */
const INTERIORS: Array<[string, string]> = [
  ["1522708323590-d24dbb6b0267", "Open-plan living room with floor-to-ceiling glazing"],
  ["1556912167-f556f1f39fdf", "Kitchen in pale stone and dark timber"],
  ["1560448204-e02f11c3d0e2", "Principal bedroom with a wide window"],
  ["1600607687939-ce8a6c25118c", "Reception room at dusk"],
  ["1600566753086-00f18fb6b3ea", "Dining area beside the glazed wall"],
  ["1600210492486-724fe5c67fb0", "Bathroom lined in stone"],
  ["1493809842364-78817add7ffb", "Study corner with built-in shelving"],
  ["1600607687920-4e2a09cf159d", "Kitchen island with seating"],
];

/** Build a gallery: the hero frame, then a slice of the interior set. */
const gallery = (hero: PropertyImage, from: number, count: number): PropertyImage[] => [
  hero,
  ...INTERIORS.slice(from, from + count).map(([id, alt]) => img(id, alt)),
];

const nearby = (places: Array<[NearbyPlace["category"], string, number | null]>): NearbyPlace[] =>
  places.map(([category, name, minutes]) => ({
    category,
    name,
    minutes,
    // Every travel time in this file is illustrative. Real figures replace this
    // flag with `false` and the UI drops the qualifier automatically.
    illustrative: minutes !== null,
  }));

/**
 * Considerations shown under WHY THIS PROPERTY. Deliberately descriptive, never
 * promissory — no yields, no guarantees, no "best investment in Dubai".
 */
const notes = (location: string, design: string, lifestyle: string, potential: string): InvestmentNote[] => [
  { heading: "Location", body: location },
  { heading: "Design", body: design },
  { heading: "Lifestyle", body: lifestyle },
  { heading: "Investment potential", body: potential },
];

export const DEMO_PROPERTIES: Property[] = [
  {
    id: "LY-001",
    slug: "lion-residences-downtown-dubai",
    title: "Lion Residences",
    shortTitle: "Lion Residences",
    location: "Downtown Dubai",
    community: "Downtown Dubai",
    price: 2450000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1240,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: true,
    newListing: false,
    reference: "LY-DT-1240",
    furnished: "Unfurnished",
    parking: 1,
    floor: 32,
    views: ["Skyline", "Boulevard"],
    image: img("1512453979798-5ea266f8880c", "Downtown Dubai towers at dusk, seen from the water", 1800),
    images: gallery(
      img("1512453979798-5ea266f8880c", "Downtown Dubai towers at dusk", 1800),
      0,
      5,
    ),
    video: null,
    shortDescription:
      "A two-bedroom residence on a high floor, positioned for long views across the Downtown skyline.",
    description:
      "A two-bedroom residence on the thirty-second floor, positioned for long views across the Downtown skyline. Full-height glazing runs the width of the living space, opening onto a balcony deep enough to use. The kitchen is finished in pale stone and dark timber, with a separate utility off the entrance hall. Both bedrooms are doubles; the principal has a dressing area and a stone-lined bathroom.",
    amenities: [
      "Private balcony",
      "Infinity pool",
      "Residents' gym",
      "Concierge",
      "Covered parking",
      "Landscaped podium",
      "24/7 security",
      "Children's play area",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.1972, longitude: 55.2744 },
    nearby: nearby([
      ["Metro", "Burj Khalifa / Dubai Mall", 6],
      ["Shopping", "The Dubai Mall", 8],
      ["Restaurants", "Downtown Boulevard", 4],
      ["Business district", "DIFC", 12],
      ["Airport", "Dubai International (DXB)", 18],
    ]),
  },
  {
    id: "LY-002",
    slug: "skyline-house-dubai-marina",
    title: "Skyline House",
    shortTitle: "Skyline House",
    location: "Dubai Marina",
    community: "Dubai Marina",
    price: 4200000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 2180,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: true,
    newListing: false,
    reference: "LY-MR-2180",
    furnished: "Furnished",
    parking: 2,
    floor: 48,
    views: ["Marina", "Sea"],
    image: img("1545324418-cc1a3fa10c00", "Marina towers rising above the waterfront at blue hour", 1800),
    images: gallery(
      img("1545324418-cc1a3fa10c00", "Marina towers at blue hour", 1800),
      1,
      6,
    ),
    video: null,
    shortDescription:
      "Three bedrooms across a single floor with a corner aspect over the marina.",
    description:
      "Three bedrooms across a single floor with a corner aspect over the marina and open sea beyond. A deep terrace runs along the western elevation, shaded through the afternoon. There is a separate service entrance and staff room, and the principal suite takes the full width of the corner with a dressing room and twin bathrooms.",
    amenities: [
      "Marina berth access",
      "Pool deck",
      "Residents' gym",
      "24/7 security",
      "Two parking bays",
      "Concierge",
      "Private terrace",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.0805, longitude: 55.1403 },
    nearby: nearby([
      ["Metro", "DMCC", 7],
      ["Beach", "JBR Beach", 9],
      ["Restaurants", "Marina Walk", 3],
      ["Shopping", "Marina Mall", 5],
      ["Airport", "Dubai International (DXB)", 32],
    ]),
  },
  {
    id: "LY-003",
    slug: "palm-vista-palm-jumeirah",
    title: "Palm Vista",
    shortTitle: "Palm Vista",
    location: "Palm Jumeirah",
    community: "Palm Jumeirah",
    price: 12500000,
    currency: "AED",
    propertyType: "Villa",
    listingType: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 5400,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: true,
    newListing: false,
    reference: "LY-PJ-5400",
    furnished: "Unfurnished",
    parking: 4,
    floor: null,
    views: ["Sea", "Skyline"],
    image: img("1613977257363-707ba9348227", "Contemporary villa with a long pool and palm planting", 1800),
    images: gallery(
      img("1613977257363-707ba9348227", "Villa exterior with pool", 1800),
      0,
      6,
    ),
    video: null,
    shortDescription:
      "A four-bedroom villa on a garden plot with private beach frontage.",
    description:
      "A four-bedroom villa on a garden plot with private beach frontage. The entrance hall is double height, opening through to living spaces that run the width of the plot and out to a twenty-metre pool. A roof terrace is oriented back toward the skyline. Staff accommodation and a four-car garage sit behind a separate service court.",
    amenities: [
      "Private beach",
      "Twenty-metre pool",
      "Roof terrace",
      "Staff accommodation",
      "Four-car garage",
      "Landscaped garden",
      "24/7 security",
      "Outdoor kitchen",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.1124, longitude: 55.139 },
    nearby: nearby([
      ["Beach", "Private beach frontage", 1],
      ["Restaurants", "Palm West Beach", 8],
      ["Shopping", "Nakheel Mall", 10],
      ["Metro", "Palm Monorail — Al Ittihad Park", 9],
      ["Airport", "Dubai International (DXB)", 35],
    ]),
  },
  {
    id: "LY-004",
    slug: "the-oasis-villa-dubai-hills",
    title: "The Oasis Villa",
    shortTitle: "Oasis Villa",
    location: "Dubai Hills Estate",
    community: "Dubai Hills",
    price: 9800000,
    currency: "AED",
    propertyType: "Villa",
    listingType: "For Sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 6100,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: true,
    newListing: false,
    reference: "LY-DH-6100",
    furnished: "Unfurnished",
    parking: 3,
    floor: null,
    views: ["Golf course", "Garden"],
    image: img("1600585154340-be6161a56a0c", "Low modern villa in pale stone behind mature planting", 1800),
    images: gallery(
      img("1600585154340-be6161a56a0c", "Villa exterior in pale stone", 1800),
      2,
      6,
    ),
    video: null,
    shortDescription:
      "Five bedrooms arranged around a central courtyard, backing onto the golf course.",
    description:
      "Five bedrooms arranged around a central courtyard, backing onto the golf course. The family kitchen opens to a shaded terrace; a separate formal reception sits to the front of the plot. Four of the five bedrooms are en suite, and there is a maid's room with its own access off the utility corridor.",
    amenities: [
      "Golf course frontage",
      "Private pool",
      "Central courtyard",
      "Maid's room",
      "Three-car garage",
      "Landscaped garden",
      "Children's play area",
      "24/7 security",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.1017, longitude: 55.2497 },
    nearby: nearby([
      ["Schools", "Dubai Hills schools cluster", 5],
      ["Shopping", "Dubai Hills Mall", 6],
      ["Restaurants", "Dubai Hills Golf Club", 4],
      ["Business district", "Downtown Dubai", 16],
      ["Airport", "Dubai International (DXB)", 25],
    ]),
  },
  {
    id: "LY-005",
    slug: "vantage-penthouse-downtown-dubai",
    title: "Vantage Penthouse",
    shortTitle: "Vantage Penthouse",
    location: "Downtown Dubai",
    community: "Downtown Dubai",
    price: 8750000,
    currency: "AED",
    propertyType: "Penthouse",
    listingType: "For Sale",
    bedrooms: 4,
    bathrooms: 4,
    area: 3900,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: false,
    newListing: false,
    reference: "LY-DT-3900",
    furnished: "Furnished",
    parking: 4,
    floor: 61,
    views: ["Skyline", "Fountain"],
    image: img("1600607687939-ce8a6c25118c", "Penthouse living room with full-height glazing over a city skyline", 1800),
    images: gallery(
      img("1600607687939-ce8a6c25118c", "Penthouse living room at dusk", 1800),
      3,
      5,
    ),
    video: null,
    shortDescription:
      "The full upper floor, with a wrap terrace on three sides and an uninterrupted outlook.",
    description:
      "The full upper floor, with a wrap terrace on three sides and an uninterrupted outlook over the Burj district. Four bedrooms, a separate media room, and a private lift lobby opening directly into the apartment. The terrace is planted and irrigated, with an outdoor kitchen on the western return.",
    amenities: [
      "Private lift lobby",
      "Wrap terrace",
      "Media room",
      "Concierge",
      "Four parking bays",
      "Infinity pool",
      "Residents' gym",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.1935, longitude: 55.2707 },
    nearby: nearby([
      ["Metro", "Burj Khalifa / Dubai Mall", 5],
      ["Shopping", "The Dubai Mall", 7],
      ["Restaurants", "Downtown Boulevard", 3],
      ["Business district", "DIFC", 11],
      ["Airport", "Dubai International (DXB)", 17],
    ]),
  },
  {
    id: "LY-006",
    slug: "bay-terraces-business-bay",
    title: "Bay Terraces",
    shortTitle: "Bay Terraces",
    location: "Business Bay",
    community: "Business Bay",
    price: 3400000,
    currency: "AED",
    propertyType: "Townhouse",
    listingType: "For Sale",
    bedrooms: 3,
    bathrooms: 4,
    area: 2050,
    areaUnit: "sq ft",
    status: "Off-plan",
    developer: "Demo Developer",
    featured: false,
    newListing: true,
    reference: "LY-BB-2050",
    furnished: "Unfurnished",
    parking: 2,
    floor: null,
    views: ["Canal"],
    image: img("1545324418-cc1a3fa10c00", "Canal-side towers in Business Bay at first light", 1700),
    images: gallery(
      img("1545324418-cc1a3fa10c00", "Business Bay canal frontage", 1700),
      4,
      4,
    ),
    video: null,
    shortDescription:
      "A three-bedroom townhouse in a canal-side terrace, arranged over three floors.",
    description:
      "A three-bedroom townhouse in a canal-side terrace, arranged over three floors with a private roof garden. The ground floor is open-plan with a courtyard to the rear; bedrooms occupy the first and second floors. Handover is scheduled for the fourth quarter of 2027.",
    amenities: [
      "Private roof garden",
      "Canal promenade",
      "Shared pool",
      "Residents' gym",
      "Two parking bays",
      "24/7 security",
    ],
    completionDate: "2027-10",
    paymentPlan: [
      { label: "On booking", percentage: 20 },
      { label: "During construction", percentage: 50, note: "Across five instalments" },
      { label: "On handover", percentage: 30 },
    ],
    coordinates: { latitude: 25.1857, longitude: 55.2654 },
    nearby: nearby([
      ["Metro", "Business Bay", 8],
      ["Business district", "Downtown Dubai", 7],
      ["Restaurants", "Marasi Drive", 4],
      ["Shopping", "The Dubai Mall", 12],
      ["Airport", "Dubai International (DXB)", 20],
    ]),
  },
  {
    id: "LY-007",
    slug: "creek-horizon-dubai-creek-harbour",
    title: "Creek Horizon",
    shortTitle: "Creek Horizon",
    location: "Dubai Creek Harbour",
    community: "Dubai Creek Harbour",
    price: 2100000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1180,
    areaUnit: "sq ft",
    status: "Off-plan",
    developer: "Demo Developer",
    featured: false,
    newListing: true,
    reference: "LY-CH-1180",
    furnished: "Unfurnished",
    parking: 1,
    floor: 18,
    views: ["Creek", "Skyline"],
    image: img("1518684079-3c830dcef090", "Dubai skyline seen across open water at sunset", 1700),
    images: gallery(
      img("1518684079-3c830dcef090", "Skyline across the creek", 1700),
      0,
      5,
    ),
    video: null,
    shortDescription:
      "A two-bedroom apartment facing the creek, with a balcony set back from the glazing line.",
    description:
      "A two-bedroom apartment facing the creek, with a balcony set back from the glazing line so it stays usable through the afternoon. Positioned in the second tower of the masterplan, with handover in the second quarter of 2027. Both bedrooms are en suite and there is a utility off the kitchen.",
    amenities: [
      "Creek frontage",
      "Pool deck",
      "Residents' gym",
      "Retail podium",
      "One parking bay",
      "Children's play area",
      "24/7 security",
    ],
    completionDate: "2027-04",
    paymentPlan: [
      { label: "On booking", percentage: 10 },
      { label: "During construction", percentage: 50, note: "Across four instalments" },
      { label: "On handover", percentage: 40 },
    ],
    coordinates: { latitude: 25.1976, longitude: 55.3505 },
    nearby: nearby([
      ["Shopping", "Creek Harbour retail district", 5],
      ["Restaurants", "Creek Marina promenade", 4],
      ["Business district", "Downtown Dubai", 15],
      ["Airport", "Dubai International (DXB)", 14],
    ]),
  },
  {
    id: "LY-008",
    slug: "garden-court-jvc",
    title: "Garden Court",
    shortTitle: "Garden Court",
    location: "Jumeirah Village Circle",
    community: "JVC",
    price: 940000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 1,
    bathrooms: 1,
    area: 690,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: false,
    newListing: false,
    reference: "LY-JV-690",
    furnished: "Furnished",
    parking: 1,
    floor: 4,
    views: ["Garden"],
    image: img("1502672260266-1c1ef2d93688", "Calm apartment interior with a window onto low-rise rooftops", 1700),
    images: gallery(
      img("1502672260266-1c1ef2d93688", "Apartment interior with garden outlook", 1700),
      1,
      4,
    ),
    video: null,
    shortDescription:
      "A one-bedroom apartment on a quiet garden-facing elevation, recently handed over.",
    description:
      "A one-bedroom apartment on a quiet garden-facing elevation, recently handed over and sold furnished. A practical layout with generous storage and a balcony deep enough to sit out on. Parking is allocated and covered.",
    amenities: [
      "Landscaped courtyard",
      "Shared pool",
      "Residents' gym",
      "Covered parking",
      "24/7 security",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.0589, longitude: 55.2093 },
    nearby: nearby([
      ["Schools", "JVC schools cluster", 6],
      ["Shopping", "Circle Mall", 5],
      ["Restaurants", "JVC community retail", 4],
      ["Business district", "Dubai Media City", 18],
    ]),
  },
  {
    id: "LY-009",
    slug: "business-bay-residence",
    title: "Business Bay Residence",
    shortTitle: "Bay Residence",
    location: "Business Bay",
    community: "Business Bay",
    price: 1450000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 1,
    bathrooms: 1,
    area: 780,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: false,
    newListing: false,
    reference: "LY-BB-780",
    furnished: "Furnished",
    parking: 1,
    floor: 22,
    views: ["Canal", "Skyline"],
    image: img("1600566753086-00f18fb6b3ea", "Compact apartment interior with a canal outlook", 1700),
    images: gallery(
      img("1600566753086-00f18fb6b3ea", "Living area with canal outlook", 1700),
      2,
      4,
    ),
    video: null,
    shortDescription:
      "A one-bedroom apartment on the twenty-second floor, facing the canal.",
    description:
      "A one-bedroom apartment on the twenty-second floor, facing the canal with the Downtown skyline to the north. Sold furnished, with an open-plan living space and a balcony running the width of the apartment. Well suited to a first purchase or to letting.",
    amenities: [
      "Canal view",
      "Shared pool",
      "Residents' gym",
      "Covered parking",
      "Concierge",
      "24/7 security",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.1862, longitude: 55.2712 },
    nearby: nearby([
      ["Metro", "Business Bay", 6],
      ["Business district", "Downtown Dubai", 8],
      ["Restaurants", "Marasi Drive", 3],
      ["Shopping", "The Dubai Mall", 13],
      ["Airport", "Dubai International (DXB)", 19],
    ]),
  },
  {
    id: "LY-010",
    slug: "jumeirah-garden-villa",
    title: "Jumeirah Garden Villa",
    shortTitle: "Garden Villa",
    location: "Jumeirah",
    community: "Jumeirah",
    price: 8500000,
    currency: "AED",
    propertyType: "Villa",
    listingType: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 5900,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: false,
    newListing: false,
    reference: "LY-JU-5900",
    furnished: "Unfurnished",
    parking: 3,
    floor: null,
    views: ["Garden", "Sea"],
    image: img("1600596542815-ffad4c1539a9", "Low white villa behind mature garden planting", 1800),
    images: gallery(
      img("1600596542815-ffad4c1539a9", "Villa exterior behind mature planting", 1800),
      3,
      5,
    ),
    video: null,
    shortDescription:
      "A four-bedroom villa set back from the road behind mature planting, minutes from the beach.",
    description:
      "A four-bedroom villa set back from the road behind mature planting, a few minutes from the beach. Single storey across most of the plot, with a first-floor principal suite opening to a private terrace. The garden is established, with a pool on the southern boundary and a shaded majlis to the rear.",
    amenities: [
      "Private pool",
      "Mature garden",
      "Majlis",
      "Maid's room",
      "Three-car parking",
      "Outdoor kitchen",
      "24/7 security",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.2048, longitude: 55.2432 },
    nearby: nearby([
      ["Beach", "Jumeirah Beach", 5],
      ["Schools", "Jumeirah schools cluster", 7],
      ["Shopping", "Mercato", 6],
      ["Restaurants", "Jumeirah Road", 4],
      ["Airport", "Dubai International (DXB)", 22],
    ]),
  },
  {
    id: "LY-011",
    slug: "marina-heights-dubai-marina",
    title: "Marina Heights",
    shortTitle: "Marina Heights",
    location: "Dubai Marina",
    community: "Dubai Marina",
    price: 2900000,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1310,
    areaUnit: "sq ft",
    status: "Ready",
    developer: "Demo Developer",
    featured: false,
    newListing: true,
    reference: "LY-MR-1310",
    furnished: "Unfurnished",
    parking: 1,
    floor: 27,
    views: ["Marina"],
    image: img("1502672260266-1c1ef2d93688", "Marina apartment interior with a wide balcony", 1700),
    images: gallery(
      img("1502672260266-1c1ef2d93688", "Living space with marina outlook", 1700),
      4,
      4,
    ),
    video: null,
    shortDescription:
      "A two-bedroom apartment on the twenty-seventh floor with a wide marina balcony.",
    description:
      "A two-bedroom apartment on the twenty-seventh floor with a balcony running the full width of the living space and marina views to the south. Recently redecorated throughout. Both bedrooms take doubles, and the second has been fitted as a study.",
    amenities: [
      "Marina view",
      "Pool deck",
      "Residents' gym",
      "Covered parking",
      "Concierge",
      "24/7 security",
    ],
    completionDate: null,
    paymentPlan: null,
    coordinates: { latitude: 25.0783, longitude: 55.1385 },
    nearby: nearby([
      ["Metro", "DMCC", 6],
      ["Beach", "JBR Beach", 10],
      ["Restaurants", "Marina Walk", 4],
      ["Shopping", "Marina Mall", 6],
      ["Airport", "Dubai International (DXB)", 33],
    ]),
  },
];

/** Shared considerations, keyed by community. Descriptive, never promissory. */
const NOTES_BY_COMMUNITY: Partial<Record<Property["community"], InvestmentNote[]>> = {
  "Downtown Dubai": notes(
    "Central to the Burj district, within walking distance of the retail and dining spine and a short drive from DIFC.",
    "Full-height glazing and a compact, efficient plan — the layout prioritises the outlook over corridor space.",
    "A dense, walkable neighbourhood where most daily needs are within a few minutes on foot.",
    "Downtown is one of the most established addresses in the city, with a long letting record. Consider service charges and floor level when comparing.",
  ),
  "Dubai Marina": notes(
    "Waterfront, with the tram and metro close by and the beach a short walk from the promenade.",
    "A corner aspect and deep terrace — the plan is arranged around the view rather than fitting rooms behind it.",
    "Marina living is outward-facing: the promenade, the beach and the restaurants are the amenity.",
    "A mature rental market with consistent demand. Building age and service charges vary considerably here — worth comparing directly.",
  ),
  "Palm Jumeirah": notes(
    "A garden plot with private beach frontage on one of the most recognisable addresses in the region.",
    "Double-height entrance and living spaces that open the full width of the plot to the pool and beach.",
    "Private, low-density and quiet, with the promenade and marina a short drive away.",
    "Beachfront plots on the Palm are finite. Consider plot orientation and frontage width when comparing.",
  ),
  "Dubai Hills": notes(
    "Golf-course frontage within a planned community, with schools and retail inside the masterplan.",
    "Arranged around a central courtyard, which keeps the family rooms private from the formal reception.",
    "Green, low-rise and family-oriented — the park, schools and mall are all within the community.",
    "A newer community with steady handover activity. Compare plot size and golf frontage carefully.",
  ),
  "Business Bay": notes(
    "Canal-side, adjacent to Downtown, with the metro and the business district both close.",
    "A compact plan that puts the living space against the glazing and keeps circulation tight.",
    "Walkable to Marasi Drive, and a short drive from Downtown for everything else.",
    "A high-supply district with a wide quality range. Building and floor level matter more here than in most areas.",
  ),
  Jumeirah: notes(
    "An established low-rise neighbourhood minutes from the beach, with schools nearby.",
    "Mostly single-storey across the plot, with the principal suite lifted to a first-floor terrace.",
    "Quiet, green and residential, close to the coast road and the older retail streets.",
    "Low-density villa stock in a mature area. Plot size and the condition of the original build are the main variables.",
  ),
  "Dubai Creek Harbour": notes(
    "A waterfront masterplan facing the creek, with the airport unusually close for a new district.",
    "The balcony is set back from the glazing line, which keeps it usable through the afternoon.",
    "A new community still filling in — the promenade and retail are the first phase to open.",
    "Off-plan with a staged payment structure. Consider handover timing and the phasing of surrounding plots.",
  ),
  JVC: notes(
    "A central, well-connected residential district with its own retail and schools.",
    "A practical, efficient layout with more storage than the floor area suggests.",
    "Quiet and residential, with the community mall and parks within the circle.",
    "One of the more accessible entry points in the city. Compare service charges between buildings closely.",
  ),
};

export const DEFAULT_INVESTMENT_NOTES: InvestmentNote[] = notes(
  "Positioned within an established Dubai community with direct access to the main road network.",
  "A considered plan that prioritises outlook and daylight over room count.",
  "Close to the retail, dining and leisure that the surrounding community is built around.",
  "Worth assessing alongside comparable stock in the same community, with attention to service charges and floor level.",
);

export function getInvestmentNotes(property: Property): InvestmentNote[] {
  return NOTES_BY_COMMUNITY[property.community] ?? DEFAULT_INVESTMENT_NOTES;
}

/** Convenience accessors — no component should reach into the array directly. */
export function getAllProperties(): Property[] {
  return DEMO_PROPERTIES;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return DEMO_PROPERTIES.find((property) => property.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return DEMO_PROPERTIES.filter((property) => property.featured);
}

/**
 * Related properties, in priority order: same community, then same type, then
 * nearest by price. Never random — a rail of unrelated stock is worse than none.
 */
export function getRelatedProperties(property: Property, limit = 3): Property[] {
  const others = DEMO_PROPERTIES.filter((candidate) => candidate.id !== property.id);

  const score = (candidate: Property) => {
    let rank = 0;
    if (candidate.community === property.community) rank -= 100;
    if (candidate.propertyType === property.propertyType) rank -= 40;
    // Closer in price wins the tie-break; normalised so it never outweighs the
    // two categorical signals above.
    rank += Math.min(35, Math.abs(candidate.price - property.price) / property.price * 35);
    return rank;
  };

  return [...others].sort((a, b) => score(a) - score(b)).slice(0, limit);
}
