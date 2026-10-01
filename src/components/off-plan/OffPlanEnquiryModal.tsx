"use client";

import { useEffect } from "react";
import type { OffPlanProperty } from "@/data/off-plan-properties";

export function OffPlanEnquiryModal({
  property,
  open,
  onClose,
}: {
  property: OffPlanProperty | null;
  open: boolean;
  onClose: () => void;
}) {

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-bone text-ink p-8 sm:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ink/60 hover:text-ink transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="mb-8">
          <h2 className="display-serif text-h4 mb-2">Enquire Now</h2>
          {property && (
            <p className="text-body text-ink/60">
              Requesting details for <strong className="text-ink font-medium">{property.projectName}</strong> by {property.developer}.
            </p>
          )}
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you. A Golden Legacy property advisor will contact you shortly.");
            onClose();
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="label-caps text-[0.6rem] text-ink/70">Full Name</label>
            <input
              required
              type="text"
              id="name"
              className="border-b border-ink/20 bg-transparent py-2 outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="label-caps text-[0.6rem] text-ink/70">Phone Number</label>
            <input
              required
              type="tel"
              id="phone"
              className="border-b border-ink/20 bg-transparent py-2 outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="label-caps text-[0.6rem] text-ink/70">Email Address</label>
            <input
              required
              type="email"
              id="email"
              className="border-b border-ink/20 bg-transparent py-2 outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="budget" className="label-caps text-[0.6rem] text-ink/70">Budget</label>
            <select
              id="budget"
              className="border-b border-ink/20 bg-transparent py-2 outline-none focus:border-champagne transition-colors rounded-none appearance-none"
            >
              <option value="">Select a budget range</option>
              <option value="Under AED 2M">Under AED 2M</option>
              <option value="AED 2M - 5M">AED 2M - 5M</option>
              <option value="AED 5M - 10M">AED 5M - 10M</option>
              <option value="AED 10M+">AED 10M+</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 bg-ink text-bone py-4 label-caps tracking-[0.2em] hover:bg-champagne hover:text-ink transition-colors duration-300"
          >
            Speak to a Property Advisor
          </button>
        </form>
      </div>
    </div>
  );
}
