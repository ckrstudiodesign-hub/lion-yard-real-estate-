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
            image: { src: "/property images/Binghatti/bugatti residences/bugatti-residences_LFzYK_xl.jpg", alt: "Apartments" },
          },
          {
            id: "villas",
            title: "Villas",
            href: "/properties?type=Villa",
            image: { src: "/property images/DAMAC/DAMAC Islands/damac-islands_56syt_xl.jpg", alt: "Villas" },
          },
          {
            id: "townhouses",
            title: "Townhouses",
            href: "/properties?type=Townhouse",
            image: { src: "/property images/Deyaar/Tria by Deyaar/tria-by-deyaar_4bUbX_xl.jpg", alt: "Townhouses" },
          },
          {
            id: "penthouses",
            title: "Penthouses",
            href: "/properties?type=Penthouse",
            image: { src: "/property images/Binghatti/burj binghatti jacob and co/burj-binghatti-jacob-co-residences_9UNAR_xl.jpg", alt: "Penthouses" },
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
            image: { src: "/property images/Azizi/Burj Azizi/burj-azizi_0KwEy_xl.jpg", alt: "City Living" },
          },
          {
            id: "waterfront",
            title: "Waterfront Living",
            image: { src: "/property images/danube/oceanz tower 3/oceanz-tower-3_USVW0_xl.jpg", alt: "Waterfront Living" },
          },
          {
            id: "villa",
            title: "Villa Living",
            image: { src: "/property images/DAMAC/DAMAC Lagoons Valencia/valencia-at-damac-lagoons_1d6x3_xl.jpg", alt: "Villa Living" },
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
