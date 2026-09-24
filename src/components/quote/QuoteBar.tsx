"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { SERVICES } from "@/data/services";
import {
  clearQuote,
  quoteCount,
  quoteHref,
  setProductQty,
  toggleService,
  useQuote,
} from "@/lib/quote-store";
import { cn } from "@/lib/cn";

const TITLE_BY_QUOTE_NAME = Object.fromEntries(
  SERVICES.map((s) => [s.quoteName, s.title]),
);

/**
 * The running quote, pinned to the bottom of /services once anything is in it:
 * a count, a removable chip per item, "Clear all", and the button that carries
 * the whole request to /quote.
 *
 * It stacks directly above the site's fixed action bar (Call / WhatsApp / Book),
 * measured rather than hard-coded because that bar's height changes with the
 * breakpoint. A spacer of the same height keeps the footer clear of it.
 */
export function QuoteBar() {
  const quote = useQuote();
  const count = quoteCount(quote);
  const bar = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [height, setHeight] = useState(0);

  // Sit on top of the action bar, whatever its height at this width.
  useEffect(() => {
    const actions = document.querySelector<HTMLElement>(
      'nav[aria-label="Quick actions"]',
    );
    if (!actions) return;
    const ro = new ResizeObserver(() => setOffset(actions.offsetHeight));
    ro.observe(actions);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const open = count > 0;

  return (
    <>
      <div aria-hidden="true" style={{ height: open ? height : 0 }} />

      <div
        ref={bar}
        role="region"
        aria-label="Your quote request"
        style={{ bottom: offset }}
        className={cn(
          "border-red bg-ink-95 fixed inset-x-0 z-[65] border-t backdrop-blur-[14px] transition-[transform,opacity,visibility] duration-300 ease-(--ease-mad)",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-full opacity-0",
        )}
      >
        <div className="phone:px-4 tablet:flex-col tablet:items-stretch tablet:gap-3 mx-auto flex max-w-[1324px] items-center gap-6 px-[22px] py-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <p aria-live="polite" className="m-0 flex flex-none items-baseline gap-2">
              <span className="font-display text-red-bright text-[28px] leading-none">
                {String(count).padStart(2, "0")}
              </span>
              <span className="text-bone-60 font-mono text-[11px] tracking-[.14em] uppercase">
                {count === 1 ? "item" : "items"} in your quote
              </span>
            </p>

            <ul className="m-0 flex min-w-0 flex-1 [scrollbar-width:none] list-none gap-2 overflow-x-auto p-0">
              {quote.services.map((name) => (
                <li key={name} className="flex-none">
                  <Chip
                    label={TITLE_BY_QUOTE_NAME[name] ?? name}
                    onRemove={() => toggleService(name)}
                  />
                </li>
              ))}
              {PRODUCTS.filter((p) => quote.cart[p.id]).map((p) => (
                <li key={p.id} className="flex-none">
                  <Chip
                    label={`${quote.cart[p.id]}× ${p.name}`}
                    onRemove={() => setProductQty(p.id, 0)}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="tablet:justify-between flex flex-none items-center gap-4">
            <button
              type="button"
              onClick={clearQuote}
              className="text-bone-50 hover:text-bone cursor-pointer bg-transparent font-mono text-[11px] tracking-[.12em] uppercase underline-offset-4 transition-colors duration-200 hover:underline"
            >
              Clear all
            </button>
            <Link
              href={quoteHref(quote)}
              className="bg-red text-ink hover:bg-red-bright hover:text-ink phone:flex-1 phone:justify-center inline-flex items-center gap-2.5 px-6 py-[14px] text-[14.5px] font-bold tracking-[.02em] whitespace-nowrap transition-colors duration-200"
            >
              Request my quote
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      className="border-line-16 text-bone-80 hover:border-red hover:text-bone group flex max-w-[260px] cursor-pointer items-center gap-2 border bg-transparent py-[7px] pr-2.5 pl-3 text-[12.5px] font-semibold transition-colors duration-200"
    >
      <span className="truncate">{label}</span>
      <span
        aria-hidden="true"
        className="text-bone-40 group-hover:text-red-bright font-mono"
      >
        ✕
      </span>
    </button>
  );
}
