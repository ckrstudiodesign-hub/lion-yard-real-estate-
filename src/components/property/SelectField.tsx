"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

export type SelectOption = { value: string; label: string };

/**
 * Search field.
 *
 * Set as an editorial line rather than a form control: a micro-caps label with
 * the chosen value beneath it in the display serif, at a size you actually
 * read. Nothing is boxed — the row's hairlines do the dividing. A boxed input
 * with a small sans value is what makes a property search look like a booking
 * widget, and that is the one thing this section must not look like.
 *
 * Underneath it is a real WAI-ARIA listbox, not a div dressed as one:
 *
 *   · button carries aria-haspopup, aria-expanded and aria-activedescendant
 *   · the panel is role="listbox", each row role="option" with aria-selected
 *   · Up/Down/Home/End move the active option, Enter and Space commit,
 *     Escape closes and returns focus, Tab closes and moves on
 *   · focus stays on the button throughout, which is what keeps the
 *     open/close animation from fighting the browser's focus ring
 *
 * A native <select> cannot be animated, which is why this exists at all.
 * Only opacity and transform are animated.
 */
/**
 * `editorial` — label above, value in the display serif. The default, used
 *   wherever the control is part of the page's composition.
 * `compact` — label and value on one line in micro-caps. For secondary controls
 *   such as sort, where a full editorial field would out-shout the results.
 */
export type SelectVariant = "editorial" | "compact";

export function SelectField({
  label,
  value,
  options,
  onChange,
  className,
  variant = "editorial",
  align = "left",
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  variant?: SelectVariant;
  /** Which edge the panel hangs from — `right` for controls near the margin. */
  align?: "left" | "right";
}) {
  const compact = variant === "compact";
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selected = options[selectedIndex];

  // Built fresh each time rather than kept paused, so the stagger always starts
  // from the top of the list.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!open) {
      gsap.set(panel, { autoAlpha: 0, y: -8 });
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(panel, { autoAlpha: 1, y: 0 });
      gsap.set(panel.children, { autoAlpha: 1, y: 0 });
      return;
    }

    const timeline = gsap.timeline();
    timeline
      .fromTo(
        panel,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: GSAP_EASE.lux },
      )
      .fromTo(
        panel.children,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.028, ease: GSAP_EASE.lux },
        0.04,
      );

    return () => {
      timeline.kill();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const commit = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) {
          setActiveIndex(selectedIndex);
          setOpen(true);
        } else {
          setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) {
          setActiveIndex(selectedIndex);
          setOpen(true);
        } else {
          setActiveIndex((i) => Math.max(0, i - 1));
        }
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(activeIndex);
        else {
          setActiveIndex(selectedIndex);
          setOpen(true);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const isDefault = selectedIndex === 0;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <span
        id={`${id}-label`}
        className={cn(
          "label-caps block text-[0.55rem] tracking-[0.26em] text-ink/50",
          compact && "sr-only",
        )}
      >
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => {
          setActiveIndex(selectedIndex);
          setOpen((v) => !v);
        }}
        onKeyDown={onKeyDown}
        className={cn(
          "group flex min-h-11 w-full items-center gap-4 text-left",
          compact ? "justify-start gap-3" : "mt-3 justify-between",
        )}
      >
        {compact ? (
          <span aria-hidden="true" className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/45">
            {label}
          </span>
        ) : null}
        <span
          id={`${id}-value`}
          className={cn(
            "truncate transition-colors duration-[220ms]",
            compact
              ? "label-caps text-[0.6rem] tracking-[0.2em] text-ink"
              : "display-serif text-[1.3rem] leading-none sm:text-[1.4rem]",
            // Not /45: a light serif at this size loses its thin strokes and
            // starts to read as a disabled control rather than an empty one.
            !compact && (isDefault ? "text-ink/60" : "text-ink"),
          )}
        >
          {selected?.label ?? ""}
        </span>
        <svg
          viewBox="0 0 14 8"
          aria-hidden="true"
          focusable="false"
          className={cn(
            "shrink-0 transition-[transform,color] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            compact ? "ml-auto h-[6px] w-3" : "h-[7px] w-3.5",
            "text-ink/45 group-hover:text-ink",
            open && "-rotate-180",
          )}
        >
          <path d="M1 1.5 7 6.5 13 1.5" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </button>

      {/* Champagne rule marks a field the visitor has actually set. */}
      {compact ? null : (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-px left-0 block h-px w-full origin-left bg-champagne transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDefault ? "scale-x-0" : "scale-x-100",
          )}
        />
      )}

      <ul
        ref={panelRef}
        id={`${id}-listbox`}
        role="listbox"
        aria-labelledby={`${id}-label`}
        tabIndex={-1}
        className={cn(
          "absolute top-[calc(100%+1rem)] z-50 max-h-80 min-w-[14rem] overflow-y-auto border border-ink/12 bg-paper py-2",
          align === "right" ? "right-0" : "left-0",
          compact ? "w-[16rem]" : "w-full",
          "shadow-[0_30px_70px_-40px_rgb(17_17_17/0.5)]",
          !open && "pointer-events-none",
        )}
        style={{ opacity: 0, visibility: "hidden" }}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          return (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={isSelected}
              onPointerDown={(event) => {
                event.preventDefault();
                commit(index);
              }}
              onPointerEnter={() => setActiveIndex(index)}
              className={cn(
                "cursor-pointer px-5 py-3 text-body-sm transition-colors duration-[160ms]",
                index === activeIndex ? "bg-ink/[0.05] text-ink" : "text-ink/65",
                isSelected && "text-ink",
              )}
            >
              <span className="flex items-center justify-between gap-4">
                {option.label}
                {isSelected ? (
                  <span aria-hidden="true" className="block h-px w-5 bg-champagne" />
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
