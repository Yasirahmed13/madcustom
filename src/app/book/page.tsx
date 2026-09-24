import type { Metadata } from "next";
import { CalendarPage } from "@/components/funnel/CalendarPage";
import { BOOK_EXPECT, BOOK_STATS, CALENDARS } from "@/data/calendars";
import { pageMetadata } from "@/lib/seo";

/** The appointment calendar behind every "Make Appointment" button. */

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book your build consultation at MAD Custom in Orlando, FL or Barceloneta, PR. Free, no pressure — pick a time that works for you.",
  path: "/book",
});

export default function BookPage() {
  return (
    <CalendarPage
      crumb="Book"
      image="/work/full/ppf-corvette-c8-showroom.jpg"
      imagePosition="center 55%"
      eyebrow="Make appointment / Orlando FL · Puerto Rico"
      title="Book your build consultation"
      lede="Pick a time that works for you. We walk the car together, talk through what you’re going for, and put a real scope and a real number in front of you. No cost, no pressure."
      cta="Choose your time"
      stats={BOOK_STATS}
      calendarId={CALENDARS.appointment}
      calendarTitle="Book an appointment with MAD Custom"
      sectionTitle="Choose your time"
      sectionLede="Live availability for both shops. You’ll get a confirmation and a calendar invite by email."
      expect={BOOK_EXPECT}
    />
  );
}
