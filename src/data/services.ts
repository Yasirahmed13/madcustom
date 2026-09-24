/**
 * The nine services, in the order they appear in "02 / Nine ways in".
 *
 * `galleryKey` ties a service to its photos and videos in `work.ts`, and `slug`
 * is the URL of its page at /services/[slug]. The slugs match the ones the
 * original design linked out to, so existing links map one-to-one.
 *
 * To add a service: add an entry here, give it a unique `galleryKey`, then tag
 * work items with that key in `work.ts`. The service card, the gallery filter,
 * the footer link, the booking chips, the sitemap and its own page all follow.
 */

export type ServiceSlug =
  | "rims-tires"
  | "performance-suspension-systems"
  | "premium-vinyl-wrap-studio"
  | "paint-protection-film-ppf"
  | "luxury-detailing-paint-correction"
  | "bespoke-custom-builds"
  | "upholstery"
  | "window-tint"
  | "performance-exhaust-systems";

export type Service = {
  /** Two-digit display number, e.g. "01". */
  num: string;
  title: string;
  description: string;
  slug: ServiceSlug;
  /** Joins this service to its work items. */
  galleryKey: string;
  /** Short form used on filter chips and in the lightbox header. */
  shortLabel: string;
  /** Filename (no extension) of the card cover shot in /public/work/thumb. */
  coverFile: string;
  /** CSS object-position for the cover crop. */
  coverPosition: string;
  /**
   * The name this service goes by in a quote request. It is what lands in the
   * GHL `selected_services` field, so CRM tags and workflows key off it — keep
   * it stable once live.
   */
  quoteName: string;
};

export const SERVICES: readonly Service[] = [
  {
    num: "01",
    title: "Rims & Tires",
    description:
      "Precision wheel and tire selection with exact fitment specs to enhance stance, performance and safety.",
    slug: "rims-tires",
    galleryKey: "wheels",
    shortLabel: "Rims & Tires",
    coverFile: "wheels-bmw-x4m-detail",
    coverPosition: "center 70%",
    quoteName: "Rims & Tires",
  },
  {
    num: "02",
    title: "Performance Suspension",
    description:
      "Lowering or lift solutions that improve handling and presence while keeping comfort and control.",
    slug: "performance-suspension-systems",
    galleryKey: "suspension",
    shortLabel: "Suspension",
    coverFile: "suspension-bronco-profile",
    coverPosition: "center 62%",
    quoteName: "Performance Suspension",
  },
  {
    num: "03",
    title: "Premium Vinyl Wrap",
    description:
      "High-end vinyl that transforms colour and finish while protecting the original paint underneath.",
    slug: "premium-vinyl-wrap-studio",
    galleryKey: "wrap",
    shortLabel: "Vinyl Wrap",
    coverFile: "wrap-amg-gt63-olive",
    coverPosition: "center 68%",
    quoteName: "Premium Vinyl Wrap",
  },
  {
    num: "04",
    title: "Paint Protection Film",
    description:
      "Self-healing film that shields paint from chips, scratches and road debris. Invisible protection.",
    slug: "paint-protection-film-ppf",
    galleryKey: "ppf",
    shortLabel: "PPF",
    coverFile: "ppf-corvette-c8",
    coverPosition: "center 62%",
    quoteName: "Paint Protection Film",
  },
  {
    num: "05",
    title: "Detailing & Paint Correction",
    description:
      "Multi-stage correction and interior refinement for depth, clarity and showroom-level shine.",
    slug: "luxury-detailing-paint-correction",
    galleryKey: "detailing",
    shortLabel: "Detailing",
    coverFile: "detailing-ferrari-f430-rear",
    coverPosition: "center 40%",
    quoteName: "Luxury Detailing",
  },
  {
    num: "06",
    title: "Bespoke Custom Builds",
    description:
      "Full transformations integrating performance, aesthetics and craftsmanship into one-of-one builds.",
    slug: "bespoke-custom-builds",
    galleryKey: "builds",
    shortLabel: "Custom Builds",
    coverFile: "builds-maverick-x3",
    coverPosition: "center 62%",
    quoteName: "Bespoke Custom Builds",
  },
  {
    num: "07",
    title: "Upholstery",
    description:
      "Interior restoration and customization in premium materials, built for comfort and durability.",
    slug: "upholstery",
    galleryKey: "upholstery",
    shortLabel: "Upholstery",
    coverFile: "upholstery-ferrari-headrest",
    coverPosition: "center 45%",
    quoteName: "Upholstery",
  },
  {
    num: "08",
    title: "Window Tint",
    description:
      "High-performance film for privacy, heat rejection and UV protection with a sleek finish.",
    slug: "window-tint",
    galleryKey: "tint",
    shortLabel: "Window Tint",
    coverFile: "tint-install",
    coverPosition: "center",
    quoteName: "Window Tint",
  },
  {
    num: "09",
    title: "Performance Exhaust",
    description:
      "Exhaust upgrades tuned for airflow, throttle response and a refined but aggressive tone.",
    slug: "performance-exhaust-systems",
    galleryKey: "exhaust",
    shortLabel: "Exhaust",
    coverFile: "exhaust-amg-c63",
    coverPosition: "center 85%",
    quoteName: "Performance Exhaust",
  },
] as const;

/** Look a service up by its gallery key. */
export const SERVICE_BY_KEY: Readonly<Record<string, Service>> = Object.fromEntries(
  SERVICES.map((s) => [s.galleryKey, s]),
);

/** Look a service up by its URL slug. */
export const SERVICE_BY_SLUG: Readonly<Record<string, Service>> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

export function getService(slug: string): Service | undefined {
  return SERVICE_BY_SLUG[slug];
}
