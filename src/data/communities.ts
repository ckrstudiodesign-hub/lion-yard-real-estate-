import type { Community, CommunityImage } from "@/types/community";

const localImg = (src: string, alt: string): CommunityImage => ({
  src,
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
    heroImage: localImg("/property images/Azizi/Burj Azizi/burj-azizi_0KwEy_xl.jpg", "Downtown Dubai skyline at dusk"),
    images: [
      localImg("/property images/Binghatti/bugatti residences/bugatti-residences_6cXwE_xl.jpg", "Downtown views from an apartment"),
      localImg("/property images/Binghatti/bugatti residences/bugatti-residences_iwGkH_xl.jpg", "Modern architecture in Downtown"),
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
    heroImage: localImg("/property images/danube/oceanz tower 3/oceanz-tower-3_USVW0_xl.jpg", "Dubai Marina towers rising above the waterfront"),
    images: [
      localImg("/property images/danube/diamondz/diamondz-by-danube_8qgBE_xl.jpg", "Marina apartment interior"),
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
    heroImage: localImg("/property images/Nakheel/como residences/Como-Residences.jpg", "Contemporary villa on Palm Jumeirah"),
    images: [
      localImg("/property images/Nakheel/bay grove residences/gallery-images-1920x1080-int-01.jpg", "Luxury property interior"),
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
    heroImage: localImg("/property images/danube/bayz 102/bayz-102_4kK70_xl.jpg", "Business Bay skyline"),
    images: [
      localImg("/property images/Binghatti/bugatti residences/bugatti-residences_LFzYK_xl.jpg", "Business Bay apartment"),
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
    heroImage: localImg("/property images/DAMAC/DAMAC Islands/damac-islands_56syt_xl.jpg", "Dubai Hills villa exterior"),
    images: [
      localImg("/property images/Nakheel/bay grove residences/gallery-images-1920x1080-int-03.jpg", "Dubai Hills interior"),
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
    heroImage: localImg("/property images/DAMAC/DAMAC Lagoons Valencia/valencia-at-damac-lagoons_1d6x3_xl.jpg", "Jumeirah villa exterior"),
    images: [
      localImg("/property images/Nakheel/bay grove residences/gallery-images-1920x1080-int-04.jpg", "Jumeirah villa interior"),
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
    heroImage: localImg("/property images/Nakheel/bay grove residences/bay-grove-residences.jpg", "Dubai Creek Harbour sunset"),
    images: [
      localImg("/property images/Nakheel/bay grove residences/gallery-images-1920x1080-int-05.jpg", "Creek Harbour apartment interior"),
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
    heroImage: localImg("/property images/danube/serenz/serenz-by-danube_3ZZge_xl.jpg", "JVC apartment exterior"),
    images: [
      localImg("/property images/Binghatti/bugatti residences/bugatti-residences_OiD5w_xl.jpg", "JVC apartment interior"),
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
    heroImage: localImg("/property images/Dugasta/Terra Tower/terra-tower_IrlaY_xl.jpg", "Dubailand property"),
    images: [
      localImg("/property images/Nakheel/bay grove residences/gallery-images-1920x1080-int-01.jpg", "Dubailand interior"),
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
