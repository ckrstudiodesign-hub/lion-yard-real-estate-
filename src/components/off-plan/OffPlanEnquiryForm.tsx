"use client";

import { useState } from "react";

export function OffPlanEnquiryForm({ propertyName }: { propertyName: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-champagne/10 border border-champagne p-6 text-center">
        <p className="text-ink font-medium">Thank you.</p>
        <p className="text-sm text-ink/70 mt-2">A Golden Legacy property advisor will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input type="hidden" name="property" value={propertyName} />
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name-sidebar" className="label-caps text-[0.6rem] text-ink/70">Full Name</label>
        <input
          required
          type="text"
          id="name-sidebar"
          className="border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-champagne transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone-sidebar" className="label-caps text-[0.6rem] text-ink/70">Phone Number</label>
        <input
          required
          type="tel"
          id="phone-sidebar"
          className="border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-champagne transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email-sidebar" className="label-caps text-[0.6rem] text-ink/70">Email Address</label>
        <input
          required
          type="email"
          id="email-sidebar"
          className="border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-champagne transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="budget-sidebar" className="label-caps text-[0.6rem] text-ink/70">Budget</label>
        <select
          id="budget-sidebar"
          className="border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-champagne transition-colors rounded-none appearance-none"
        >
          <option value="">Select a budget range</option>
          <option value="Under AED 2M">Under AED 2M</option>
          <option value="AED 2M - 5M">AED 2M - 5M</option>
          <option value="AED 5M - 10M">AED 5M - 10M</option>
          <option value="AED 10M+">AED 10M+</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="timeline-sidebar" className="label-caps text-[0.6rem] text-ink/70">Buying Timeline</label>
        <select
          id="timeline-sidebar"
          className="border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-champagne transition-colors rounded-none appearance-none"
        >
          <option value="">Select timeline</option>
          <option value="Immediately">Immediately</option>
          <option value="Within 3 months">Within 3 months</option>
          <option value="Within 6 months">Within 6 months</option>
          <option value="Just researching">Just researching</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 bg-ink text-bone py-4 label-caps tracking-[0.2em] hover:bg-champagne hover:text-ink transition-colors duration-300"
      >
        Request Details
      </button>
    </form>
  );
}
