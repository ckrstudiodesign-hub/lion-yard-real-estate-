import type { Community, CommunityImage } from "@/types/community";

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const img = (id: string, alt: string, w = 1600): CommunityImage => ({
  src: unsplash(id, w),
  alt,
});

export const DEMO_COMMUNITIES: Community[] = [
  {
    id: "COM-001",
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    shortDescription: "The Heart of Modern Dubai",
    description:
      "A mixed-use flagship mega-development by Emaar Properties, famous for housing the Burj Khalifa, The Dubai Mall, and The Dubai Fountain. Downtown Dubai is a pedestrian-friendly community offering an unparalleled urban lifestyle with luxury apartments, high-end retail, and world-class dining.",
    heroImage: img("1512453979798-5ea266f8880c", "Downtown Dubai skyline at dusk"),
    images: [
      img("1600607687939-ce8a6c25118c", "Downtown views from an apartment"),
      img("1522708323590-d24dbb6b0267", "Modern architecture in Downtown"),
    ],
    location: "Central Dubai",
    propertyTypes: ["Apartments", "Penthouses"],
    highlights: ["Central Location", "Luxury Lifestyle", "Dining & Entertainment"],
    featured: true,
    coordinates: { latitude: 25.1972, longitude: 55.2744 },
    categories: ["CITY", "LUXURY", "APARTMENT LIVING"],
  },
  {
    id: "COM-002",
    slug: "dubai-marina",
    name: "Dubai Marina",
    shortDescription: "Waterfront Living at its Finest",
    description:
      "An affluent residential neighborhood known for The Beach at JBR, a leisure complex with al fresco dining and sandy stretches to relax on. Smart cafes and pop-up craft markets line waterside promenade Dubai Marina Walk.",
    heroImage: img("1545324418-cc1a3fa10c00", "Dubai Marina towers rising above the waterfront"),
    images: [
      img("1502672260266-1c1ef2d93688", "Marina apartment interior"),
    ],
    location: "Coastal Dubai",
    propertyTypes: ["Apartments", "Penthouses", "Villas"],
    highlights: ["Waterfront Living", "Vibrant Nightlife", "Beach Access"],
    featured: true,
    coordinates: { latitude: 25.0805, longitude: 55.1403 },
    categories: ["WATERFRONT", "CITY", "APARTMENT LIVING"],
  },
  {
    id: "COM-003",
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    shortDescription: "The World's Most Iconic Island",
    description:
      "Built in the shape of a palm tree, this artificial archipelago is a landmark in engineering and luxury living. Featuring some of the most opulent resorts, beachfront villas, and luxury apartments in Dubai.",
    heroImage: img("1613977257363-707ba9348227", "Contemporary villa on Palm Jumeirah"),
    images: [
      img("1600585154340-be6161a56a0c", "Luxury property interior"),
    ],
    location: "Coastal Dubai",
    propertyTypes: ["Villas", "Apartments", "Penthouses"],
    highlights: ["Private Beach Access", "Exclusive Resorts", "Iconic Architecture"],
    featured: true,
    coordinates: { latitude: 25.1124, longitude: 55.139 },
    categories: ["WATERFRONT", "LUXURY", "VILLA LIVING"],
  },
  {
    id: "COM-004",
    slug: "business-bay",
    name: "Business Bay",
    shortDescription: "The New Financial District",
    description:
      "A central business district in Dubai featuring numerous skyscrapers located in an area where Dubai Creek has been dredged and extended. Fast becoming the central hub for global businesses and urban living.",
    heroImage: img("1600566753086-00f18fb6b3ea", "Business Bay skyline"),
    images: [
      img("1556912167-f556f1f39fdf", "Business Bay apartment"),
    ],
    location: "Central Dubai",
    propertyTypes: ["Apartments", "Offices"],
    highlights: ["Central Location", "Strong Connectivity", "Canal Views"],
    featured: true,
    coordinates: { latitude: 25.1857, longitude: 55.2654 },
    categories: ["CITY", "INVESTMENT", "APARTMENT LIVING"],
  },
  {
    id: "COM-005",
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    shortDescription: "The Green Heart of Dubai",
    description:
      "A master-planned community by Emaar featuring a championship golf course, vast parks, and a regional mall. Ideal for families seeking a quiet but connected lifestyle.",
    heroImage: img("1600585154340-be6161a56a0c", "Dubai Hills villa exterior"),
    images: [
      img("1560448204-e02f11c3d0e2", "Dubai Hills interior"),
    ],
    location: "Central Dubai",
    propertyTypes: ["Villas", "Townhouses", "Apartments"],
    highlights: ["Golf Course", "Family Oriented", "Extensive Parks"],
    featured: false,
    coordinates: { latitude: 25.1017, longitude: 55.2497 },
    categories: ["FAMILY", "VILLA LIVING"],
  },
  {
    id: "COM-006",
    slug: "jumeirah",
    name: "Jumeirah",
    shortDescription: "Classic Coastal Luxury",
    description:
      "One of Dubai's oldest and most prestigious coastal residential areas. Known for its low-rise villas, tree-lined streets, and proximity to Jumeirah Beach.",
    heroImage: img("1600596542815-ffad4c1539a9", "Jumeirah villa exterior"),
    images: [
      img("1600210492486-724fe5c67fb0", "Jumeirah villa interior"),
    ],
    location: "Coastal Dubai",
    propertyTypes: ["Villas"],
    highlights: ["Beach Proximity", "Low-rise Living", "Established Neighborhood"],
    featured: false,
    coordinates: { latitude: 25.2048, longitude: 55.2432 },
    categories: ["FAMILY", "WATERFRONT", "VILLA LIVING"],
  },
  {
    id: "COM-007",
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    shortDescription: "The Future of Waterfront Living",
    description:
      "An innovative new development on the banks of Dubai Creek. Offering stunning views of the Downtown skyline and promising to be a major new hub for the city.",
    heroImage: img("1518684079-3c830dcef090", "Dubai Creek Harbour sunset"),
    images: [
      img("1493809842364-78817add7ffb", "Creek Harbour apartment interior"),
    ],
    location: "Dubai Creek",
    propertyTypes: ["Apartments", "Penthouses"],
    highlights: ["New Development", "Waterfront Living", "Skyline Views"],
    featured: false,
    coordinates: { latitude: 25.1976, longitude: 55.3505 },
    categories: ["WATERFRONT", "INVESTMENT", "APARTMENT LIVING"],
  },
  {
    id: "COM-008",
    slug: "jvc",
    name: "Jumeirah Village Circle",
    shortDescription: "A Connected Community",
    description:
      "A family-friendly development designed to provide a sense of community. Featuring numerous parks, sports fields, and schools, JVC is a popular choice for young families and professionals.",
    heroImage: img("1502672260266-1c1ef2d93688", "JVC apartment exterior"),
    images: [
      img("1600607687920-4e2a09cf159d", "JVC apartment interior"),
    ],
    location: "Central Dubai",
    propertyTypes: ["Apartments", "Townhouses", "Villas"],
    highlights: ["Family Oriented", "Affordable Luxury", "Parks & Schools"],
    featured: false,
    coordinates: { latitude: 25.0589, longitude: 55.2093 },
    categories: ["FAMILY", "INVESTMENT"],
  },
  {
    id: "COM-009",
    slug: "dubai-land",
    name: "Dubai Land",
    shortDescription: "Expansive Family Living",
    description:
      "A massive entertainment and residential district offering a wide variety of housing options. From affordable apartments to luxury villas, Dubailand caters to a diverse population.",
    heroImage: img("1560448204-e02f11c3d0e2", "Dubailand property"),
    images: [
      img("1493809842364-78817add7ffb", "Dubailand interior"),
    ],
    location: "Inland Dubai",
    propertyTypes: ["Villas", "Townhouses", "Apartments"],
    highlights: ["Entertainment Hub", "Diverse Options", "Expansive Parks"],
    featured: false,
    coordinates: { latitude: 25.0743, longitude: 55.3056 },
    categories: ["FAMILY", "INVESTMENT"],
  },
];

export function getAllCommunities(): Community[] {
  return DEMO_COMMUNITIES;
}

export function getCommunityBySlug(slug: string): Community | undefined {
  return DEMO_COMMUNITIES.find((community) => community.slug === slug);
}

export function getFeaturedCommunities(): Community[] {
  return DEMO_COMMUNITIES.filter((community) => community.featured);
}
