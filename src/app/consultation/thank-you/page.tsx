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
import { BookedSlot } from "@/components/funnel/BookedSlot";
import {
  Checklist,
  ConfirmedEyebrow,
  ShopContacts,
} from "@/components/funnel/ShopContacts";
import { CONSULTATION_FINE_PRINT, CONSULTATION_PREP } from "@/data/calendars";
import { PRIVACY_URL, SERVICES_URL, TERMS_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/** The 1:1 consultation calendar redirects here after a booking. */

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Consultation Confirmed",
    description: "Your 1:1 consultation with MAD Custom is booked.",
    path: "/consultation/thank-you",
  }),
  robots: { index: false, follow: true },
};

export default function ConsultationThankYouPage() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          image="/work/full/detailing-ferrari-f430-2.jpg"
          imagePosition="center 50%"
          crumbs={[{ label: "Home", href: "/" }, { label: "Consultation confirmed" }]}
          eyebrow={<ConfirmedEyebrow>CONSULTATION CONFIRMED</ConfirmedEyebrow>}
          title="You’re booked in"
          lede="Your 1:1 consultation is locked in. A confirmation is on its way to your inbox, and you’ll get reminders before we meet. That’s a full hour set aside for your build — come with the details and we’ll come with straight answers."
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
              eyebrow="01 / BEFORE WE MEET"
              title="Come with the details"
              lede="The more we know going in, the straighter the answers coming out."
              ledeWidth="34ch"
              className="mb-[34px]"
            />
            <div className="tablet:grid-cols-1 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start gap-[22px]">
              <div className="bg-surface-card border-line-10 border p-[clamp(20px,2.6vw,30px)]">
                <Eyebrow className="mb-5 text-[10.5px]">BRING WITH YOU</Eyebrow>
                <Checklist items={CONSULTATION_PREP} />
              </div>
              <ShopContacts eyebrow="NEED TO RESCHEDULE?">
                Use the link in your confirmation email, or call the shop and we’ll move
                it for you.
              </ShopContacts>
            </div>

            <p className="text-bone-45 border-line-10 mt-[34px] mb-0 max-w-[90ch] border-t pt-[22px] text-[12.5px] leading-[1.6]">
              {CONSULTATION_FINE_PRINT} <a href={TERMS_URL}>Terms &amp; Conditions</a> ·{" "}
              <a href={PRIVACY_URL}>Privacy Policy</a>
            </p>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
