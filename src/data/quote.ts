/**
 * Everything the quote funnel says: starting prices, the card copy on
 * /services, and the steps and reassurances on /quote and its thank-you page.
 *
 * The funnel itself is GoHighLevel's: /quote embeds GHL form
 * `QUOTE_FORM_ID`, whose hidden fields read the query keys below, and GHL
 * redirects to /quote/thank-you on submit. The copy is from the GHL pages.
 */
import type { ServiceSlug } from "./services";

/** The GHL quote form embedded on /quote. */
export const QUOTE_FORM_ID = "cIDV5AHlkGjzKDlOt6Bn";

/**
 * Query keys the quote form's hidden fields listen for, mapped in GHL to the
 * custom fields {{contact.selected_services}}, {{contact.order_items}} and
 * {{contact.order_total}}. They must match the form exactly.
 */
export const QUOTE_FIELDS = {
  services: "selected_services",
  items: "order_items",
  total: "order_total",
} as const;

export type ServiceQuote = {
  /** As printed on the card, e.g. "Installation from $229". */
  priceLabel: string;
  /** The starting amount in dollars, for the running total. 0 = by consultation. */
  amount: number;
  /** The card's one-liner. */
  blurb: string;
};

export const SERVICE_QUOTES: Readonly<Record<ServiceSlug, ServiceQuote>> = {
  "rims-tires": {
    priceLabel: "Installation from $229",
    amount: 229,
    blurb:
      "Custom wheel and tire packages with proper fitment — staggered setups, off-road builds and clean street styles. Wheels and tires are quoted separately.",
  },
  "performance-suspension-systems": {
    priceLabel: "Installation from $495",
    amount: 495,
    blurb:
      "Coilovers, air ride, lift and leveling kits — dialed in for the stance and ride quality you actually want.",
  },
  "premium-vinyl-wrap-studio": {
    priceLabel: "From $2,495",
    amount: 2495,
    blurb:
      "Full and partial wraps, color changes, satin finishes, chrome delete and fully custom liveries.",
  },
  "paint-protection-film-ppf": {
    priceLabel: "From $1,795",
    amount: 1795,
    blurb:
      "Self-healing film that shields your paint from rock chips, road debris and everyday wear.",
  },
  "luxury-detailing-paint-correction": {
    priceLabel: "From $595",
    amount: 595,
    blurb:
      "Multi-stage paint correction, ceramic coating and interior detailing that brings the depth back.",
  },
  "bespoke-custom-builds": {
    priceLabel: "By consultation",
    amount: 0,
    blurb:
      "Full builds from concept to completion — multiple upgrades planned and executed as one project.",
  },
  upholstery: {
    priceLabel: "From $2,299",
    amount: 2299,
    blurb:
      "Custom leather and Alcantara, diamond stitching, headliners and complete interior trim work.",
  },
  "window-tint": {
    priceLabel: "From $350",
    amount: 350,
    blurb:
      "Heat rejection, UV protection and privacy with a clean, bubble-free finish that lasts.",
  },
  "performance-exhaust-systems": {
    priceLabel: "Installation from $349",
    amount: 349,
    blurb:
      "Cat-backs, axle-backs and custom fabrication — tuned for the sound and performance you’re after.",
  },
};

export const PRICE_NOTE =
  "Starting prices only. Your final price depends on your vehicle, model, condition and the work required — we confirm it in your custom quote.";

/** The reassurance strip under the services hero and beside the quote form. */
export const QUOTE_PROMISES = [
  "Free quotes",
  "No obligation",
  "Two locations",
  "Financing available",
] as const;

/** "What happens next" on /quote. */
export const QUOTE_NEXT = [
  {
    title: "We review your request",
    body: "Our team checks your vehicle and the services you picked.",
  },
  {
    title: "You get a custom quote",
    body: "We send a clear estimate by text or email, usually within 1 business day.",
  },
  {
    title: "Approve and book",
    body: "Accept the estimate, pay securely online and choose your install date.",
  },
] as const;

/** The three steps on /quote/thank-you. */
export const QUOTE_THANKS_STEPS = [
  {
    title: "Request received",
    body: "We have your vehicle and the services you picked.",
  },
  {
    title: "Book your appointment",
    body: "Pick a time so we can confirm your exact price.",
  },
  {
    title: "Get your build done",
    body: "Approve your estimate and we lock in your install date.",
  },
] as const;
