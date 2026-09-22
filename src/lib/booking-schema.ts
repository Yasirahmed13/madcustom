/**
 * The booking payload, validated with the same rules on the client and the
 * server. The per-step rules mirror the original design exactly:
 *
 *   step 1 — at least one service
 *   step 2 — make and model required, year optional
 *   step 3 — a day and a time window
 *   step 4 — a name, plus a phone or an email (either will do)
 */
import { z } from "zod";
import { CONDITIONS, PLACES, TIME_WINDOWS } from "@/data/booking";

const trimmed = z.string().trim();

export const bookingSchema = z
  .object({
    services: z
      .array(trimmed.min(1))
      .min(1, "Pick at least one service.")
      .max(20, "That is more services than we offer."),

    year: trimmed.max(10, "That does not look like a year.").default(""),
    make: trimmed.min(1, "Tell us the make.").max(60, "That make is too long."),
    model: trimmed.min(1, "Tell us the model.").max(60, "That model is too long."),
    condition: z.enum(CONDITIONS).or(z.literal("")).default(""),

    day: trimmed.regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a day."),
    /** Human-readable version of `day`, e.g. "Fri 26 Sep" — for the email. */
    dayLabel: trimmed.max(40).default(""),
    time: z.enum(TIME_WINDOWS, { message: "Choose a time window." }),
    place: z.enum(PLACES).or(z.literal("")).default(""),

    name: trimmed.min(1, "We need a name.").max(80, "That name is too long."),
    tel: trimmed.max(40, "That number is too long.").default(""),
    email: z
      .union([z.literal(""), trimmed.email("That email does not look right.")])
      .default(""),
    notes: trimmed.max(2000, "Please keep notes under 2000 characters.").default(""),

    /**
     * Honeypot. Hidden from real users and left empty by them; bots fill it in.
     * Named plausibly so autofill-style bots take the bait.
     */
    company: trimmed.max(200).default(""),
  })
  .refine((data) => data.tel !== "" || data.email !== "", {
    message: "Add a phone number or an email so we can reach you.",
    path: ["tel"],
  });

export type BookingPayload = z.infer<typeof bookingSchema>;

/** Field-level errors keyed by field name, for inline display. */
export type BookingErrors = Partial<Record<keyof BookingPayload, string>>;
