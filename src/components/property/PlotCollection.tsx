"use client";

import { useMemo, useState } from "react";

import { PLOT_PROPERTIES } from "@/data/plots";
import { PropertyCard } from "@/components/property/PropertyCard";

const LOCATIONS = [
  { id: "all", label: "All Locations" },
  { id: "dubai", label: "Dubai" },
  { id: "ajman", label: "Ajman" },
  { id: "ras-al-khaimah", label: "Ras Al Khaimah (RAK)" },
  { id: "umm-al-quwain", label: "Umm Al Quwain (UAQ)" },
] as const;

export function PlotCollection() {
  const [location, setLocation] = useState<(typeof LOCATIONS)[number]["id"]>("all");
  const filtered = useMemo(
    () =>
      location === "all"
        ? PLOT_PROPERTIES
        : PLOT_PROPERTIES.filter((property) =>
            property.emirate?.toLowerCase().replaceAll(" ", "-") === location,
          ),
    [location],
  );

  return (
    <section className="shell border-t border-ink/10 py-[var(--spacing-section)]" aria-labelledby="plots-heading">
      <div className="max-w-[58rem]">
        <p className="label-caps flex items-center gap-4 text-ink/40">
          <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
          Land &amp; Plots Collection
        </p>
        <h1 id="plots-heading" className="display-serif mt-7 text-h1 leading-[0.98]">
          Find Your Ground. Build Your Future.
        </h1>
        <p className="mt-7 max-w-[48ch] text-lead font-light text-ink/60">
          Explore selected land and plot opportunities across Dubai and the Northern Emirates.
        </p>
      </div>

      <div className="mt-12 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter plots by location">
        {LOCATIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={location === item.id}
            onClick={() => setLocation(item.id)}
            className={`label-caps shrink-0 border px-4 py-3 text-[0.55rem] tracking-[0.2em] transition-colors ${
              location === item.id
                ? "border-ink bg-ink text-bone"
                : "border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property, index) => (
            <PropertyCard key={property.id} property={property} sizes="(min-width: 1024px) 30vw, 90vw" priority={index === 0} />
          ))}
        </div>
      ) : (
        <p className="mt-14 border-t border-ink/12 pt-8 text-body text-ink/60">
          No current plot listings are published for this location. Speak with a Lion Yard advisor for current opportunities.
        </p>
      )}
    </section>
  );
}
