import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/site";

/**
 * The homepage, /about, /contact and the nine service pages. /terms and /privacy are
 * left out while they are placeholders — they are also noindex. Add them here
 * once the real text lands.
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
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
