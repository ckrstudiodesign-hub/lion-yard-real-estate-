import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { FeatureBlocks } from "@/components/editorial/FeatureBlocks";
import { ProcessSteps } from "@/components/editorial/ProcessSteps";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Property Investment in Dubai",
  description:
    "Data-driven advisory for portfolio growth and real estate investment across Dubai.",
  alternates: { canonical: "/invest" },
  openGraph: {
    title: `Invest | ${site.brand}`,
    description: "Data-driven advisory for portfolio growth and real estate investment.",
  },
};

export default function InvestPage() {
  return (
    <>
      <PageHero
        headline="Strategic Investment Advisory."
        supporting="Data-driven advisory for portfolio growth, yield optimization, and capital appreciation across Dubai's real estate sectors."
        image={{ ...heroMedia, alt: "Dubai skyline at night" }}
        primaryCta={{ label: "View Investment Properties", href: "/properties" }}
        secondaryCta={{ label: "Speak to an Advisor", href: "/contact" }}
      />

      <FeatureBlocks
        title="Our Investment Principles"
        columns={3}
        className="bg-bone-alt"
        blocks={[
          {
            id: "data",
            title: "Data-Driven Analysis",
            description: "We base our recommendations on rigorous market analysis, current transaction data, and yield projections rather than market sentiment.",
          },
          {
            id: "longterm",
            title: "Long-Term View",
            description: "We focus on sustainable growth and resilient assets that perform across market cycles, protecting and growing your capital.",
          },
          {
            id: "tailored",
            title: "Tailored Strategy",
            description: "Every investor has a different risk profile and objective. We build portfolios aligned precisely with your financial goals.",
          },
        ]}
      />

      <ProcessSteps
        title="The Investment Process"
        steps={[
          {
            step: "01",
            title: "Strategy",
            description: "Define objectives, timeline, risk profile, and expected yields.",
          },
          {
            step: "02",
            title: "Sourcing",
            description: "Identify on and off-market opportunities matching your criteria.",
          },
          {
            step: "03",
            title: "Acquisition",
            description: "Negotiate terms and manage the transaction through to handover.",
          },
          {
            step: "04",
            title: "Management",
            description: "Ongoing portfolio management, letting, and strategic exit planning.",
          },
        ]}
      />

      <EditorialCTA
        headline="Start building your portfolio."
        primaryCta={{ label: "View Investment Properties", href: "/properties" }}
        secondaryCta={{ label: "Speak to an Advisor", href: "/contact" }}
      />
    </>
  );
}
