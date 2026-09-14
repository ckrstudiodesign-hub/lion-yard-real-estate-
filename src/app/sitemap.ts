import type { MetadataRoute } from "next";

import { DEMO_PROPERTIES } from "@/data/properties";
import { primaryNav, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...primaryNav.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...DEMO_PROPERTIES.map((property) => ({
      url: `${site.url}/properties/${property.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
