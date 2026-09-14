import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/property/detail/EnquiryForm";
import { PaymentAndValue } from "@/components/property/detail/PaymentAndValue";
import { PropertyGallery } from "@/components/property/detail/PropertyGallery";
import { PropertyHero } from "@/components/property/detail/PropertyHero";
import { PropertyLocation } from "@/components/property/detail/PropertyLocation";
import { PropertyOverview } from "@/components/property/detail/PropertyOverview";
import { RelatedProperties } from "@/components/property/detail/RelatedProperties";
import { SpecBar } from "@/components/property/detail/SpecBar";
import { StickyPropertyBar } from "@/components/property/detail/StickyPropertyBar";
import { DEMO_PROPERTIES, getPropertyBySlug, getRelatedProperties } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/filters";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

/**
 * Only the slugs below exist.
 *
 * With the default `dynamicParams: true`, an unknown slug is rendered on demand
 * and Next caches the resulting not-found page as a **200** — verified: the page
 * looked right, the status line said OK, and `x-nextjs-cache: HIT` meant it
 * would keep saying OK. A search engine indexes that as a real page.
 *
 * Setting this to false makes the router itself reject an unknown slug with a
 * genuine 404 before the page renders. When this is wired to a live feed, turn
 * it back on and pair it with `revalidate` so new listings resolve — but then
 * check the status code, not just the pixels.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_PROPERTIES.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property not found", robots: { index: false, follow: false } };
  }

  const title = `${property.title} | ${property.location}`;
  const description = `${property.shortDescription} ${formatPrice(property)}. ${formatArea(property)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${site.brand}`,
      description,
      images: [{ url: property.image.src, alt: property.image.alt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PropertyDetailPage({ params }: Params) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const related = getRelatedProperties(property, 3);

  /**
   * Structured data describes only what the record actually contains — no
   * ratings, no review counts, no availability claims. `Residence` plus an
   * `Offer` is the honest shape for a listing; inventing an aggregateRating to
   * win a rich result is exactly the kind of thing that earns a manual penalty.
   */
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.shortDescription,
    url: `${site.url}/properties/${property.slug}`,
    image: property.images.map((image) => image.src),
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitText: "square feet",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.community,
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.latitude,
      longitude: property.coordinates.longitude,
    },
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
  };

  return (
    // Bottom padding clears the sticky action bars — 68px for the mobile bar,
    // 80px for the desktop one — so neither can ever cover the footer's last
    // line. The desktop bar also retracts once the enquiry form is in view.
    <div className="pb-[4.25rem] lg:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />

      <PropertyHero property={property} />
      <SpecBar property={property} />
      <PropertyOverview property={property} />
      <PropertyGallery property={property} />
      <PropertyLocation property={property} />
      <PaymentAndValue property={property} />
      <EnquiryForm property={property} />
      <RelatedProperties properties={related} />
      <StickyPropertyBar property={property} />
    </div>
  );
}
