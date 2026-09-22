/**
 * "07 / What people ask before they book".
 *
 * The design defines eleven questions but renders only the first five. That is
 * preserved: the homepage shows HOME_FAQ_COUNT, and the remaining six — which
 * are the most booking-relevant of the set — surface on the service pages they
 * relate to, so none of the copy goes to waste.
 *
 * NOTE: the `services` tags are not in the original design. They were added here
 * to drive "related questions" on /services/[slug]. Retag freely; an entry with
 * no tags is treated as general and can appear on any service page.
 */
import { SERVICES } from "./services";

export type FaqEntry = {
  question: string;
  answer: string;
  /** Gallery keys from services.ts this question is specific to. */
  services?: readonly string[];
};

export const FAQ: readonly FaqEntry[] = [
  {
    question: "What makes MAD Custom different?",
    answer:
      "We treat detailing and customization as craftsmanship, not maintenance: advanced techniques, premium-grade products and meticulous attention to detail on every vehicle.",
  },
  {
    question: "How do ceramic coatings benefit my vehicle?",
    answer:
      "Our ceramic systems deliver gloss and hydrophobic performance while defending against environmental contaminants — protecting the integrity and resale value of the car.",
    services: ["detailing", "ppf"],
  },
  {
    question: "Can paint correction safely remove imperfections?",
    answer:
      "Yes. Our multi-stage process removes swirl marks, light scratches and surface defects while preserving the factory finish, leaving mirror-like clarity.",
    services: ["detailing"],
  },
  {
    question: "Do you tailor work to specific vehicles?",
    answer:
      "Always. From daily drivers to collector models, every programme is designed around the vehicle's condition, finish and character.",
  },
  {
    question: "How often should a vehicle be professionally detailed?",
    answer:
      "It depends on usage and storage. At your consultation we'll set a maintenance interval that keeps the car impeccable year-round.",
    services: ["detailing"],
  },
  {
    question: "How long does a booking take to confirm?",
    answer:
      "Fill in the build sheet and you'll have a text or email confirmation from a real person — usually within the hour during shop hours (Mon–Fri, 08:00–18:00).",
  },
  {
    question: "Do I pay anything to book a consultation?",
    answer:
      "No. Consultations are free and there's no deposit to hold a slot. You'll get a written quote before any work begins.",
  },
  {
    question: "How long will my vehicle be in the shop?",
    answer:
      "Window tint and detailing are typically same-day. Wheels and suspension usually take one to two days. Full wraps, PPF and bespoke builds are scheduled by project — we give you a firm timeline with your quote.",
    services: ["tint", "detailing", "wheels", "suspension", "wrap", "ppf", "builds"],
  },
  {
    question: "Can you source wheels that aren't in stock?",
    answer:
      "Yes. We work directly with the major forged and cast brands and can order almost any fitment, finish or custom offset — and we'll confirm clearance before ordering.",
    services: ["wheels"],
  },
  {
    question: "Are you only in Orlando?",
    answer:
      "We run two shops: Orlando, Florida and Barceloneta, Puerto Rico — more than five decades of the same family in the business. You can pick your location in the build sheet, or book a video consultation.",
  },
  {
    question: "Is your work guaranteed?",
    answer:
      "Every installation is backed by our workmanship guarantee, plus the manufacturer warranty on films, coatings and wheels. If something isn't right, bring it back to us.",
  },
] as const;

/**
 * How many questions the homepage accordion shows. The design slices to 5.
 * Raise this to FAQ.length to show all eleven — the FAQPage structured data
 * follows automatically, since it is built from the same slice.
 */
export const HOME_FAQ_COUNT = 5;

/** The questions rendered on the homepage. */
export const HOME_FAQ: readonly FaqEntry[] = FAQ.slice(0, HOME_FAQ_COUNT);

const ALL_KEYS = new Set(SERVICES.map((s) => s.galleryKey));

/**
 * Questions for a service page: the ones tagged with this service first, then
 * untagged general questions to fill up to `limit`.
 */
export function faqsForService(galleryKey: string, limit = 4): readonly FaqEntry[] {
  if (!ALL_KEYS.has(galleryKey)) return [];

  const specific = FAQ.filter((f) => f.services?.includes(galleryKey));
  const general = FAQ.filter((f) => !f.services || f.services.length === 0);

  return [...specific, ...general].slice(0, limit);
}
