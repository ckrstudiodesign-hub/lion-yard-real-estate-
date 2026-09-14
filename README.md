# Lion Yard Real Estate — Website

**Lion Yard Real Estate Buying & Selling Brokerage L.L.C** — Dubai, United Arab Emirates.

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

### One-time cleanup

Three components have been superseded and are no longer imported anywhere. They
could not be deleted remotely — please remove them:

```
src/components/ui/LionMark.tsx      (replaced by Wordmark)
src/components/ui/Logo.tsx          (replaced by Wordmark)
src/components/layout/PhaseMarker.tsx   (replaced by the real Phase 2 sections)
```

---

## Build status

**Phase 1 — complete.** Foundation, design system, header, navigation, hero, motion
system, smooth scroll, page-transition foundation.

**Phase 2 — complete.** Property data architecture, search, featured properties,
horizontal showcase, card interactions.

Not built yet, by design: the full property detail page, the /properties listing
page, communities, buy/sell/invest, about, contact, CMS. Every navigation
destination and every property card resolves to a real branded page stating which
phase it belongs to — no dead links and no fake buttons.

---

## Architecture

```
src/
  app/                 routes, metadata, sitemap, robots, global CSS
  components/
    hero/              Preloader, Hero, ScrollCue
    layout/            AppShell, Header, NavOverlay, MenuButton, placeholders
    providers/         IntroProvider, SmoothScrollProvider, PageTransitionProvider
    property/          search, cards, showcase, filter state
    ui/                Button, Wordmark, CustomCursor, TransitionLink
  data/                site.ts (brand + contact + nav), media.ts, properties.ts
  fonts/               self-hosted variable woff2
  lib/                 gsap.ts, motion.ts, hooks.ts, reveal.ts, filters.ts, cn.ts
  types/               property.ts — the property contract
```

**No content is hard-coded into UI components.** Brand details, contact channels and
navigation live in `src/data/site.ts`; imagery lives in `src/data/media.ts`. Both are
shaped to be replaced by a CMS or API without touching a component.

### Logo

`src/components/ui/Wordmark.tsx` is a **temporary typographic wordmark**, not an
invented emblem — no official logo asset was supplied, and a made-up lion device
would only have to be thrown away later.

To swap in the official logo, **edit that one file**. Every surface that shows brand
identity — header, preloader, menu, page-transition cover — renders through it.
Keep the `compact` variant working: the scrolled header and narrow screens use it.

### Design tokens

All tokens are declared once in `src/app/globals.css` under `@theme` — colour, the
fluid type scale, easing curves, durations, gutters and section rhythm. Nothing in
the codebase hard-codes a hex value, a font stack or an easing curve.

Palette: `#111111` ink · `#1B1B1B` charcoal · `#F5F4F1` off-white · `#FFFFFF` white,
with `#B8A47A` champagne used only as a hairline accent.

Type: **Cormorant Garamond** (display) + **Inter** (UI), both self-hosted variable
woff2, latin subset, ~86 KB combined. No runtime request to Google Fonts — faster
first paint and no third-party data transfer for EU/UAE visitors.

### Motion

`src/lib/motion.ts` is the single source for easing and duration. The house curve is
`cubic-bezier(0.22, 1, 0.36, 1)` — fast out, long settle, no bounce anywhere.

Lenis drives smooth scrolling through GSAP's ticker, so scroll position and
scroll-linked animation update in the same frame. Both are disabled entirely for
visitors with `prefers-reduced-motion: reduce`, who get native scrolling.

### Page-load sequence

```
0ms     black
300ms   LION YARD wordmark rises in
550ms   curtain wipes upward, carrying the wordmark with it
600ms   hero clip-path reveal begins — inset(0 100% 0 0) → inset(0 0 0 0), 1.4s
800ms   eyebrow
1000ms  headline line one, out of its own mask
1150ms  headline line two
1400ms  supporting copy
1550ms  primary CTA
1650ms  secondary CTA
1800ms  scroll indicator
```

Those are the authored offsets. In a real browser the whole sequence sits roughly
250–300ms later than the numbers above, because nothing can run until React has
hydrated and GSAP has loaded — the rhythm is exact, the clock just starts slightly
late. The curtain is server-rendered, so the visitor sees black from first paint.

The sequence spans three components that coordinate through `IntroProvider`, not
timers. It plays once per browser tab — set `PLAY_ONCE_PER_SESSION = false` in
`src/components/hero/Preloader.tsx` to replay it on every load while reviewing.

### Adaptive header

The header knows what it is sitting over. Sections declare `data-surface="dark"` or
`"light"`; the header measures their positions once per layout change and compares
them against the scroll offset as plain numbers, so the scroll handler never forces
a layout. Over a dark section it is ink with bone type; over a light one it inverts
to bone with ink type, CTA included.

88px at rest, 72px scrolled, 64px threshold, 450ms on the house curve.

The full navigation bar appears from 1280px up. Below that the menu overlay is the
navigation — at 1024 the six-item bar, the wordmark and the CTA crowd each other,
and a cramped header is worse than a deliberate one.

### Custom cursor

Desktop only, and it disables itself rather than being disabled: it renders only for
a pointer that is both fine and hover-capable, never under `prefers-reduced-motion`,
and it hides the native cursor only once it is actually live — so a visitor can never
end up with no cursor at all. Position is written with `gsap.quickTo`, so there is no
React state in the pointer-move path.

