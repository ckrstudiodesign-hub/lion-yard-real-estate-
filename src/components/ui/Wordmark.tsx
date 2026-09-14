import type { ComponentProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * LION YARD REAL ESTATE — Logo.
 *
 * Uses the official logo asset provided. The `compact` variant scales it for
 * the scrolled header and small screens.
 */
export function Wordmark({
  className,
  compact = false,
  onLight = false,
  ...rest
}: ComponentProps<"span"> & {
  /** Single-line lockup — used by the scrolled header and narrow screens. */
  compact?: boolean;
  /** Whether the wordmark is currently sitting on a light background. */
  onLight?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-col justify-center transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact ? "scale-[0.85]" : "scale-100",
        onLight ? "brightness-0" : "",
        className
      )}
      {...rest}
    >
      <Image
        src="/logo.png"
        alt="Lion Yard Real Estate"
        width={240}
        height={90}
        priority
        className="h-auto w-auto object-contain max-h-[55px] sm:max-h-[70px]"
      />
    </span>
  );
}

/**
 * Larger centred lockup for the preloader and the page-transition cover.
 */
export function WordmarkStacked({
  className,
  ...rest
}: ComponentProps<"span">) {
  return (
    <span
      className={cn("flex flex-col items-center", className)}
      {...rest}
    >
      <Image
        src="/logo.png"
        alt="Lion Yard Real Estate"
        width={400}
        height={160}
        priority
        className="h-auto w-auto object-contain max-h-[100px] sm:max-h-[140px]"
      />
    </span>
  );
}
