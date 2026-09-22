"use client";

import { PLACES, STEP_COPY, TIME_WINDOWS, type Day } from "@/data/booking";
import { chipClass } from "@/components/ui/Chip";
import { ChipGroup, FieldError } from "./Field";
import { StepHeading } from "./StepHeading";

export type SlotValues = { day: string; time: string; place: string };

/** Step 3 — the day strip, the time window and where the consultation happens. */
export function StepSlot({
  days,
  values,
  errors,
  onPick,
}: {
  days: readonly Day[];
  values: SlotValues;
  errors: Partial<Record<keyof SlotValues, string>>;
  onPick: (field: keyof SlotValues, value: string) => void;
}) {
  const copy = STEP_COPY[2]!;

  return (
    <div>
      <StepHeading heading={copy.heading} sub={copy.sub} />

      <div
        role="group"
        aria-label="Day"
        aria-describedby={errors.day ? "booking-day-error" : undefined}
        className="phone:grid-cols-3 grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2.5"
      >
        {days.map((day) => {
          const active = values.day === day.key;
          return (
            <button
              key={day.key}
              type="button"
              onClick={() => onPick("day", day.key)}
              aria-pressed={active}
              aria-label={`${day.dow} ${day.num} ${day.mon}`}
              className={chipClass(active, "px-2 py-[15px] text-center")}
            >
              <span
                aria-hidden="true"
                className="block text-[11px] tracking-[.1em] uppercase opacity-60"
              >
                {day.dow}
              </span>
              <span aria-hidden="true" className="font-display mt-1 block text-[25px]">
                {day.num}
              </span>
              <span
                aria-hidden="true"
                className="mt-[3px] block text-[10.5px] tracking-[.08em] uppercase opacity-55"
              >
                {day.mon}
              </span>
            </button>
          );
        })}
      </div>
      <FieldError id="booking-day-error" message={errors.day} />

      <div className="mt-6">
        <ChipGroup label="Time window" errorId="booking-time" error={errors.time}>
          {TIME_WINDOWS.map((window) => {
            const active = values.time === window;
            return (
              <button
                key={window}
                type="button"
                onClick={() => onPick("time", window)}
                aria-pressed={active}
                className={chipClass(
                  active,
                  "px-[15px] py-[11px] text-[13.5px] font-semibold",
                )}
              >
                {window}
              </button>
            );
          })}
        </ChipGroup>
      </div>

      <div className="mt-6">
        <ChipGroup label="Where" errorId="booking-place">
          {PLACES.map((place) => {
            const active = values.place === place;
            return (
              <button
                key={place}
                type="button"
                onClick={() => onPick("place", active ? "" : place)}
                aria-pressed={active}
                className={chipClass(
                  active,
                  "px-[15px] py-[11px] text-[13.5px] font-semibold",
                )}
              >
                {place}
              </button>
            );
          })}
        </ChipGroup>
      </div>
    </div>
  );
}