### Without JavaScript

A `<noscript>` stylesheet in the root layout removes the curtain and reveals every
animated element at its final state, so the page renders complete and readable with
scripting disabled. A stylesheet rather than an inline script, so it also survives a
strict Content-Security-Policy.

### Visual language — rules that later phases must not break

1. **Type over photography must survive a bright image.** Half of real property
   photography is pale interiors. Any bone type sitting on a photograph needs a
   scrim dense enough to hold it there — the showcase uses **pixel-anchored**
   gradient stops, not percentages, because the text block is roughly the same
   height on every screen while the card is not.
2. **A chip over a photograph is solid, never translucent.** A tinted pill over a
   pale interior shot is grey on grey.
3. **Don't wash a photograph to make one small element legible.** If only a chip
   needs contrast, give the chip contrast — a full-width gradient across a good
   photograph reads as a rendering fault.
4. **Search is an index, not a form.** No boxes, no bordered cells, no small sans
   values. Hairlines divide; the chosen value is set in the display serif at a
   size you read.
5. **Cards have four type registers and no rules between them** — kicker, name,
   price, and a micro-caps data line. Setting the specs in tracked micro-caps is
   what makes them read as a caption rather than as a listing row.
6. **Headings sit on one line with the supporting text on the right.** Stacking a
   heading, a sub-line and a link all at the left edge leaves the right half of a
   wide screen empty, which reads as unfinished rather than as whitespace.

### Property architecture

`src/types/property.ts` is the contract; `src/data/properties.ts` holds eight
**clearly-marked demo properties**; `src/lib/filters.ts` holds the rules. The
filtering functions are framework-free — no React, no DOM — so the same
`filterProperties()` backs the homepage search today and the /properties listing
page later, and can move server-side against a real feed without a rewrite.

Every property renders a real static route at `/properties/[slug]` with metadata
built from the record. The detail page itself is Phase 3; the routing and data
around it are done.

### Search

Filtering is **live** — changing a field updates the count and the properties
below immediately. `SEARCH PROPERTIES` is still a real action (it carries you to
the results, and the form submits on Enter), but nothing is gated behind pressing
it. `SELL` is a link to /sell rather than a filter, because selling is a service,
not a search over stock.

One filter state drives the whole page: narrowing the search changes the featured
section *and* the horizontal showcase. There is no second, parallel result list.

The dropdowns are real ARIA listboxes — arrow keys, Home/End, Enter, Escape,
`aria-activedescendant` — because a native `<select>` cannot be animated and a div
that merely looks like a listbox is not usable without a mouse.

### Horizontal showcase

Two implementations, chosen at runtime. On desktop the section pins and the track
translates with scroll, with travel measured from the track's real `scrollWidth`
so it is correct at any viewport and any number of cards. On touch, narrow
screens, and under reduced motion it is a native scroll-snap rail — deliberately
not the pinned version scaled down, because hijacking vertical scroll on a phone
is how this pattern is usually got wrong.

The pinned section is **never unmounted by a React update**. ScrollTrigger's pin
re-parents the trigger element into a spacer it inserts itself; removing that
element during an update kills the page with a `removeChild` error. The section,
viewport and track are therefore always rendered — only the cards inside them
change.

---

## Verified

Production build, Chromium, at **360 / 390 / 430 / 768 / 1024 / 1440 / 1920**:

- no console errors, page errors, failed requests or hydration warnings
- no horizontal overflow at any width, menu open or closed
- header 88px → 72px at every width, inverting correctly over the light section
- headline never collides with the supporting copy or the scroll cue
- background scroll locked while the menu is open; Escape closes it
- tab order clean, focus moves into the open menu, visible champagne focus ring
- reduced-motion and JS-disabled paths both render complete
- search, filters, combined filters, empty state and reset all behave
- dropdowns operable by keyboard, focus returned to the trigger on selection
- every property image carries alt text; every card link an accessible name
- touch targets in the search are 44px or larger
- all routes static, including eight property routes; homepage 167 kB first-load JS

Scroll performance was measured rather than assumed. In this test environment a
blank page renders at 16.7ms/frame, so that is the floor. The pinned showcase with
its photographs and scrims hidden runs at **17.0ms** — the ScrollTrigger work,
parallax and progress updates together cost effectively nothing. The remaining
~8ms is rasterising eight large photographs and their gradient scrims, which is
GPU work on real hardware and software-rendered here.

---

## Before launch — required replacements

1. **Photography.** `src/data/media.ts` currently points at free-licence Unsplash
   photography for tone only. It is **not owned by Lion Yard**. Replace `src` with
   local `/images/...` paths or your CDN, then delete the `images.unsplash.com`
   entry from `images.remotePatterns` in `next.config.ts`.
2. **Logo.** Replace the contents of `src/components/ui/Wordmark.tsx`.
3. **Contact details.** Phone, WhatsApp number, email, Instagram and LinkedIn in
   `src/data/site.ts` are placeholders.
4. **Domain.** `site.url` in `src/data/site.ts` feeds canonical URLs, Open Graph,
   `sitemap.xml` and `robots.txt`.
5. **Open Graph image.** Add `src/app/opengraph-image.png` (1200×630).

No awards, statistics, testimonials, transaction volumes or client claims appear
anywhere in this build, and none should be added without evidence.
