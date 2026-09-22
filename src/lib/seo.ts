/**
 * Shared metadata helpers. Every page builds its <title>, description, canonical
 * URL and social cards through `pageMetadata`.
 */
import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/data/site";

export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "MAD Custom — Built beyond the ordinary. Orlando, FL and Barceloneta, PR.",
};

type PageMetaOptions = {
  /** Page title without the site suffix. Omit on the homepage. */
  title?: string;
  description: string;
  /** Path with a leading slash, e.g. "/services/rims-tires". */
  path: string;
  /** Overrides the default social card. */
  image?: { url: string; width: number; height: number; alt: string };
};

export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
}: PageMetaOptions): Metadata {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  // `title` is passed bare: the root layout's title template appends
  // " | MAD Custom". The social titles are not templated, so they carry the
  // suffix themselves.
  const socialTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — Built beyond the ordinary`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: socialTitle,
      description,
      url: canonical,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
