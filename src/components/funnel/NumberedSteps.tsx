import type { ReactNode } from "react";

/**
 * Three (or more) numbered steps on the hairline grid the service cards use:
 * big red Anton numeral, title, one line of detail.
 */
export function NumberedSteps({
  steps,
}: {
  steps: readonly { title: string; body: ReactNode }[];
}) {
  return (
    <ol className="border-line-10 tablet:grid-cols-1 m-0 grid list-none grid-cols-3 border-t border-l p-0">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal=""
          style={{ transitionDelay: `${i * 70}ms` }}
          className="border-line-10 bg-surface-card flex flex-col gap-3 border-r border-b p-[clamp(20px,2.6vw,30px)]"
        >
          <span
            aria-hidden="true"
            className="font-display text-red text-[clamp(44px,5vw,64px)] leading-[.85]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display m-0 mt-1 text-[clamp(20px,2vw,24px)] leading-none uppercase">
            {step.title}
          </h3>
          <p className="text-bone-58 m-0 text-[14px] leading-[1.55] text-pretty">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
