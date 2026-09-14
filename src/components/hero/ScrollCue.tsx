"use client";

import { scroll } from "@/components/providers/SmoothScrollProvider";

/**
 * "Scroll to explore" with a hairline that travels downward on a loop.
 * It is a real button: activating it scrolls to the next section, which also
 * makes the cue usable from the keyboard.
 */
export function ScrollCue({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      onClick={() => scroll.to(`#${targetId}`)}
      className="group flex flex-col items-center gap-4 text-bone/60 transition-colors duration-[400ms] hover:text-bone"
    >
      <span className="label-caps text-[0.6rem] tracking-[0.34em]">Scroll to explore</span>
      <span className="relative block h-14 w-px overflow-hidden bg-bone/20">
        <span className="absolute inset-x-0 top-0 block h-6 animate-[ly-trace_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-current" />
      </span>
    </button>
  );
}
