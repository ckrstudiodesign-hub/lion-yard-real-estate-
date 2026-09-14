"use client";

import { useEffect, useState } from "react";

import { scroll } from "@/components/providers/SmoothScrollProvider";
import { contact, whatsappHref } from "@/data/site";
import { formatPrice } from "@/lib/filters";
import { cn } from "@/lib/cn";
import { useScrolledPast } from "@/lib/hooks";
import type { Property } from "@/types/property";

/**
 * Sticky enquiry bar.
 *
 * DESKTOP: appears once the hero has left, carrying the property's name and
 * price so the visitor always knows what they are looking at and what it costs
 * — which is the point at which a price becomes easy to forget, several
 * thousand pixels into a page.
 *
 * MOBILE: a bottom action bar with WhatsApp and Enquire. The page reserves
 * matching bottom padding (see the detail route), so the bar never covers the
 * footer or the last line of content — a floating CTA that hides the copyright
 * line is the classic version of this component done badly.
 */
export function StickyPropertyBar({ property }: { property: Property }) {
  // Roughly one screen: past the hero, before the specification bar settles.
  const past = useScrolledPast(560);

  /**
   * Retract once the enquiry section is on screen. The bar exists to keep the
   * price and the CTA reachable while the visitor is deep in the page; sitting
   * on top of the actual enquiry form it is redundant, and at the very bottom
   * it would overlay the footer.
   */
  const [atEnquiry, setAtEnquiry] = useState(false);
  useEffect(() => {
    const target = document.getElementById("enquire");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtEnquiry(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const shown = past && !atEnquiry;

  return (
    <>
      {/* ---- Desktop ------------------------------------------------------ */}
      <div
        aria-hidden={!shown}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[95] hidden border-t border-bone/10 bg-ink/90 backdrop-blur-xl lg:block",
          "transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-10">
          <div className="flex items-baseline gap-8">
            <p className="display-serif text-[1.35rem] leading-none text-bone">
              {property.shortTitle}
            </p>
            <p className="label-caps text-[0.55rem] tracking-[0.24em] text-bone/45">
              {property.location}
            </p>
          </div>

          <div className="flex items-center gap-8">
            <p className="display-serif text-[1.35rem] leading-none text-bone">
              {formatPrice(property)}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={shown ? 0 : -1}
              className="label-caps border-b border-bone/30 pb-1.5 text-bone/70 transition-colors duration-[300ms] hover:border-bone hover:text-bone"
            >
              WhatsApp
            </a>
            <button
              type="button"
              tabIndex={shown ? 0 : -1}
              onClick={() => scroll.to("#enquire", -80)}
              className="label-caps flex h-11 items-center bg-bone px-7 text-ink transition-colors duration-[300ms] hover:bg-champagne"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* ---- Mobile ------------------------------------------------------- */}
      <div className="fixed inset-x-0 bottom-0 z-[95] flex border-t border-bone/10 lg:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps flex h-[4.25rem] flex-1 items-center justify-center bg-charcoal text-bone"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          WhatsApp
        </a>
        <a
          href={contact.phoneHref}
          className="label-caps flex h-[4.25rem] flex-1 items-center justify-center bg-charcoal text-bone"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          Call
        </a>
        <button
          type="button"
          onClick={() => scroll.to("#enquire", -20)}
          className="label-caps flex h-[4.25rem] flex-[1.4] items-center justify-center border-t border-ink/15 bg-bone text-ink"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          Enquire
        </button>
      </div>
    </>
  );
}
