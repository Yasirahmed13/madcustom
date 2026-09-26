/**
 * Business facts: names, numbers, addresses, hours, socials and the headline stats.
 *
 * Everything here is taken verbatim from the design. Edit this file to change a
 * phone number, an address or a social link anywhere on the site — nothing is
 * written into a component.
 */

import { ABOUT_URL, BLOG_URL, CONTACT_URL, SERVICES_URL } from "./links";

export type Location = {
  /** Stable key, also used as the JSON-LD @id fragment. */
  id: "orlando" | "barceloneta";
  /** Short label, as the footer headings use it. */
  label: string;
  /** Full business name for this branch, used in structured data. */
  legalName: string;
  street: string;
  city: string;
  region: string;
  regionName: string;
  postalCode: string;
  country: string;
  /** As printed in the footer, with its line break. */
  addressLines: [string, string];
  /**
   * The single-line address exactly as madcustomcars.com/contact prints it,
   * country included. Used on the contact page, where the full postal address
   * is the point; the footer keeps the shorter two-line form above.
   */
  addressFull: string;
  /** As printed, e.g. "+1 (407) 286 4426". */
  phoneDisplay: string;
  /** E.164, for tel: links and structured data. */
  phoneE164: string;
};

export type SocialLink = {
  label: string;
  /** Left undefined for WhatsApp, which is built from the number at render time. */
  url?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type NavItem = {
  label: string;
  /** Absolute path, "/#hash" anchor, or a full off-site URL. */
  href: string;
  /**
   * Renders the services mega menu instead of a plain link. `href` is still the
   * destination when the trigger itself is followed.
   */
  mega?: boolean;
};

export const LOCATIONS: readonly Location[] = [
  {
    id: "orlando",
    label: "Florida",
    legalName: "MAD Custom Florida",
    street: "19 N Westmoreland Dr",
    city: "Orlando",
    region: "FL",
    regionName: "Florida",
    postalCode: "32805",
    country: "US",
    addressLines: ["19 N Westmoreland Dr,", "Orlando, FL 32805"],
    addressFull: "19 N Westmoreland Dr, Orlando, FL 32805, Estados Unidos",
    phoneDisplay: "+1 (407) 286 4426",
    phoneE164: "+14072864426",
  },
  {
    id: "barceloneta",
    label: "Puerto Rico",
    legalName: "MAD Custom Puerto Rico",
    street: "Carr. 140, Km. 61.8",
    city: "Barceloneta",
    region: "PR",
    regionName: "Puerto Rico",
    postalCode: "00617",
    country: "PR",
    addressLines: ["Carr. 140, Km. 61.8,", "Barceloneta, PR 00617"],
    addressFull: "Carr. 140, Km. 61.8, Barceloneta, 00617, Puerto Rico",
    phoneDisplay: "+1 (787) 846 5115",
    phoneE164: "+17878465115",
  },
] as const;

/**
 * TODO(coordinates): neither shop's latitude/longitude appears in the design, so
 * `geo` is left out of the LocalBusiness schema rather than guessed. Add a
 * `geo: { lat, lng }` to each location above and `lib/jsonld.ts` will emit it.
 */

export const SITE = {
  name: "MAD Custom",
  /** Used in <title> templates and structured data. */
  legalName: "MAD Custom",
  tagline:
    "High-end automotive customization. Orlando, Florida & Barceloneta, Puerto Rico.",
  description:
    "Wheel fitment, suspension, wraps, PPF and one-of-one builds — engineered by MAD Custom. Family-run since 1973, with shops in Orlando, Florida and Barceloneta, Puerto Rico.",
  foundingYear: 1973,
  email: "madcustomfl@outlook.com",

  /** The registered company, as the legal pages name it. */
  legalEntity: "MAD CUSTOMS FLORIDA CORPORATION",

  /**
   * The line the text-message programme runs on, as the Terms and Privacy
   * pages give it for STOP/HELP requests.
   *
   * TODO(confirm): this number came from the GHL legal pages and matches
   * neither shop line. It is probably the GHL/Twilio messaging number — if so,
   * it is correct here and nowhere else.
   */
  messagingPhoneDisplay: "+1 (689) 367 4674",
  messagingPhoneE164: "+16893674674",

  /** The number in the header, the mobile bar and every "Call" button. */
  primaryPhoneDisplay: "+1 (407) 286 4426",
  primaryPhoneE164: "+14072864426",

  hours: {
    /** As printed in the footer, with its line break. */
    daysLabel: "Monday – Friday",
    timeLabel: "08:00 – 18:00",
    /** Machine-readable, for structured data. */
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },

  instagramHandle: "@madcustomfl",
  instagramUrl: "https://www.instagram.com/madcustomfl/",

  /**
   * The short link used throughout the original design. Kept as a documented
   * fallback: `lib/whatsapp.ts` prefers NEXT_PUBLIC_WHATSAPP_NUMBER and only
   * falls back to this if the number is ever blanked out.
   */
  whatsappShortLink: "https://wa.link/c2aabg",

  socials: [
    { label: "WhatsApp" }, // url built from the WhatsApp number
    { label: "Instagram", url: "https://www.instagram.com/madcustomfl/" },
    { label: "Facebook", url: "https://www.facebook.com/MADCUSTOMFLORIDA" },
    { label: "YouTube", url: "https://www.youtube.com/@MadCustomTV" },
    { label: "TikTok", url: "https://www.tiktok.com/@madcustomfl" },
  ] satisfies readonly SocialLink[],

  /** The hero stat strip. */
  stats: [
    { value: "3,160+", label: "Cars delivered" },
    { value: "35K+", label: "Shop hours" },
    { value: "5.0", label: "Google rating" },
    { value: "2", label: "Locations" },
  ] satisfies readonly Stat[],

  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: ABOUT_URL },
    { label: "Services", href: SERVICES_URL, mega: true },
    { label: "Blog", href: BLOG_URL },
    { label: "Contact Us", href: CONTACT_URL },
  ] satisfies readonly NavItem[],
} as const;

/** `tel:` href for the primary shop line. */
export const TEL_HREF = `tel:${SITE.primaryPhoneE164}`;

/**
 * A Google Maps directions link for a shop.
 *
 * Built from the printed address rather than coordinates, so it needs no API
 * key and no `geo` block — see the TODO above. Once latitude and longitude are
 * known, swapping the query for "lat,lng" makes the pin exact.
 */
export function directionsHref(location: Location): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    location.addressFull,
  )}`;
}

/** Absolute site URL, without a trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://madcustomcars.com"
).replace(/\/$/, "");
