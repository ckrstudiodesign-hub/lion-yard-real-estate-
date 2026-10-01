import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { FeatureBlocks } from "@/components/editorial/FeatureBlocks";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Lion Yard Real Estate",
  description:
    "A private real estate brokerage built on discretion, market intelligence, and long-term relationships.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${site.brand}`,
    description: "A private real estate brokerage built on discretion.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        headline="Discretion. Insight. Integrity."
        supporting="A private real estate brokerage built on market intelligence and long-term client relationships."
        image={heroMedia}
        primaryCta={{ label: "Speak to Us", href: "/contact" }}
        secondaryCta={{ label: "View Properties", href: "/properties" }}
      />

      <section className="shell py-[var(--spacing-section)]">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16 items-center">
          <div className="lg:col-span-5">
            <h2 data-reveal="item" className="display-serif text-h2 mb-6">
              Our Story
            </h2>
            <p data-reveal="item" className="text-body text-ink/70 max-w-[40ch] mb-6">
              Lion Yard was founded to serve a segment of the market that values privacy and deep market knowledge over mass marketing. We act as long-term advisors to our clients, guiding them through the complexities of the Dubai real estate landscape.
            </p>
            <p data-reveal="item" className="text-body text-ink/70 max-w-[40ch]">
              We believe in quality over quantity. By limiting the volume of our active mandates, we ensure that every client receives our undivided attention and the full benefit of our market experience.
            </p>
          </div>
          <div className="lg:col-span-7 h-[600px] relative bg-charcoal">
            <Image
              src="/property images/Sobha/Sobha Central/sobha-central.jpg"
              alt="Office interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <FeatureBlocks
        title="Our Philosophy"
        columns={3}
        className="bg-bone-alt"
        blocks={[
          {
            id: "discretion",
            title: "Discretion First",
            description: "We handle our clients' affairs with absolute confidentiality. Many of our most significant transactions never reach the public domain.",
          },
          {
            id: "intelligence",
            title: "Market Intelligence",
            description: "Our advice is rooted in data. We track every transaction and development in our focus areas to provide accurate, actionable insights.",
          },
          {
            id: "relationships",
            title: "Enduring Relationships",
            description: "We are not interested in a single transaction. We measure our success by the longevity of our client relationships.",
          },
        ]}
      />

      <EditorialCTA
        headline="Let's discuss your requirements."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "Explore Properties", href: "/properties" }}
      />
    </>
  );
}
