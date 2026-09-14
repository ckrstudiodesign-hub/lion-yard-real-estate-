import type { Metadata } from "next";
import { getAllCommunities } from "@/data/communities";
import { CommunitiesClient } from "./CommunitiesClient";

export const metadata: Metadata = {
  title: "Dubai Communities | Lion Yard Real Estate",
  description: "Explore the most sought-after communities in Dubai, from waterfront living to urban landmarks.",
  alternates: { canonical: "/communities" },
};

export default function CommunitiesPage() {
  const communities = getAllCommunities();
  return <CommunitiesClient communities={communities} />;
}
