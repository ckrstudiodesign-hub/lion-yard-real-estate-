"use client";

import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { formatPrice } from "@/lib/filters";
import { cn } from "@/lib/cn";
import type { Property } from "@/types/property";

/**
 * The horizontal showcase's card — a different object from the grid card.
 *
 * Here the photograph is the card: full-bleed, cinematic, with the type laid
 * over it. Information is cut back to the four things that matter at this size
 * — index, name, community, price — because these cards are read in motion.
 *
 * The media sits in its own wrapper (`data-showcase-media`) with no hover
 * transform of its own, so the section's scroll-driven parallax owns that
 * element outright and never fights a CSS transition for the same property.
 */
export function ShowcaseCard({
  property,
  index,
  total,
  active,
  onFocus,
}: {
  property: Property;
  index: number;
  total: number;
  active: boolean;
  onFocus?: () => void;
}) {
  return (
    <article
      data-showcase-card
      data-active={active}
      className={cn(
        "relative shrink-0 overflow-hidden bg-charcoal",
        "transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        active ? "opacity-100" : "opacity-60",
        // Height is inherited from the track, which fills whatever the pinned
        // frame has left after the heading and the progress rule. Fixing it in
        // vh instead pushed the card's own type below the fold on a laptop.
        "h-full min-h-[19rem]",
        // Widths leave the next card peeking, so it always reads as a sequence.
        "w-[86vw] sm:w-[74vw] lg:w-[72vw] xl:w-[66vw]",
      )}
    >
      <TransitionLink
        href={`/properties/${property.slug}`}
        data-cursor="view"
        onFocus={onFocus}
        aria-label={`${property.title}, ${property.location} — ${formatPrice(property)}. View property.`}
        className="group/card block h-full w-full focus-visible:outline-offset-4"
      >
        {/* Over-sized so the parallax never exposes an edge. Deliberately no
            `will-change` here: eight permanently-promoted layers this size cost
            more than they save, and GSAP promotes the element for the duration
            of the tween anyway. Measured ~9ms/frame back on this section. */}
        <div data-showcase-media className="absolute inset-0 scale-[1.08]">
          <PropertyImage
            image={property.image}
            fallbackLabel={`${property.title} — ${property.location}`}
            sizes="(min-width: 1024px) 74vw, 86vw"
          />
        </div>

        {/* THE LOWER THIRD.
            Bone type has to hold on a pale interior shot as surely as on a
            night skyline, so the density behind the text block reaches 0.87
            rather than the 0.5 that looked sufficient against dark photography
            alone. On a dark image this simply deepens the base and reads as
            grading; on a bright one it is the difference between a title and a
            smear. Tested against deliberately over-exposed stand-ins.

            The stops are in PIXELS, not percentages. The text block is roughly
            the same height on every screen, but the card is not — percentage
            stops that protected the title on a 70vh desktop card left it
            floating in thin grey on a 58vh phone card. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,17,0.95)_0px,rgba(17,17,17,0.87)_130px,rgba(17,17,17,0.54)_250px,rgba(17,17,17,0.10)_380px,transparent_470px)]"
        />

        <div className="absolute inset-x-0 bottom-0 p-7 text-bone sm:p-9 lg:p-12">
          {/* The index lives with the type rather than floating in the top
              corner, where it had no density behind it and disappeared. */}
          <p className="label-caps text-[0.55rem] tracking-[0.3em] text-bone/55">
            {String(index + 1).padStart(2, "0")}
            <span aria-hidden="true" className="mx-2 text-bone/25">/</span>
            {String(total).padStart(2, "0")}
          </p>

          <h3 className="display-serif mt-5 max-w-[14ch] text-h3 leading-[1.02] lg:text-h2">
            {property.title}
          </h3>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="label-caps text-[0.55rem] tracking-[0.28em] text-bone/60">
                {property.location}
              </p>
              <p className="display-serif mt-3 text-h3 leading-none">
                {formatPrice(property)}
              </p>
            </div>

            <span className="group/btn label-caps flex items-center gap-3 border-b border-bone/25 pb-2 text-bone/70 transition-colors duration-[400ms] group-hover/card:border-bone group-hover/card:text-bone">
              View Property
              <ArrowRight />
            </span>
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
