"use client";

import { useRef, useState } from "react";

import {
  AreaMaxField,
  AreaMinField,
  BathroomsField,
  BedroomsField,
  FeaturedToggle,
  FurnishedField,
  LocationField,
  PropertyTypeField,
  StatusField,
  DeveloperField,
  CategoryField,
} from "@/components/property/FilterFields";
import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Desktop filter bar — four fields on one hairline row, with the rest behind
 * MORE FILTERS.
 *
 * Putting all eleven filters on screen at once would produce a control panel,
 * and this is a property site, not an admin tool. Location, type, bedrooms and
 * price cover the overwhelming majority of searches; bathrooms, area, status,
 * furnishing and featured are refinements and sit one interaction away.
 *
 * The panel expands in place rather than overlaying, so the results stay in
 * view and the visitor can see the count move as they narrow.
 */
const FIELD =
  "relative px-8 py-7 border-r border-ink/10 last:border-r-0";

export function FilterBar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { filters } = usePropertyFilters();

  // Count the refinements hidden behind MORE FILTERS, so the visitor is never
  // filtering by something they cannot see.
  const hiddenCount = [
    filters.bathrooms !== "any",
    filters.areaMin !== null || filters.areaMax !== null,
    filters.status !== "any",
    filters.furnished !== "any",
    filters.featuredOnly,
    filters.developer !== "any",
    filters.category !== "any",
  ].filter(Boolean).length;

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion()) {
      panel.style.height = open ? "auto" : "0px";
      panel.style.opacity = open ? "1" : "0";
      return;
    }

    const tween = gsap.to(panel, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.5,
      ease: GSAP_EASE.lux,
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <div className="hidden border-y border-ink/15 lg:block">
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        <div className={FIELD}>
          <LocationField />
        </div>
        <div className={FIELD}>
          <PropertyTypeField />
        </div>
        <div className={FIELD}>
          <BedroomsField />
        </div>
        <div className={FIELD}>
          <BathroomsField />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="more-filters"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "label-caps flex min-w-[14rem] items-center justify-center gap-3 border-l border-ink/10 px-8 transition-colors duration-[300ms]",
            open ? "bg-ink text-bone" : "text-ink hover:bg-ink/[0.04]",
          )}
        >
          {open ? "Fewer Filters" : "More Filters"}
          {hiddenCount > 0 ? (
            <span
              className={cn(
                "flex h-5 min-w-5 items-center justify-center px-1 text-[0.55rem] tabular-nums",
                open ? "bg-bone text-ink" : "bg-ink text-bone",
              )}
            >
              {hiddenCount}
            </span>
          ) : null}
          <svg
            viewBox="0 0 14 8"
            aria-hidden="true"
            className={cn(
              "h-[7px] w-3.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              open && "-rotate-180",
            )}
          >
            <path d="M1 1.5 7 6.5 13 1.5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </button>
      </div>

      <div
        ref={panelRef}
        id="more-filters"
        // `inert` while collapsed: the panel keeps its DOM so the height tween
        // has something to measure, but a zero-height field must not be
        // reachable by Tab.
        inert={!open}
        style={{ height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-ink/10 bg-ink/[0.02]"
      >
        <div className="grid grid-cols-[repeat(7,minmax(0,1fr))]">
          <div className={FIELD}>
            <DeveloperField />
          </div>
          <div className={FIELD}>
            <CategoryField />
          </div>
          <div className={FIELD}>
            <StatusField />
          </div>
          <div className={FIELD}>
            <AreaMinField />
          </div>
          <div className={FIELD}>
            <AreaMaxField />
          </div>
          <div className={FIELD}>
            <FurnishedField />
          </div>
          <div className={cn(FIELD, "flex items-end")}>
            <FeaturedToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
