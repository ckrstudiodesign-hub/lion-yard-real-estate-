"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { usePageTransition } from "@/components/providers/PageTransitionProvider";

/**
 * Drop-in replacement for next/link that routes through the cinematic page
 * transition. Falls back to normal navigation for modified clicks (new tab,
 * middle click) and external hrefs, so browser behaviour is never hijacked.
 */
export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const { navigate } = usePageTransition();
  const target = typeof href === "string" ? href : href.pathname ?? "";
  const isInternal = target.startsWith("/") && !target.startsWith("//");

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (!isInternal) return;
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        navigate(target);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
