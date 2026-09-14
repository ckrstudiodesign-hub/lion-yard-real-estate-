"use client";

import { useRef } from "react";

import { useIntro } from "@/components/providers/IntroProvider";
import { scroll } from "@/components/providers/SmoothScrollProvider";
import { WordmarkStacked } from "@/components/ui/Wordmark";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Set false to replay the open on every load while reviewing. True is the
 * shipping behaviour: the branded open plays once per browser tab, so a
 * returning visitor is never made to wait through it twice.
 */
const PLAY_ONCE_PER_SESSION = true;
const SESSION_KEY = "ly:intro-played";

/**
 * The branded open — the first 600ms of the page-load sequence.
 *
 *   0ms    black
 *   300ms  LION YARD wordmark rises in
 *   550ms  the curtain begins wiping upward, carrying the wordmark with it
 *   600ms  `beginReveal()` fires: the hero starts its own clip-path reveal
 *          *behind* the curtain, so the two overlap
 *
 * The overlap is the point. The hero is already in motion as the black lifts,
 * which is what makes the open read as film rather than as a loading step.
 * The wordmark travelling up with the curtain means it never has to fade out.
 */
export function Preloader() {
  const { beginReveal, completeIntro } = useIntro();
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const alreadyPlayed =
      PLAY_ONCE_PER_SESSION && window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadyPlayed || prefersReducedMotion()) {
      root.style.display = "none";
      beginReveal();
      completeIntro();
      return;
    }

    scroll.stop();
    window.scrollTo(0, 0);

    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: GSAP_EASE.lux },
          onComplete: () => {
            window.sessionStorage.setItem(SESSION_KEY, "1");
            scroll.start();
            completeIntro();
            if (rootRef.current) rootRef.current.style.display = "none";
          },
        })
        .fromTo(
          '[data-pre="mark"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.3,
        )
        .fromTo(
          '[data-pre="rule"]',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: GSAP_EASE.glide },
          0.4,
        )
        .to(
          '[data-pre="curtain"]',
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1.0 },
          0.8,
        )
        .call(beginReveal, undefined, 1.0);
    }, root);

    return () => {
      context.revert();
      scroll.start();
    };
  }, [beginReveal, completeIntro]);

  return (
    <div
      ref={rootRef}
      data-preloader=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[130]"
    >
      <div
        data-pre="curtain"
        className="absolute inset-0 flex flex-col items-center justify-center bg-ink text-bone"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <WordmarkStacked data-pre="mark" className="text-bone" />
        <span
          data-pre="rule"
          className="mt-8 block h-px w-20 origin-center bg-champagne/70 sm:w-28"
        />
      </div>
    </div>
  );
}
