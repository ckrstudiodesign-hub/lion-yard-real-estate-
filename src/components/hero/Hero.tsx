"use client";

import { useRef } from "react";

import { ScrollCue } from "@/components/hero/ScrollCue";
import { useIntro } from "@/components/providers/IntroProvider";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Full-viewport cinematic hero.
 *
 * ── Entrance ────────────────────────────────────────────────────────────────
 * The timeline starts the moment the preloader curtain begins lifting (600ms
 * into page load), so these offsets are relative to that. Absolute page-load
 * times are given in the comments, and match the specified sequence.
 *
 * ── Two motion systems, kept apart ──────────────────────────────────────────
 *   1. ENTRANCE — a one-shot timeline: a clip-path wipe on the media frame, and
 *      masked line reveals on the headline.
 *   2. SCROLL   — a scrubbed ScrollTrigger: media scale and drift, copy lift,
 *      overlay density, cue fade.
 *
 * They never write to the same property on the same element. The wipe lives on
 * an outer frame, the scale on an inner layer — so the entrance can finish while
 * the scroll response is already running without either clobbering the other.
 *
 * The media layer is structured to take a <video> in place of <Image> with no
 * change to the animation code.
 */

/** Resting scale of the hero media; the scroll scrubs it to SCALE_SCROLLED. */
const SCALE_REST = 1.05;
const SCALE_SCROLLED = 1.12;

export function Hero({ nextSectionId }: { nextSectionId: string }) {
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

      // ---- 1. Entrance --------------------------------------------------
      const timeline = gsap.timeline({ defaults: { ease: GSAP_EASE.lux } });

      timeline
        // 600ms — image begins its reveal: a left-to-right clip-path wipe with
        // a slow settle on the media inside it.
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
        // 800ms — eyebrow
        .fromTo(
          '[data-hero="eyebrow"]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.2,
        )
        // 1000ms / 1150ms — headline, line by line out of its own mask.
        // The mask makes a full-height translate the right start value here;
        // `y: 0` is load-bearing, because the CSS pre-state is a percentage
        // translate that the browser resolves to pixels, and without pinning y
        // GSAP would add that resolved offset on top of yPercent.
        .fromTo(
          '[data-hero="line-1"]',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 1.15 },
          0.4,
        )
        .fromTo(
          '[data-hero="line-2"]',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 1.15 },
          0.55,
        )
        // 1400ms — supporting copy
        .fromTo(
          '[data-hero="support"]',
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.8,
        )
        // 1550ms / 1650ms — CTAs, primary then secondary
        .fromTo(
          '[data-hero="cta-1"]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.95,
        )
        .fromTo(
          '[data-hero="cta-2"]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.05,
        )
        // 1800ms — scroll indicator
        .fromTo(
          '[data-hero="cue"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.2,
        );

      // ---- 2. Scroll response --------------------------------------------
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to(
            '[data-hero="media"]',
            { scale: SCALE_SCROLLED, yPercent: 6, ease: "none" },
            0,
          )
          .to('[data-hero="copy"]', { yPercent: -16, opacity: 0.2, ease: "none" }, 0)
          // The grade deepens as the section leaves, so the copy stays legible
          // against whatever part of the photograph is passing behind it.
          .to('[data-hero="grade"]', { opacity: 1, ease: "none" }, 0)
          .to('[data-hero="cue"]', { opacity: 0, ease: "none", duration: 0.3 }, 0),
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, [started]);

  return (
    <section
      ref={rootRef}
      data-surface="dark"
      data-cursor="explore"
      aria-label="Lion Yard Real Estate"
      className={[
        "relative isolate flex w-full flex-col overflow-hidden bg-ink",
        // Small viewport units so mobile browser chrome cannot crop the hero,
        // with a desktop floor so it stays cinematic on short laptop screens.
        "h-[100svh] min-h-[34rem] lg:min-h-[680px]",
      ].join(" ")}
    >
      {/* ---- Media (swap <Image> for <video> when footage is ready) -------- */}
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
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* ---- Cinematic grade ----------------------------------------------
          Two layers: a base that keeps the copy readable at rest, and a second
          that the scroll timeline fades up as the section leaves. Neither is
          heavy enough to flatten the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.75)_0%,rgba(17,17,17,0.3)_34%,rgba(17,17,17,0.55)_70%,rgba(17,17,17,0.95)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_35%_45%,transparent_28%,rgba(17,17,17,0.65)_100%)]"
      />
      <div
        data-hero="grade"
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/45 opacity-0"
      />

      {/* ---- Copy: editorial, lower-left ---------------------------------- */}
      <div
        data-hero="copy"
        className="shell relative flex flex-1 flex-col justify-end pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom)))] pt-32 sm:pb-40 lg:pb-44"
      >
        <p
          data-hero="eyebrow"
          data-anim="fade"
          className="label-caps mb-7 flex items-center gap-4 text-bone/90 sm:mb-9 drop-shadow-md"
        >
          <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14 shadow-sm" />
          {site.brand}
        </p>

        <h1
          data-anim="line"
          className="display-serif max-w-[18ch] text-display text-bone lg:leading-[0.9] [text-shadow:0_4px_32px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.8)]"
        >
          <span className="reveal-line">
            <span data-hero="line-1" className="block">
              The Right Property.
            </span>
          </span>
          <span className="reveal-line">
            <span data-hero="line-2" className="block">
              The Right Move.
            </span>
          </span>
        </h1>

        <p
          data-hero="support"
          data-anim="rise"
          className="mt-8 max-w-[46ch] text-lead font-light text-bone/95 sm:mt-10 drop-shadow-lg [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
        >
          Discover exceptional homes and investment opportunities across Dubai.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <span data-hero="cta-1" data-anim="rise">
            <ButtonLink href="/properties" variant="solid" className="w-full sm:w-auto shadow-xl">
              Explore Properties
              <ArrowRight />
            </ButtonLink>
          </span>
          <span data-hero="cta-2" data-anim="rise">
            <ButtonLink href="/sell" variant="outline" className="w-full sm:w-auto bg-ink/20 backdrop-blur-sm hover:bg-ink/40">
              Sell Your Property
            </ButtonLink>
          </span>
        </div>
      </div>

      {/* ---- Scroll cue ----------------------------------------------------- */}
      <div
        data-hero="cue"
        data-anim="fade"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex"
      >
        <div className="pointer-events-auto">
          <ScrollCue targetId={nextSectionId} />
        </div>
      </div>
    </section>
  );
}
