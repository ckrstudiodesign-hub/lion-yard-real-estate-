"use client";

import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { formatPrice } from "@/lib/filters";
import { cn } from "@/lib/cn";
import type { Property } from "@/types/property";

/**
 * Editorial property card.
 *
 * TYPE HIERARCHY — four registers, each doing one job, so the card reads as a
 * page in a property book rather than a row in a portal:
 *
 *   kicker   community, micro-caps, wide tracking
 *   name     display serif, the largest thing on the card
 *   price    display serif, clearly subordinate to the name
 *   data     beds · baths · area, micro-caps — set as a credit line, not as
 *            body copy. This is the single change that stops the card looking
 *            like a template: the same words in sentence-case body type read as
 *            a listing, in tracked micro-caps they read as a caption.
 *
 * No rule between the blocks and no box around them. Spacing groups the
 * information; borders would make each card a bounded component.
 *
 * NOTHING IS OVERLAID ON THE PHOTOGRAPH except the status chip, and that chip
 * is solid ink rather than a translucent pill — a tinted chip over a pale
 * interior shot is grey on grey, which is exactly the case that fails. For the
 * same reason there is no gradient wash across the top of the image: with only
 * a chip to make legible, a 128px scrim just puts a grey band over a good
 * photograph.
 *
 * Hover is one coordinated gesture: the image zooms slowly (900ms, still moving
 * well after the pointer lands), the name lifts 10px, and VIEW PROPERTY
 * resolves from a hairline into full contrast. The card's box never changes, so
 * neighbouring cards cannot shift.
 *
 * `data-cursor="view"` hands the custom cursor its VIEW state.
 */
export function PropertyCard({
  property,
  sizes,
  priority = false,
  className,
  imageClassName,
}: {
  property: Property;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const badge = property.featured
    ? "Featured"
    : property.status === "Off-plan"
      ? "New"
      : null;

  const beds = `${property.bedrooms} ${property.bedrooms === 1 ? "Bed" : "Beds"}`;
  const baths = `${property.bathrooms} ${property.bathrooms === 1 ? "Bath" : "Baths"}`;

  return (
    <article className={cn("group/card", className)}>
      <TransitionLink
        href={`/properties/${property.slug}`}
        data-cursor="view"
        className="block focus-visible:outline-offset-8"
        aria-label={`${property.title}, ${property.location}. View property.`}
      >
        <div
          data-card-media
          className={cn(
            "relative aspect-[4/5] w-full overflow-hidden bg-charcoal",
            imageClassName,
          )}
        >
          <div
            data-card-zoom
            className={cn(
              "absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/card:scale-[1.04] group-focus-within/card:scale-[1.04]",
              "motion-reduce:transform-none motion-reduce:transition-none",
            )}
          >
            <PropertyImage
              image={property.image}
              images={property.images}
              fallbackLabel={`${property.title} — ${property.location}`}
              sizes={sizes}
              priority={priority}
            />
          </div>

          {badge ? (
            <span className="label-caps absolute left-0 top-6 bg-ink px-4 py-2 text-[0.55rem] tracking-[0.28em] text-bone">
              {badge}
            </span>
          ) : null}
        </div>

        <div data-card-body className="pt-6 flex flex-col items-start text-left">
          <h3 className="display-serif text-h4 leading-[1.02] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
            {property.title}
          </h3>

          <p className="mt-2 text-body text-current/60">
            {property.location}
          </p>

          <p className="mt-3 label-caps text-[0.55rem] tracking-[0.22em] text-current/45">
            {property.propertyType}
            <span aria-hidden="true" className="mx-2 text-current/25">·</span>
            {beds}
            <span aria-hidden="true" className="mx-2 text-current/25">·</span>
            {baths}
          </p>

          <p className="display-serif mt-5 text-[1.25rem] leading-none text-current/90">
            {formatPrice(property)}
          </p>

          <div className="mt-6">
            <span className="group/btn label-caps flex items-center gap-3 text-current/40 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-current">
              View Property
              <ArrowRight className="transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-2" />
            </span>
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
