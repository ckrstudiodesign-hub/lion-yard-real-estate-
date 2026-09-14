"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type TextRevealProps = {
  text: string;
  type?: "line" | "word" | "fade";
  as?: React.ElementType;
  className?: string;
  delay?: number;
};

/**
 * Reusable text reveal component.
 * Manually splits text by newline or space depending on type, and animates it via ScrollTrigger.
 */
export function TextReveal({
  text,
  type = "line",
  as: Component = "div",
  className,
  delay = 0,
}: TextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-anim="item"]'), {
        yPercent: 0,
        y: 0,
        opacity: 1,
      });
      return;
    }

    const context = gsap.context(() => {
      const items = root.querySelectorAll('[data-anim="item"]');
      
      gsap.fromTo(
        items,
        { 
          yPercent: type === "fade" ? 0 : 110, 
          y: type === "fade" ? 20 : 0, 
          opacity: 0 
        },
        {
          yPercent: 0,
          y: 0,
          opacity: 1,
          duration: type === "fade" ? 0.9 : 1.15,
          stagger: 0.05,
          ease: GSAP_EASE.lux,
          delay,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);

    return () => context.revert();
  }, [type, delay]);

  // Handle splitting based on type
  let content: React.ReactNode;

  if (type === "line") {
    // Split by newline or simple sentence if lines aren't explicitly provided via \n
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    content = lines.map((line, i) => (
      <span key={i} className="reveal-line block overflow-hidden">
        <span data-anim="item" className="block transform-gpu">
          {line}
        </span>
      </span>
    ));
  } else if (type === "word") {
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    content = words.map((word, i) => (
      <span key={i} className="reveal-line inline-block overflow-hidden mr-[0.25em]">
        <span data-anim="item" className="inline-block transform-gpu">
          {word}
        </span>
      </span>
    ));
  } else {
    // fade
    content = (
      <span data-anim="item" className="block transform-gpu">
        {text}
      </span>
    );
  }

  return (
    <Component ref={rootRef} className={cn(className)}>
      {content}
    </Component>
  );
}
