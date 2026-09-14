import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { AppShell } from "@/components/layout/AppShell";
import { site } from "@/data/site";

import "./globals.css";

/**
 * Fonts are self-hosted variable woff2 (latin subset only, ~86 KB for both).
 *
 * Self-hosting rather than calling Google Fonts at runtime means: no
 * third-party request on first paint, no privacy/consent exposure for EU or UAE
 * visitors, and identical rendering on an offline build. Both faces are
 * preloaded, and `display: swap` keeps text visible throughout.
 */
const cormorant = localFont({
  src: "../fonts/cormorant-garamond-variable-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
  fallback: ["Times New Roman", "serif"],
});

const inter = localFont({
  src: "../fonts/inter-variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Dubai Luxury Properties`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "Dubai real estate",
    "luxury property Dubai",
    "buy property Dubai",
    "sell property Dubai",
    "Dubai property investment",
    "off-plan Dubai",
    site.brand,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} | Dubai Luxury Properties`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} | Dubai Luxury Properties`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Organisation structured data.
 * Deliberately limited to facts we hold: name, locality, contact channels.
 * No ratings, awards or transaction volumes are asserted anywhere on this site.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.legalName,
  alternateName: site.brand,
  url: site.url,
  areaServed: { "@type": "City", name: site.city },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "AE",
  },
};

/** Applied only when scripting is disabled. */
const NOSCRIPT_CSS = `
[data-preloader]{display:none!important}
[data-anim],[data-anim="line"] > * > *,[data-head],[data-reveal="item"]{opacity:1!important;transform:none!important}
[data-reveal="media"]{clip-path:none!important}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Without JavaScript nothing would ever lift the curtain or play the
            entrance, so the page would render blank. This restores it: the
            curtain is removed and every animated element is shown at its final
            state. A stylesheet rather than a script, so it also survives a
            strict Content-Security-Policy. */}
        <noscript>
          <style>{NOSCRIPT_CSS}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
