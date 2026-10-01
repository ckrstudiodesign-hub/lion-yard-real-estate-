"use client";

import { useRef } from "react";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, primaryNav, site, whatsappHref } from "@/data/site";
import { useSectionReveal } from "@/lib/reveal";

/**
 * Site footer.
 *
 * The last editorial statement rather than a sitemap dump: an oversized closing
 * line and one clear action, with the navigation and contact details set as
 * quiet supporting material beneath it.
 *
 * Rendered once in the app shell, so every page ends the same way.
 */
const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 88%" });

  // Evaluated at build time in a statically rendered page, so it cannot drift
  // between server and client.
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      data-surface="dark"
      className="relative z-0 bg-ink text-bone"
      aria-labelledby="footer-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      <div className="shell py-[var(--spacing-section)]">
        {/* ---- Closing statement ---------------------------------------- */}
        <div className="flex flex-col items-center text-center gap-10 border-b border-bone/10 pb-16 lg:gap-14 lg:pb-24">
          <p data-reveal="item" className="label-caps text-champagne mb-[-1rem]">
            Begin Your Journey
          </p>
          <h2
            id="footer-heading"
            data-reveal="item"
            className="display-serif text-h2 md:text-h1 lg:text-[5rem] leading-[0.95] max-w-[15ch]"
          >
            Let&rsquo;s find your next address.
          </h2>

          <div data-reveal="item" className="shrink-0 mt-4">
            <ButtonLink href="/contact" variant="solid" className="px-8 py-4">
              Start a Conversation
              <ArrowRight />
            </ButtonLink>
          </div>
        </div>

        {/* ---- Columns --------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:pt-24">
          <div data-reveal="item" className="lg:col-span-4">
            <Wordmark />
            <p className="mt-7 max-w-[30ch] text-body-sm leading-relaxed text-bone/50">
              {site.legalName}
            </p>
            <div className="mt-3 text-body-sm text-bone/50">
              {contact.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <nav data-reveal="item" aria-label="Footer" className="lg:col-span-3">
            <h3 className="label-caps text-[0.55rem] tracking-[0.28em] text-bone/35">
              Explore
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="text-body-sm text-bone/70 transition-colors duration-[220ms] hover:text-bone"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal="item" className="lg:col-span-3">
            <h3 className="label-caps text-[0.55rem] tracking-[0.28em] text-bone/35">
              Contact
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <a
                  href={contact.phoneHref}
                  className="display-serif text-[1.2rem] leading-none text-bone transition-colors duration-[220ms] hover:text-champagne"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="text-body-sm text-bone/70 transition-colors duration-[220ms] hover:text-bone"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-bone/70 transition-colors duration-[220ms] hover:text-bone"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div data-reveal="item" className="lg:col-span-2">
            <h3 className="label-caps text-[0.55rem] tracking-[0.28em] text-bone/35">
              Follow
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {[
                { label: "Instagram", href: contact.instagram },
                { label: "LinkedIn", href: contact.linkedin },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-bone/70 transition-colors duration-[220ms] hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Baseline --------------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-5 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="text-micro text-bone/35">
            © {year} {site.brand}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  className="text-micro text-bone/35 transition-colors duration-[220ms] hover:text-bone/70"
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
