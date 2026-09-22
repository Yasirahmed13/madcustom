/**
 * Off-site destinations.
 *
 * Every service link, every product link and every "Make Appointment" button on
 * the site points at one of these three URLs. They live here so a change to the
 * funnel is a one-line edit rather than a sweep through the components.
 */

/**
 * The GoHighLevel services page. The customer picks the services they want
 * there and submits a single quote request, so all nine services — the mega
 * menu, the footer list, the service card buttons and the CTA on each service
 * page — share this one destination.
 */
export const SERVICES_URL = "https://go.madcustomcars.com/services-page";

/** The same page, opened at its products section. */
export const PRODUCTS_URL = `${SERVICES_URL}#ghl-products-p3r8`;

/** The booking funnel behind every "Make Appointment" button. */
export const APPOINTMENT_URL = "https://bookmadcustom.com/appointment-mad-page";

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
