/**
 * Funnel destinations.
 *
 * Every service link, every product link and every "Make Appointment" button on
 * the site points at one of these URLs. They live here so a change to the
 * funnel is a one-line edit rather than a sweep through the components.
 *
 * The quote form on /quote and the calendars on /book and /consultation are
 * GoHighLevel's own widgets, embedded, so every submission and booking lands
 * in the GHL CRM.
 */

import type { Service } from "./services";

/**
 * The services page. The customer picks the services they want there and
 * submits a single quote request (step 2: /quote, step 3: /quote/thank-you).
 */
export const SERVICES_URL = "/services";

/** The same page, opened at its products section. */
export const PRODUCTS_URL = `${SERVICES_URL}#shop`;

/** The quote form, step 2 of the funnel. */
export const QUOTE_URL = "/quote";

/** The appointment calendar behind every "Make Appointment" button. */
export const APPOINTMENT_URL = "/book";

/** The 1:1 consultation calendar. */
export const CONSULTATION_URL = "/consultation";

export const TERMS_URL = "/terms";
export const PRIVACY_URL = "/privacy";

/**
 * The services page with one service already added to the quote, landing on
 * the service cards.
 */
export function serviceQuoteHref(service: Pick<Service, "quoteName">): string {
  return `${SERVICES_URL}?add=${encodeURIComponent(service.quoteName)}#choose`;
}

/**
 * TODO(links): no URL was supplied for the blog. It points at the placeholder
 * on the funnel domain; replace it when the real address is known.
 */
export const BLOG_URL = "https://go.madcustomcars.com/blog";

/**
 * The on-site about page — the full family story. The homepage keeps its own
 * "04 / Our story" section at /#about; this is the long form the nav opens.
 */
export const ABOUT_URL = "/about";

/** The on-site contact page, which every "Contact Us" link opens. */
export const CONTACT_URL = "/contact";

/** True for anything that leaves the site, so links can be marked up correctly. */
export const isExternalHref = (href: string) => /^https?:\/\//.test(href);

/** `target`/`rel` for a link, given its href. Spread onto an <a>. */
export function linkTarget(href: string) {
  return isExternalHref(href)
    ? ({ target: "_blank", rel: "noopener" } as const)
    : ({} as const);
}
