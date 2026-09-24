import type { Metadata } from "next";
import { CalendarPage } from "@/components/funnel/CalendarPage";
import { CALENDARS, CONSULTATION_EXPECT, CONSULTATION_STATS } from "@/data/calendars";
import { pageMetadata } from "@/lib/seo";

/** The 1:1 consultation calendar. */

export const metadata: Metadata = pageMetadata({
  title: "1:1 Consultation",
  description:
    "Book a free 1:1 consultation with MAD Custom — one full hour on what’s possible for your vehicle, what it takes and what it costs.",
  path: "/consultation",
});

export default function ConsultationPage() {
  return (
    <CalendarPage
      crumb="1:1 Consultation"
      image="/work/full/detailing-ferrari-f430.jpg"
      imagePosition="center 50%"
      eyebrow="1:1 Consultation / Orlando FL · Puerto Rico"
      title="Let’s talk build"
      lede="One full hour, one on one. Bring the vehicle, the vision, and the questions — we’ll walk through what’s possible, what it takes, and what it costs. You leave with a real plan, not a guess."
      cta="Book your consultation"
      stats={CONSULTATION_STATS}
      calendarId={CALENDARS.consultation}
      calendarTitle="Book a 1:1 consultation with MAD Custom"
      sectionTitle="Book your hour"
      sectionLede="Pick any open slot. You’ll get a confirmation and reminders by email."
      expect={CONSULTATION_EXPECT}
    />
  );
}
