"use client";

import { cn } from "@/lib/cn";

/**
 * Two-line menu toggle that morphs into a cross.
 * Lines are individually transformed so the morph reads as one gesture.
 */
export function MenuButton({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "group relative -mr-2 flex h-11 w-11 items-center justify-center",
        className,
      )}
    >
      <span className="relative block h-3 w-6">
        <span
          className={cn(
            "absolute left-0 block h-px w-full bg-current transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "top-1.5 rotate-45" : "top-0 group-hover:w-5",
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-px w-full bg-current transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "top-1.5 -rotate-45" : "top-3",
          )}
        />
      </span>
    </button>
  );
}
