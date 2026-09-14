"use client";

import { useMemo, useState } from "react";
import { CommunityCard } from "@/components/community/CommunityCard";
import { cn } from "@/lib/cn";
import type { Community } from "@/types/community";

export function CommunitiesClient({ communities }: { communities: Community[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    communities.forEach(c => c.categories.forEach(cat => cats.add(cat)));
    return Array.from(cats).sort();
  }, [communities]);

  const filteredCommunities = useMemo(() => {
    if (!activeFilter) return communities;
    return communities.filter(c => c.categories.includes(activeFilter));
  }, [communities, activeFilter]);

  return (
    <main className="min-h-screen bg-bone text-ink">
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-24">
        <div className="shell">
          <div className="max-w-4xl">
            <h1 className="display-serif text-h1 leading-[1.02] animate-reveal-up opacity-0" style={{ animationFillMode: "forwards" }}>
              Explore Dubai
            </h1>
            <p className="mt-8 text-lead font-light text-ink/60 max-w-[44ch] animate-reveal-up opacity-0" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
              From waterfront living to urban landmarks, discover the communities where Dubai's most sought-after properties are located.
            </p>
          </div>
        </div>
      </header>

      <section className="pb-32">
        <div className="shell">
          <div className="flex flex-wrap gap-4 mb-16 animate-reveal-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            <button
              onClick={() => setActiveFilter(null)}
              className={cn(
                "label-caps px-6 py-3 border transition-colors",
                activeFilter === null 
                  ? "border-ink bg-ink text-bone" 
                  : "border-ink/10 hover:border-ink/30"
              )}
            >
              All
            </button>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "label-caps px-6 py-3 border transition-colors",
                  activeFilter === cat 
                    ? "border-ink bg-ink text-bone" 
                    : "border-ink/10 hover:border-ink/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-reveal-up opacity-0" style={{ animationDelay: "450ms", animationFillMode: "forwards" }}>
            {filteredCommunities.map((community, idx) => (
              <CommunityCard 
                key={community.id} 
                community={community} 
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={idx < 6}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
