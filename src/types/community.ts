export interface CommunityImage {
  src: string;
  alt: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: CommunityImage;
  images: CommunityImage[];
  location: string; // The broader area or coordinates, here just a string for display
  propertyTypes: string[];
  highlights: string[];
  featured: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  categories: string[];
}
