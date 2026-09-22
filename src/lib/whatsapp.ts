/**
 * WhatsApp deep links.
 *
 * Every wa.me link on the site is built here so the number lives in exactly one
 * place: NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
import { SITE } from "@/data/site";

/**
 * Digits only, no "+". Falls back to the number behind the design's
 * wa.link/c2aabg short link.
 *
 * TODO(confirm): 17874211779 is what that short link resolves to. It matches
 * neither shop number in the footer (+1 407 286 4426 Florida, +1 787 846 5115
 * Puerto Rico). Set NEXT_PUBLIC_WHATSAPP_NUMBER once it is confirmed.
 */
const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "17874211779"
).replace(/\D/g, "");

/** The message the design's own short link was configured with. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi MAD Custom, I’m interested in upgrading my vehicle. Could I get more information about your services and pricing?";

/**
 * A wa.me link with a prefilled message.
 *
 * If the number is ever blanked out this falls back to the original wa.link
 * short link, which carries its own prefilled text, so the button always works.
 */
export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  if (!WHATSAPP_NUMBER) return SITE.whatsappShortLink;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** "I'd like to book Rims & Tires" — used by the per-service CTAs. */
export function whatsappServiceHref(serviceTitle: string): string {
  return whatsappHref(
    `Hi MAD Custom, I’m interested in ${serviceTitle} for my vehicle. Could I get more information?`,
  );
}

/**
 * The message sent from the booking confirmation screen, carrying the details
 * the customer just entered so the shop has them in the thread.
 */
export function whatsappBookingHref(booking: {
  name: string;
  services: readonly string[];
  vehicle: string;
  slot: string;
}): string {
  const lines = [
    `Hi MAD Custom, I’ve just submitted a build sheet.`,
    booking.name ? `Name: ${booking.name}` : null,
    booking.services.length ? `Services: ${booking.services.join(", ")}` : null,
    booking.vehicle ? `Vehicle: ${booking.vehicle}` : null,
    booking.slot ? `Slot: ${booking.slot}` : null,
  ].filter(Boolean);

  return whatsappHref(lines.join("\n"));
}
