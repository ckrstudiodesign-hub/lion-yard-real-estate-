"use client";

import { useRef, useState } from "react";

import { Lightbox } from "@/components/property/detail/Lightbox";
import { PropertyImage } from "@/components/property/PropertyImage";
import { ArrowRight } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/reveal";
import type { Property } from "@/types/property";

/**
 * PROPERTY GALLERY.
 *
 * An asymmetric composition — one tall frame carrying roughly two-thirds of the
 * width with two stacked beside it — rather than a uniform thumbnail strip. A
 * row of equal squares says "here are some photographs"; a composition says
 * someone chose which one matters.
 *
 * Every frame opens the lightbox at its own index, and focus returns to the
 * frame that opened it on close, so keyboard users are never dropped back at
 * the top of the page.
 */
export function PropertyGallery({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const lastOpened = useRef(0);

  useSectionReveal(ref);

  const images = property.images;
  if (images.length === 0) return null;

  const open = (index: number) => {
    lastOpened.current = index;
    setOpenIndex(index);
  };

  const close = () => {
    setOpenIndex(null);
    // Return focus to the frame that opened the gallery.
    triggers.current[lastOpened.current]?.focus();
  };

  const [hero, ...rest] = images;
  const side = rest.slice(0, 2);
  const remainder = rest.length - side.length;

  const frameClass =
    "group/frame relative w-full overflow-hidden bg-charcoal focus-visible:outline-offset-4";

  return (
    <>
      <section
        ref={ref}
        id="gallery"
        data-surface="dark"
        aria-labelledby="gallery-heading"
        className="relative z-10 bg-ink text-bone"
      >
        <div className="shell py-[var(--spacing-section)]">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p data-reveal="item" className="label-caps flex items-center gap-4 text-bone/40">
                <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
                Gallery
              </p>
              <h2
                id="gallery-heading"
                data-reveal="item"
                className="display-serif mt-7 text-h2 leading-[1.02]"
              >
                Inside the property
              </h2>
            </div>

            <button
              data-reveal="item"
              type="button"
              onClick={() => open(0)}
              className="group/btn label-caps flex items-center gap-3 self-start border-b border-bone/25 pb-2 text-bone/65 transition-colors duration-[400ms] hover:border-bone hover:text-bone lg:self-auto"
            >
              View all {images.length} photos
              <ArrowRight />
            </button>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12 lg:gap-5">
            {hero ? (
              <button
                ref={(node) => {
                  triggers.current[0] = node;
                }}
                type="button"
                onClick={() => open(0)}
                data-reveal="media"
                data-cursor="view"
                aria-label={`Open gallery at image 1 of ${images.length}`}
                className={`${frameClass} aspect-[4/3] lg:col-span-8 lg:aspect-[4/3.4]`}
              >
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/frame:scale-[1.04] motion-reduce:transform-none">
                  <PropertyImage
                    image={hero}
                    fallbackLabel={property.title}
                    sizes="(min-width: 1024px) 62vw, 100vw"
                  />
                </div>
              </button>
            ) : null}

            <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1 lg:gap-5">
              {side.map((image, offset) => {
                const index = offset + 1;
                const isLastTile = offset === side.length - 1 && remainder > 0;
                return (
                  <button
                    key={image.src}
                    ref={(node) => {
                      triggers.current[index] = node;
                    }}
                    type="button"
                    onClick={() => open(index)}
                    data-reveal="media"
                    data-cursor="view"
                    aria-label={`Open gallery at image ${index + 1} of ${images.length}`}
                    className={`${frameClass} aspect-[4/3] lg:aspect-auto lg:h-full`}
                  >
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/frame:scale-[1.04] motion-reduce:transform-none">
                      <PropertyImage
                        image={image}
                        fallbackLabel={property.title}
                        sizes="(min-width: 1024px) 30vw, 50vw"
                      />
                    </div>

                    {/* The overflow count sits on the last visible tile rather
                        than as a separate control — the tile itself is the
                        invitation. */}
                    {isLastTile ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/55 transition-colors duration-[400ms] group-hover/frame:bg-ink/45">
                        <span className="label-caps text-[0.6rem] tracking-[0.28em] text-bone">
                          +{remainder} more
                        </span>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={close}
        onIndexChange={setOpenIndex}
        label={property.title}
      />
    </>
  );
}
