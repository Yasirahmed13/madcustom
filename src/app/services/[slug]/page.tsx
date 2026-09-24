import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/data/services";
import { GROUPS, ITEMS, countLabel } from "@/data/work";
import { faqsForService } from "@/data/faq";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceGallery } from "@/components/work/ServiceGallery";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { serviceQuoteHref } from "@/data/links";
import { whatsappServiceHref } from "@/lib/whatsapp";

/**
 * One statically generated page per service.
 *
 * NOTE: these pages are an addition. The design linked "Details ↗" out to
 * madcustomcars.com; the brief asks for real internal pages, at the same slugs
 * so existing links still resolve. Everything on the page is real content —
 * the service's own description, its own gallery, its related questions. No
 * marketing copy has been invented to fill space; send body copy per service
 * and it drops into the intro below the headline.
 */

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: `${service.title} — Orlando & Puerto Rico`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const ids = GROUPS[service.galleryKey] ?? [];
  const count = countLabel(ids);
  const coverItem = ids[0] !== undefined ? ITEMS[ids[0]] : undefined;
  const related = faqsForService(service.galleryKey);

  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        {/* --- Hero --- */}
        <section className="border-line-9 relative flex min-h-[62vh] items-end border-b">
          <div className="bg-ink absolute inset-0 overflow-hidden">
            <Image
              src={`/work/full/${service.coverFile}.jpg`}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={72}
              aria-hidden="true"
              className="object-cover brightness-[.55] saturate-[.8]"
              style={{ objectPosition: service.coverPosition }}
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
              <Link href="/#services" className="text-bone-45 hover:text-bone">
                Services
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-red-bright">{service.shortLabel}</span>
            </nav>

            <div className="text-red font-mono text-[11.5px] tracking-[.16em]">
              SERVICE {service.num} / {service.shortLabel.toUpperCase()}
            </div>

            <h1 className="font-display mt-3 mb-0 max-w-[16ch] text-[clamp(38px,6vw,86px)] leading-[.9] tracking-[-.01em] uppercase">
              {service.title}
            </h1>

            <p className="text-bone-74 mt-[22px] mb-0 max-w-[52ch] text-[clamp(15px,1.5vw,19px)] leading-[1.55] text-pretty">
              {service.description}
            </p>

            <div className="phone:flex-col phone:items-stretch mt-[30px] flex flex-wrap gap-3">
              <a
                href={serviceQuoteHref(service)}
                className="bg-red text-ink hover:bg-red-bright phone:justify-center flex items-center gap-2.5 px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200"
              >
                Get a {service.shortLabel} Quote <span className="font-mono">→</span>
              </a>
              <a
                href={whatsappServiceHref(service.title)}
                target="_blank"
                rel="noopener"
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
              >
                WhatsApp the shop
              </a>
            </div>

            <div className="border-line-10 text-bone-50 mt-[34px] flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-[22px] font-mono text-[11.5px] tracking-[.1em] uppercase">
              <span>{count} in the gallery</span>
              {coverItem ? <span>Latest: {coverItem.car}</span> : null}
              <span>Orlando, FL · Barceloneta, PR</span>
            </div>
          </Container>
        </section>

        {/* --- The work --- */}
        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
            <SectionHeader
              eyebrow="01 / THE WORK"
              title={`${service.shortLabel}, up close`}
              lede={`${count} from the shop floor. Tap any shot to see it full size.`}
              ledeWidth="36ch"
              className="mb-[34px]"
            />
            <ServiceGallery ids={ids} slug={service.slug} />
          </Container>
        </section>

        {/* --- Related questions --- */}
        {related.length > 0 ? (
          <Faq
            entries={related}
            eyebrow="02 / QUESTIONS"
            heading={`Questions about ${service.title.toLowerCase()}`}
            lede="The ones that come up most before a booking. If yours is not here, message the shop and a real person will answer."
            servicesHref="/#services"
          />
        ) : null}

        <CtaBand />
      </main>

      <SiteFooter />
      <MobileActionBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema(service),
            breadcrumbSchema(service),
            ...(related.length > 0 ? [faqSchema(related)] : []),
          ]),
        }}
      />
    </>
  );
}
