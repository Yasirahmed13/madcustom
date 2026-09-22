import { STEP_TITLES, TOTAL_STEPS } from "@/data/booking";
import { cn } from "@/lib/cn";

/** The four bars, the "STEP 2 — VEHICLE" label and the "02 / 04" counter. */
export function StepProgress({ step, done }: { step: number; done: boolean }) {
  return (
    <>
      <div className="mb-2 flex gap-2" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] flex-1 transition-colors duration-300",
              done || i + 1 <= step ? "bg-red" : "bg-line-12",
            )}
          />
        ))}
      </div>
      <div
        className="text-bone-45 mb-[30px] flex justify-between font-mono text-[11px] tracking-[.12em]"
        aria-live="polite"
      >
        <span>{`STEP ${step} — ${STEP_TITLES[step - 1] ?? ""}`}</span>
        <span>{`0${step} / 0${TOTAL_STEPS}`}</span>
      </div>
    </>
  );
}
