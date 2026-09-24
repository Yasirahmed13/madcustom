import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { BUTTON_GHOST, BUTTON_PRIMARY } from "@/components/ui/buttons";
import { ServicePicker } from "@/components/quote/ServicePicker";
import { ProductShop } from "@/components/quote/ProductShop";
import { QuoteBar } from "@/components/quote/QuoteBar";
import { PreselectFromUrl } from "@/components/quote/PreselectFromUrl";
import { CONSULTATION_URL } from "@/data/links";
import { QUOTE_PROMISES } from "@/data/quote";
import { pageMetadata } from "@/lib/seo";

/**
 * Step 1 of the quote funnel: pick any combination of services and products,
 * then "Request my quote" carries them to the GHL form on /quote.
 */

export const metadata: Metadata = pageMetadata({
  title: "Services & Quote",
  description:
    "Wheels, suspension, wraps, PPF, detailing, tint, upholstery, exhaust and full custom builds. Pick any combination and request one custom quote from MAD Custom.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          image="/work/full/wheels-amg-gt63-vossen.jpg"
          imagePosition="center 60%"
          crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
          eyebrow="Services / One quote, any combination"
          title="Our Services"
          lede="High-end automotive customization — precision wheel fitment, suspension, premium wraps, PPF and complete custom builds. Pick one or more and request a single custom quote for your vehicle."
          actions={
            <>
              <a href="#choose" className={BUTTON_PRIMARY}>
                Choose your services <span className="font-mono">↓</span>
              </a>
              <a href={CONSULTATION_URL} className={BUTTON_GHOST}>
                Book a free consultation
              </a>
            </>
          }
          meta={QUOTE_PROMISES.map((promise) => (
            <span key={promise}>{promise}</span>
          ))}
        />

        {/* --- 01 / Choose --- */}
        <section id="choose" className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="01 / CHOOSE"
              title="Build your quote"
              lede="Add every service you want priced — they all go out as one request. Prices shown are starting prices; your final price depends on your vehicle and the work required."
              ledeWidth="40ch"
              className="mb-[38px]"
            />

            <ServicePicker />

            <div
              data-reveal=""
              className="bg-surface-panel border-line-10 tablet:flex-col tablet:items-start mt-[22px] flex items-center gap-6 border p-[clamp(20px,2.6vw,30px)]"
            >
              <div className="flex-1">
                <Eyebrow>NOT SURE YET?</Eyebrow>
                <h3 className="font-display mt-2.5 mb-0 text-[clamp(22px,2.4vw,30px)] leading-none uppercase">
                  Not sure which service you need?
                </h3>
                <p className="text-bone-60 mt-2.5 mb-0 max-w-[60ch] text-[14.5px] leading-[1.55]">
                  Book a free consultation and our team will walk you through the right
                  options for your vehicle.
                </p>
              </div>
              <a href={CONSULTATION_URL} className={`${BUTTON_GHOST} flex-none`}>
                Book a free consultation <span className="font-mono">→</span>
              </a>
            </div>
          </Container>
        </section>

        {/* --- 02 / Pro shop --- */}
        <section id="shop" className="border-line-9 border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="02 / PRO SHOP"
              title="Detailing products"
              lede="The same washes, coatings and tools we use in the shop, ready for your garage. Add them to the same quote."
              ledeWidth="40ch"
              className="mb-[38px]"
            />
            <ProductShop />
          </Container>
        </section>

        <QuoteBar />
      </main>

      <SiteFooter />
      <MobileActionBar />

      <Suspense fallback={null}>
        <PreselectFromUrl />
      </Suspense>
    </>
  );
}
