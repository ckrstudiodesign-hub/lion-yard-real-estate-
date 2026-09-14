"use client";

import { useRef, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { contact, whatsappHref } from "@/data/site";
import { submitEnquiry, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { useSectionReveal } from "@/lib/reveal";
import type { Community } from "@/types/community";

export function CommunityEnquiry({ community }: { community: Community }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "unconfigured">("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = ref.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setState("sending");
    const result = await submitEnquiry({
      ...values,
      property: { title: community.name, slug: community.slug, reference: "COMMUNITY-ENQ" },
      submittedAt: new Date().toISOString(),
    });

    setState(result.ok ? "idle" : "unconfigured");
    if (!result.ok) statusRef.current?.focus();
  };

  return (
    <section
      ref={ref}
      id="enquire"
      data-surface="light"
      aria-labelledby="enquire-heading"
      className="relative z-10 bg-bone text-ink"
    >
      <div className="shell py-[var(--spacing-section)]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-ink/12 pt-14 sm:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal="item" className="label-caps flex items-center gap-4 text-ink/40">
              <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
              Enquire
            </p>

            <h2
              id="enquire-heading"
              data-reveal="item"
              className="display-serif mt-7 max-w-[16ch] text-h2 leading-[1.02]"
            >
              Find your property in {community.name}
            </h2>

            <p data-reveal="item" className="mt-6 max-w-[40ch] text-lead font-light text-ink/55">
              Speak with a Lion Yard advisor specializing in {community.name}.
            </p>

            <div data-reveal="item" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`/properties?location=${community.slug}`}
                className="label-caps border-b border-ink/25 pb-1.5 text-ink/60 transition-colors duration-[300ms] hover:border-ink hover:text-ink"
              >
                View Properties
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps border-b border-ink/25 pb-1.5 text-ink/60 transition-colors duration-[300ms] hover:border-ink hover:text-ink"
              >
                WhatsApp
              </a>
              <a
                href={contact.phoneHref}
                className="label-caps border-b border-ink/25 pb-1.5 text-ink/60 transition-colors duration-[300ms] hover:border-ink hover:text-ink"
              >
                Call {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form data-reveal="item" onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={values.name}
                  onChange={set("name")}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                  required
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={set("email")}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Message"
                    value={values.message}
                    onChange={set("message")}
                    error={errors.message}
                    multiline
                  />
                </div>
              </div>

              <Button type="submit" variant="solidInk" className="mt-10" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Speak to an Advisor"}
                <ArrowRight />
              </Button>

              {state === "unconfigured" ? (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  className="mt-9 border-l-2 border-champagne bg-ink/[0.03] p-6 outline-none"
                >
                  <p className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/50">
                    Not yet connected
                  </p>
                  <p className="mt-4 max-w-[54ch] text-body-sm leading-relaxed text-ink/70">
                    This form is not yet connected to Lion Yard&rsquo;s inbox, so your
                    message has not been sent. Please use WhatsApp or call instead.
                  </p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
