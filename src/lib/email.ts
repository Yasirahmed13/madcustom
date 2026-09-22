/**
 * Booking delivery.
 *
 * ---------------------------------------------------------------------------
 * TODO(provider): this is the only place that talks to an email provider.
 *
 * To switch away from Resend — to Postmark, SendGrid, SES, a CRM or a webhook —
 * replace the body of `deliverBooking` below. Keep the signature and the
 * `DeliveryResult` shape and nothing else in the app has to change.
 *
 * The contract that matters: this function must never throw. The booking UI
 * treats a failed send as a soft failure and shows the customer the phone
 * number and WhatsApp link instead of an error, so a provider outage never
 * costs a lead.
 * ---------------------------------------------------------------------------
 */
import { Resend } from "resend";
import { SITE } from "@/data/site";
import type { BookingPayload } from "./booking-schema";
import type { ContactPayload } from "./contact-schema";

export type DeliveryResult = { delivered: boolean; reason?: string };

const TO = process.env.BOOKING_TO_EMAIL || SITE.email;
const FROM = process.env.BOOKING_FROM_EMAIL || "MAD Custom <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function vehicleOf(booking: BookingPayload) {
  return [booking.year, booking.make, booking.model].filter(Boolean).join(" ");
}

function slotOf(booking: BookingPayload) {
  const when = booking.dayLabel || booking.day;
  return (
    [when, booking.time].filter(Boolean).join(", ") +
    (booking.place ? ` · ${booking.place}` : "")
  );
}

/** Plain-text body — also what gets logged when no provider is configured. */
export function bookingText(booking: BookingPayload): string {
  return [
    `New build sheet from ${booking.name}`,
    "",
    `Services:   ${booking.services.join(", ")}`,
    `Vehicle:    ${vehicleOf(booking) || "—"}`,
    `Condition:  ${booking.condition || "—"}`,
    `Slot:       ${slotOf(booking)}`,
    "",
    `Name:       ${booking.name}`,
    `Phone:      ${booking.tel || "—"}`,
    `Email:      ${booking.email || "—"}`,
    "",
    `Notes:      ${booking.notes || "—"}`,
  ].join("\n");
}

function bookingHtml(booking: BookingPayload): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px 10px 0;color:#6b7280;font:600 12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${label}</td>
      <td style="padding:10px 0;color:#111827;font:400 15px/1.5 -apple-system,Segoe UI,sans-serif">${escapeHtml(value) || "&mdash;"}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;background:#f4f4f5;padding:28px">
  <table role="presentation" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7">
    <tr><td style="background:#0c0c0d;padding:22px 24px">
      <div style="color:#e01b24;font:700 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.16em">NEW BUILD SHEET</div>
      <div style="color:#f4f3f3;font:700 24px/1.2 -apple-system,Segoe UI,sans-serif;margin-top:8px">${escapeHtml(booking.name)}</div>
    </td></tr>
    <tr><td style="padding:8px 24px 24px">
      <table role="presentation" width="100%">
        ${row("Services", booking.services.join(", "))}
        ${row("Vehicle", vehicleOf(booking))}
        ${row("Condition", booking.condition)}
        ${row("Slot", slotOf(booking))}
        ${row("Phone", booking.tel)}
        ${row("Email", booking.email)}
        ${row("Notes", booking.notes)}
      </table>
    </td></tr>
    <tr><td style="padding:16px 24px;border-top:1px solid #e4e4e7;color:#6b7280;font:400 12px/1.5 -apple-system,Segoe UI,sans-serif">
      Sent from the booking form on ${escapeHtml(SITE.name)}.
    </td></tr>
  </table>
</body></html>`;
}

export async function deliverBooking(booking: BookingPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No provider configured. Log it so the booking is not silently lost during
    // local development, and report a soft failure so the UI shows the fallback.
    console.warn(
      "[booking] RESEND_API_KEY is not set — the submission was not emailed:\n" +
        bookingText(booking),
    );
    return { delivered: false, reason: "email-not-configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `New build sheet — ${booking.name}${
        booking.make ? ` (${vehicleOf(booking)})` : ""
      }`,
      text: bookingText(booking),
      html: bookingHtml(booking),
      ...(booking.email ? { replyTo: booking.email } : {}),
    });

    if (error) {
      console.error("[booking] Resend rejected the send:", error);
      return { delivered: false, reason: "provider-error" };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[booking] email send threw:", error);
    return { delivered: false, reason: "provider-unreachable" };
  }
}

/* ---------------------------------------------------------------------------
   Contact messages
   ---------------------------------------------------------------------------
   The /contact form. Same contract as `deliverBooking`: never throws, and a
   failed send is reported as `delivered: false` so the page can show the phone
   number and WhatsApp link instead of an error.
   --------------------------------------------------------------------------- */

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || TO;

/** Plain-text body — also what gets logged when no provider is configured. */
export function contactText(message: ContactPayload): string {
  return [
    `New message from ${message.name}`,
    "",
    `Name:     ${message.name}`,
    `Email:    ${message.email}`,
    `Phone:    ${message.tel || "—"}`,
    `Shop:     ${message.shop || "—"}`,
    "",
    message.message,
  ].join("\n");
}

function contactHtml(message: ContactPayload): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px 10px 0;color:#6b7280;font:600 12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${label}</td>
      <td style="padding:10px 0;color:#111827;font:400 15px/1.5 -apple-system,Segoe UI,sans-serif">${escapeHtml(value) || "&mdash;"}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;background:#f4f4f5;padding:28px">
  <table role="presentation" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7">
    <tr><td style="background:#0c0c0d;padding:22px 24px">
      <div style="color:#e01b24;font:700 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.16em">NEW CONTACT MESSAGE</div>
      <div style="color:#f4f3f3;font:700 24px/1.2 -apple-system,Segoe UI,sans-serif;margin-top:8px">${escapeHtml(message.name)}</div>
    </td></tr>
    <tr><td style="padding:8px 24px 24px">
      <table role="presentation" width="100%">
        ${row("Email", message.email)}
        ${row("Phone", message.tel)}
        ${row("Shop", message.shop)}
      </table>
      <div style="margin-top:14px;padding-top:18px;border-top:1px solid #e4e4e7;color:#111827;font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${escapeHtml(message.message)}</div>
    </td></tr>
    <tr><td style="padding:16px 24px;border-top:1px solid #e4e4e7;color:#6b7280;font:400 12px/1.5 -apple-system,Segoe UI,sans-serif">
      Sent from the contact form on ${escapeHtml(SITE.name)}.
    </td></tr>
  </table>
</body></html>`;
}

export async function deliverContact(message: ContactPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — the message was not emailed:\n" +
        contactText(message),
    );
    return { delivered: false, reason: "email-not-configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [CONTACT_TO],
      subject: `Contact form — ${message.name}`,
      text: contactText(message),
      html: contactHtml(message),
      replyTo: message.email,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return { delivered: false, reason: "provider-error" };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[contact] email send threw:", error);
    return { delivered: false, reason: "provider-unreachable" };
  }
}
