"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatMoney } from "@/data/products";
import { PRICE_NOTE } from "@/data/quote";
import { SERVICES_URL } from "@/data/links";
import { readQuoteRequest } from "@/lib/quote-store";
import { Eyebrow } from "@/components/ui/SectionHeader";

/**
 * "Your request" on /quote.
 *
 * Read from the URL rather than from the saved quote, because the URL is what
 * the GHL form receives — so what the customer reads here is exactly what gets
 * submitted. QuoteForm reads the same URL the same way, so the estimated
 * starting total here is the one GHL gets.
 */
export function QuoteSummary() {
  const { services, items, productTotalLabel, servicesFrom, total } =
    readQuoteRequest(useSearchParams());

  return (
    <section
      aria-labelledby="quote-summary"
      className="bg-surface-panel border-line-10 border p-[clamp(20px,2.6vw,30px)]"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="quote-summary"
          className="font-display m-0 text-[clamp(22px,2.2vw,28px)] leading-none uppercase"
        >
          Your request
        </h2>
        <Link
          href={SERVICES_URL}
          className="text-red-bright hover:text-red-soft font-mono text-[11px] tracking-[.12em] uppercase"
        >
          Edit selection ←
        </Link>
      </div>

      {services.length === 0 && items.length === 0 ? (
        <p className="text-bone-60 mt-5 mb-0 text-[14.5px] leading-[1.6]">
          No services selected yet. Tell us what you need in the form, or{" "}
          <Link href={SERVICES_URL}>go back and choose services</Link>.
        </p>
      ) : null}

      {services.length > 0 ? (
        <Block title="Services">
          {services.map((row) => (
            <Row key={row.name} label={row.label}>
              <span className={row.amount ? "text-bone-72" : "text-bone-45"}>
                {row.price}
              </span>
            </Row>
          ))}
          {servicesFrom ? (
            <Total label="Services from" value={formatMoney(servicesFrom)} />
          ) : null}
        </Block>
      ) : null}

      {items.length > 0 ? (
        <Block title="Products">
          {items.map((item) => (
            <Row key={item.label} label={item.label}>
              <span className="text-bone-72">{item.price}</span>
            </Row>
          ))}
          {productTotalLabel ? (
            <Total label="Products subtotal" value={productTotalLabel} />
          ) : null}
        </Block>
      ) : null}

      {total > 0 ? (
        <div className="border-line-10 mt-6 border-t pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-bone text-[15px] font-semibold">
              Estimated starting total
            </span>
            <span className="font-display text-red-bright text-[30px] leading-none">
              {formatMoney(total)}
            </span>
          </div>
          <p className="text-bone-45 mt-3 mb-0 text-[12.5px] leading-[1.55]">
            {PRICE_NOTE}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <Eyebrow tone="muted" className="text-[10.5px]">
        {title.toUpperCase()}
      </Eyebrow>
      <ul className="m-0 mt-2 list-none p-0">{children}</ul>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="border-line-8 flex items-baseline justify-between gap-4 border-b border-dashed py-3 text-[14px]">
      <span className="text-bone-86 font-semibold">{label}</span>
      <span className="flex-none text-right font-mono text-[12px]">{children}</span>
    </li>
  );
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4 pt-3 text-[14px]">
      <span className="text-bone-60">{label}</span>
      <span className="text-bone font-mono text-[13px] font-semibold">{value}</span>
    </li>
  );
}
