import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { BUTTON_GHOST, BUTTON_PRIMARY } from "@/components/ui/buttons";
import { NumberedSteps } from "@/components/funnel/NumberedSteps";
import { BookedSlot } from "@/components/funnel/BookedSlot";
import {
  Checklist,
  ConfirmedEyebrow,
  ShopContacts,
} from "@/components/funnel/ShopContacts";
import { BOOKED_NEXT, BOOKED_PREP } from "@/data/calendars";
import { SERVICES_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/** The appointment calendar redirects here after a booking. */

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Appointment Confirmed",
    description: "Your MAD Custom appointment is booked.",
    path: "/book/thank-you",
  }),
  robots: { index: false, follow: true },
};

export default function BookThankYouPage() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          image="/work/full/ppf-corvette-c8.jpg"
          imagePosition="center 55%"
          crumbs={[{ label: "Home", href: "/" }, { label: "Booking confirmed" }]}
          eyebrow={<ConfirmedEyebrow>BOOKING CONFIRMED</ConfirmedEyebrow>}
          title="You’re locked in"
          lede="Your consultation is booked. A confirmation is on its way to your inbox, and our team will reach out before your visit to make sure we have everything we need."
          actions={
            <>
              <a href={SERVICES_URL} className={BUTTON_PRIMARY}>
                Explore our services <span className="font-mono">→</span>
              </a>
              <Link href="/" className={BUTTON_GHOST}>
                Back to home
              </Link>
            </>
          }
        >
          <Suspense fallback={null}>
            <BookedSlot />
          </Suspense>
        </PageHero>

        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="01 / WHAT HAPPENS NEXT"
              title="From here to the build"
              lede="No guesswork between now and your visit. Here’s exactly how it runs."
              ledeWidth="34ch"
              className="mb-[34px]"
            />
            <NumberedSteps steps={BOOKED_NEXT} />
          </Container>
        </section>

        <section className="border-line-9 border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="02 / BEFORE YOU COME IN"
              title="Make it a good one"
              lede="A short list, nothing heavy."
              ledeWidth="30ch"
              className="mb-[34px]"
            />
            <div className="tablet:grid-cols-1 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start gap-[22px]">
              <div className="bg-surface-card border-line-10 border p-[clamp(20px,2.6vw,30px)]">
                <Eyebrow className="mb-5 text-[10.5px]">BRING WITH YOU</Eyebrow>
                <Checklist items={BOOKED_PREP} />
              </div>
              <ShopContacts>
                Reply to your confirmation email or call the shop. We’d rather sort it now
                than on the day.
              </ShopContacts>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
