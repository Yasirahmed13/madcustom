/**
 * The contact page's copy and its channel list.
 *
 * Every line here is the text from madcustomcars.com/contact, kept verbatim so
 * the page reads exactly as the live one does. Only the layout is new. The
 * addresses, phone numbers, email and hours are NOT repeated here — they come
 * from `data/site.ts`, which is already the single source for them.
 */

/** Sits under the "Get In Touch" eyebrow. */
export const CONTACT_HEADING = "We are always ready to help you";

/**
 * The form's intro, as printed on the live page.
 */
export const CONTACT_LEDE =
  "Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please fill out the form below with your details and message, and we'll get back to you as soon as possible.";

/**
 * The "About Us" paragraph the live contact page runs beside its form. Used as
 * the hero lede here, which is the first thing the page says either way.
 */
export const CONTACT_ABOUT =
  "At MAD Custom, we specialize in high-end automotive customization designed to transform vehicles beyond the ordinary. From precision wheel fitment and suspension upgrades to premium wraps, PPF, and complete custom builds, we enhance every detail to elevate performance, style, and individuality while preserving long-term value.";

/** The three row captions each location card repeats, as the live page labels them. */
export const LOCATION_LABELS = {
  address: "Location",
  phone: "Call Us",
  email: "Email Us",
} as const;

/** Which shop the enquiry is for. Mirrors the two shops in `data/site.ts`. */
export const CONTACT_SHOPS = ["Florida", "Puerto Rico", "Either / not sure"] as const;

export type ContactShop = (typeof CONTACT_SHOPS)[number];

/** Placeholder text for the form controls. */
export const CONTACT_PLACEHOLDERS = {
  name: "First and last",
  email: "you@email.com",
  tel: "(407) 000 0000",
  message: "Tell us about the vehicle and what you have in mind…",
} as const;
