import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_ABOUT, CONTACT_HEADING, CONTACT_LEDE } from "@/data/contact";
import { LOCATIONS, SITE, TEL_HREF } from "@/data/site";
import { SERVICES } from "@/data/services";
import { APPOINTMENT_URL } from "@/data/links";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Marquee } from "@/components/work/Marquee";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocationCard } from "@/components/contact/LocationCard";
import { contactPageSchema, contactBreadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * /contact — the rebuild of madcustomcars.com/contact.
 *
 * Every fact on this page is the one the live page carries: the same two
 * addresses, the same two numbers, the same email, the same hours, the same
 * headings and the same body copy. What changed is the arrangement — the live
 * page stacks a plugin form under a text block, this one leads with the shops
 * and gives each channel somewhere obvious to be tapped.
 *
 * The form is native rather than the embedded GoHighLevel widget, so it
 * matches the rest of the site, works without third-party JavaScript and
 * posts to /api/contact. To go back to the embed, drop an <iframe> for form
 * 8mKrqlXqEJE9tQjgtnqX in place of <ContactForm />.
 */

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Orlando, FL & Barceloneta, PR",
  description:
    "Talk to MAD Custom. Two shops — Orlando, Florida and Barceloneta, Puerto Rico. Call, WhatsApp, email or send a message and a real person answers.",
  path: "/contact",
});

/** A tappable channel in the aside beside the form. */
function Channel({
  label,
  value,
  href,
  external,
  note,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  note?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="border-line-10 hover:border-red hover:bg-red-05 group text-bone block border-t py-[17px] transition-colors duration-200"
    >
      <span className="text-bone-40 font-mono text-[10.5px] tracking-[.14em] uppercase">
        {label}
      </span>
      <span className="group-hover:text-red-soft mt-1.5 flex items-center justify-between gap-3 text-[15px] font-semibold transition-colors duration-200">
        {value}
        <span aria-hidden="true" className="text-bone-32 font-mono text-[13px]">
          &rarr;
        </span>
      </span>
      {note ? (
        <span className="text-bone-45 mt-1 block text-[12.5px] leading-[1.5]">
          {note}
        </span>
      ) : null}
    </a>
  );
}

