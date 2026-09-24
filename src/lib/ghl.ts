/**
 * GoHighLevel delivery for the site's own forms.
 *
 * The funnel pages (/services → /quote, /book, /consultation) use GHL's own form
 * and calendar widgets, so they reach the CRM directly. The homepage build sheet
 * and the /contact form are the site's own, so they are forwarded here to a GHL
 * workflow's "Inbound Webhook" trigger, which creates or updates the contact
 * and runs whatever the workflow does next (tag, notify, pipeline, SMS).
 *
 * Set GHL_BOOKING_WEBHOOK_URL and GHL_CONTACT_WEBHOOK_URL to enable it. The
 * payload is flat JSON, so each key can be mapped to a contact field in the
 * workflow's trigger.
 *
 * Same contract as lib/email.ts: never throws.
 */
import type { BookingPayload } from "./booking-schema";
import type { ContactPayload } from "./contact-schema";
import type { DeliveryResult } from "./email";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { first_name: parts[0] ?? "", last_name: parts.slice(1).join(" ") };
}

async function post(
  label: string,
  url: string | undefined,
  payload: Record<string, string>,
): Promise<DeliveryResult> {
  if (!url) return { delivered: false, reason: "ghl-not-configured" };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(`[${label}] GHL webhook answered ${response.status}`);
      return { delivered: false, reason: "provider-error" };
    }
    return { delivered: true };
  } catch (error) {
    console.error(`[${label}] GHL webhook failed:`, error);
    return { delivered: false, reason: "provider-unreachable" };
  }
}

export function forwardBookingToGhl(booking: BookingPayload): Promise<DeliveryResult> {
  return post("booking", process.env.GHL_BOOKING_WEBHOOK_URL, {
    source: "Website build sheet",
    ...splitName(booking.name),
    name: booking.name,
    email: booking.email,
    phone: booking.tel,
    selected_services: booking.services.join(", "),
    vehicle_year: booking.year,
    vehicle_make: booking.make,
    vehicle_model: booking.model,
    vehicle_condition: booking.condition,
    preferred_day: booking.dayLabel || booking.day,
    preferred_time: booking.time,
    location: booking.place,
    notes: booking.notes,
  });
}

export function forwardContactToGhl(message: ContactPayload): Promise<DeliveryResult> {
  return post("contact", process.env.GHL_CONTACT_WEBHOOK_URL, {
    source: "Website contact form",
    ...splitName(message.name),
    name: message.name,
    email: message.email,
    phone: message.tel,
    location: message.shop,
    message: message.message,
  });
}
