/**
 * Enquiry submission — the integration point.
 *
 * Nothing is wired to an email service or CRM yet, and this file does NOT
 * pretend otherwise. A form that shows "thank you, we'll be in touch" while
 * discarding the message is worse than no form: the visitor believes a
 * conversation has started and nobody is coming.
 *
 * TO CONNECT IT: replace the body of `submitEnquiry` with a POST to your
 * endpoint (a Next route handler at /api/enquiry, an email service, or the CRM's
 * intake API) and return `{ ok: true }`. The payload below already carries the
 * property title, slug and reference, so the receiving system knows which
 * property the enquiry is about without any further work.
 */

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
  property: {
    title: string;
    slug: string;
    reference: string;
  } | null;
  submittedAt: string;
};

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network" };

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  // Deliberately unimplemented. See the note at the top of this file.
  void payload;
  return { ok: false, reason: "not-configured" };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export type EnquiryErrors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

/**
 * Permissive by design. An over-strict phone or email pattern rejects a real
 * buyer far more often than it catches a bad one, and a lost enquiry costs more
 * than a malformed one.
 */
export function validateEnquiry(values: {
  name: string;
  phone: string;
  email: string;
  message: string;
}): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const digits = values.phone.replace(/[^0-9]/g, "");
  if (digits.length < 7) {
    errors.phone = "Please enter a phone number we can reach you on.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length > 2000) {
    errors.message = "Please keep your message under 2000 characters.";
  }

  return errors;
}