export default function ContactPage() {
  const socials = SITE.socials.map((social) => ({
    label: social.label,
    url: social.url ?? whatsappHref(),
  }));

  return (
    <>
      <SiteHeader homeHref="/" />

      <main id="top">
        {/* --- Hero --- */}
        <section className="border-line-9 relative flex min-h-[58vh] items-end border-b">
          <div className="bg-ink absolute inset-0 overflow-hidden">
            <Image
              src="/work/full/wheels-corvette-c8r-storefront.jpg"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={72}
              aria-hidden="true"
              className="object-cover brightness-[.5] saturate-[.8]"
              style={{ objectPosition: "center 58%" }}
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
              <span className="text-red-bright">Contact</span>
            </nav>

            <div className="text-red font-mono text-[11.5px] tracking-[.16em]">
              GET IN TOUCH
            </div>

            <h1 className="font-display mt-3 mb-0 max-w-[14ch] text-[clamp(38px,6vw,86px)] leading-[.9] tracking-[-.01em] uppercase">
              Contact Us
            </h1>

            <p className="text-bone-74 mt-[22px] mb-0 max-w-[62ch] text-[clamp(15px,1.5vw,18px)] leading-[1.6] text-pretty">
              {CONTACT_ABOUT}
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

            <div className="border-line-10 text-bone-50 mt-[34px] flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-[22px] font-mono text-[11.5px] tracking-[.1em] uppercase">
              <span>
                {SITE.hours.daysLabel} {SITE.hours.timeLabel}
              </span>
              <span>Orlando, FL &middot; Barceloneta, PR</span>
              <a href={`mailto:${SITE.email}`} className="text-bone-50 hover:text-bone">
                {SITE.email}
              </a>
            </div>
          </Container>
        </section>

        {/* --- The two shops --- */}
        <section className="border-line-9 bg-surface border-t">
          {/* The marquee below carries this section's bottom spacing. */}
          <Container className="phone:pt-14 phone:pb-10 pt-[78px] pb-[44px]">
            <SectionHeader
              eyebrow="01 / LOCATIONS"
              title="Two shops, one standard"
              lede="Drop in during shop hours, or call ahead and we will have the bay and the right tech ready for you."
              ledeWidth="38ch"
              className="mb-[34px]"
            />

            <div className="tablet:grid-cols-[minmax(0,1fr)] grid grid-cols-2 gap-[22px]">
              {LOCATIONS.map((location, index) => (
                <LocationCard key={location.id} location={location} index={index} />
              ))}
            </div>
          </Container>

          {/*
            Recent work, not premises photos — the gallery carries no record of
            which shop a car was built in, so nothing here is attributed to one.
            Decorative and aria-hidden, exactly as it is on the homepage.
          */}
          <div className="overflow-hidden">
            <Marquee />
          </div>
        </section>

        {/* --- Get In Touch --- */}
        <Container
          as="section"
          id="message"
          className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]"
        >
          <SectionHeader
            eyebrow="02 / GET IN TOUCH"
            title={CONTACT_HEADING}
            lede={CONTACT_LEDE}
            ledeWidth="46ch"
            className="mb-[34px]"
          />

          <div className="tablet:grid-cols-[minmax(0,1fr)] grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-start gap-[22px]">
            <ContactForm />

            <aside
              data-reveal=""
              className="bg-surface-panel border-line-10 border p-[clamp(20px,2.6vw,30px)]"
            >
              <div className="text-bone-40 font-mono text-[10.5px] tracking-[.14em] uppercase">
                Rather not type?
              </div>
              <p className="text-bone-72 mt-3 mb-[22px] text-[14.5px] leading-[1.6]">
                Every one of these reaches the same people. Pick whichever is quickest for
                you.
              </p>

              <Channel
                label="WhatsApp"
                value="Message the shop"
                href={whatsappHref()}
                external
                note="Fastest during shop hours."
              />
              {LOCATIONS.map((location) => (
                <Channel
                  key={location.id}
                  label={`Call ${location.label}`}
                  value={location.phoneDisplay}
                  href={`tel:${location.phoneE164}`}
                  note={location.city}
                />
              ))}
              <Channel
                label="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
                note="Good for photos and spec sheets."
              />
              <Channel
                label="Booking"
                value="Make Appointment"
                href={APPOINTMENT_URL}
                external
                note="Pick a consultation slot directly."
              />

              <div className="border-line-10 mt-[26px] border-t pt-[22px]">
                <div className="text-bone-40 mb-[14px] font-mono text-[10.5px] tracking-[.14em] uppercase">
                  Follow the builds
                </div>
                <div className="flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener"
                      className="border-line-14 text-bone-75 hover:border-red hover:text-bone border px-[13px] py-[9px] text-[12.5px] font-semibold transition-colors duration-200"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>

        {/* --- Our Services --- */}
        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="03 / OUR SERVICES"
              title="What we can do for you"
              lede="Nine ways in. Open one to see the work, or name it in your message and we will price it."
              ledeWidth="38ch"
              className="mb-[34px]"
            />

            <div className="tablet:grid-cols-2 phone:grid-cols-1 grid grid-cols-3 gap-px">
              {SERVICES.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  data-reveal=""
                  style={{ transitionDelay: `${(index % 6) * 70}ms` }}
                  className="bg-surface-card hover:bg-surface-raised group text-bone outline-line-9 flex items-center justify-between gap-4 p-[22px] outline transition-colors duration-200"
                >
                  <span>
                    <span className="text-bone-32 group-hover:text-red block font-mono text-[10.5px] tracking-[.14em] transition-colors duration-200">
                      {service.num}
                    </span>
                    <span className="group-hover:text-red-soft mt-2 block text-[15.5px] font-semibold transition-colors duration-200">
                      {service.title}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-bone-32 font-mono text-[13px]">
                    &#8599;
                  </span>
                </Link>
              ))}
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
          __html: JSON.stringify([contactPageSchema(), contactBreadcrumbSchema()]),
        }}
      />
    </>
  );
}
