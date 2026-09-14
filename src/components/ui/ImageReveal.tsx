"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

type ImageRevealProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom" | "center";
  className?: string;
  delay?: number;
};

const getClipPath = (direction: ImageRevealProps["direction"]) => {
  switch (direction) {
    case "right":
      return "inset(0% 100% 0% 0%)"; // Reveals right-to-left
    case "top":
      return "inset(0% 0% 100% 0%)"; // Reveals bottom-to-top
    case "bottom":
      return "inset(100% 0% 0% 0%)"; // Reveals top-to-bottom
    case "center":
      return "inset(50% 50% 50% 50%)"; // Reveals outward from center
    case "left":
    default:
      return "inset(0% 0% 0% 100%)"; // Reveals left-to-right (from left side initially hidden)
  }
};

/**
 * Reusable image reveal wrapper.
 * By default, uses left-to-right clip-path wipe + subtle zoom.
 */
export function ImageReveal({
  children,
  direction = "left",
  className,
  delay = 0,
}: ImageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(media, { scale: 1 });
      return;
    }

    const startClip = getClipPath(direction);

    const context = gsap.context(() => {
      // Create a timeline triggered by scrolling into view
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%", // Start revealing when the element is 15% into the viewport
          toggleActions: "play none none none",
        },
        defaults: { ease: GSAP_EASE.lux },
      });

      timeline
        .fromTo(
          root,
          { clipPath: startClip },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, delay },
          0
        )
        .fromTo(
          media,
          { scale: 1.05 },
          { scale: 1, duration: 1.8, ease: "power2.out", delay },
          0
        );
    }, root);

    return () => context.revert();
  }, [direction, delay]);

  return (
    <div
      ref={rootRef}
      className={`overflow-hidden ${className || ""}`}
      style={{ clipPath: getClipPath(direction) }}
    >
      <div ref={mediaRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
