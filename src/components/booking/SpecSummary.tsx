import { SUMMARY_TITLE, TRUST_POINTS } from "@/data/booking";
import { SITE, TEL_HREF } from "@/data/site";

export type SummaryRow = {
  label: string;
  value: string;
  /** Muted when nothing has been entered yet; red once a slot is chosen. */
  tone: "set" | "empty" | "accent";
};

const TONE: Record<SummaryRow["tone"], string> = {
  set: "text-bone",
  empty: "text-bone-35",
  accent: "text-red-bright",
};

/**
 * The live spec panel beside the wizard. Sticky on desktop, and static below
 * 900px where it drops under the form.
 */
export function SpecSummary({ rows }: { rows: readonly SummaryRow[] }) {
  return (
    <aside className="border-line-10 bg-surface-panel tablet:static sticky top-[92px] border p-6">
      <div className="border-line-9 text-bone-42 border-b pb-[14px] font-mono text-[11px] tracking-[.14em]">
        {SUMMARY_TITLE}
      </div>

      <dl className="flex flex-col gap-4 py-[18px]" aria-live="polite">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-bone-40 text-[10.5px] tracking-[.12em] uppercase">
              {row.label}
            </dt>
            <dd
              className={`mt-[5px] ml-0 text-[14.5px] leading-[1.45] font-medium ${TONE[row.tone]}`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="border-line-9 flex list-none flex-col gap-[11px] border-t p-0 pt-[18px]">
        {TRUST_POINTS.map((point) => (
          <li
            key={point}
            className="text-bone-60 flex items-start gap-2.5 text-[13px] leading-[1.45]"
          >
            <span aria-hidden="true" className="text-green">
              ●
            </span>
            {point}
          </li>
        ))}
      </ul>

      <a
        href={TEL_HREF}
        className="border-line-16 text-bone hover:border-red mt-5 block border p-[13px] text-center text-[13.5px] font-semibold transition-colors duration-200"
      >
        Rather talk? {SITE.primaryPhoneDisplay}
      </a>
    </aside>
  );
}
