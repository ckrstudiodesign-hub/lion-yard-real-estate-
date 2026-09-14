"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePropertyFilters } from "@/components/property/PropertyFilterProvider";
import { ShowcaseCard } from "@/components/property/ShowcaseCard";
import { scroll } from "@/components/providers/SmoothScrollProvider";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  useIsomorphicLayoutEffect,
  useReducedMotion,
} from "@/lib/hooks";
import { useSectionReveal } from "@/lib/reveal";

/**
 * DISCOVER MORE — the signature horizontal experience.
 *
 * TWO IMPLEMENTATIONS, chosen at runtime:
 *
 *   PINNED (desktop, motion allowed)
 *     The section pins and the track translates, tied directly to scroll
 *     progress. Travel is measured from the track's real `scrollWidth`, so it
 *     stays correct at any viewport and any number of cards — nothing about one
 *     screen width is assumed. `invalidateOnRefresh` re-measures on resize.
 *
 *   SWIPE (touch, narrow, or reduced motion)
 *     A native scroll-snap rail. Deliberately NOT the pinned version scaled
 *     down: hijacking vertical scroll on a phone is the single most common way
 *     this pattern is got wrong. Momentum, rubber-banding and accessibility
 *     settings all keep working because the browser is still doing the scrolling.
 *
 * PERFORMANCE. The progress line and counter are driven without React: the line
 * is written straight to a transform in the scroll callback, and state only
 * changes when the active card index actually changes — roughly once per card
 * rather than once per frame.
 *
 * KEYBOARD. Tabbing into an off-screen card would normally fight a pinned
 * section, so focusing a card scrolls the page to that card's position in the
 * pinned timeline. The sequence stays fully reachable without a pointer.
 *
 * THE SECTION NEVER UNMOUNTS. ScrollTrigger's `pin` re-parents the trigger
 * element into a pin-spacer it inserts itself. If React then removes that
 * element during an update — which is what an early `return null` on an empty
 * result set does — React tries to detach a node that is no longer a child of
 * the parent it remembers, and the page dies with "removeChild: the node to be
 * removed is not a child of this node". So the section, the viewport and the
 * track are always rendered; only the cards inside them come and go, and those
 * are nodes React owns outright. When the set is empty the pin is simply never
 * created.
 */
