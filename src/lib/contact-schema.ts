/**
 * The contact message payload, validated with the same rules on the client and
 * the server — the same arrangement `booking-schema.ts` uses.
 *
 * The rules are deliberately light: a name, an email, and something to read.
 * A contact form that argues with people loses messages.
 */
import { z } from "zod";
import { CONTACT_SHOPS } from "@/data/contact";

const trimmed = z.string().trim();

export const contactSchema = z.object({
  name: trimmed.min(1, "We need a name.").max(80, "That name is too long."),

  email: trimmed
    .min(1, "We need an email to reply to.")
    .email("That email does not look right."),

  tel: trimmed.max(40, "That number is too long.").default(""),

  shop: z.enum(CONTACT_SHOPS).or(z.literal("")).default(""),

  message: trimmed
    .min(1, "Tell us what you need.")
    .max(4000, "Please keep the message under 4000 characters."),

  /**
   * Honeypot. Hidden from real users and left empty by them; bots fill it in.
   * Named plausibly so autofill-style bots take the bait.
   */
  company: trimmed.max(200).default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/** Field-level errors keyed by field name, for inline display. */
export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;
