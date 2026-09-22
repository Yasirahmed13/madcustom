"use client";

import { CONDITIONS, PLACEHOLDERS, STEP_COPY } from "@/data/booking";
import { chipClass } from "@/components/ui/Chip";
import { ChipGroup, TextField } from "./Field";
import { StepHeading } from "./StepHeading";

export type VehicleValues = {
  year: string;
  make: string;
  model: string;
  condition: string;
};

/** Step 2 — year, make, model and where the vehicle is at today. */
export function StepVehicle({
  values,
  errors,
  onChange,
  onCondition,
}: {
  values: VehicleValues;
  errors: Partial<Record<keyof VehicleValues, string>>;
  onChange: (field: "year" | "make" | "model", value: string) => void;
  onCondition: (value: string) => void;
}) {
  const copy = STEP_COPY[1]!;

  return (
    <div>
      <StepHeading heading={copy.heading} sub={copy.sub} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-[14px]">
        <TextField
          id="booking-year"
          name="year"
          label="Year"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          placeholder={PLACEHOLDERS.year}
          value={values.year}
          error={errors.year}
          onChange={(e) => onChange("year", e.target.value)}
        />
        <TextField
          id="booking-make"
          name="make"
          label="Make"
          autoComplete="off"
          maxLength={60}
          placeholder={PLACEHOLDERS.make}
          value={values.make}
          error={errors.make}
          onChange={(e) => onChange("make", e.target.value)}
        />
        <TextField
          id="booking-model"
          name="model"
          label="Model"
          autoComplete="off"
          maxLength={60}
          placeholder={PLACEHOLDERS.model}
          value={values.model}
          error={errors.model}
          onChange={(e) => onChange("model", e.target.value)}
        />
      </div>

      <div className="mt-[26px]">
        <ChipGroup label="Where it's at today" errorId="booking-condition">
          {CONDITIONS.map((condition) => {
            const active = values.condition === condition;
            return (
              <button
                key={condition}
                type="button"
                onClick={() => onCondition(active ? "" : condition)}
                aria-pressed={active}
                className={chipClass(
                  active,
                  "px-[15px] py-[11px] text-[13.5px] font-semibold",
                )}
              >
                {condition}
              </button>
            );
          })}
        </ChipGroup>
      </div>
    </div>
  );
}
