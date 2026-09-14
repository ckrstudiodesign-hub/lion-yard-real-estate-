import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { contact, whatsappHref } from "@/data/site";

/**
 * Honest route stub.
 *
 * Every item in the navigation resolves to a real, branded page rather than a
 * dead link or a 404 — but the page says plainly that the section is still
 * being built and offers the two actions that do work today: call and WhatsApp.
 * Each of these files is replaced by the real page in its phase.
 */
export function RoutePlaceholder({
  eyebrow,
  title,
  description,
  phase,
}: {
  eyebrow: string;
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <section
      data-surface="dark"
      className="relative flex min-h-[100svh] flex-col justify-center bg-ink"
    >
      <div className="shell py-[var(--spacing-section)] pt-40">
        <p className="label-caps flex items-center gap-4 text-bone/50">
          <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
          {eyebrow}
        </p>

        <h1 className="display-serif mt-8 max-w-[14ch] text-h1 text-bone">{title}</h1>

        <p className="mt-7 max-w-[50ch] text-lead font-light text-bone/65">
          {description}
        </p>

        <p className="label-caps mt-10 inline-flex border border-bone/20 px-4 py-2.5 text-bone/50">
          In development — {phase}
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/" variant="solid">
            Back to home
            <ArrowRight />
          </ButtonLink>
          <a
            href={contact.phoneHref}
            className="label-caps inline-flex h-12 items-center justify-center border border-bone/35 px-7 text-bone transition-colors duration-[400ms] hover:border-bone sm:h-[3.25rem] sm:px-9"
          >
            Call {contact.phoneDisplay}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps inline-flex h-12 items-center justify-center border border-bone/35 px-7 text-bone transition-colors duration-[400ms] hover:border-bone sm:h-[3.25rem] sm:px-9"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
