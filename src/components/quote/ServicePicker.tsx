"use client";

import Image from "next/image";
import { SERVICES } from "@/data/services";
import { SERVICE_QUOTES } from "@/data/quote";
import { toggleService, useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";

/**
 * The nine services as selectable cards, drawn on the same hairline grid as the
 * homepage's "Nine ways in". Each card's button adds or removes that service
 * from the quote; a picked card gets a red frame and a filled button.
 */
export function ServicePicker() {
  const { services: picked } = useQuote();

  return (
    <div className="border-line-10 tablet:grid-cols-2 phone:grid-cols-1 grid grid-cols-3 border-t border-l">
      {SERVICES.map((service) => {
        const quote = SERVICE_QUOTES[service.slug];
        const on = picked.includes(service.quoteName);

        return (
          <article
            key={service.slug}
            className={cn(
              "border-line-10 text-bone relative flex min-w-0 flex-col border-r border-b transition-colors duration-200",
              on ? "bg-surface-raised" : "bg-surface-card hover:bg-[#171512]",
            )}
          >
            {/* The red frame sits inside the hairline so the grid never shifts. */}
            <span
              aria-hidden="true"
              className={cn(
                "border-red pointer-events-none absolute inset-0 z-[2] border-2 transition-opacity duration-200",
                on ? "opacity-100" : "opacity-0",
              )}
            />

            <div className="bg-surface-media relative aspect-[16/10] overflow-hidden">
              <Image
                src={`/work/thumb/${service.coverFile}.jpg`}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-700 ease-(--ease-mad)",
                  on ? "scale-[1.04] opacity-95" : "opacity-[.82] saturate-[.9]",
                )}
                style={{ objectPosition: service.coverPosition }}
              />
              <span
                aria-hidden="true"
                className="bg-ink-78 text-red-bright absolute top-3 left-3 z-[1] px-2 py-[5px] font-mono text-[11px] tracking-[.1em]"
              >
                {service.num}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-3 right-3 z-[1] grid size-[30px] place-items-center font-mono text-[14px] font-semibold transition-colors duration-200",
                  on ? "bg-red text-ink" : "bg-ink-78 text-bone-50",
                )}
              >
                {on ? "✓" : "+"}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-[9px] p-5 pb-6">
              <h3 className="font-display tablet:text-[17px] m-0 text-[19px] tracking-[.01em] uppercase">
                {service.title}
              </h3>
              <p
                className={cn(
                  "m-0 font-mono text-[12px] tracking-[.06em] uppercase",
                  quote.amount ? "text-red-bright" : "text-bone-50",
                )}
              >
                {quote.priceLabel}
              </p>
              <p className="text-bone-58 m-0 text-[13.5px] leading-[1.5] text-pretty">
                {quote.blurb}
              </p>

              <div className="mt-auto pt-3">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleService(service.quoteName)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 border px-4 py-[13px] text-left text-[13.5px] font-bold tracking-[.02em] transition-colors duration-200",
                    on
                      ? "border-red bg-red text-ink hover:bg-red-bright hover:border-red-bright"
                      : "border-line-20 text-bone hover:border-red hover:bg-red-10 bg-transparent",
                  )}
                >
                  <span>
                    {on ? "Added to quote" : "Add to quote"}
                    <span className="sr-only"> — {service.title}</span>
                  </span>
                  <span aria-hidden="true" className="font-mono">
                    {on ? "✓" : "+"}
                  </span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
