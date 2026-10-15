"use client";

import { useRef, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { contact } from "@/data/site";
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
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const found: Record<string, string> = {};
    if (values.name.trim().length < 2) found.name = "Please enter your full name.";
    if (values.phone.replace(/[^0-9]/g, "").length < 7) found.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) found.email = "Please enter a valid email address.";
    if (values.message.trim().length < 5) found.message = "Please enter your message (at least 5 characters).";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = ref.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setState("sending");
    // Simulate brief network dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    setState("success");
    statusRef.current?.focus();
  };

  const whatsappPrefilled = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hello Lion Yard, my name is ${values.name || "Client"}.\nEmail: ${values.email}\nPhone: ${values.phone}\n${values.subject ? `Subject: ${values.subject}\n` : ""}Message: ${values.message}`
  )}`;

  return (
    <div ref={ref} className="w-full">
      {state === "success" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="border-l-2 border-champagne bg-ink/[0.04] p-8 sm:p-10 outline-none animate-reveal-up"
        >
          <p className="label-caps text-champagne text-[0.65rem] tracking-[0.25em] font-semibold">
            Inquiry Received
          </p>
          <h3 className="display-serif text-2xl sm:text-3xl text-ink mt-2 mb-3">
            Thank you, {values.name.split(" ")[0] || "Valued Client"}.
          </h3>
          <p className="max-w-[54ch] text-body-sm leading-relaxed text-ink/75 mb-6">
            Your message has been sent to our private client advisory desk. A dedicated consultant will review your inquiry and respond within 24 hours.
          </p>
          <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-champagne bg-champagne/15 px-5 py-2.5 text-xs font-semibold text-ink transition-all hover:bg-champagne hover:text-ink shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Fast-track via WhatsApp ↗
            </a>
            <a
              href={contact.phoneHref}
              className="label-caps border-b border-ink/30 pb-1 text-xs text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              Call {contact.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => {
                setValues({ name: "", phone: "", email: "", subject: "", message: "" });
                setState("idle");
              }}
              className="label-caps text-xs text-ink/50 hover:text-ink transition-colors ml-auto underline"
            >
              Send Another Note
            </button>
          </div>
        </div>
      ) : (
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

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button type="submit" variant="solidInk" disabled={state === "sending"}>
              {state === "sending" ? "Sending..." : "Send Message"}
              <ArrowRight />
            </Button>
            <p className="text-xs text-ink/50 max-w-[34ch] leading-relaxed">
              Strict confidentiality assured. We never share your personal information.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
