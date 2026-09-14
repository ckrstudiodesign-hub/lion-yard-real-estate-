/**
 * Shared motion language. Every timeline in the site pulls its easing and
 * duration from here so the whole experience moves as one piece.
 */

export const EASE = {
  /** Primary: fast out, long settle. The Lion Yard signature. */
  lux: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Exits and covers. */
  luxIn: "cubic-bezier(0.64, 0, 0.78, 0)",
  /** Symmetrical glide for crossfades and colour shifts. */
  glide: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

/** GSAP-native equivalents of the CSS easings above. */
export const GSAP_EASE = {
  lux: "power3.out",
  luxIn: "power3.in",
  glide: "power2.inOut",
} as const;

export const DURATION = {
  micro: 0.22,
  ui: 0.4,
  reveal: 0.9,
  cinema: 1.4,
} as const;

export const STAGGER = {
  line: 0.1,
  item: 0.08,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
