"use client";

import Image from "next/image";
import { useRef } from "react";

import { useIntro } from "@/components/providers/IntroProvider";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import type { Media } from "@/data/media";

const SCALE_REST = 1.05;

export function PageHero({
  headline,
  supporting,
  image,
  primaryCta,
  secondaryCta,
}: {
  headline: React.ReactNode;
  supporting: string;
  image: Media;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { started } = useIntro();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !started) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-hero="frame"]', { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set('[data-hero="media"]', { scale: 1 });
        gsap.set(
          '[data-anim="line"] > * > *, [data-anim="rise"], [data-anim="fade"]',
          { opacity: 1, y: 0, yPercent: 0 },
        );
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: GSAP_EASE.lux } });

      timeline
        .fromTo(
          '[data-hero="frame"]',
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
          0,
        )
        .fromTo(
          '[data-hero="media"]',
          { scale: 1.14 },
          { scale: SCALE_REST, duration: 2, ease: "power2.out" },
          0,
        )
        .fromTo(
          '[data-anim="line"] > * > *',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 1.15, stagger: 0.15 },
          0.4,
        )
        .fromTo(
          '[data-hero="support"]',
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.8,
        );

      if (primaryCta) {
        timeline.fromTo(
          '[data-hero="cta-1"]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.95,
        );
      }
      if (secondaryCta) {
        timeline.fromTo(
          '[data-hero="cta-2"]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.05,
        );
      }
    }, root);

    return () => context.revert();
  }, [started, primaryCta, secondaryCta]);

  return (
    <section
      ref={rootRef}
      data-surface="dark"
      className="relative isolate flex w-full flex-col overflow-hidden bg-ink h-[100svh] min-h-[34rem] lg:min-h-[680px]"
    >
      <div
        data-hero="frame"
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      >
        <div
          data-hero="media"
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${SCALE_REST})` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="100vw"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.62)_0%,rgba(17,17,17,0.18)_34%,rgba(17,17,17,0.48)_70%,rgba(17,17,17,0.88)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_35%_45%,transparent_28%,rgba(17,17,17,0.5)_100%)]"
      />

      <div className="shell relative flex flex-1 flex-col justify-end pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom)))] pt-32 sm:pb-40 lg:pb-44">
        <h1
          data-anim="line"
          className="display-serif max-w-[20ch] text-display text-bone lg:leading-[0.9]"
        >
          {headline}
        </h1>

        <p
          data-hero="support"
          data-anim="rise"
          className="mt-8 max-w-[46ch] text-lead font-light text-bone/80 sm:mt-10"
        >
          {supporting}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {primaryCta && (
              <span data-hero="cta-1" data-anim="rise">
                <ButtonLink href={primaryCta.href} variant="solid" className="w-full sm:w-auto">
                  {primaryCta.label}
                  <ArrowRight />
                </ButtonLink>
              </span>
            )}
            {secondaryCta && (
              <span data-hero="cta-2" data-anim="rise">
                <ButtonLink href={secondaryCta.href} variant="outline" className="w-full sm:w-auto">
                  {secondaryCta.label}
                </ButtonLink>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
