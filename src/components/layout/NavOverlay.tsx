"use client";

import { useEffect, useRef } from "react";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, primaryNav, site, whatsappHref } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useScrollLock } from "@/lib/hooks";
import { GSAP_EASE, STAGGER, prefersReducedMotion } from "@/lib/motion";

export function NavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-overlay="panel"]', { opacity: 1 });
        gsap.set(
          '[data-overlay="item"] > *, [data-overlay="meta"], [data-overlay="accent"], [data-overlay="logo"], [data-overlay="close"]',
          { yPercent: 0, y: 0, opacity: 1, x: 0 },
        );
        return;
      }

      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: GSAP_EASE.lux } })
        // 1. background
        .fromTo(
          '[data-overlay="panel"]',
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.72 },
        )
        // 2. header elements
        .fromTo(
          '[data-overlay="logo"], [data-overlay="close"]',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        // 3. navigation items
        .fromTo(
          '[data-overlay="item"] > *',
          { yPercent: 110, y: 0, opacity: 0 },
          { yPercent: 0, y: 0, opacity: 1, duration: 0.8, stagger: STAGGER.item },
          "-=0.42",
        )
        // 4. subtle monogram accent
        .fromTo(
          '[data-overlay="accent"]',
          { opacity: 0, scale: 0.95 },
          { opacity: 0.03, scale: 1, duration: 1.2 },
          "-=0.6"
        )
        // 5. Contact details & Footer
        .fromTo(
          '[data-overlay="meta"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
          "-=0.4",
        );
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (open) timeline.play();
    else timeline.reverse();
  }, [open]);

  return (
    <div
      ref={rootRef}
      id="site-menu"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[110] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        ref={panelRef}
        data-overlay="panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute inset-0 flex flex-col bg-ink text-bone overflow-y-auto"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {/* RIGHT SIDE MONOGRAM (DESKTOP ONLY) */}
        <div 
          data-overlay="accent"
          aria-hidden="true" 
          className="absolute right-[-5vw] top-1/2 -translate-y-1/2 text-[45vw] leading-none font-display text-white pointer-events-none select-none hidden lg:block"
          style={{ opacity: 0.03 }}
        >
          LY
        </div>

        {/* HEADER */}
        <div className="shell flex h-[var(--header-h,88px)] shrink-0 items-center justify-between relative z-10 pt-4 lg:pt-8">
          <div data-overlay="logo">
            <Wordmark className="max-h-[60px] sm:max-h-[75px]" />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            data-overlay="close"
            className="group flex items-center gap-3 opacity-70 transition-opacity duration-[220ms] hover:opacity-100 focus-visible:outline-none"
          >
            <span className="label-caps text-[11px] tracking-[0.22em] text-bone/80">CLOSE</span>
            <span aria-hidden="true" className="relative block h-4 w-4 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90">
              <span className="absolute top-2 block h-px w-full rotate-45 bg-current" />
              <span className="absolute top-2 block h-px w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* MAIN NAVIGATION */}
        <div className="flex-1 flex flex-col justify-center relative z-10 w-full lg:w-[60%] lg:pl-[6vw] lg:py-[2vh] min-h-0">
          <nav aria-label="Primary" className="shell lg:w-full lg:max-w-none lg:px-0 py-8 lg:py-0 group/list">
            <ul className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full">
              {primaryNav.map((item, index) => (
                <li key={item.href} data-overlay="item" className="reveal-line shrink-0">
                  <TransitionLink
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-6 sm:gap-8 lg:gap-10 py-2 transition-opacity duration-300 opacity-100 lg:group-hover/list:opacity-40 lg:hover:!opacity-100"
                  >
                    <span className="font-sans text-[11px] font-medium tracking-[0.18em] text-bone/35 transition-colors duration-[400ms] group-hover:text-champagne shrink-0 w-6">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="display-serif text-[clamp(32px,11vw,50px)] lg:text-[clamp(32px,min(3.5vw,5.5vh),60px)] leading-[0.95] sm:leading-[1.05] transition-[color,transform] duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-champagne lg:group-hover:translate-x-3 flex items-center gap-4">
                      {item.label}
                      <span className="opacity-0 -translate-x-4 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-x-0 hidden lg:block text-champagne/80">
                        <ArrowRight />
                      </span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* BOTTOM CONTACT AREA */}
        <div className="shell relative z-10 shrink-0 w-full mt-auto pb-6 lg:pb-10">
          <div className="border-t border-bone/10 py-6 lg:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            
            {/* Column 1: CTA */}
            <div data-overlay="meta" className="flex items-start">
              <ButtonLink 
                href="/contact" 
                onClick={onClose} 
                className="w-full sm:w-[240px] h-[56px] sm:h-[60px] bg-bone text-ink hover:bg-bone/90 transition-colors rounded-none"
              >
                Enquire Now
                <ArrowRight />
              </ButtonLink>
            </div>

            {/* Column 2: Contact Details */}
            <div data-overlay="meta" className="flex flex-col gap-2">
              <span className="label-caps tracking-[0.18em] opacity-40 text-[10px] sm:text-[11px]">SPEAK TO A CONSULTANT</span>
              {contact.phoneHref !== "#" ? (
                <a
                  href={contact.phoneHref}
                  className="display-serif text-h3 transition-colors duration-[220ms] hover:text-champagne"
                >
                  {contact.phoneDisplay}
                </a>
              ) : (
                <span className="display-serif text-h3 opacity-50">{contact.phoneDisplay}</span>
              )}
              <a
                href={contact.emailHref}
                className="text-body-sm opacity-60 transition-opacity duration-[220ms] hover:opacity-100 mt-1"
              >
                {contact.email}
              </a>
            </div>

            {/* Column 3: Socials */}
            <div data-overlay="meta" className="flex flex-col sm:items-end gap-2">
              <span className="label-caps tracking-[0.18em] opacity-40 text-[10px] sm:text-[11px]">SOCIAL</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-1 sm:justify-end">
                {[
                  { label: "WhatsApp", href: whatsappHref },
                  { label: "Instagram", href: contact.instagram },
                  { label: "LinkedIn", href: contact.linkedin },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-caps tracking-[0.18em] opacity-60 transition-[opacity,transform] duration-[220ms] hover:opacity-100 hover:-translate-y-0.5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER LINE */}
          <div data-overlay="meta" className="flex flex-col sm:flex-row justify-between gap-2 pb-6 lg:pb-0">
            <p className="text-[10px] sm:text-[11px] tracking-wider uppercase opacity-45">
              {site.legalName}
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-wider uppercase opacity-45">
              {site.locality}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

