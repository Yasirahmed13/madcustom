/**
 * Structured data.
 *
 * An AutoRepair node per location, a Service node per service page, and an
 * FAQPage built from whatever questions are actually visible on the page —
 * Google requires the markup to match the rendered content, so the homepage
 * passes its five, not all eleven.
 */
import { LOCATIONS, SITE, SITE_URL } from "@/data/site";
import type { FaqEntry } from "@/data/faq";
import type { Service } from "@/data/services";
import { whatsappHref } from "./whatsapp";

const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: SITE.hours.days,
  opens: SITE.hours.opens,
  closes: SITE.hours.closes,
};

/** One AutoRepair entry per shop, both pointing at the same brand. */
export function localBusinessSchema() {
  return LOCATIONS.map((location) => ({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#${location.id}`,
    name: `${SITE.name} — ${location.city}`,
    legalName: location.legalName,
    description: SITE.description,
    url: SITE_URL,
    telephone: location.phoneE164,
    email: SITE.email,
    image: `${SITE_URL}/opengraph-image.jpg`,
    logo: `${SITE_URL}/mad-shield.png`,
    foundingDate: String(SITE.foundingYear),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    // `geo` is deliberately omitted — see the TODO in data/site.ts. Adding
    // coordinates there is the only change needed to emit it.
    openingHoursSpecification: [OPENING_HOURS],
    sameAs: SITE.socials
      .map((s) => s.url)
      .filter((url): url is string => Boolean(url))
      .concat(whatsappHref()),
    areaServed: LOCATIONS.map((l) => ({
      "@type": "AdministrativeArea",
      name: l.regionName,
    })),
  }));
}

/** FAQPage for the questions rendered on the page passed in. */
export function faqSchema(entries: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/** A Service node for a /services/[slug] page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@type": "AutoRepair", "@id": `${SITE_URL}/#${LOCATIONS[0]?.id}` },
    areaServed: LOCATIONS.map((l) => ({
      "@type": "AdministrativeArea",
      name: l.regionName,
    })),
  };
}

/**
 * ContactPage for /contact, pointing at both shops so the addresses, numbers
 * and hours on the page are the ones search engines read.
 */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#page`,
    name: `Contact ${SITE.name}`,
    url: `${SITE_URL}/contact`,
    description: SITE.description,
    mainEntity: LOCATIONS.map((location) => ({
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#${location.id}`,
      name: `${SITE.name} — ${location.city}`,
      telephone: location.phoneE164,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street,
        addressLocality: location.city,
        addressRegion: location.region,
        postalCode: location.postalCode,
        addressCountry: location.country,
      },
      openingHoursSpecification: [OPENING_HOURS],
    })),
    contactPoint: LOCATIONS.map((location) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: location.phoneE164,
      email: SITE.email,
      areaServed: location.region,
      availableLanguage: ["en", "es"],
    })),
  };
}

/** Breadcrumbs for /contact. */
export function contactBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: `${SITE_URL}/contact`,
      },
    ],
  };
}

/** Breadcrumbs for a service page. */
export function breadcrumbSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };
}

/**
 * AboutPage for /about, with the founding date and the family behind it.
 *
 * `mainEntity` points at the Orlando AutoRepair node rather than repeating the
 * business details, so the page describes the same entity the layout already
 * emits rather than declaring a second one.
 */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#page`,
    name: `About ${SITE.name}`,
    url: `${SITE_URL}/about`,
    description:
      "Three generations, four names and more than fifty years of automotive customization — the Rodríguez family story behind MAD Custom.",
    primaryImageOfPage: `${SITE_URL}/work/full/ppf-corvette-c8-showroom.jpg`,
    mainEntity: {
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#${LOCATIONS[0]?.id}`,
      name: SITE.name,
      foundingDate: String(SITE.foundingYear),
      founder: { "@type": "Person", name: "José “Cheo Colega” Rodríguez" },
      slogan: "Family built. Driven by legacy.",
    },
  };
}

/** Breadcrumbs for /about. */
export function aboutBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
    ],
  };
}
