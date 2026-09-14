import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { FeatureBlocks } from "@/components/editorial/FeatureBlocks";
import { ProcessSteps } from "@/components/editorial/ProcessSteps";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { CommunityCard } from "@/components/community/CommunityCard";
import { getFeaturedCommunities } from "@/data/communities";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Buy Property in Dubai",
  description:
    "Explore exceptional homes, investment opportunities and carefully selected properties across Dubai with Lion Yard Real Estate.",
  alternates: { canonical: "/buy" },
  openGraph: {
    title: `Buy | ${site.brand}`,
    description: "Explore exceptional homes and investment opportunities across Dubai.",
  },
};

export default function BuyPage() {
  const communities = getFeaturedCommunities();

  return (
    <>
      <PageHero
        headline="Find Your Place in Dubai."
        supporting="Explore exceptional homes, investment opportunities and carefully selected properties across Dubai."
        image={heroMedia}
        primaryCta={{ label: "Explore Properties", href: "/properties" }}
        secondaryCta={{ label: "Speak to an Advisor", href: "/contact" }}
      />

      <FeatureBlocks
        title="Find the Right Property"
        columns={4}
        blocks={[
          {
            id: "apartments",
            title: "Apartments",
            href: "/properties?type=Apartment",
            image: { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", alt: "Apartments" },
          },
          {
            id: "villas",
            title: "Villas",
            href: "/properties?type=Villa",
            image: { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80", alt: "Villas" },
          },
          {
            id: "townhouses",
            title: "Townhouses",
            href: "/properties?type=Townhouse",
            image: { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Townhouses" },
          },
          {
            id: "penthouses",
            title: "Penthouses",
            href: "/properties?type=Penthouse",
            image: { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "Penthouses" },
          },
        ]}
      />

      <FeatureBlocks
        title="Choose Your Lifestyle"
        columns={3}
        className="bg-bone-alt"
        blocks={[
          {
            id: "city",
            title: "City Living",
            image: { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", alt: "City Living" },
          },
          {
            id: "waterfront",
            title: "Waterfront Living",
            image: { src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80", alt: "Waterfront Living" },
          },
          {
            id: "villa",
            title: "Villa Living",
            image: { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Villa Living" },
          },
        ]}
      />

      <section className="shell py-[var(--spacing-section)]">
        <h2 data-reveal="item" className="display-serif text-h2 mb-16 lg:mb-24">
          Explore Dubai's Communities
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {communities.slice(0, 4).map((community, index) => (
            <div key={community.id} data-reveal="item" className="w-full">
              <CommunityCard
                community={community}
                priority={index < 4}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      <ProcessSteps
        title="The Lion Yard Buying Process"
        steps={[
          {
            step: "01",
            title: "Define",
            description: "Understand your requirements, budget and timeline.",
          },
          {
            step: "02",
            title: "Discover",
            description: "Explore suitable properties on and off the market.",
          },
          {
            step: "03",
            title: "View",
            description: "Arrange property viewings and neighborhood tours.",
          },
          {
            step: "04",
            title: "Move",
            description: "Move forward with confidence through the transaction.",
          },
        ]}
      />

      <EditorialCTA
        headline="Ready to find your property?"
        primaryCta={{ label: "Explore Properties", href: "/properties" }}
        secondaryCta={{ label: "Speak to an Advisor", href: "/contact" }}
      />
    </>
  );
}
