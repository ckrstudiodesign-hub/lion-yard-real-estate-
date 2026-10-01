"use client";

import { useState, useMemo } from "react";
import { OffPlanCard } from "./OffPlanCard";
import { OFF_PLAN_PROPERTIES, OffPlanCategory } from "@/data/off-plan-properties";
import { cn } from "@/lib/cn";

const DEVELOPERS = [
  "All Developers",
  "Nakheel",
  "Sobha",
  "Azizi",
  "DAMAC",
  "Danube",
  "Binghatti",
  "Dugasta",
  "Deyaar",
];

const CATEGORIES = [
  "All Properties",
  "Ultra Luxury",
  "Luxury",
  "Waterfront",
  "Branded Residences",
  "Villas",
  "Apartments",
  "Investment",
  "Ready Soon",
  "High Growth",
];

export function OffPlanCatalog() {
  const [activeDev, setActiveDev] = useState("All Developers");
  const [activeCat, setActiveCat] = useState("All Properties");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = useMemo(() => {
    return OFF_PLAN_PROPERTIES.filter((prop) => {
      // Developer Match
      if (activeDev !== "All Developers" && prop.developer !== activeDev) return false;
      // Category Match
      if (activeCat !== "All Properties" && !prop.categories.includes(activeCat as OffPlanCategory)) return false;
      // Search Match
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = prop.projectName.toLowerCase().includes(query);
        const matchDev = prop.developer.toLowerCase().includes(query);
        const matchLoc = prop.location.toLowerCase().includes(query);
        if (!matchTitle && !matchDev && !matchLoc) return false;
      }
      return true;
    });
  }, [activeDev, activeCat, searchQuery]);

  return (
    <section id="catalog" className="bg-bone text-ink py-20 lg:py-32" data-surface="light">
      <div className="shell">
        <div className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="display-serif text-h3 mb-3">Featured Properties</h2>
              <p className="text-body text-ink/60 max-w-2xl">
                Curated opportunities across Dubai&apos;s most sought-after communities.
              </p>
            </div>
            
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search by project, developer or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-ink/20 bg-transparent py-3 text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Developer Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {DEVELOPERS.map((dev) => (
                <button
                  key={dev}
                  onClick={() => setActiveDev(dev)}
                  className={cn(
                    "whitespace-nowrap px-5 py-2.5 rounded-full text-[0.8rem] transition-colors border",
                    activeDev === dev
                      ? "bg-ink text-bone border-ink"
                      : "bg-transparent text-ink/70 border-ink/10 hover:border-ink/30"
                  )}
                >
                  {dev}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-1.5 rounded text-[0.75rem] uppercase tracking-wider transition-colors",
                    activeCat === cat
                      ? "bg-champagne text-ink font-medium"
                      : "bg-transparent text-ink/60 hover:text-ink hover:bg-ink/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <OffPlanCard
                key={prop.id}
                property={prop}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <p className="text-lead text-ink/50">No properties match your exact filters.</p>
              <button 
                onClick={() => { setActiveDev("All Developers"); setActiveCat("All Properties"); setSearchQuery(""); }}
                className="mt-4 text-champagne underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-ink/10 text-center">
          <p className="text-[0.7rem] text-ink/40 max-w-4xl mx-auto leading-relaxed">
            Property information is subject to change. Availability, payment plans and handover timelines are based on information available at the time of publication. Please contact Golden Legacy Real Estate for the latest verified information.
          </p>
        </div>
      </div>
    </section>
  );
}
