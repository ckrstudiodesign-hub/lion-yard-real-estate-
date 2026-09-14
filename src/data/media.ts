/**
 * DEMO IMAGERY — Phase 1.
 *
 * These are free-licence architectural photographs used to establish the visual
 * tone. They are NOT Lion Yard assets and must be replaced with the company's
 * own licensed photography before launch. Swapping is a one-file change: point
 * `src` at a local `/images/...` path (or your CDN) and drop the Unsplash entry
 * from `next.config.ts` → `images.remotePatterns`.
 */

export type Media = {
  src: string;
  alt: string;
  /** Low-quality inline placeholder so the hero never flashes an empty frame. */
  blurDataURL?: string;
};

const UNSPLASH = (id: string, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Neutral charcoal blur — matches the hero overlay, so the load is seamless. */
export const CHARCOAL_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxYjFiMWIiLz48L3N2Zz4=";

export const heroMedia: Media = {
  src: UNSPLASH("1512453979798-5ea266f8880c", 2560),
  alt: "Dubai skyline at dusk, seen across the water from the Business Bay waterfront.",
  blurDataURL: CHARCOAL_BLUR,
};
