import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero, StatStrip } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { BUTTON_GHOST, BUTTON_PRIMARY } from "@/components/ui/buttons";
import { LocationCard } from "@/components/contact/LocationCard";
import { GhlCalendar } from "@/components/ghl/GhlEmbed";
import { LOCATIONS, SITE } from "@/data/site";
import { SERVICES_URL, TERMS_URL } from "@/data/links";

/**
 * /book and /consultation: a photo hero, the GHL calendar in the site's frame
 * with what-to-expect beside it, then the two shops.
 */
export function CalendarPage({
  crumb,
  image,
  imagePosition,
  eyebrow,
  title,
  lede,
  cta,
  stats,
  calendarId,
  calendarTitle,
  sectionTitle,
  sectionLede,
  expect,
}: {
  crumb: string;
  image: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  lede: string;
  cta: string;
  stats: readonly { value: string; label: string }[];
  calendarId: string;
  calendarTitle: string;
  sectionTitle: string;
  sectionLede: string;
  expect: readonly string[];
}) {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          image={image}
          imagePosition={imagePosition}
          crumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          actions={
            <>
              <a href="#calendar" className={BUTTON_PRIMARY}>
                {cta} <span className="font-mono">↓</span>
              </a>
              <a href={SERVICES_URL} className={BUTTON_GHOST}>
                Get a quote instead
              </a>
            </>
          }
        >
          <StatStrip stats={stats} />
        </PageHero>

        {/* --- 01 / Pick a time --- */}
        <section id="calendar" className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="01 / PICK A TIME"
              title={sectionTitle}
              lede={sectionLede}
              ledeWidth="38ch"
              className="mb-[34px]"
            />

            <div className="tablet:grid-cols-1 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-[22px]">
              <div className="bg-surface-card border-line-10 phone:p-0 phone:border-0 border p-[clamp(10px,1.4vw,18px)]">
                <Suspense fallback={<div style={{ minHeight: 780 }} />}>
                  <GhlCalendar calendarId={calendarId} title={calendarTitle} />
                </Suspense>
              </div>

              <aside className="flex flex-col gap-[22px]">
                <Panel eyebrow="WHAT TO EXPECT">
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {expect.map((line) => (
                      <li
                        key={line}
                        className="text-bone-80 grid grid-cols-[18px_1fr] gap-2 text-[14.5px] leading-[1.5]"
                      >
                        <span aria-hidden="true" className="text-red font-mono">
                          ✓
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel eyebrow="BOOKING HOURS">
                  <p className="font-display m-0 text-[26px] leading-none uppercase">
                    {SITE.hours.daysLabel}
                  </p>
                  <p className="text-bone-60 mt-2 mb-0 font-mono text-[13px]">
                    {SITE.hours.timeLabel} ET
                  </p>
                </Panel>

                <Panel eyebrow="RATHER TALK IT THROUGH?">
                  <div className="flex flex-col gap-2.5">
                    {LOCATIONS.map((location) => (
                      <a
                        key={location.id}
                        href={`tel:${location.phoneE164}`}
                        className="border-line-8 hover:text-bone text-bone-80 flex items-baseline justify-between gap-3 border-b pb-2.5 last:border-b-0 last:pb-0"
                      >
                        <span className="text-bone-45 font-mono text-[10.5px] tracking-[.14em] uppercase">
                          {location.label}
                        </span>
                        <span className="font-mono text-[13px]">
                          {location.phoneDisplay}
                        </span>
                      </a>
                    ))}
                  </div>
                </Panel>

                <p className="text-bone-45 m-0 text-[12.5px] leading-[1.6]">
                  Consultations are free and carry no obligation. By booking you agree to
                  our <a href={TERMS_URL}>Terms &amp; Conditions</a>.
                </p>
              </aside>
            </div>
          </Container>
        </section>

        {/* --- 02 / Where --- */}
        <section className="border-line-9 border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="02 / WHERE"
              title="Two shops, one standard"
              lede="Pick either shop when you book. Same crew standard, same process."
              ledeWidth="36ch"
              className="mb-[34px]"
            />
            <div className="tablet:grid-cols-[minmax(0,1fr)] grid grid-cols-2 gap-[22px]">
              {LOCATIONS.map((location, index) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  index={index}
                  bookHref="#calendar"
                />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}

export function Panel({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div className="bg-surface-panel border-line-10 border p-[clamp(18px,2.2vw,26px)]">
      <Eyebrow className="mb-4 text-[10.5px]">{eyebrow}</Eyebrow>
      {children}
    </div>
  );
}
