import type { Metadata } from "next";

import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing use of the Lion Yard Real Estate website.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <RoutePlaceholder
      eyebrow="Legal"
      title="Terms & Conditions"
      description="These terms will govern use of this website, the status of the property information published on it, and the basis on which enquiries are handled. They need drafting against the company's licensing and RERA obligations rather than being generated."
      phase="Awaiting legal review"
    />
  );
}
