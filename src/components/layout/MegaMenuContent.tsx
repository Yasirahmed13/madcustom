"use client";

import Image from "next/image";
import { SERVICES } from "@/data/services";
import { CONSULTATION_URL, SERVICES_URL, serviceQuoteHref } from "@/data/links";
import { SITE, TEL_HREF } from "@/data/site";
import { Eyebrow } from "@/components/ui/SectionHeader";

/**
 * The contents of the services menu, in both of the shapes it is shown in: the
 * two-column desktop panel and the stacked sheet the mobile nav strip opens.
 *
 * Each service opens the services page with that service already added to the
 * quote, so the links are applied here rather than carried on the data.
 */

/** Follows a link and closes the menu behind it. */
type NavigateProps = { onNavigate: () => void };

export function MegaMenuContent({
  stacked = false,
  onNavigate,
}: NavigateProps & { stacked?: boolean }) {
  return (
    <div className="relative">
      {/* A red wash off the top-left corner, the same one the hero carries. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(74% 130% at 10% 0%, rgba(224,27,36,.09), rgba(224,27,36,0) 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--color-red), rgba(224,27,36,.18) 44%, rgba(224,27,36,0) 74%)",
        }}
      />

      <div
        className={
          stacked
            ? "relative flex flex-col gap-7 px-[22px] pt-6 pb-8"
            : "laptop:pt-7 laptop:pb-8 relative mx-auto grid max-w-[1324px] grid-cols-[minmax(0,.92fr)_minmax(0,1.12fr)] px-[22px] pt-8 pb-10"
        }
      >
        {/*
          On the sheet the order is reversed against the panel: services first,
          because that is what the tap was for, with the consultation pitch last.
        */}
        <ServicesColumn
          stacked={stacked}
          onNavigate={onNavigate}
          className={
            stacked ? "order-1" : "border-line-8 laptop:pl-6 min-w-0 border-l pl-9"
          }
        />
        <ConsultationColumn
          stacked={stacked}
          onNavigate={onNavigate}
          className={
            stacked
              ? "border-line-9 order-2 border-t pt-7"
              : "laptop:pr-6 order-first min-w-0 pr-9"
          }
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ConsultationColumn({
  stacked,
  className,
  onNavigate,
}: NavigateProps & { stacked: boolean; className: string }) {
  return (
    <div className={className}>
      <Eyebrow>01 / CONSULTATION</Eyebrow>
      <h2 className="font-display mt-3 mb-0 text-[26px] leading-[1.02] uppercase">
        1:1 with MAD Custom
      </h2>
      <p className="text-bone-58 mt-2.5 mb-0 max-w-[36ch] text-[13px] leading-[1.55] text-pretty">
        Technical evaluation, design direction and a tailored plan — precise, cohesive,
        unmistakably yours.
      </p>

      {/* The sheet stays short enough to scroll in one flick, so no image. */}
      {stacked ? null : (
        <div className="bg-surface-media relative mt-[18px] aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/work/thumb/wheels-bmw-x4m-detail.jpg"
            alt=""
            fill
            sizes="560px"
            aria-hidden="true"
            className="object-cover opacity-[.82] saturate-[.9]"
            style={{ objectPosition: "center 70%" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg,rgba(12,12,13,.82),rgba(12,12,13,0) 58%)",
            }}
          />
          <span
            aria-hidden="true"
            className="text-bone-62 absolute bottom-2.5 left-3 font-mono text-[10.5px] tracking-[.14em] uppercase"
          >
            Orlando, FL · Barceloneta, PR
          </span>
        </div>
      )}

      <a
        href={CONSULTATION_URL}
        onClick={onNavigate}
        className="bg-red text-ink hover:bg-red-bright mt-4 block px-[18px] py-[13px] text-center text-[13.5px] font-bold tracking-[.02em] transition-colors duration-200"
      >
        Book Your Consultation
      </a>
      <a
        href={TEL_HREF}
        onClick={onNavigate}
        className="text-bone-45 hover:text-bone mt-2.5 block text-center font-mono text-[12px] transition-colors duration-200"
      >
        or call {SITE.primaryPhoneDisplay}
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ServicesColumn({
  stacked,
  className,
  onNavigate,
}: NavigateProps & { stacked: boolean; className: string }) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>02 / SERVICES</Eyebrow>
        <span className="text-bone-32 font-mono text-[11px] tracking-[.14em]">
          {SERVICES.length} total
        </span>
      </div>

      <ul className="mt-2.5 flex list-none flex-col p-0">
        {SERVICES.map((service) => (
          <li key={service.slug} className="border-line-8 border-b last:border-b-0">
            <a
              href={serviceQuoteHref(service)}
              onClick={onNavigate}
              className="group hover:bg-white-3 -mx-2 grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-2.5 px-2 py-[11px] transition-colors duration-200"
            >
              <span className="text-bone-32 group-hover:text-red font-mono text-[11px] transition-colors duration-200">
                {service.num}
              </span>
              <span
                className={`text-bone-72 group-hover:text-bone transition-colors duration-200 ${
                  stacked ? "text-[15px]" : "text-[14px]"
                }`}
              >
                {service.title}
              </span>
              <span
                aria-hidden="true"
                className="text-red -translate-x-1 font-mono text-[12px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={SERVICES_URL}
        onClick={onNavigate}
        className="border-line-14 text-bone-72 hover:border-red hover:text-bone mt-4 block border px-4 py-[11px] text-center text-[12.5px] font-semibold tracking-[.02em] transition-colors duration-200"
      >
        Get a quote on any combination →
      </a>
    </div>
  );
}
