"use client";

import type { ComponentProps, ReactNode } from "react";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/cn";

/**
 * Buttons are square, hairline and typographic — the opposite of a rounded,
 * shadowed SaaS button. The hover is a fill that sweeps up from the baseline
 * behind the label, plus a very slight scale; nothing bounces.
 *
 * VARIANTS COME IN SURFACE PAIRS. `solid`/`outline` are for dark sections and
 * `solidInk`/`outlineInk` for light ones. Using the wrong half is not a subtle
 * mistake: `solid` is a bone fill, so on a bone section the primary CTA becomes
 * an invisible box with a floating label — which is exactly what happened to
 * the enquiry form's submit until it was caught in visual review.
 */
type Variant = "solid" | "solidInk" | "outline" | "outlineInk" | "ghost";
type Size = "sm" | "md";

const base = [
  "group/btn relative inline-flex select-none items-center justify-center gap-3 overflow-hidden border text-center label-caps",
  "transition-[color,border-color,transform] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:scale-[1.012] focus-visible:scale-[1.012] active:scale-100",
  "motion-reduce:transform-none motion-reduce:transition-none",
].join(" ");

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7 sm:h-[3.25rem] sm:px-9",
};

const variants: Record<Variant, string> = {
  solid: "border-bone bg-bone text-ink hover:text-bone",
  solidInk: "border-ink bg-ink text-bone hover:text-ink",
  outline: "border-bone/35 bg-transparent text-bone hover:border-bone hover:text-ink",
  outlineInk: "border-ink/25 bg-transparent text-ink hover:border-ink hover:text-bone",
  ghost: "border-transparent bg-transparent hover:text-champagne",
};

/** Fill that sweeps up from the baseline behind the label. */
const sweepFill: Record<Variant, string | null> = {
  solid: "bg-ink",
  solidInk: "bg-bone",
  outline: "bg-bone",
  outlineInk: "bg-ink",
  ghost: null,
};

function Sweep({ variant }: { variant: Variant }) {
  const fill = sweepFill[variant];
  if (!fill) return null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100",
        fill,
      )}
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Sweep variant={variant} />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof TransitionLink>, "className" | "children">) {
  return (
    <TransitionLink
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <Sweep variant={variant} />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </TransitionLink>
  );
}

/** Thin arrow; travels 8px on hover of its parent button. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-2 w-4 shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/btn:translate-x-2 group-focus-visible/btn:translate-x-2",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-4 w-2 shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/btn:translate-y-2 group-focus-visible/btn:translate-y-2",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <path d="M5 0v18M1 14l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
