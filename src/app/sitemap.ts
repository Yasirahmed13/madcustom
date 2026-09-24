import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/site";

/**
 * The homepage, /about, /contact, the nine service pages, and the GHL funnel
 * pages people land on: /services, /book, /consultation and the two legal pages.
 * The quote form and the thank-you pages are left out — they are noindex, and
 * only make sense mid-funnel.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/consultation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...["terms", "privacy"].map((page) => ({
      url: `${SITE_URL}/${page}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
