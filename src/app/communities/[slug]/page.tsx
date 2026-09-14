import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommunityBySlug, getAllCommunities } from "@/data/communities";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CommunityAbout } from "@/components/community/CommunityAbout";
import { CommunityGallery } from "@/components/community/CommunityGallery";
import { CommunityProperties } from "@/components/community/CommunityProperties";
import { CommunityEnquiry } from "@/components/community/CommunityEnquiry";
import { CommunityCard } from "@/components/community/CommunityCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const community = getCommunityBySlug(p.slug);
  if (!community) return { title: "Not Found" };

  return {
    title: `${community.name} Properties | Lion Yard Real Estate`,
    description: community.shortDescription,
    alternates: { canonical: `/communities/${community.slug}` },
  };
}

export default async function CommunityPage({ params }: Props) {
  const p = await params;
  const community = getCommunityBySlug(p.slug);
  if (!community) notFound();

  // Pick up to 3 related communities
  const related = getAllCommunities()
    .filter((c) => c.id !== community.id)
    .slice(0, 3);

  return (
    <main>
      <CommunityHero community={community} />
      <CommunityAbout community={community} />
      <CommunityGallery community={community} />
      <CommunityProperties community={community} />
      <CommunityEnquiry community={community} />
      
      {related.length > 0 && (
        <section className="bg-bone text-ink py-[var(--spacing-section)] border-t border-ink/10 relative z-10">
          <div className="shell">
            <h2 className="display-serif text-h3 mb-12">Explore More Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((c) => (
                <CommunityCard key={c.id} community={c} sizes="(min-width: 768px) 33vw, 100vw" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
