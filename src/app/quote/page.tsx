import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { FunnelSteps } from "@/components/quote/FunnelSteps";
import { QuoteSummary } from "@/components/quote/QuoteSummary";
import { GhlForm } from "@/components/ghl/GhlEmbed";
import { QUOTE_FORM_ID, QUOTE_NEXT, QUOTE_PROMISES } from "@/data/quote";
import { SERVICES_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/**
 * Step 2 of the quote funnel. The GHL quote form, with the request from
 * /services beside it. GHL redirects to /quote/thank-you on submit.
 */

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Request Your Quote",
    description:
      "Tell us about you and your vehicle and get a custom quote from MAD Custom.",
    path: "/quote",
  }),
  // Mid-funnel: only meaningful with a selection in the URL.
  robots: { index: false, follow: true },
};

export default function QuotePage() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          compact
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: SERVICES_URL },
            { label: "Your quote" },
          ]}
          eyebrow="Step 02 / 03 — Your details"
          title="Almost done"
          lede="Tell us about you and your vehicle. Our team will review your request and send a custom quote."
        >
          <FunnelSteps current={2} />
        </PageHero>

        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-10 phone:pb-16 tablet:grid-cols-1 grid grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] items-start gap-[22px] pt-[56px] pb-[90px]">
            {/* Summary first everywhere; on one column the form follows it and
                "What happens next" drops to the end. */}
            <div className="tablet:order-1">
              <Suspense fallback={null}>
                <QuoteSummary />
              </Suspense>
            </div>

            <section
              aria-labelledby="quote-form"
              className="bg-surface-card border-line-10 tablet:order-2 tablet:row-span-1 row-span-2 border p-[clamp(20px,2.6vw,30px)]"
            >
              <Eyebrow>STEP 02 / YOUR DETAILS</Eyebrow>
              <h2
                id="quote-form"
                className="font-display mt-2.5 mb-0 text-[clamp(26px,3vw,40px)] leading-none uppercase"
              >
                Your details
              </h2>
              <p className="text-bone-60 mt-2.5 mb-6 text-[14.5px] leading-[1.55]">
                Takes about a minute. Your selections are already attached.
              </p>

              <Suspense fallback={<div style={{ minHeight: 900 }} />}>
                <GhlForm formId={QUOTE_FORM_ID} name="Quote" />
              </Suspense>

              <p className="text-bone-45 border-line-8 mt-5 mb-0 flex items-center justify-center gap-2 border-t pt-4 font-mono text-[11px] tracking-[.1em] uppercase">
                <span aria-hidden="true" className="text-red">
                  ●
                </span>
                Your information is private and never shared
              </p>
            </section>

            <div className="tablet:order-3 flex flex-col gap-[22px]">
              <section
                aria-labelledby="quote-next"
                className="border-line-10 border p-[clamp(20px,2.6vw,30px)]"
              >
                <h2
                  id="quote-next"
                  className="font-display m-0 text-[clamp(22px,2.2vw,28px)] leading-none uppercase"
                >
                  What happens next
                </h2>
                <ol className="m-0 mt-5 flex list-none flex-col gap-5 p-0">
                  {QUOTE_NEXT.map((step, i) => (
                    <li key={step.title} className="grid grid-cols-[34px_1fr] gap-3">
                      <span className="border-red text-red-bright grid size-[30px] place-items-center border font-mono text-[11px]">
                        0{i + 1}
                      </span>
                      <span>
                        <span className="text-bone block text-[14.5px] font-semibold">
                          {step.title}
                        </span>
                        <span className="text-bone-58 mt-1 block text-[13.5px] leading-[1.5]">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <ul className="border-line-10 m-0 grid list-none grid-cols-2 border-t border-l p-0">
                {QUOTE_PROMISES.map((promise) => (
                  <li
                    key={promise}
                    className="border-line-10 text-bone-72 flex items-center gap-2.5 border-r border-b px-4 py-[14px] font-mono text-[11px] tracking-[.1em] uppercase"
                  >
                    <span aria-hidden="true" className="text-red">
                      ✓
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
