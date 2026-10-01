"use client";

import { OFF_PLAN_PROPERTIES } from "@/data/off-plan-properties";
import { OffPlanCard } from "./OffPlanCard";

export function OffPlanInvestmentCollection() {
  const investmentProps = OFF_PLAN_PROPERTIES.filter(p => p.categories.includes("Investment")).slice(0, 4);

  return (
    <section className="bg-bone text-ink py-20 lg:py-24 border-b border-ink/10" data-surface="light">
      <div className="shell">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="display-serif text-h3 mb-3">Investment Opportunities</h2>
            <p className="text-body text-ink/70">
              Explore high-growth areas, lower entry points, and flexible payment plans designed to maximize your investment potential.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {investmentProps.map(prop => (
            <div key={prop.id} className="relative">
              <span className="absolute -top-3 left-4 z-10 bg-ink text-bone label-caps text-[0.55rem] tracking-[0.2em] px-3 py-1 shadow-md">
                High Transaction Activity
              </span>
              <OffPlanCard
                property={prop}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
