import { notFound } from "next/navigation";
import Image from "next/image";
import { OFF_PLAN_PROPERTIES } from "@/data/off-plan-properties";
import { OffPlanEnquiryForm } from "@/components/off-plan/OffPlanEnquiryForm";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = OFF_PLAN_PROPERTIES.find(p => p.id === id);
  if (!property) return { title: "Property Not Found" };
  
  return {
    title: `${property.projectName} | ${property.developer} | Dubai Properties`,
    description: property.shortDescription,
  };
}

export async function generateStaticParams() {
  return OFF_PLAN_PROPERTIES.map((p) => ({
    id: p.id,
  }));
}

export default async function OffPlanDetailPage({ params }: Props) {
  const { id } = await params;
  const property = OFF_PLAN_PROPERTIES.find(p => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <article className="bg-bone text-ink min-h-screen pt-[88px]">
      {/* Cinematic Image Gallery */}
      <div className="w-full h-[60vh] sm:h-[75vh] relative bg-charcoal overflow-hidden">
        <Image
          src={property.image}
          alt={property.projectName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 shell flex flex-col items-start text-bone">
          <p className="label-caps text-champagne mb-4 drop-shadow-md">{property.developer}</p>
          <h1 className="display-serif text-h2 md:text-h1 drop-shadow-xl">{property.projectName}</h1>
        </div>
      </div>

      <div className="shell py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Overview Grid */}
          <section>
            <h2 className="display-serif text-h4 mb-8 border-b border-ink/10 pb-4">Property Overview</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
              <div>
                <dt className="label-caps text-[0.65rem] text-ink/50 mb-1">Location</dt>
                <dd className="font-medium text-ink">{property.location}</dd>
              </div>
              <div>
                <dt className="label-caps text-[0.65rem] text-ink/50 mb-1">Property Type</dt>
                <dd className="font-medium text-ink">{property.propertyType}</dd>
              </div>
              <div>
                <dt className="label-caps text-[0.65rem] text-ink/50 mb-1">Categories</dt>
                <dd className="font-medium text-ink">{property.categories.slice(0,2).join(", ")}</dd>
              </div>

              <div>
                <dt className="label-caps text-[0.65rem] text-ink/50 mb-1">Payment Plan</dt>
                <dd className="font-medium text-ink">{property.paymentPlan || "Contact for details"}</dd>
              </div>
              <div>
                <dt className="label-caps text-[0.65rem] text-ink/50 mb-1">Handover</dt>
                <dd className="font-medium text-ink">{property.handover || "Contact for details"}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="display-serif text-h4 mb-6">Why Consider This Property?</h2>
            <p className="text-body text-ink/70 mb-8">{property.shortDescription}</p>
            <ul className="space-y-4">
              {property.benefits.map(benefit => (
                <li key={benefit} className="flex items-start gap-4">
                  <span className="text-champagne font-bold mt-1">✓</span>
                  <span className="text-body text-ink/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-ink/5 p-8 rounded border border-ink/10">
            <h3 className="display-serif text-xl mb-3">Disclaimer</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Property information is subject to change. Availability, payment plans and handover timelines are based on information available at the time of publication. Please contact Golden Legacy Real Estate for the latest verified information.
            </p>
          </section>
        </div>

        {/* Sidebar Lead Gen */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 bg-paper p-8 lg:p-10 shadow-xl border border-ink/5">
            <div className="mb-8">
              <Image
                src={property.developerLogo}
                alt={property.developer}
                width={120}
                height={60}
                className="mb-6 mix-blend-multiply opacity-80"
              />
              <h2 className="display-serif text-h4 mb-2">Request Property Details</h2>
              <p className="text-sm text-ink/60">Register your interest in {property.projectName}.</p>
            </div>
            <OffPlanEnquiryForm propertyName={property.projectName} />
          </div>
        </div>
      </div>
    </article>
  );
}
