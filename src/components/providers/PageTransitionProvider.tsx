"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";

type TransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      router.push(href);
    },
    [pathname, router],
  );

  const value = useMemo<TransitionContextValue>(
    () => ({ navigate, isTransitioning: false }),
    [navigate],
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function usePageTransition(): TransitionContextValue {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used inside a <PageTransitionProvider>.");
  }
  return context;
}
