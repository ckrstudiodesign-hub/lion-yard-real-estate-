"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { GSAP_EASE } from "@/lib/motion";
import { useSectionReveal } from "@/lib/reveal";

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useSectionReveal(ref, { start: "top 85%" });

  return (
    <div ref={ref} className={cn("flex flex-col border-t border-ink/10", className)}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: GSAP_EASE.lux,
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: GSAP_EASE.lux,
      });
    }
  }, [isOpen]);

  return (
    <div data-reveal="item" className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
        className="flex w-full items-center justify-between py-6 text-left focus-visible:outline-offset-4 sm:py-8"
      >
        <span className="display-serif text-h4 pr-8">{item.question}</span>
        <span
          aria-hidden="true"
          className="relative block h-4 w-4 shrink-0 transition-transform duration-500"
          style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
          <span className="absolute left-0 top-1/2 w-full h-px -translate-y-1/2 bg-ink" />
        </span>
      </button>

      <div
        id={`accordion-content-${item.id}`}
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pb-8 pt-2 sm:pb-10">
          <div className="text-body text-ink/70 max-w-[50ch]">{item.answer}</div>
        </div>
      </div>
    </div>
  );
}
