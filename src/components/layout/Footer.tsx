"use client";

import { useRef } from "react";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, primaryNav, site, whatsappHref } from "@/data/site";
import { useSectionReveal } from "@/lib/reveal";

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 95%" });

  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      data-surface="dark"
      className="relative z-0 bg-ink text-bone pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12"
      aria-labelledby="footer-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Closing statement with Video Background ------------------- */}
        <div className="relative overflow-hidden rounded-sm border border-bone/15 px-6 py-16 sm:px-10 sm:py-20 lg:py-24 flex flex-col items-center justify-center text-center gap-6 sm:gap-8 mb-12 sm:mb-16 shadow-2xl min-h-[360px] sm:min-h-[420px]">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              src="/place.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover object-center"
            />
            {/* Soft gradient overlay for text readability without washing out the video */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-black/35 to-ink/75"
            />
          </div>

          {/* Foreground Text Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <p
              data-reveal="item"
              className="label-caps text-champagne tracking-[0.28em] text-xs sm:text-sm font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              Begin Your Journey
            </p>
            <h2
              id="footer-heading"
              data-reveal="item"
              className="display-serif mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.05] max-w-[15ch] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              Let&rsquo;s find your next address.
            </h2>

            <div data-reveal="item" className="shrink-0 mt-5 sm:mt-7">
              <ButtonLink
                href="/contact"
                variant="solid"
                className="px-8 sm:px-9 py-3.5 sm:py-4 shadow-2xl bg-bone text-ink hover:border-champagne font-medium tracking-wider"
              >
                <span className="transition-colors duration-300 group-hover/btn:text-champagne">
                  Start a Conversation
                </span>
                <ArrowRight className="transition-colors duration-300 group-hover/btn:text-champagne" />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* ---- Lower Footer Information Columns --------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8">
          {/* Brand & Address */}
          <div data-reveal="item" className="lg:col-span-4 flex flex-col justify-start">
            <Wordmark />
            <p className="mt-5 text-sm font-medium leading-relaxed text-bone/90 max-w-[32ch]">
              {site.legalName}
            </p>
            <address className="mt-3 text-xs sm:text-sm leading-relaxed text-bone/55 not-italic space-y-0.5">
              {contact.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </address>
          </div>

          {/* Explore Links */}
          <nav data-reveal="item" aria-label="Explore" className="lg:col-span-3">
            <h3 className="label-caps text-[0.65rem] tracking-[0.25em] text-champagne font-semibold mb-4 sm:mb-5">
              Explore
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="text-bone/70 transition-colors duration-200 hover:text-champagne inline-flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details */}
          <div data-reveal="item" className="lg:col-span-3">
            <h3 className="label-caps text-[0.65rem] tracking-[0.25em] text-champagne font-semibold mb-4 sm:mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="display-serif text-lg sm:text-xl leading-none text-bone transition-colors duration-200 hover:text-champagne inline-block"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="text-bone/80 transition-colors duration-200 hover:text-champagne break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-champagne/10 px-4 py-1.5 text-xs font-medium text-champagne transition-all duration-300 hover:bg-champagne hover:text-ink shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Socials */}
          <div data-reveal="item" className="lg:col-span-2">
            <h3 className="label-caps text-[0.65rem] tracking-[0.25em] text-champagne font-semibold mb-4 sm:mb-5">
              Follow
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Instagram", href: contact.instagram },
                { label: "LinkedIn", href: contact.linkedin },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone/70 transition-colors duration-200 hover:text-champagne inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-40">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Baseline --------------------------------------------------- */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-4 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-bone/45">
          <p>
            © {year} {site.brand}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  className="transition-colors duration-200 hover:text-champagne"
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

export default Footer;
