/**
 * Single source of truth for brand-level content.
 * Nothing in the UI layer should hard-code company details.
 */

export const site = {
  brand: "Lion Yard Real Estate",
  legalName: "Lion Yard Real Estate Buying & Selling Brokerage L.L.C",
  shortName: "Lion Yard",
  city: "Dubai",
  country: "United Arab Emirates",
  locality: "Dubai, United Arab Emirates",
  url: "https://www.lionyardrealestate.ae",
  description:
    "Discover luxury properties, investment opportunities and exceptional homes in Dubai with Lion Yard Real Estate.",
  tagline: "The right property. The right move.",
} as const;

/**
 * Contact channels.
 * PLACEHOLDERS — replace with Lion Yard's live numbers and inbox before launch.
 * `whatsapp` must be digits only (international format, no + or spaces).
 */
export const contact = {
  phoneDisplay: "+971 50 152 6902",
  phoneHref: "tel:+971501526902",
  whatsapp: "971501526902",
  whatsappMessage: "Hello Lion Yard, I would like to speak to a property consultant.",
  email: "nawaz@lionyardrealestate.ae",
  emailHref: "mailto:nawaz@lionyardrealestate.ae",
  address: ["Villa Rotana 408, Sheikh Zayed Road, Al Wasl,", "P.O. Box 118737, Dubai, United Arab Emirates."],
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
};

export const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

export type NavItem = {
  label: string;
  href: string;
  /** Routes built in a later phase are flagged so the UI can present them honestly. */
  ready: boolean;
};

export type PlotLocation = {
  label: string;
  href: string;
  project?: {
    label: string;
    href: string;
  };
};

export const plotLocations: PlotLocation[] = [
  { label: "Dubai", href: "/contact?service=plots&location=dubai" },
  { label: "Ajman", href: "/contact?service=plots&location=ajman" },
  {
    label: "Ras Al Khaimah (RAK)",
    href: "/contact?service=plots&location=ras-al-khaimah",
    project: { label: "RAK Oasis", href: "https://www.rakoasis.com/" },
  },
  { label: "Umm Al Quwain (UAQ)", href: "/contact?service=plots&location=umm-al-quwain" },
];

export const primaryNav: NavItem[] = [
  { label: "Buy", href: "/buy", ready: true },
  { label: "Sell", href: "/sell", ready: true },
  { label: "Properties", href: "/properties", ready: true },
  { label: "Communities", href: "/communities", ready: true },
  { label: "Plots", href: "/contact?service=plots", ready: true },
  { label: "About", href: "/about", ready: true },
  { label: "Contact", href: "/contact", ready: true },
];
