import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { FeatureBlocks } from "@/components/editorial/FeatureBlocks";
import { ProcessSteps } from "@/components/editorial/ProcessSteps";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";
import { DEMO_PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowRight } from "@/components/ui/Button";

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

      <section className="relative z-10 bg-bone text-ink py-[var(--spacing-section)]">
        <div className="shell">
          <header className="border-t border-ink/12 pt-12 sm:pt-16">
            <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40 mb-6">
              <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
              Investment Projects
            </p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
              <h2
                data-reveal="item"
                className="display-serif text-h2 leading-[1.02]"
              >
                SELECTED INVESTMENT OPPORTUNITIES
              </h2>
              <div className="flex flex-col gap-6 lg:max-w-[34ch] lg:items-start lg:pb-2">
                <p data-reveal="item" className="text-body font-light text-ink/55 lg:text-lead">
                  Explore selected residential developments across Dubai.
                </p>
                <TransitionLink
                  data-reveal="item"
                  href="/properties"
                  className="group/btn label-caps flex items-center gap-3 text-ink/50 transition-colors duration-[400ms] hover:text-ink"
                >
                  View All Projects
                  <ArrowRight />
                </TransitionLink>
              </div>
            </div>
          </header>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {DEMO_PROPERTIES.filter(p => p.investmentFocused).slice(0, 4).map((property, index) => (
              <div
                key={property.id}
                data-reveal="item"
                className="w-full"
              >
                <PropertyCard
                  property={property}
                  priority={index < 4}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
