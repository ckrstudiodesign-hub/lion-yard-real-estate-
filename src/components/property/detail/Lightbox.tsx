"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PropertyImage } from "@/components/property/PropertyImage";
import { gsap } from "@/lib/gsap";
import { useScrollLock } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import type { PropertyImage as PropertyImageType } from "@/types/property";

/**
 * Full-screen gallery.
 *
 * Keyboard is first-class: Escape closes, arrows step, Tab is trapped inside
 * the dialog, and focus returns to whichever thumbnail opened it. Touch gets
 * swipe. The image itself is never cropped — it is contained, because a
 * property photograph exists to be examined and cropping it to fill the screen
 * defeats the point of opening it full-size.
 *
 * ADJACENT FRAMES ARE PRELOADED. Stepping through a gallery and waiting for
 * each frame to decode is the difference between a gallery that feels
 * considered and one that feels like a slideshow, so the neighbours of the
 * current image are mounted (hidden) and therefore already decoded.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  label,
}: {
  images: PropertyImageType[];
  /** `null` when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  label: string;
}) {
  const open = index !== null;
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useScrollLock(open);

  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      const next = (index + delta + images.length) % images.length;
      onIndexChange(next);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        case "ArrowRight":
          event.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          step(-1);
          break;
        case "Tab": {
          const focusables = rootRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled])",
          );
          if (!focusables || focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, step]);

  // Open/close and per-frame transitions.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: open ? 1 : 0 });
      return;
    }

    const tween = gsap.to(root, {
      autoAlpha: open ? 1 : 0,
      duration: open ? 0.4 : 0.3,
      ease: open ? GSAP_EASE.lux : GSAP_EASE.luxIn,
    });

    return () => {
      tween.kill();
    };
  }, [open, mounted]);

  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !open || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      frame,
      { autoAlpha: 0, scale: 0.985 },
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: GSAP_EASE.lux },
    );
    return () => {
      tween.kill();
    };
  }, [index, open]);

  const current = index === null ? null : images[index];

  // Neighbours, mounted but hidden, so stepping never waits on a decode.
  const neighbours =
    index === null
      ? []
      : [images[(index + 1) % images.length], images[(index - 1 + images.length) % images.length]]
          .filter((image): image is PropertyImageType => Boolean(image));

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} — gallery`}
      inert={!open}
      className={`fixed inset-0 z-[125] bg-ink ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ opacity: 0, visibility: "hidden" }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start === null || end === undefined) return;
        const delta = end - start;
        if (Math.abs(delta) < 48) return;
        step(delta < 0 ? 1 : -1);
      }}
    >
      {/* Controls */}
      <div className="shell absolute inset-x-0 top-0 z-10 flex h-24 items-center justify-between text-bone">
        <p className="label-caps text-[0.6rem] tracking-[0.28em] tabular-nums">
          <span className="text-bone">
            {String((index ?? 0) + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-bone/35">/</span>
          <span className="text-bone/60">{String(images.length).padStart(2, "0")}</span>
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="label-caps -mr-2 flex h-11 items-center gap-3 px-2 text-bone/70 transition-colors duration-[220ms] hover:text-bone"
        >
          Close
          <span aria-hidden="true" className="relative block h-3.5 w-3.5">
            <span className="absolute top-1.5 block h-px w-full rotate-45 bg-current" />
            <span className="absolute top-1.5 block h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      {/* Frame */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-24 sm:px-20">
        {current ? (
          <div ref={frameRef} className="relative h-full w-full">
            <PropertyImage
              image={current}
              fallbackLabel={label}
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>
        ) : null}
      </div>

      {/* Preload neighbours without showing them. */}
      <div aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
        {neighbours.map((image) => (
          <div key={image.src} className="relative h-px w-px">
            <PropertyImage image={image} fallbackLabel={label} sizes="100vw" />
          </div>
        ))}
      </div>

      {/* Step controls */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous image"
        className="group absolute left-0 top-1/2 flex h-20 w-14 -translate-y-1/2 items-center justify-center text-bone/60 transition-colors duration-[220ms] hover:text-bone sm:w-20"
      >
        <svg viewBox="0 0 20 10" aria-hidden="true" className="h-2.5 w-5 rotate-180 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next image"
        className="group absolute right-0 top-1/2 flex h-20 w-14 -translate-y-1/2 items-center justify-center text-bone/60 transition-colors duration-[220ms] hover:text-bone sm:w-20"
      >
        <svg viewBox="0 0 20 10" aria-hidden="true" className="h-2.5 w-5 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      <p className="shell absolute inset-x-0 bottom-0 flex h-20 items-center text-body-sm text-bone/45">
        {current?.alt}
      </p>
    </div>
  );
}
