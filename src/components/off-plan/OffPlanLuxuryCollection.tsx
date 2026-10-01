"use client";

import { OFF_PLAN_PROPERTIES } from "@/data/off-plan-properties";
import { OffPlanCard } from "./OffPlanCard";

const LUXURY_IDS = [
  "nakheel-palm-central",
  "nakheel-como-residences",
  "azizi-burj-azizi",
  "binghatti-mercedes-benz",
  "binghatti-jacob-co",
  "binghatti-bugatti",
  "damac-chelsea",
];

export function OffPlanLuxuryCollection() {
  const luxuryProps = OFF_PLAN_PROPERTIES.filter(p => LUXURY_IDS.includes(p.id));

  return (
    <section className="bg-ink text-bone py-24 lg:py-32" data-surface="dark">
      <div className="shell">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="label-caps text-champagne mb-4">Dubai Luxury Collection</p>
          <h2 className="display-serif text-h2 md:text-h1">The Pinnacle of Living</h2>
        </div>

        <div className="space-y-16 lg:space-y-32">
          {luxuryProps.map((prop, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={prop.id} className={`flex flex-col gap-8 lg:gap-16 ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
                <div className="w-full lg:w-3/5">
                  <OffPlanCard
                    property={prop}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-video [&_[data-card-media]]:aspect-auto [&_[data-card-media]]:h-full"
                  />
                </div>
                <div className="w-full lg:w-2/5 flex flex-col justify-center px-4 lg:px-12 text-center lg:text-left">
                  <p className="label-caps text-bone/50 mb-4">{prop.developer}</p>
                  <h3 className="display-serif text-h3 md:text-h2 leading-tight mb-6">{prop.projectName}</h3>
                  <p className="text-body text-bone/70 mb-8">{prop.shortDescription}</p>
                  <ul className="space-y-3 mb-10 text-left w-max mx-auto lg:mx-0">
                    {prop.benefits.slice(0,3).map(b => (
                      <li key={b} className="flex items-center gap-3 text-sm text-bone/80">
                        <span className="text-champagne">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  {/* Re-using the OffPlanCard's Enquire logic inside the card, but visually we can add extra CTA here or let them click the card */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