export function HorizontalShowcase({ id }: { id: string }) {
  const { results, narrowed, all } = usePropertyFilters();
  const shown = narrowed ? results : all;

  const reduced = useReducedMotion();
  const pinned = !reduced;

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = shown.length;

  useSectionReveal(sectionRef);

  /** Write progress to the DOM directly; only lift state when the card changes. */
  const applyProgress = useCallback(
    (progress: number) => {
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      const next = total > 1 ? Math.round(progress * (total - 1)) : 0;
      setActiveIndex((current) => (current === next ? current : next));
    },
    [total],
  );

  // ---- Pinned horizontal track -------------------------------------------
  useIsomorphicLayoutEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || total === 0) return;

    const context = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, { x: () => -distance(), ease: "none" });

      triggerRef.current = ScrollTrigger.create({
        animation: tween,
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        anticipatePin: 1,
        // 0.7, not 1: Lenis is already smoothing the wheel, and stacking a
        // second full second of scrub on top of it makes the track feel like it
        // is catching up with you rather than responding. Tune here if the
        // horizontal travel ever feels disconnected from the input.
        scrub: 0.7,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });

      // Counter-parallax: the photograph drifts against the card's travel.
      gsap.utils.toArray<HTMLElement>("[data-showcase-card]").forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-showcase-media]");
        if (!media) return;
        gsap.fromTo(
          media,
          { xPercent: 4 },
          {
            xPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      triggerRef.current = null;
      context.revert();
    };
  }, [pinned, total, applyProgress]);

  // ---- Swipe rail ---------------------------------------------------------
  useEffect(() => {
    if (pinned) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const max = viewport.scrollWidth - viewport.clientWidth;
      applyProgress(max > 0 ? viewport.scrollLeft / max : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pinned, applyProgress, total]);

  /** Keyboard: bring a focused card into view in whichever mode is running. */
  const focusCard = useCallback(
    (index: number) => {
      if (!pinned) return; // the swipe rail scrolls to focus on its own
      const trigger = triggerRef.current;
      if (!trigger || total < 2) return;
      const ratio = index / (total - 1);
      scroll.to(trigger.start + (trigger.end - trigger.start) * ratio);
    },
    [pinned, total],
  );

  const cards = shown.map((property, index) => (
    <div
      key={property.id}
      className={
        pinned
          ? "h-full shrink-0 pr-6 lg:pr-10"
          : "h-full shrink-0 snap-center pr-4 first:pl-[var(--spacing-gutter)] last:pr-[var(--spacing-gutter)] sm:pr-6"
      }
    >
      <ShowcaseCard
        property={property}
        index={index}
        total={total}
        active={index === activeIndex}
        onFocus={() => focusCard(index)}
      />
    </div>
  ));

  return (
    <section
      ref={sectionRef}
      id={id}
      data-surface="dark"
      aria-labelledby={`${id}-heading`}
      className="relative z-0 overflow-hidden bg-ink text-bone"
    >
      {/* The pinned frame is exactly one viewport tall and divided into three
          bands: heading, track, progress. The track takes what is left with
          `flex-1`, so the card can never be pushed below the fold no matter how
          short the laptop screen is. */}
      <div className="flex h-[100svh] min-h-[32rem] flex-col gap-7 pb-8 pt-[6.5rem] sm:gap-9 sm:pb-10 sm:pt-[7.5rem]">
        {/* Heading and supporting line sit side by side on desktop — stacking
            them costs vertical space the cards need. */}
        <header className="shell shrink-0">
          <p data-reveal="item" className="label-caps flex items-center gap-4 text-bone/45">
            <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
            The collection
          </p>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h2
              id={`${id}-heading`}
              data-reveal="item"
              className="display-serif text-h2 leading-[1.02]"
            >
              Discover More
            </h2>
            <p
              data-reveal="item"
              className="max-w-[42ch] text-body font-light text-bone/60 lg:pb-2 lg:text-lead"
            >
              Explore properties selected across Dubai&rsquo;s most desirable locations.
            </p>
          </div>
        </header>

        {total === 0 ? (
          <p data-reveal="item" className="shell flex-1 text-lead font-light text-bone/45">
            Adjust your search above to see properties here.
          </p>
        ) : null}

        {/* ---- Track --------------------------------------------------- */}
        <div
          ref={viewportRef}
          aria-hidden={total === 0 ? true : undefined}
          className={
            pinned
              ? "min-h-0 w-full flex-1 overflow-hidden"
              : [
                  "min-h-0 w-full flex-1 overflow-x-auto overflow-y-hidden",
                  "snap-x snap-mandatory scroll-smooth",
                  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                ].join(" ")
          }
        >
          <div
            ref={trackRef}
            className={
              pinned
                ? "flex h-full w-max pl-[var(--spacing-gutter)] pr-[26vw] will-change-transform"
                : "flex h-full w-max"
            }
          >
            {cards}
          </div>
        </div>

        {/* ---- Progress ------------------------------------------------- */}
        <div
          hidden={total === 0}
          className="shell flex shrink-0 items-center gap-6"
        >
          <p className="label-caps shrink-0 tabular-nums text-bone/70">
            <span className="text-bone">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-bone/30">/</span>
            {String(total).padStart(2, "0")}
          </p>
          <span aria-hidden="true" className="relative block h-px flex-1 bg-bone/15">
            <span
              ref={lineRef}
              className="absolute inset-0 block origin-left bg-champagne"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
          <p className="label-caps hidden shrink-0 text-bone/35 sm:block">
            {pinned ? "Scroll" : "Swipe"}
          </p>
        </div>
      </div>
    </section>
  );
}
