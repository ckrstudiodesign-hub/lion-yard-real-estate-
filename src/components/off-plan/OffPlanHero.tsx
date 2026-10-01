"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import Image from "next/image";

export function OffPlanHero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-anim="fade"], [data-anim="rise"]', { opacity: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: GSAP_EASE.lux } });

      timeline
        .fromTo('[data-hero="bg"]', { scale: 1.1 }, { scale: 1, duration: 2.5, ease: "power2.out" }, 0)
        .fromTo(
          '[data-hero="eyebrow"]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        )
        .fromTo(
          '[data-hero="title"]',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          0.5
        )
        .fromTo(
          '[data-hero="desc"]',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          0.7
        )
        .fromTo(
          '[data-hero="cta"]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.9
        );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-surface="dark"
      className="relative isolate flex w-full flex-col overflow-hidden bg-ink h-[85svh] min-h-[34rem] lg:min-h-[600px]"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div data-hero="bg" className="absolute inset-0 will-change-transform">
          <Image
            src="/property images/Nakheel/palm central banner/palm-central_banner.jpg"
            alt="Dubai Skyline Properties"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.7)_0%,rgba(17,17,17,0.4)_40%,rgba(17,17,17,0.85)_100%)]" />

      <div className="shell relative flex flex-1 flex-col justify-center pb-20 pt-32 text-center items-center">
        <p
          data-hero="eyebrow"
          data-anim="fade"
          className="label-caps mb-6 text-champagne drop-shadow-md"
        >
          Exclusive Opportunities
        </p>

        <h1
          data-hero="title"
          data-anim="rise"
          className="display-serif max-w-[20ch] text-h2 md:text-h1 text-bone [text-shadow:0_4px_32px_rgba(0,0,0,0.6)] leading-tight"
        >
          Discover Dubai&apos;s Most Exclusive Properties
        </h1>

        <p
          data-hero="desc"
          data-anim="rise"
          className="mt-8 max-w-[54ch] text-body md:text-lead font-light text-bone/90 drop-shadow-lg"
        >
          Explore luxury residences, waterfront communities and high-growth investment opportunities from Dubai&apos;s leading developers.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <span data-hero="cta" data-anim="rise">
            <ButtonLink href="#catalog" variant="solid" className="w-full sm:w-auto px-8">
              Explore Properties
            </ButtonLink>
          </span>
          <span data-hero="cta" data-anim="rise">
            <ButtonLink href="#contact" variant="outline" className="w-full sm:w-auto bg-ink/20 backdrop-blur-sm hover:bg-ink/40 px-8">
              Speak to a Property Advisor
            </ButtonLink>
          </span>
        </div>
      </div>
    </section>
  );
}
