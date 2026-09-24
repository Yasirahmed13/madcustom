import type { ReactNode } from "react";
import { LOCATIONS, SITE } from "@/data/site";
import { Eyebrow } from "@/components/ui/SectionHeader";

/**
 * Both shop lines, the email and the hours, in one panel — for the thank-you
 * pages, where the only thing left to do is get in touch.
 */
export function ShopContacts({
  eyebrow = "QUESTIONS BEFORE THEN?",
  children,
}: {
  eyebrow?: string;
  /** A line of copy above the numbers. */
  children?: ReactNode;
}) {
  return (
    <div className="bg-surface-panel border-line-10 border p-[clamp(20px,2.6vw,30px)]">
      <Eyebrow className="text-[10.5px]">{eyebrow}</Eyebrow>
      {children ? (
        <p className="text-bone-72 mt-3 mb-0 text-[14.5px] leading-[1.6]">{children}</p>
      ) : null}

      <dl className="m-0 mt-5">
        {LOCATIONS.map((location) => (
          <Line key={location.id} label={`Call ${location.label}`}>
            <a
              href={`tel:${location.phoneE164}`}
              className="text-bone hover:text-red-soft font-mono text-[14px]"
            >
              {location.phoneDisplay}
            </a>
          </Line>
        ))}
        <Line label="Email">
          <a
            href={`mailto:${SITE.email}`}
            className="text-bone hover:text-red-soft text-[14px] break-all"
          >
            {SITE.email}
          </a>
        </Line>
        <Line label="Hours">
          <span className="text-bone-74 text-[14px]">
            {SITE.hours.daysLabel} {SITE.hours.timeLabel} ET
          </span>
        </Line>
      </dl>
    </div>
  );
}

function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-line-8 phone:grid-cols-1 phone:gap-1 grid grid-cols-[120px_minmax(0,1fr)] items-baseline gap-4 border-t py-3.5">
      <dt className="text-bone-40 font-mono text-[10.5px] tracking-[.14em] uppercase">
        {label}
      </dt>
      <dd className="m-0">{children}</dd>
    </div>
  );
}

/** A red-ticked checklist, for "bring with you" and the like. */
export function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col p-0">
      {items.map((item) => (
        <li
          key={item}
          className="border-line-8 text-bone-80 grid grid-cols-[26px_1fr] gap-2 border-t py-4 text-[15px] leading-[1.55] first:border-t-0 first:pt-0"
        >
          <span aria-hidden="true" className="text-red font-mono">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The green "live" dot the homepage uses, ahead of a confirmation eyebrow. */
export function ConfirmedEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-green size-[7px] animate-[madpulse_1.8s_ease-in-out_infinite] rounded-full"
      />
      <span className="text-green">{children}</span>
    </span>
  );
}
