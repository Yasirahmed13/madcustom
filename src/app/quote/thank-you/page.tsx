import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BUTTON_GHOST, BUTTON_PRIMARY } from "@/components/ui/buttons";
import { CtaBand } from "@/components/sections/CtaBand";
import { FunnelSteps } from "@/components/quote/FunnelSteps";
import { NumberedSteps } from "@/components/funnel/NumberedSteps";
import { ClearQuoteOnMount } from "@/components/funnel/ClearQuoteOnMount";
import { ConfirmedEyebrow } from "@/components/funnel/ShopContacts";
import { QUOTE_THANKS_STEPS } from "@/data/quote";
import { APPOINTMENT_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/** Step 3 of the quote funnel. GHL's quote form redirects here on submit. */

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Quote Request Received",
    description: "Thanks — your quote request is in. Here is what happens next.",
    path: "/quote/thank-you",
  }),
  robots: { index: false, follow: true },
};

export default function QuoteThankYouPage() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          image="/work/full/wrap-g63-satin-bronze.jpg"
          imagePosition="center 55%"
          crumbs={[{ label: "Home", href: "/" }, { label: "Request received" }]}
          eyebrow={<ConfirmedEyebrow>REQUEST RECEIVED</ConfirmedEyebrow>}
          title="Thank you. You’re locked in."
          titleWidth="13ch"
          lede="Our team is reviewing your vehicle and building your custom quote now. Book your appointment to confirm your price and reserve your spot."
          actions={
            <>
              <a href={APPOINTMENT_URL} className={BUTTON_PRIMARY}>
                Book my appointment <span className="font-mono">→</span>
              </a>
              <Link href="/" className={BUTTON_GHOST}>
                Back to home
              </Link>
            </>
          }
        >
          <FunnelSteps current={3} />
        </PageHero>

        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="01 / WHAT HAPPENS NEXT"
              title="Three steps to the build"
              lede="Your quote usually lands by text or email within one business day."
              ledeWidth="34ch"
              className="mb-[34px]"
            />
            <NumberedSteps steps={QUOTE_THANKS_STEPS} />
          </Container>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
      <MobileActionBar />
      <ClearQuoteOnMount />
    </>
  );
}
