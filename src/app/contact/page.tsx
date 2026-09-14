import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { ContactForm } from "@/components/editorial/ContactForm";
import { heroMedia } from "@/data/media";
import { contact, site } from "@/data/site";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Lion Yard Real Estate",
  description:
    "Speak with a Lion Yard property advisor about buying, selling, or investing in Dubai.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${site.brand}`,
    description: "Speak with a Lion Yard property advisor.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        headline="Get in Touch."
        supporting="Whether you are buying, selling, or investing, our advisory team is ready to discuss your requirements."
        image={heroMedia}
      />

      <section className="shell py-[var(--spacing-section)]">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16 border-t border-ink/10 pt-16">
          <div className="lg:col-span-4">
            <h2 className="display-serif text-h3 mb-8">Contact Information</h2>
            
            <dl className="flex flex-col gap-8">
              <div>
                <dt className="label-caps text-ink/40 mb-2">Office</dt>
                <dd className="text-body text-ink/80 max-w-[20ch]">
                  {contact.address.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </dd>
              </div>
              
              <div>
                <dt className="label-caps text-ink/40 mb-2">Phone</dt>
                <dd>
                  <a href={contact.phoneHref} className="text-body text-ink/80 hover:text-ink transition-colors">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              
              <div>
                <dt className="label-caps text-ink/40 mb-2">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-body text-ink/80 hover:text-ink transition-colors">
                    {contact.email}
                  </a>
                </dd>
              </div>
              
              <div>
                <dt className="label-caps text-ink/40 mb-2">Hours</dt>
                <dd className="text-body text-ink/80">
                  <span className="block">Monday — Friday</span>
                  <span className="block">9:00 AM — 6:00 PM (GST)</span>
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="lg:col-span-8">
            <h2 className="display-serif text-h3 mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="w-full h-[50vh] min-h-[400px] relative bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=80"
          alt="Dubai view"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-bone px-6 py-4">
            <p className="label-caps text-ink">Interactive Map Integration Ready</p>
          </div>
        </div>
      </section>
    </>
  );
}
