/**
 * "01 / Your build sheet" — the four-step booking wizard.
 *
 * All of the wizard's copy and option lists live here. The step components read
 * from this file, so changing a time window or the helper text under the buttons
 * is a one-line edit.
 */

export const STEP_TITLES = ["SERVICES", "VEHICLE", "SLOT", "CONTACT"] as const;

export const TOTAL_STEPS = 4;

/** Where the vehicle is at today. Step 2. */
export const CONDITIONS = [
  "Factory / stock",
  "Partly modified",
  "Full build in progress",
] as const;

/** Time windows. Step 3. */
export const TIME_WINDOWS = ["Morning", "Midday", "Afternoon", "After 5pm"] as const;

/** Where the consultation happens. Step 3. */
export const PLACES = ["Orlando shop", "Puerto Rico shop", "Video call"] as const;

export type Condition = (typeof CONDITIONS)[number];
export type TimeWindow = (typeof TIME_WINDOWS)[number];
export type Place = (typeof PLACES)[number];

/** Heading and sub-line for each step. */
export const STEP_COPY = [
  {
    heading: "What are we building?",
    sub: "Pick everything you're curious about — nothing is locked in.",
  },
  {
    heading: "The vehicle",
    sub: "Fitment math starts here, so be precise if you can.",
  },
  {
    heading: "Pick your slot",
    sub: "Consultations run 45 minutes at the shop or over video.",
  },
  {
    heading: "Where do we reach you?",
    sub: "One human replies — usually inside the hour during shop hours.",
  },
] as const;

/**
 * The line under the Back/Continue row when the current step is not yet valid.
 * When it is valid the wizard shows "Looks good — keep going." instead, or the
 * closing reassurance on the last step.
 */
export const STEP_HINTS = [
  "Pick at least one service to continue.",
  "Make and model are required.",
  "Choose a day and a time window.",
  "Name plus a phone or email, and you're done.",
] as const;

export const HINT_VALID = "Looks good — keep going.";
export const HINT_FINAL = "No deposit. We confirm by text within the hour.";

/** The three reassurance bullets in the spec summary. */
export const TRUST_POINTS = [
  "No deposit to hold a consultation",
  "Written quote before any work starts",
  "Two locations: Orlando & Puerto Rico",
] as const;

export const SUMMARY_TITLE = "SPEC SUMMARY";

/** Field placeholders, step 2 and step 4. */
export const PLACEHOLDERS = {
  year: "2023",
  make: "Chevrolet",
  model: "Silverado",
  name: "First and last",
  tel: "(407) 000 0000",
  email: "you@email.com",
  notes: "Wheel size you're after, reference builds, deadlines…",
} as const;

export type Day = {
  /** ISO date, YYYY-MM-DD. */
  key: string;
  /** "Mon", "Tue", … */
  dow: string;
  /** Zero-padded day of month. */
  num: string;
  /** "Jan", "Feb", … */
  mon: string;
};

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MON = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** How many days the picker offers. */
export const DAY_COUNT = 6;

/**
 * The next six bookable days, starting tomorrow and skipping Sundays — the shop
 * is Monday to Friday, and the design's picker skips only Sunday, so Saturdays
 * remain offered.
 *
 * Takes `from` so the caller can pass a fixed date; the wizard computes this on
 * the client after mount so the server and client never disagree about "today".
 */
export function nextDays(from: Date = new Date(), count: number = DAY_COUNT): Day[] {
  const days: Day[] = [];
  const cursor = new Date(from);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) continue;

    days.push({
      key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
        cursor.getDate(),
      ).padStart(2, "0")}`,
      dow: DOW[cursor.getDay()] ?? "",
      num: String(cursor.getDate()).padStart(2, "0"),
      mon: MON[cursor.getMonth()] ?? "",
    });
  }

  return days;
}

/** "Fri 26 Sep, Morning · Orlando shop" — used in the summary and the email. */
export function slotSummary(day: Day | undefined, time: string, place: string): string {
  if (!day) return "your chosen slot";
  const when = `${day.dow} ${day.num} ${day.mon}, ${time || "morning"}`;
  return place ? `${when} · ${place}` : when;
}
