/**
 * The two GoHighLevel booking calendars and the copy around them on /book,
 * /consultation and their thank-you pages. The copy is from the GHL pages.
 *
 * Each calendar's "redirect after booking" is set inside GHL, to
 * /book/thank-you and /consultation/thank-you on this domain.
 */

export const CALENDARS = {
  appointment: "wV1ahTWwIdq5fKJTF7QB",
  consultation: "c95paawxfNvdTBdWfyW0",
} as const;

export const BOOK_STATS = [
  { value: "Free", label: "Consultation" },
  { value: "9", label: "Specialist services" },
  { value: "2", label: "Locations" },
  { value: "Mon–Fri", label: "8am to 6pm ET" },
] as const;

export const CONSULTATION_STATS = [
  { value: "1 Hr", label: "Dedicated session" },
  { value: "Free", label: "No obligation" },
  { value: "2", label: "Locations" },
  { value: "Mon–Fri", label: "8am to 6pm ET" },
] as const;

/** Beside the appointment calendar. */
export const BOOK_EXPECT = [
  "We walk the car together.",
  "We talk through what you’re going for.",
  "You get a real scope and a real number.",
  "No cost, no pressure.",
] as const;

/** Beside the consultation calendar. */
export const CONSULTATION_EXPECT = [
  "One full hour, one on one.",
  "What’s possible, what it takes, and what it costs.",
  "You leave with a real plan, not a guess.",
  "Confirmation and reminders by email.",
] as const;

/** "What happens next" after booking an appointment. */
export const BOOKED_NEXT = [
  {
    title: "Check your inbox",
    body: "Your confirmation and calendar invite are on the way. If it’s not there in a few minutes, check spam and add us to your contacts.",
  },
  {
    title: "We reach out",
    body: "Someone from the team will follow up before your slot to confirm your vehicle and what you’re going for, so nothing gets missed.",
  },
  {
    title: "The walkthrough",
    body: "We walk the car together, map what’s worth doing first, and put a clear scope and a real number in front of you. No cost, no pressure.",
  },
] as const;

/** "Before you come in" after booking an appointment. */
export const BOOKED_PREP = [
  "Bring the vehicle if you can. Seeing it in person changes what we can tell you.",
  "Save a few reference photos of the look you’re after. Even rough ones help.",
  "Know your year, make and model. If you’ve already had work done, mention it.",
  "Need to move your slot? Just reply to your confirmation email or give us a call.",
] as const;

/** "Bring with you" after booking a consultation. */
export const CONSULTATION_PREP = [
  "Your vehicle’s year, make, model and trim",
  "Reference photos or builds you like",
  "Any budget range or timeline you’re working with",
] as const;

export const CONSULTATION_FINE_PRINT =
  "Consultations are free and carry no obligation. Pricing discussed on the call is an estimate based on the information you provide and may change once we inspect the vehicle in person.";
