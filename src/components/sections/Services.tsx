import Image from "next/image";
import { SERVICES } from "@/data/services";
import { serviceQuoteHref } from "@/data/links";
import { GROUPS, ITEMS, countLabel } from "@/data/work";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SeeTheWorkButton, ServiceMediaButton } from "./ServiceCardActions";

/**
 * "02 / Nine ways in" — the nine service cards.
 *
 * The grid is drawn with hairlines rather than gaps: the container carries the
 * top and left borders and each cell the right and bottom, so the rules meet
 * exactly at one pixel and there is no doubled line.
 */
export function Services() {
  return (
    <section id="services" className="border-line-9 bg-surface border-t">
      <Container className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]">
        <SectionHeader
          eyebrow="02 / CAPABILITIES"
          title="Nine ways in"
          lede="Every service is run in-house by the same crew, so a wrap, a drop and a wheel package land as one cohesive build. Tap a service to see the work."
          ledeWidth="36ch"
          className="mb-[38px]"
        />

        <div className="border-line-10 phone:grid-cols-1 grid grid-cols-3 border-t border-l">
          {SERVICES.map((service) => {
            const ids = GROUPS[service.galleryKey] ?? [];
            const count = countLabel(ids);
            const coverItem = ids[0] !== undefined ? ITEMS[ids[0]] : undefined;
            const openLabel = `See the ${service.title} work, ${count}`;

            return (
              <article
                key={service.slug}
                data-reveal
                className="border-line-10 bg-surface-card text-bone flex min-w-0 flex-col border-r border-b transition-colors duration-200 hover:bg-[#171512]"
              >
                {/*
                  The two badges sit outside the button, layered over it. Inside
                  it they would count as the button's visible text, and WCAG
                  2.5.3 would then require its accessible name to repeat
                  "01 29 photos · 1 video" verbatim. `pointer-events-none` keeps
                  the hover and the click going to the button underneath, so
                  nothing about the card changes visually.
                */}
                <div className="relative">
                  <ServiceMediaButton galleryKey={service.galleryKey} label={openLabel}>
                    <Image
                      src={`/work/thumb/${service.coverFile}.jpg`}
                      alt={`${service.title} by MAD Custom: ${coverItem?.car ?? ""}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      className="block object-cover opacity-[.82] saturate-[.9]"
                      style={{ objectPosition: service.coverPosition }}
                    />
                  </ServiceMediaButton>
                  <span
                    aria-hidden="true"
                    className="bg-ink-78 text-red-bright pointer-events-none absolute top-3 left-3 z-[1] px-2 py-[5px] font-mono text-[11px] tracking-[.1em]"
                  >
                    {service.num}
                  </span>
                  <span
                    aria-hidden="true"
                    className="bg-ink-78 text-bone-86 pointer-events-none absolute right-3 bottom-3 z-[1] px-2 py-[5px] font-mono text-[10.5px] tracking-[.1em] uppercase"
                  >
                    {count}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-[9px] p-5 pb-6">
                  <h3 className="font-display tablet:text-[17px] m-0 text-[19px] tracking-[.01em] uppercase">
                    {service.title}
                  </h3>
                  <p className="text-bone-58 m-0 text-[13.5px] leading-[1.5] text-pretty">
                    {service.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-[22px] gap-y-2.5 pt-3">
                    <SeeTheWorkButton
                      galleryKey={service.galleryKey}
                      label={`See the work — ${service.title}`}
                    />
                    <a
                      href={serviceQuoteHref(service)}
                      aria-label={`Get a quote — ${service.title}`}
                      className="text-bone-50 hover:text-bone text-[12px] tracking-[.1em] uppercase transition-colors duration-200"
                    >
                      Get a Quote →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
