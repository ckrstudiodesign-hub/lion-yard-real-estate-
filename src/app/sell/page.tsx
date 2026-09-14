import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { ProcessSteps } from "@/components/editorial/ProcessSteps";
import { ValuationForm } from "@/components/editorial/ValuationForm";
import { Accordion } from "@/components/ui/Accordion";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";
import { FeatureBlocks } from "@/components/editorial/FeatureBlocks";

export const metadata: Metadata = {
  title: "Sell Your Property in Dubai",
  description:
    "Position your property with a strategic approach to presentation, marketing and qualified buyer engagement.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: `Sell | ${site.brand}`,
    description: "Position your property with a strategic approach.",
  },
};

export default function SellPage() {
  return (
    <>
      <PageHero
        headline={
          <>
            <span className="block">Your Property Deserves</span>
            <span className="block">The Right Market.</span>
          </>
        }
        supporting="Position your property with a strategic approach to presentation, marketing and qualified buyer engagement."
        image={{ ...heroMedia, alt: "Luxury property exterior at dusk" }} 
        primaryCta={{ label: "Request a Valuation", href: "#valuation" }}
        secondaryCta={{ label: "Speak to Lion Yard", href: "/contact" }}
      />

      <FeatureBlocks
        title="A Strategic Approach to Selling"
        columns={4}
        className="bg-bone-alt"
        blocks={[
          {
            id: "positioning",
            title: "01 Market Positioning",
            description: "We analyze current market dynamics to position your property competitively, ensuring it attracts the right buyer demographic.",
          },
          {
            id: "presentation",
            title: "02 Property Presentation",
            description: "From architectural photography to staging advice, we ensure your property is presented at its absolute best.",
          },
          {
            id: "marketing",
            title: "03 Targeted Marketing",
            description: "Your property is placed on premium portals and our private network, reaching qualified local and international buyers.",
          },
          {
            id: "engagement",
            title: "04 Buyer Engagement",
            description: "We handle viewings and negotiations with discretion, focusing on securing the best possible terms for your sale.",
          },
        ]}
      />

      <ProcessSteps
        title="How We Sell"
        steps={[
          {
            step: "01",
            title: "Consultation",
            description: "Understand the property and owner's objectives.",
          },
          {
            step: "02",
            title: "Valuation",
            description: "Assess the property and market positioning.",
          },
          {
            step: "03",
            title: "Marketing",
            description: "Present the property professionally.",
          },
          {
            step: "04",
            title: "Viewings",
            description: "Coordinate qualified buyer interest.",
          },
          {
            step: "05",
            title: "Negotiation",
            description: "Support the transaction process.",
          },
        ]}
      />

      <ValuationForm />

      <section className="shell py-[var(--spacing-section)]">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <h2 data-reveal="item" className="display-serif text-h2 mb-6">
              Frequently Asked Questions
            </h2>
            <p data-reveal="item" className="text-body text-ink/60 max-w-[40ch]">
              Clear answers on how we manage the sale of your property from valuation to handover.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={[
                {
                  id: "faq-1",
                  question: "How does the valuation process work?",
                  answer: "We assess your property against recent transactions and active market data to provide a realistic and achievable valuation, rather than an inflated promise.",
                },
                {
                  id: "faq-2",
                  question: "What information do I need to provide?",
                  answer: "To begin, we require the title deed, passport copies of the owners, and details of any current tenancy agreements or service charge statuses.",
                },
                {
                  id: "faq-3",
                  question: "How is my property marketed?",
                  answer: "We use a combination of premium property portals, our internal client network, and targeted digital marketing to ensure your property reaches qualified buyers.",
                },
                {
                  id: "faq-4",
                  question: "How are viewings handled?",
                  answer: "All viewings are accompanied by a dedicated Lion Yard advisor. We qualify potential buyers beforehand to ensure we only bring genuine interest to your door.",
                },
                {
                  id: "faq-5",
                  question: "How do I get started?",
                  answer: "Simply submit a valuation request or contact us directly. An advisor will arrange a convenient time to visit the property and discuss your objectives.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
