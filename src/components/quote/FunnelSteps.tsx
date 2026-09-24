import { cn } from "@/lib/cn";

const STEPS = ["Choose", "Your details", "Get your quote"] as const;

/**
 * The three-step progress line of the quote funnel, in the mono-and-hairline
 * language of the booking wizard: done steps ticked, the current one in red.
 */
export function FunnelSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol
      aria-label="Quote progress"
      className="phone:gap-2 m-0 mt-[30px] flex list-none flex-wrap items-center gap-3 p-0"
    >
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const here = n === current;
        return (
          <li key={label} className="flex items-center gap-3">
            {i > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "phone:w-4 h-px w-10",
                  done || here ? "bg-red" : "bg-line-16",
                )}
              />
            ) : null}
            <span
              aria-current={here ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 font-mono text-[11px] tracking-[.14em] uppercase",
                here ? "text-bone" : done ? "text-bone-60" : "text-bone-40",
              )}
            >
              <span
                className={cn(
                  "grid size-[24px] place-items-center border text-[11px]",
                  done && "border-red bg-red text-ink",
                  here && "border-red text-red-bright",
                  !done && !here && "border-line-16",
                )}
              >
                {done ? "✓" : `0${n}`}
              </span>
              <span className="phone:sr-only">{label}</span>
              {done ? <span className="sr-only"> (done)</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
