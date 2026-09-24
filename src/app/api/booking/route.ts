/**
 * POST /api/booking — receives a build sheet.
 *
 * Validates with the same zod schema the form uses, drops honeypot hits, then
 * hands off to the delivery adapters in lib/email.ts and lib/ghl.ts.
 *
 * A delivery failure is NOT an error response. The slot is still considered
 * held; the response carries `delivered: false` and the UI shows the customer
 * the phone number and WhatsApp link instead. Losing an email must never look
 * like a broken form.
 */
import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { deliverBooking } from "@/lib/email";
import { forwardBookingToGhl } from "@/lib/ghl";

export const runtime = "nodejs";
/** Never cached — every request runs. */
export const dynamic = "force-dynamic";

/**
 * A small in-memory throttle: 5 submissions per IP per 10 minutes. This resets
 * on redeploy and is per-instance, so it is a speed bump for casual abuse
 * rather than a real rate limiter. Put a proper one in front (Vercel WAF,
 * Upstash) if the form ever gets targeted.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear();

  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Some details need another look.", fieldErrors },
      { status: 422 },
    );
  }

  const booking = parsed.data;

  // Honeypot: a real browser never fills this in. Answer 200 so the bot has no
  // signal that it was caught.
  if (booking.company !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "That is a lot of build sheets. Give it a few minutes, or call us.",
      },
      { status: 429 },
    );
  }

  // Email and the GHL CRM in parallel. Either one landing counts as delivered.
  const [email, crm] = await Promise.all([
    deliverBooking(booking),
    forwardBookingToGhl(booking),
  ]);

  return NextResponse.json({ ok: true, delivered: email.delivered || crm.delivered });
}
