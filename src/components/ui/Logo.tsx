import { LionMark } from "@/components/ui/LionMark";
import { cn } from "@/lib/cn";

/**
 * Lockup: emblem + two-line wordmark.
 * `compact` drops the descriptor line — used by the shrunken scrolled header.
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3 sm:gap-3.5", className)}>
      <LionMark
        className={cn(
          "w-auto shrink-0 transition-[height] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact ? "h-7 sm:h-8" : "h-8 sm:h-10",
        )}
      />
      <span className="flex flex-col justify-center">
        <span className="label-caps text-[0.78rem] leading-none tracking-[0.3em] sm:text-[0.85rem]">
          Lion Yard
        </span>
        <span
          className={cn(
            "label-caps overflow-hidden text-[0.58rem] leading-none tracking-[0.42em] text-current/60 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            compact ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-4 opacity-100",
          )}
        >
          Real Estate
        </span>
      </span>
    </span>
  );
}
