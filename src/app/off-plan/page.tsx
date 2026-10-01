import { Metadata } from "next";
import { OffPlanHero } from "@/components/off-plan/OffPlanHero";
import { OffPlanCatalog } from "@/components/off-plan/OffPlanCatalog";
import { OffPlanLuxuryCollection } from "@/components/off-plan/OffPlanLuxuryCollection";
import { OffPlanInvestmentCollection } from "@/components/off-plan/OffPlanInvestmentCollection";

export const metadata: Metadata = {
  title: "Dubai Properties | Golden Legacy Real Estate",
  description:
    "Explore luxury properties in Dubai from leading developers including Nakheel, Sobha, Azizi, DAMAC, Danube and Binghatti. Request the latest prices and availability.",
};

export default function OffPlanPage() {
  return (
    <>
      <OffPlanHero />
      <OffPlanLuxuryCollection />
      <OffPlanInvestmentCollection />
      <OffPlanCatalog />
    </>
  );
}
