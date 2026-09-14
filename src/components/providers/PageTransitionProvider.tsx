"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { WordmarkStacked } from "@/components/ui/Wordmark";
import { EASE } from "@/lib/motion";

/**
 * Cinematic route change:
 *
 *   cover in (420ms)  →  router.push  →  new route paints  →  cover out (520ms)
 *
 * Total ≈ 950ms, inside the 700–1000ms brief. The cover is a real element with
 * the brand mark on it, not a fade, so navigation reads as a deliberate cut
 * rather than a page reload.
 *
 * Phase 1 ships the mechanism and the single homepage route; every route added
 * in later phases inherits the transition automatically via <TransitionLink>.
 */

type TransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

// 350 + 450 = 800ms end to end — inside the 600–900ms brief, long enough to
// read as a deliberate cut and short enough not to slow navigation down.
const COVER_IN = 350;
const COVER_OUT = 450;

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState<"idle" | "covering" | "revealing">("idle");
  const pendingRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || pendingRef.current) return;

      // Respect the OS motion preference: jump straight there.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      pendingRef.current = href;
      setState("covering");

      timersRef.current.push(
        window.setTimeout(() => {
          router.push(href);
        }, COVER_IN),
      );
    },
    [pathname, router],
  );

  // When the new route has painted, lift the cover.
  useEffect(() => {
    if (!pendingRef.current) return;
    if (pendingRef.current !== pathname) return;

    pendingRef.current = null;
    setState("revealing");

    timersRef.current.push(
      window.setTimeout(() => setState("idle"), COVER_OUT),
    );
  }, [pathname]);

  const value = useMemo<TransitionContextValue>(
    () => ({ navigate, isTransitioning: state !== "idle" }),
    [navigate, state],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        aria-hidden="true"
        data-state={state}
        className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-ink opacity-0 transition-opacity data-[state=covering]:pointer-events-auto data-[state=covering]:opacity-100 data-[state=idle]:invisible data-[state=revealing]:opacity-0"
        style={{
          transitionDuration: state === "covering" ? `${COVER_IN}ms` : `${COVER_OUT}ms`,
          transitionTimingFunction: state === "covering" ? EASE.luxIn : EASE.lux,
        }}
      >
        <WordmarkStacked className="text-bone" />
      </div>
    </TransitionContext.Provider>
  );
}

export function usePageTransition(): TransitionContextValue {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used inside a <PageTransitionProvider>.");
  }
  return context;
}
