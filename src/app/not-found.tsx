import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { site } from "@/data/site";
import { heroMedia } from "@/data/media";

export const metadata: Metadata = {
  title: `Not Found | ${site.brand}`,
};

export default function NotFound() {
  return (
    <PageHero
      headline="Not Found."
      supporting="The page you're looking for doesn't exist."
      image={heroMedia}
      primaryCta={{ label: "Back to Home", href: "/" }}
      secondaryCta={{ label: "Explore Properties", href: "/properties" }}
    />
  );
}
