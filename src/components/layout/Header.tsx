"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MenuButton } from "@/components/layout/MenuButton";
import { NavOverlay } from "@/components/layout/NavOverlay";
import { useIntro } from "@/components/providers/IntroProvider";
import { ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useScrolledPast, useSurfaceTheme } from "@/lib/hooks";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/motion";

/** Rest 88px, scrolled 72px — inside the 80–96px brief, and never oversized. */
const HEIGHT_REST = 88;
const HEIGHT_SCROLLED = 72;
/** Mid-range of the 40–80px brief: past the first deliberate scroll gesture. */
const SCROLL_THRESHOLD = 64;

/**
 * Premium sticky header.
 *
 *   at rest    transparent, 88px, sitting over the hero
 *   scrolled   72px, backdrop blur, hairline rule, and a background that
 *              follows the section underneath — ink over dark sections, bone
 *              over light ones, with the navigation inverting to match.
 *
 * Everything transitions on the 450ms house curve, so the change reads as a
 * considered state shift rather than a snap.
 */
export function Header() {
  const scrolled = useScrolledPast(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const { started } = useIntro();
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);

  // Which section is under the header right now.
  const surface = useSurfaceTheme(HEIGHT_SCROLLED / 2, pathname);
  const onLight = scrolled && surface === "light";

  useEffect(() => setMenuOpen(false), [pathname]);

  // Entrance: logo, then each navigation item, then the CTA and menu button.
  // Fast (≈650ms end to end) — the header should settle, not perform.
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !started) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-head="logo"], [data-head="item"], [data-head="cta"]', {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: GSAP_EASE.lux } })
        .fromTo(
          '[data-head="logo"]',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.55 },
          0,
        )
        .fromTo(
          '[data-head="item"]',
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.055 },
          0.1,
        )
        .fromTo(
          '[data-head="cta"]',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          0.34,
        );
    }, root);

    return () => context.revert();
  }, [started]);

  return (
    <>
      <a
        href="#main"
        className="label-caps sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[130] focus:bg-bone focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      <header
        ref={rootRef}
        data-scrolled={scrolled}
        data-surface-mode={onLight ? "light" : "dark"}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] isolate border-b",
          "transition-[background-color,backdrop-filter,border-color,color,height] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          onLight ? "text-ink" : "text-bone",
          scrolled
            ? onLight
              ? "border-ink/10 bg-bone/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bone/70"
              : "border-bone/10 bg-ink/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70"
            : "border-transparent bg-transparent",
        )}
        style={{
          height: scrolled ? HEIGHT_SCROLLED : HEIGHT_REST,
          // Published for the overlay and any future sticky sub-navigation.
          ["--header-h" as string]: `${scrolled ? HEIGHT_SCROLLED : HEIGHT_REST}px`,
        }}
      >
        {/* A transparent header sits over whatever photograph the page happens
            to open with. Over a pale interior shot, bone navigation on an
            undarkened image is unreadable — verified on the Palm Vista hero. A
            short gradient behind the bar fixes it everywhere at once, and is
            invisible over the dark imagery it was already fine on. It fades out
            as the solid scrolled background takes over. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140%] transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            onLight
              ? "bg-[linear-gradient(to_bottom,rgba(245,244,241,0.72),transparent)]"
              : "bg-[linear-gradient(to_bottom,rgba(17,17,17,0.62),transparent)]",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        />

        {/* The navigation is absolutely centred on the viewport rather than
            centred in whatever space the logo and CTA leave, so it reads as the
            axis of the header at every width.

            It appears from 1280 up. At 1024 the full six-item bar, the wordmark
            and the CTA crowd each other badly, and a cramped header is worse
            than no visible navigation — below 1280 the menu overlay is the
            navigation, which is how this class of site normally behaves. */}
        <div className="shell relative flex h-full items-center justify-between gap-6">
          <TransitionLink
            href="/"
            data-head="logo"
            aria-label="Lion Yard Real Estate — home"
          >
            <Wordmark compact={scrolled} onLight={onLight} />
          </TransitionLink>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 xl:block"
          >
            <ul className="flex items-center gap-9 2xl:gap-11">
              {primaryNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} data-head="item">
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative block py-2"
                    >
                      <span
                        className={cn(
                          "label-caps transition-colors duration-[220ms]",
                          active ? "opacity-100" : "opacity-65 group-hover:opacity-100",
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 block h-px w-full origin-left bg-champagne transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wrapper rather than a `hidden` class on the button: the button's
                own base style sets `inline-flex`, and two display utilities on
                one element resolve by stylesheet order, not class order. */}
            <span data-head="cta" className="hidden sm:block">
              <ButtonLink
                href="/contact"
                variant={onLight ? "outlineInk" : "outline"}
                size="sm"
              >
                Enquire Now
              </ButtonLink>
            </span>
            <span data-head="cta" className="xl:hidden">
              <MenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </span>
          </div>
        </div>
      </header>

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
