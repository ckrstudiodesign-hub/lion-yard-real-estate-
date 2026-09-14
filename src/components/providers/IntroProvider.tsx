"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * The homepage entrance is one choreographed sequence spanning three separate
 * components (Preloader → Hero → Header). They coordinate through this context
 * rather than through timers, so the order can never drift.
 *
 *   loading    black screen, brand mark
 *   revealing  curtain is lifting — hero media and copy animate in
 *   done       sequence complete, scroll-driven animation takes over
 *
 * Routes without a preloader mount with `skip`, which starts the sequence at
 * `done` so their content is visible immediately.
 */
export type IntroPhase = "loading" | "revealing" | "done";

type IntroContextValue = {
  phase: IntroPhase;
  /** True once the curtain has started lifting — the cue for hero + nav. */
  started: boolean;
  beginReveal: () => void;
  completeIntro: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({
  children,
  skip = false,
}: {
  children: React.ReactNode;
  skip?: boolean;
}) {
  const [phase, setPhase] = useState<IntroPhase>(skip ? "done" : "loading");

  const beginReveal = useCallback(() => {
    setPhase((current) => (current === "loading" ? "revealing" : current));
  }, []);

  const completeIntro = useCallback(() => setPhase("done"), []);

  const value = useMemo<IntroContextValue>(
    () => ({
      phase,
      started: phase !== "loading",
      beginReveal,
      completeIntro,
    }),
    [phase, beginReveal, completeIntro],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroContextValue {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used inside an <IntroProvider>.");
  }
  return context;
}
