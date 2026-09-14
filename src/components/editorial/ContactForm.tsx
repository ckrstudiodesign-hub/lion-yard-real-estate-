"use client";

import { useRef, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { contact, whatsappHref } from "@/data/site";
import { useSectionReveal } from "@/lib/reveal";

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  useSectionReveal(ref);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [state, setState] = useState<"idle" | "sending" | "unconfigured">("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const found: Record<string, string> = {};
    if (values.name.trim().length < 2) found.name = "Please enter your name.";
    if (values.phone.replace(/[^0-9]/g, "").length < 7) found.phone = "Please enter your phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) found.email = "Please enter your email.";
    if (values.message.trim().length < 5) found.message = "Please enter your message.";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = ref.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setState("sending");
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setState("unconfigured");
    statusRef.current?.focus();
  };

  return (
    <div ref={ref} className="w-full">
      <form data-reveal="item" onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Full name" value={values.name} onChange={set("name")} error={errors.name} required />
          </div>
          <Field label="Phone" type="tel" value={values.phone} onChange={set("phone")} error={errors.phone} required />
          <Field label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} required />
          <div className="sm:col-span-2">
            <Field label="Subject (Optional)" value={values.subject} onChange={set("subject")} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Message" value={values.message} onChange={set("message")} error={errors.message} multiline required />
          </div>
        </div>

        <Button type="submit" variant="solidInk" className="mt-10" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send Message"}
          <ArrowRight />
        </Button>

        {state === "unconfigured" ? (
          <div ref={statusRef} tabIndex={-1} role="status" className="mt-9 border-l-2 border-champagne bg-ink/[0.03] p-6 outline-none">
            <p className="label-caps text-[0.55rem] tracking-[0.26em] text-ink/50">Not yet connected</p>
            <p className="mt-4 max-w-[54ch] text-body-sm leading-relaxed text-ink/70">
              This form is not yet connected to an inbox. Please use WhatsApp or call instead — both reach the team directly.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps border-b border-ink/30 pb-1.5 text-ink transition-colors duration-[300ms] hover:border-ink"
              >
                Message on WhatsApp
              </a>
              <a
                href={contact.phoneHref}
                className="label-caps border-b border-ink/30 pb-1.5 text-ink transition-colors duration-[300ms] hover:border-ink"
              >
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
