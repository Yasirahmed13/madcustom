import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT, CARLY, ERAS, LEGACY, LINEAGE } from "@/data/timeline";
import {
  ABOUT_HERO,
  SHOP_FLOOR,
  STORY_SHOT,
  VALUES,
  VISIT,
  type ShopShot,
} from "@/data/about";
import { LOCATIONS, SITE, TEL_HREF, directionsHref } from "@/data/site";
import { APPOINTMENT_URL, CONTACT_URL } from "@/data/links";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { aboutBreadcrumbSchema, aboutPageSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * /about — the full version of the homepage's "04 / Our story".
 *
 * The homepage section stays where it is and keeps its anchor; this page is the
 * long form, and it reads the same copy from `data/timeline.ts` so the two can
 * never disagree. The family text — the accents, the curly quotes and
 * "Magueyes Auto Desing" — is reproduced exactly as the family wrote it. Do not
 * tidy the spelling.
 *
 * What is new here, and what the page was asked for, is the shop itself: the
 * hero is the showroom floor, and "03 / Inside the shop" is nine real photos of
 * the bays and the cars in them, drawn from the same /public/work library the
 * galleries use. Captions and attribution rules live in `data/about.ts`.
 */

export const metadata: Metadata = pageMetadata({
  title: "About Us — A family legacy since 1973",
  description:
    "Three generations, four names and more than fifty years of automotive customization. The Rodríguez family story, from Magueyes Tires Service in 1973 to MAD Custom in Orlando, Florida and Barceloneta, Puerto Rico.",
  path: "/about",
});

/**
 * A workshop photo in the "Inside the shop" grid.
 *
 * Visually this is the gallery tile from `work/GalleryGrid` — same border, same
 * 4:5 crop, same gradient caption, same hover zoom via `.mad-tile` — but as a
 * plain <figure>. Nothing on this page opens a lightbox, so nothing here needs
 * to be a button or a client component.
 */
function ShopTile({
  shot,
  feature = false,
  index,
}: {
  shot: ShopShot;
  /** The opening shot runs at 2x2 across the top-left of the grid. */
  feature?: boolean;
  index: number;
}) {
  return (
    <figure
      data-reveal=""
      style={{ transitionDelay: `${(index % 6) * 70}ms` }}
      className={`mad-tile border-line-8 bg-surface-media hover:border-red relative m-0 aspect-[4/5] min-w-0 overflow-hidden border transition-colors duration-200 ${
        feature ? "col-span-2 row-span-2" : ""
      }`}
    >
      <Image
        src={`/work/${feature ? "full" : "thumb"}/${shot.file}.jpg`}
        alt={shot.alt}
        fill
        loading="lazy"
        sizes={
          feature
            ? "(max-width: 600px) 100vw, (max-width: 900px) 66vw, 50vw"
            : "(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
        }
        className="block object-cover"
        style={{ objectPosition: shot.position ?? "center" }}
      />
      <figcaption
        className="absolute inset-x-0 bottom-0 flex flex-col gap-[5px] px-[14px] pt-10 pb-[13px]"
        style={{
          background: "linear-gradient(0deg,rgba(12,12,13,.92) 10%,rgba(12,12,13,0))",
        }}
      >
        <span className="text-red-bright font-mono text-[10px] tracking-[.14em] uppercase">
          {shot.eyebrow}
        </span>
        <span
          className={`text-bone leading-[1.35] font-semibold ${
            feature ? "text-[15.5px]" : "text-[13.5px]"
          }`}
        >
          {shot.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  const [featureShot, ...restShots] = SHOP_FLOOR;

  return (
    <>
      <SiteHeader homeHref="/" />

      <main id="top">
        {/* --- Hero: the showroom floor --- */}
        <section className="border-line-9 relative flex min-h-[62vh] items-end border-b">
          <div className="bg-ink absolute inset-0 overflow-hidden">
            <Image
              src={`/work/full/${ABOUT_HERO.image.file}.jpg`}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={72}
              aria-hidden="true"
              className="object-cover brightness-[.52] saturate-[.85]"
              style={{ objectPosition: ABOUT_HERO.image.position }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg,rgba(12,12,13,.94) 0%,rgba(12,12,13,.66) 42%,rgba(12,12,13,.14) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg,#0c0c0d 1%,rgba(12,12,13,.35) 26%,rgba(12,12,13,0) 55%)",
              }}
            />
          </div>

          <Container className="phone:pt-[72px] phone:pb-10 relative pt-[104px] pb-14">
            <nav
              aria-label="Breadcrumb"
              className="text-bone-45 mb-[26px] font-mono text-[11px] tracking-[.12em] uppercase"
            >
              <Link href="/" className="text-bone-45 hover:text-bone">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-red-bright">About</span>
            </nav>

            <Eyebrow>{ABOUT_HERO.eyebrow}</Eyebrow>

            <h1 className="font-display mt-3 mb-0 text-[clamp(38px,6vw,86px)] leading-[.9] tracking-[-.01em] uppercase">
              {ABOUT_HERO.headingLines[0]}
              <br />
              {ABOUT_HERO.headingLines[1]}
            </h1>

            <div className="font-display text-red-bright mt-[18px] text-[clamp(17px,1.9vw,23px)] tracking-[.03em] uppercase">
              {ABOUT.subheading}
            </div>

            <p className="text-bone-74 mt-4 mb-0 max-w-[62ch] text-[clamp(15px,1.5vw,18px)] leading-[1.6] text-pretty">
              {ABOUT_HERO.lede}
            </p>

            <div className="phone:flex-col phone:items-stretch mt-[30px] flex flex-wrap gap-3">
              <a
                href={APPOINTMENT_URL}
                target="_blank"
                rel="noopener"
                className="bg-red text-ink hover:bg-red-bright phone:justify-center flex items-center gap-2.5 px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200"
              >
                Make Appointment <span className="font-mono">&rarr;</span>
              </a>
              <Link
                href={CONTACT_URL}
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
              >
                Visit the shop
              </Link>
            </div>

            <div className="border-line-10 text-bone-50 mt-[34px] flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-[22px] font-mono text-[11.5px] tracking-[.1em] uppercase">
              {ABOUT_HERO.meta.map((entry) => (
                <span key={entry}>{entry}</span>
              ))}
            </div>
          </Container>
        </section>

        {/* --- The stat strip --- */}
        <section className="border-line-9 bg-surface border-b">
          <Container className="phone:py-8 py-[34px]">
            {/* The note sits outside the <dl>: only dt/dd/div may live inside one. */}
            <div className="flex flex-wrap items-end gap-x-[52px] gap-y-6">
              <dl className="phone:gap-x-8 phone:gap-y-6 m-0 flex flex-wrap items-end gap-x-[52px] gap-y-6">
                {SITE.stats.map((stat) => (
                  <div key={stat.label} className="phone:min-w-0 min-w-[130px]">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="m-0">
                      <span className="font-display text-bone block text-[30px] leading-none">
                        {stat.value}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-bone-50 mt-1.5 block text-[12px] tracking-[.1em] uppercase"
                      >
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-bone-45 tablet:ml-0 mt-0 mr-0 mb-1 ml-auto max-w-[34ch] text-[13.5px] leading-[1.5]">
                Counted across both shops since the doors first opened in 1973.
              </p>
            </div>
          </Container>
        </section>

        {/* --- 01 / The family --- */}
        <Container as="section" className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
          <div className="tablet:grid-cols-[minmax(0,1fr)] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-[clamp(28px,4vw,56px)]">
            <div data-reveal="">
              <Eyebrow>01 / THE FAMILY</Eyebrow>
              <h2 className="font-display mt-3 mb-[22px] text-[clamp(30px,4.2vw,52px)] leading-[.98] uppercase">
                One man&rsquo;s dream,
                <br />
                passed down
              </h2>

              <p className="text-bone-74 mt-0 mb-4 text-[clamp(15px,1.5vw,17.5px)] leading-[1.68] text-pretty">
                {ABOUT.intro.leadBefore}
                <strong className="text-bone font-semibold">
                  {ABOUT.intro.leadBrand}
                </strong>
                {ABOUT.intro.leadAfter}
                <em className="text-bone not-italic">{ABOUT.intro.leadNickname}</em>
              </p>

              <p className="text-bone-62 m-0 text-[15.5px] leading-[1.68] text-pretty">
                {ABOUT.intro.body}
              </p>

              <div className="border-line-10 mt-[30px] border-t pt-[26px]">
                <div className="text-bone-42 mb-[18px] font-mono text-[11px] tracking-[.16em] uppercase">
                  What we run on
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[22px]">
                  {VALUES.map((value) => (
                    <div key={value.num}>
                      <div className="text-red font-mono text-[10.5px] tracking-[.14em]">
                        {value.num}
                      </div>
                      <h3 className="font-display text-bone mt-2 mb-2 text-[16px] tracking-[.02em] uppercase">
                        {value.title}
                      </h3>
                      <p className="text-bone-62 m-0 text-[14px] leading-[1.6] text-pretty">
                        {value.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The working shot: a TRX on the lift, wheels off. */}
            <figure
              data-reveal=""
              className="mad-tile border-line-8 bg-surface-media relative m-0 aspect-[4/5] w-full min-w-0 overflow-hidden border"
            >
              <Image
                src={`/work/full/${STORY_SHOT.file}.jpg`}
                alt={STORY_SHOT.alt}
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 40vw"
                className="block object-cover"
                style={{ objectPosition: STORY_SHOT.position }}
              />
              <figcaption
                className="absolute inset-x-0 bottom-0 flex flex-col gap-[5px] px-[16px] pt-12 pb-[15px]"
                style={{
                  background:
                    "linear-gradient(0deg,rgba(12,12,13,.92) 10%,rgba(12,12,13,0))",
                }}
              >
                <span className="text-red-bright font-mono text-[10px] tracking-[.14em] uppercase">
                  {STORY_SHOT.eyebrow}
                </span>
                <span className="text-bone text-[14.5px] leading-[1.35] font-semibold">
                  {STORY_SHOT.caption}
                </span>
              </figcaption>
            </figure>
          </div>
        </Container>

        {/* --- 02 / The four eras --- */}
        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="02 / THE TIMELINE"
              title="Four names, five decades"
              lede="The same family, the same values, four signs over the door."
              ledeWidth="34ch"
              className="mb-[34px]"
            />

            <div className="border-line-10 bg-line-10 tablet:grid-cols-2 phone:grid-cols-1 grid grid-cols-4 gap-px border">
              {ERAS.map((era) => (
                <article
                  key={era.year}
                  data-reveal=""
                  className="bg-surface-card flex min-w-0 flex-col gap-3 px-6 pt-7 pb-[30px]"
                  style={{ borderTop: `3px solid ${era.rule}` }}
                >
                  <div className="font-display text-bone text-[40px] leading-none tracking-[.01em]">
                    {era.year}
                  </div>
                  <h3 className="font-display text-red-bright m-0 text-[17px] tracking-[.02em] uppercase">
                    {era.title}
                  </h3>
                  <p className="text-bone-64 m-0 text-[14px] leading-[1.6] text-pretty">
                    {era.body}
                  </p>
                  <div className="text-bone-38 mt-auto pt-[14px] font-mono text-[11px] tracking-[.1em]">
                    {era.tag}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* --- 03 / Inside the shop --- */}
        <Container as="section" className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
          <SectionHeader
            eyebrow="03 / INSIDE THE SHOP"
            title="Where the work happens"
            lede="The bays, the lift and the cars on it. Every shot below was taken on our own floor."
            ledeWidth="40ch"
            className="mb-[34px]"
          />

          <div className="tablet:grid-cols-3 phone:grid-cols-2 phone:gap-1.5 grid grid-cols-4 gap-2.5">
            {featureShot ? <ShopTile shot={featureShot} feature index={0} /> : null}
            {restShots.map((shot, index) => (
              <ShopTile key={shot.file} shot={shot} index={index + 1} />
            ))}
          </div>

          <div
            data-reveal=""
            className="border-line-10 text-bone-50 mt-[26px] flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-[22px] font-mono text-[11.5px] tracking-[.1em] uppercase"
          >
            <span>{SHOP_FLOOR.length} shots from the floor</span>
            <Link href="/#work" className="text-bone-50 hover:text-bone">
              See the full gallery &rarr;
            </Link>
          </div>
        </Container>

        {/* --- In memory: Carly --- */}
        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-14 pt-[78px] pb-[78px]">
            <div
              data-reveal=""
              className="border-red-34 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-8 border p-[clamp(24px,3.4vw,42px)]"
              style={{
                background:
                  "linear-gradient(120deg,rgba(224,27,36,.12),rgba(12,12,13,0) 60%)",
              }}
            >
              <div>
                <div className="text-red-bright mb-3 font-mono text-[11px] tracking-[.16em]">
                  {CARLY.eyebrow}
                </div>
                <h2 className="font-display mt-0 mb-[14px] text-[clamp(24px,2.8vw,34px)] leading-[1.05] uppercase">
                  {CARLY.heading}
                </h2>
                <p className="text-bone-72 m-0 text-[15.5px] leading-[1.68] text-pretty">
                  {CARLY.bodyBefore}
                  <strong className="text-bone font-semibold">{CARLY.bodyStrong}</strong>
                  {CARLY.bodyAfter}
                </p>
              </div>
              <div className="phone:border-t-2 phone:border-l-0 phone:pt-[22px] phone:pl-0 border-l-2 border-red-50 pl-6">
                <p className="text-bone-68 mt-0 mb-3 text-[15.5px] leading-[1.7] text-pretty">
                  {CARLY.quote}
                </p>
                <div className="font-display text-red-bright text-[15px] tracking-[.04em] uppercase">
                  {CARLY.attribution}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* --- 04 / The legacy continues --- */}
        <Container as="section" className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
          <div data-reveal="">
            <Eyebrow>04 / THE LEGACY CONTINUES</Eyebrow>
            <h2 className="font-display mt-3 mb-[26px] text-[clamp(30px,4.2vw,52px)] leading-[.98] uppercase">
              Five decades, four names
            </h2>

            <div className="text-bone-42 mb-[18px] font-mono text-[11px] tracking-[.16em]">
              {LEGACY.eyebrow}
            </div>

            <ol className="phone:flex-col phone:items-stretch phone:gap-1.5 mb-[30px] flex list-none flex-wrap items-center gap-3 p-0">
              {LINEAGE.map((entry, index) => (
                <li
                  key={entry.name}
                  className="phone:flex-col phone:items-stretch phone:gap-1.5 flex items-center gap-3"
                >
                  <span
                    className={`phone:text-center phone:whitespace-normal border px-4 py-3 text-[13.5px] font-semibold whitespace-nowrap ${
                      entry.current
                        ? "border-red bg-red text-ink"
                        : "border-line-14 bg-white-3 text-bone-70"
                    }`}
                  >
                    {entry.name}
                  </span>
                  {index < LINEAGE.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="text-red phone:block phone:rotate-90 phone:text-center font-mono text-[15px] leading-none"
                    >
                      &rarr;
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <div className="border-line-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[26px] border-t pt-[26px]">
              {LEGACY.columns.map((column) => (
                <p
                  key={column.slice(0, 24)}
                  className="text-bone-64 m-0 text-[15px] leading-[1.68] text-pretty"
                >
                  {column}
                </p>
              ))}
              <div>
                <div className="font-display text-[clamp(18px,2vw,24px)] leading-[1.25] uppercase">
                  {LEGACY.closingLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < LEGACY.closingLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-[14px]">
                  <Image
                    src="/mad-shield.png"
                    alt="MAD Custom"
                    width={49}
                    height={52}
                    loading="lazy"
                    className="block h-[52px] w-auto"
                  />
                  <div className="font-display text-red-bright text-[14px] tracking-[.06em] uppercase">
                    {LEGACY.shieldLines[0]}
                    <br />
                    {LEGACY.shieldLines[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* --- 05 / Where to find us --- */}
        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow={VISIT.eyebrow}
              title={VISIT.title}
              lede={VISIT.lede}
              ledeWidth="38ch"
              className="mb-[34px]"
            />

            <div className="border-line-10 bg-line-10 tablet:grid-cols-1 grid grid-cols-2 gap-px border">
              {LOCATIONS.map((location) => (
                <article
                  key={location.id}
                  data-reveal=""
                  className="bg-surface-card flex min-w-0 flex-col gap-3 p-[clamp(22px,2.6vw,30px)]"
                >
                  <div className="text-red font-mono text-[10.5px] tracking-[.14em] uppercase">
                    {location.legalName}
                  </div>
                  <h3 className="font-display text-bone m-0 text-[clamp(22px,2.4vw,30px)] leading-[1.05] uppercase">
                    {location.city}
                  </h3>
                  <address className="text-bone-64 m-0 text-[14.5px] leading-[1.6] not-italic">
                    {location.addressLines[0]}
                    <br />
                    {location.addressLines[1]}
                  </address>
                  <div className="text-bone-45 font-mono text-[11.5px] tracking-[.1em] uppercase">
                    {SITE.hours.daysLabel} {SITE.hours.timeLabel}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-[14px]">
                    <a
                      href={`tel:${location.phoneE164}`}
                      className="border-line-14 text-bone-75 hover:border-red hover:text-bone border px-[13px] py-[9px] text-[12.5px] font-semibold transition-colors duration-200"
                    >
                      {location.phoneDisplay}
                    </a>
                    <a
                      href={directionsHref(location)}
                      target="_blank"
                      rel="noopener"
                      className="border-line-14 text-bone-75 hover:border-red hover:text-bone border px-[13px] py-[9px] text-[12.5px] font-semibold transition-colors duration-200"
                    >
                      Directions &#8599;
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div
              data-reveal=""
              className="phone:flex-col phone:items-stretch mt-[26px] flex flex-wrap gap-3"
            >
              <Link
                href={CONTACT_URL}
                className="bg-red text-ink hover:bg-red-bright phone:justify-center flex items-center gap-2.5 px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200"
              >
                Contact Us <span className="font-mono">&rarr;</span>
              </Link>
              <a
                href={TEL_HREF}
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
              >
                Call {SITE.primaryPhoneDisplay}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>
          </Container>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
      <MobileActionBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutPageSchema(), aboutBreadcrumbSchema()]),
        }}
      />
    </>
  );
}
