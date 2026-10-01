"use client";

import { useEffect, useRef, useState } from "react";

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
import { activeChips } from "@/lib/filters";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useScrollLock } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Mobile filter drawer.
 *
 * A full-screen sheet rather than a shrunken version of the desktop bar: on a
 * phone every filter gets a full-width row at a thumb-sized height, and the two
 * actions that matter — reset, and see the results — are pinned to the bottom
 * where the thumb already is.
 *
 * The results count on the confirm button updates live as filters change, so
 * the visitor knows what they will get before they commit to closing the sheet.
 */
export function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const { filters, reset, results } = usePropertyFilters();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const count = activeChips(filters).length;

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [role="combobox"], [role="switch"]',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-drawer="panel"]', { yPercent: 0 });
        gsap.set('[data-drawer="veil"]', { autoAlpha: 1 });
        return;
      }

      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: GSAP_EASE.lux } })
        .fromTo('[data-drawer="veil"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0)
        .fromTo(
          '[data-drawer="panel"]',
          { yPercent: 100 },
          { yPercent: 0, duration: 0.55 },
          0,
        );
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (open) timeline.play();
    else timeline.reverse();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="filter-drawer"
        className="label-caps flex h-14 w-full items-center justify-center gap-3 bg-ink text-bone lg:hidden"
      >
        Filter Properties
        {count > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center bg-bone px-1 text-[0.55rem] tabular-nums text-ink">
            {count}
          </span>
        ) : null}
      </button>

      <div
        ref={rootRef}
        id="filter-drawer"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-[115] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          data-drawer="veil"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/60"
          style={{ opacity: 0, visibility: "hidden" }}
        />

        <div
          ref={panelRef}
          data-drawer="panel"
          role="dialog"
          aria-modal="true"
          aria-label="Filter properties"
          className="absolute inset-x-0 bottom-0 top-12 flex flex-col bg-bone text-ink"
          style={{ transform: "translateY(100%)" }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-ink/12 px-[var(--spacing-gutter)] py-5">
            <h2 className="display-serif text-[1.5rem] leading-none">Filter</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="label-caps -mr-2 flex h-11 items-center gap-3 px-2 text-ink/55 transition-colors duration-[220ms] hover:text-ink"
            >
              Close
              <span aria-hidden="true" className="relative block h-3.5 w-3.5">
                <span className="absolute top-1.5 block h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1.5 block h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--spacing-gutter)]">
            {[
              { label: "Location", node: <LocationField /> },
              { label: "Property type", node: <PropertyTypeField /> },
              { label: "Developer", node: <DeveloperField /> },
              { label: "Category", node: <CategoryField /> },
              { label: "Bedrooms", node: <BedroomsField /> },
              { label: "Bathrooms", node: <BathroomsField /> },

              { label: "Minimum area", node: <AreaMinField /> },
              { label: "Maximum area", node: <AreaMaxField /> },
              { label: "Status", node: <StatusField /> },
              { label: "Furnished", node: <FurnishedField /> },
            ].map((field) => (
              <div key={field.label} className="border-b border-ink/10 py-5">
                {field.node}
              </div>
            ))}
            <div className="py-6">
              <FeaturedToggle />
            </div>
          </div>

          <div className="flex shrink-0 items-stretch border-t border-ink/12">
            <button
              type="button"
              onClick={reset}
              className="label-caps flex h-16 flex-1 items-center justify-center text-ink/60 transition-colors duration-[300ms] hover:text-ink"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="label-caps flex h-16 flex-[1.6] items-center justify-center gap-3 bg-ink text-bone"
            >
              Show {results.length} {results.length === 1 ? "Result" : "Results"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
