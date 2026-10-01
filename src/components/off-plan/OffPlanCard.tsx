"use client";

import Image from "next/image";
import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowRight } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/cn";
import type { OffPlanProperty } from "@/data/off-plan-properties";
import { useState } from "react";
import { OffPlanEnquiryModal } from "@/components/off-plan/OffPlanEnquiryModal";

export function OffPlanCard({
  property,
  sizes,
  className,
  imageClassName,
}: {
  property: OffPlanProperty;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const badge = property.categories[0] || "New Launch";

  return (
    <>
      <article className={cn("group/card flex flex-col", className)}>
        <TransitionLink
          href={`/off-plan/${property.id}`}
          data-cursor="view"
          className="block focus-visible:outline-offset-8"
          aria-label={`${property.projectName}, ${property.location}. View property.`}
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
                image={{ src: property.image, alt: `${property.projectName} by ${property.developer}` }}
                images={
                  property.images
                    ? property.images.map(src => ({ src, alt: `${property.projectName} by ${property.developer}` }))
                    : undefined
                }
                fallbackLabel={`${property.projectName} by ${property.developer}`}
                sizes={sizes}
              />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.4)_0%,transparent_30%)]" />

            <span className="label-caps absolute left-0 top-6 bg-champagne px-4 py-2 text-[0.55rem] tracking-[0.28em] text-ink shadow-md">
              {badge}
            </span>

            <div className="absolute right-4 top-6 h-8 w-16 sm:h-10 sm:w-20 bg-paper/90 backdrop-blur-md flex items-center justify-center p-2 rounded shadow-lg">
              <Image
                src={property.developerLogo}
                alt={property.developer}
                width={80}
                height={40}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <div data-card-body className="pt-6 flex flex-col items-start text-left flex-1">
            <h3 className="display-serif text-h4 leading-[1.02] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
              {property.projectName}
            </h3>

            <p className="mt-2 text-body text-current/60">
              {property.location}
            </p>

            <p className="mt-3 label-caps text-[0.55rem] tracking-[0.22em] text-current/45">
              {property.developer}
              <span aria-hidden="true" className="mx-2 text-current/25">·</span>
              {property.propertyType}
            </p>

            <div className="mt-5 space-y-1">
              {property.handover && (
                <p className="text-sm text-current/60">Handover: {property.handover}</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center w-full justify-between">
              <span className="group/btn label-caps flex items-center gap-3 text-current/40 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-current">
                View Property
                <ArrowRight className="transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-2" />
              </span>
            </div>
          </div>
        </TransitionLink>

        {/* Prevent the Enquiry button from triggering the link */}
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="w-full text-center label-caps text-[0.65rem] tracking-[0.2em] border border-current/20 py-3 hover:bg-current hover:text-ink transition-colors duration-300"
          >
            Enquire Now
          </button>
        </div>
      </article>

      <OffPlanEnquiryModal 
        property={property} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
}
