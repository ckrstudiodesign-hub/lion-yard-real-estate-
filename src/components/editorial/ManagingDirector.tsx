"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSectionReveal } from "@/lib/reveal";

export function ManagingDirector() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 80%" });

  return (
    <section ref={ref} className="bg-bone text-ink py-16 lg:py-24" data-surface="light">
      <div className="shell">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center max-w-5xl mx-auto">
          <div data-reveal="item" className="w-full max-w-sm lg:w-1/3 relative">
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-charcoal/5 shadow-md">
              <Image
                src="/lion yard manging director.png"
                alt="Kauser Nawaz, Managing Director"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          
          <div data-reveal="item" className="w-full lg:w-2/3 flex flex-col justify-center text-center lg:text-left">
            <p className="label-caps text-ink/50 mb-3">Managing Director</p>
            <h2 className="display-serif text-h3 lg:text-h2 mb-5">Kauser Nawaz</h2>
            <div className="text-body text-ink/70 space-y-5 max-w-2xl mx-auto lg:mx-0">
              <p>
                With a deep understanding of Dubai&apos;s dynamic real estate market, Kauser Nawaz leads Lion Yard Real Estate with a vision centered on trust, excellence, and bespoke client experiences. 
              </p>
              <p>
                His commitment to connecting clients with exclusive properties ensures that every investment is guided by expert insight and a passion for luxury living. Under his leadership, Lion Yard continues to redefine the standard of property advisory in the UAE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
