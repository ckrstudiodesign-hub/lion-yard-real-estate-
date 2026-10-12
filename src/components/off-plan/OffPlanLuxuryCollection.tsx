"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, ArrowRight, MapPin } from "lucide-react";

import { OFF_PLAN_PROPERTIES, type OffPlanProperty } from "@/data/off-plan-properties";
import { useSectionReveal } from "@/lib/reveal";
import { PropertyImage } from "@/components/property/PropertyImage";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { OffPlanEnquiryModal } from "@/components/off-plan/OffPlanEnquiryModal";
import { cn } from "@/lib/utils";

const LUXURY_IDS = [
  "nakheel-palm-central",
  "nakheel-como-residences",
  "danube-greenz",
  "danube-elitz",
  "azizi-burj-azizi",
  "damac-chelsea",
  "binghatti-mercedes-benz",
  "binghatti-jacob-co",
  "binghatti-bugatti",
];

const CATEGORIES = [
  { label: "All Addresses", key: "all" },
  { label: "Ultra Luxury", key: "Ultra Luxury" },
  { label: "Branded Residences", key: "Branded Residences" },
  { label: "Waterfront", key: "Waterfront" },
  { label: "Lifestyle", key: "Lifestyle" },
];

export function OffPlanLuxuryCollection() {
  const allLuxuryProps = useMemo(() => {
    return LUXURY_IDS.map((id) => OFF_PLAN_PROPERTIES.find((p) => p.id === id)).filter(
      (p): p is OffPlanProperty => Boolean(p)
    );
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalProperty, setModalProperty] = useState<OffPlanProperty | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, { stagger: 0.06, start: "top 78%" });

  const filteredProps = useMemo(() => {
    if (activeFilter === "all") return allLuxuryProps;
    return allLuxuryProps.filter((p) =>
      p.categories.some((cat) => cat.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [allLuxuryProps, activeFilter]);

  // Current counter index: hovered item or current slider index or 0
  const activeDisplayIndex = useMemo(() => {
    if (viewMode === "slider") return sliderIndex;
    if (hoveredIndex !== null && hoveredIndex < filteredProps.length) return hoveredIndex;
    return 0;
  }, [viewMode, sliderIndex, hoveredIndex, filteredProps.length]);

  const handlePrev = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : filteredProps.length - 1));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (prev < filteredProps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-14 text-bone lg:py-20"
      data-surface="dark"
      id="dubai-luxury-collection"
    >
      {/* Ambient architectural lighting glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-champagne/[0.04] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 h-[300px] w-[300px] rounded-full bg-bone/[0.02] blur-[100px]"
      />

      <div className="shell relative">
        {/* Header section with compact editorial scale */}
        <header className="mb-8 border-t border-bone/15 pt-6 md:mb-10">
          <div className="grid gap-6 md:grid-cols-[1fr_minmax(16rem,28rem)] md:items-end md:gap-12">
            <div>
              <p
                data-reveal="item"
                className="label-caps flex items-center gap-3 text-champagne text-[10px]"
              >
                <span aria-hidden="true" className="block h-px w-8 bg-champagne" />
                Dubai Luxury Collection
              </p>
              <h2
                data-reveal="item"
                className="display-serif mt-3 text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight"
              >
                The Pinnacle of Living
              </h2>
            </div>

            <div
              data-reveal="item"
              className="flex flex-col justify-between gap-4 border-l border-bone/15 pl-5 md:pb-0.5"
            >
              <p className="max-w-[32ch] text-xs sm:text-sm font-light leading-relaxed text-bone/70">
                A considered edit of Dubai&apos;s most distinctive new addresses,
                selected for design, setting and long-term appeal.
              </p>

              {/* Dynamic Animated Index Counter & View controls */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5 font-serif text-xs tracking-[0.2em] text-champagne">
                  <span className="text-base sm:text-lg font-light text-bone">
                    {String(activeDisplayIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-bone/40">/</span>
                  <span className="text-[10px] text-bone/50">
                    {String(filteredProps.length).padStart(2, "0")}
                  </span>
                </div>

                {/* View switcher buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] transition-all",
                      viewMode === "grid"
                        ? "bg-bone text-ink font-medium shadow-sm"
                        : "text-bone/50 hover:text-bone hover:bg-bone/10"
                    )}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-3 w-3" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("slider")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] transition-all",
                      viewMode === "slider"
                        ? "bg-bone text-ink font-medium shadow-sm"
                        : "text-bone/50 hover:text-bone hover:bg-bone/10"
                    )}
                    aria-label="Slider view"
                  >
                    <SlidersHorizontal className="h-3 w-3" />
                    <span className="hidden sm:inline">Showcase</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Curation Filter Tabs */}
          <div
            data-reveal="item"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-4"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.key;
                const count =
                  cat.key === "all"
                    ? allLuxuryProps.length
                    : allLuxuryProps.filter((p) =>
                        p.categories.some(
                          (c) => c.toLowerCase() === cat.key.toLowerCase()
                        )
                      ).length;

                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setActiveFilter(cat.key);
                      setSliderIndex(0);
                    }}
                    className={cn(
                      "relative rounded-full px-3 py-1 text-[11px] tracking-wider transition-all duration-300",
                      isActive
                        ? "bg-champagne text-ink font-medium shadow-sm"
                        : "bg-charcoal/60 text-bone/70 hover:bg-charcoal hover:text-bone border border-bone/10"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "ml-1.5 text-[9px] opacity-70",
                        isActive ? "text-ink" : "text-bone/50"
                      )}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows */}
            {viewMode === "slider" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/20 text-bone transition-all hover:border-champagne hover:bg-champagne hover:text-ink focus-visible:outline-offset-2"
                  aria-label="Previous property"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/20 text-bone transition-all hover:border-champagne hover:bg-champagne hover:text-ink focus-visible:outline-offset-2"
                  aria-label="Next property"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* =========================================================================
            VIEW 1: BALANCED COMPACT ARCHITECTURAL GRID (16/10 aspect ratio)
            ========================================================================= */}
        {viewMode === "grid" ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProps.map((property, index) => {
                const primaryBadge = property.categories[0] || "Luxury";

                return (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-bone/10 bg-charcoal/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
                  >
                    {/* Top ambient hover sheen */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-champagne/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div>
                      {/* Media container - compact widescreen 16/10 */}
                      <TransitionLink
                        href={`/off-plan/${property.id}`}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-charcoal focus-visible:outline-offset-2"
                        aria-label={`View ${property.projectName}`}
                      >
                        <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                          <PropertyImage
                            image={{
                              src: property.image,
                              alt: `${property.projectName} by ${property.developer}`,
                            }}
                            images={
                              property.images
                                ? property.images.map((src) => ({
                                    src,
                                    alt: `${property.projectName} by ${property.developer}`,
                                  }))
                                : undefined
                            }
                            fallbackLabel={`${property.projectName} by ${property.developer}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        </div>

                        {/* Architectural shadow & gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-black/30" />

                        {/* Top floating badges: Category & Developer Logo */}
                        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                          <span className="label-caps rounded-full bg-champagne/95 px-2.5 py-0.5 text-[0.5rem] font-medium tracking-[0.2em] text-ink shadow-sm backdrop-blur-sm">
                            {primaryBadge}
                          </span>

                          <div className="flex h-7 w-14 items-center justify-center rounded-sm bg-paper/95 p-1 shadow-sm backdrop-blur-md sm:h-8 sm:w-16">
                            <Image
                              src={property.developerLogo}
                              alt={property.developer}
                              width={60}
                              height={30}
                              unoptimized
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </div>
                        </div>

                        {/* Index watermark */}
                        <div className="absolute bottom-2.5 left-3 font-serif text-2xl font-light text-bone/20 group-hover:text-champagne/40 transition-colors duration-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </TransitionLink>

                      {/* Content details - compact spacing */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-1.5 text-[11px] text-bone/60">
                          <MapPin className="h-2.5 w-2.5 text-champagne shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <TransitionLink href={`/off-plan/${property.id}`}>
                          <h3 className="display-serif mt-1.5 text-lg sm:text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-champagne truncate">
                            {property.projectName}
                          </h3>
                        </TransitionLink>

                        <p className="label-caps mt-1.5 text-[0.5rem] tracking-[0.18em] text-bone/45 truncate">
                          {property.developer}
                          <span aria-hidden="true" className="mx-1.5 text-bone/25">
                            ·
                          </span>
                          {property.propertyType}
                        </p>

                        {/* Benefits pills */}
                        {property.benefits && property.benefits.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {property.benefits.slice(0, 2).map((benefit, bIdx) => (
                              <span
                                key={bIdx}
                                className="rounded-full bg-bone/[0.06] px-2 py-0.5 text-[9px] text-bone/60"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions: View Property Link & Enquire Now Button */}
                    <div className="border-t border-bone/10 px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-between gap-3">
                        <TransitionLink
                          href={`/off-plan/${property.id}`}
                          className="group/link flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-bone/60 transition-colors hover:text-champagne"
                        >
                          <span>View Property</span>
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </TransitionLink>

                        <button
                          onClick={() => setModalProperty(property)}
                          className="rounded-sm border border-champagne/40 bg-transparent px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-ink"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* =========================================================================
              VIEW 2: CINEMATIC SHOWCASE SLIDER - COMPACT SCALE
              ========================================================================= */
          <div className="relative">
            <div
              ref={sliderTrackRef}
              className="flex gap-5 overflow-x-auto pb-6 pt-1 scroll-smooth no-scrollbar sm:gap-6"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {filteredProps.map((property, index) => {
                const primaryBadge = property.categories[0] || "Luxury";
                const isCurrent = sliderIndex === index;

                return (
                  <div
                    key={property.id}
                    style={{ scrollSnapAlign: "center" }}
                    onMouseEnter={() => setSliderIndex(index)}
                    className={cn(
                      "group relative flex min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-col justify-between overflow-hidden rounded-sm border bg-charcoal/30 backdrop-blur-sm transition-all duration-500",
                      isCurrent
                        ? "border-champagne/60 shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
                        : "border-bone/10 opacity-80 hover:opacity-100"
                    )}
                  >
                    <div>
                      {/* Media container */}
                      <TransitionLink
                        href={`/off-plan/${property.id}`}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-charcoal focus-visible:outline-offset-2"
                        aria-label={`View ${property.projectName}`}
                      >
                        <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                          <PropertyImage
                            image={{
                              src: property.image,
                              alt: `${property.projectName} by ${property.developer}`,
                            }}
                            images={
                              property.images
                                ? property.images.map((src) => ({
                                    src,
                                    alt: `${property.projectName} by ${property.developer}`,
                                  }))
                                : undefined
                            }
                            fallbackLabel={`${property.projectName} by ${property.developer}`}
                            sizes="(max-width: 768px) 85vw, 400px"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-black/30" />

                        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                          <span className="label-caps rounded-full bg-champagne/95 px-2.5 py-0.5 text-[0.5rem] font-medium tracking-[0.2em] text-ink shadow-sm backdrop-blur-sm">
                            {primaryBadge}
                          </span>

                          <div className="flex h-7 w-14 items-center justify-center rounded-sm bg-paper/95 p-1 shadow-sm backdrop-blur-md sm:h-8 sm:w-16">
                            <Image
                              src={property.developerLogo}
                              alt={property.developer}
                              width={60}
                              height={30}
                              unoptimized
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-2.5 left-3 font-serif text-2xl font-light text-bone/20 group-hover:text-champagne/40 transition-colors duration-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </TransitionLink>

                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-1.5 text-[11px] text-bone/60">
                          <MapPin className="h-2.5 w-2.5 text-champagne shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <TransitionLink href={`/off-plan/${property.id}`}>
                          <h3 className="display-serif mt-1.5 text-lg sm:text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-champagne truncate">
                            {property.projectName}
                          </h3>
                        </TransitionLink>

                        <p className="label-caps mt-1.5 text-[0.5rem] tracking-[0.18em] text-bone/45 truncate">
                          {property.developer}
                          <span aria-hidden="true" className="mx-1.5 text-bone/25">
                            ·
                          </span>
                          {property.propertyType}
                        </p>

                        <p className="mt-2 text-xs font-light text-bone/65 line-clamp-2">
                          {property.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-bone/10 px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-between gap-3">
                        <TransitionLink
                          href={`/off-plan/${property.id}`}
                          className="group/link flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-bone/60 transition-colors hover:text-champagne"
                        >
                          <span>View Property</span>
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </TransitionLink>

                        <button
                          onClick={() => setModalProperty(property)}
                          className="rounded-sm border border-champagne/40 bg-transparent px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-ink"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider progress bar indicator */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="h-0.5 flex-1 bg-bone/10">
                <div
                  className="h-full bg-champagne transition-all duration-500"
                  style={{
                    width: `${((sliderIndex + 1) / filteredProps.length) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-bone/40">
                {String(sliderIndex + 1).padStart(2, "0")} / {String(filteredProps.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Modal integration */}
      <OffPlanEnquiryModal
        property={modalProperty}
        open={Boolean(modalProperty)}
        onClose={() => setModalProperty(null)}
      />
    </section>
  );
}

export default OffPlanLuxuryCollection;
