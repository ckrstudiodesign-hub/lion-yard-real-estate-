import type { Metadata } from "next";

import { PageHero } from "@/components/editorial/PageHero";
import { ContactForm } from "@/components/editorial/ContactForm";
import { heroMedia } from "@/data/media";
import { contact, site, whatsappHref } from "@/data/site";
import { PlotCollection } from "@/components/property/PlotCollection";

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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const isPlots = raw.service === "plots";

  return (
    <>
      {isPlots ? (
        <PlotCollection />
      ) : (
        <PageHero
          headline="Get in Touch."
          supporting="Whether you are buying, selling, or investing, our private client advisory team is ready to discuss your requirements."
          image={heroMedia}
        />
      )}

      {/* Main Editorial Contact Section */}
      <section data-surface="light" className="relative z-10 bg-bone text-ink">
        <div className="shell py-[var(--spacing-section)]">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16 border-t border-ink/10 pt-16">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="label-caps flex items-center gap-4 text-ink/40 mb-3">
                  <span aria-hidden="true" className="block h-px w-8 bg-champagne sm:w-12" />
                  Direct Advisory
                </p>
                <h2 className="display-serif text-3xl sm:text-4xl lg:text-5xl mb-4 font-normal">
                  Contact Information
                </h2>
                <p className="text-body text-ink/70 max-w-[36ch] mb-10 leading-relaxed">
                  Our private client advisory desk provides confidential, discreet counsel for prime and super-prime property in Dubai.
                </p>

                <dl className="flex flex-col gap-8">
                  <div>
                    <dt className="label-caps text-ink/40 mb-2">Headquarters</dt>
                    <dd className="text-body text-ink font-medium max-w-[28ch] leading-relaxed">
                      {contact.address.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </dd>
                  </div>

                  <div>
                    <dt className="label-caps text-ink/40 mb-2">Direct Telephone</dt>
                    <dd>
                      <a
                        href={contact.phoneHref}
                        className="display-serif text-xl sm:text-2xl text-ink hover:text-champagne transition-colors"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="label-caps text-ink/40 mb-2">Electronic Mail</dt>
                    <dd>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-body font-medium text-ink hover:text-champagne transition-colors"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="label-caps text-ink/40 mb-2">Office Hours</dt>
                    <dd className="text-body text-ink/75 leading-relaxed">
                      <span className="block font-medium text-ink">Monday — Friday</span>
                      <span className="block">9:00 AM — 6:00 PM (Gulf Standard Time)</span>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Instant WhatsApp Channel */}
              <div className="mt-12 pt-8 border-t border-ink/10">
                <p className="label-caps text-ink/40 mb-3 text-[0.6rem]">Immediate Assistance</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-emerald-600/30 bg-emerald-50/80 px-5 py-3 text-xs font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-100 hover:shadow-md"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Connect with Advisor on WhatsApp</span>
                  <span className="text-emerald-700">→</span>
                </a>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="border border-ink/10 bg-white/40 p-6 sm:p-10 lg:p-12 rounded-sm shadow-sm backdrop-blur-sm">
                <p className="label-caps flex items-center gap-4 text-ink/40 mb-3">
                  <span aria-hidden="true" className="block h-px w-6 bg-champagne" />
                  Inquiry Desk
                </p>
                <h3 className="display-serif text-2xl sm:text-3xl text-ink mb-8 font-normal">
                  Send a Confidential Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="w-full relative bg-charcoal h-[520px] overflow-hidden">
        {/* Google Maps Embed */}
        <iframe
          title="Lion Yard Real Estate Location"
          src="https://maps.google.com/maps?q=Villa+Rotana+Sheikh+Zayed+Road+Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale-[40%] contrast-[1.08] opacity-90"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Map showing Lion Yard Real Estate office at Villa Rotana, Sheikh Zayed Road, Dubai"
        />

        {/* Floating Architectural Badge */}
        <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-sm w-[calc(100%-2rem)] sm:w-auto bg-ink/95 border border-bone/20 p-6 sm:p-7 shadow-2xl backdrop-blur-md text-bone">
          <p className="label-caps text-champagne text-[0.6rem] tracking-[0.26em] mb-2 font-semibold">
            Dubai Flagship Office
          </p>
          <h4 className="display-serif text-xl sm:text-2xl text-white font-normal mb-2">
            Lion Yard Real Estate
          </h4>
          <address className="not-italic text-xs sm:text-sm text-bone/70 leading-relaxed mb-4">
            Villa Rotana 408, Sheikh Zayed Road, Al Wasl, Dubai, UAE
          </address>
          <a
            href="https://maps.google.com/?q=Villa+Rotana+Sheikh+Zayed+Road+Dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 label-caps text-[0.65rem] tracking-[0.2em] text-champagne hover:text-white transition-colors"
          >
            <span>Get Directions in Google Maps</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
