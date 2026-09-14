import type { Metadata } from "next";

import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lion Yard Real Estate handles personal information collected through this website.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <RoutePlaceholder
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy will set out what personal information Lion Yard collects through enquiries, how it is used, how long it is kept, and how to request its removal. It needs to be written against the company's actual data practices — placeholder legal text would be worse than none."
      phase="Awaiting the company's data-handling details"
    />
  );
}
