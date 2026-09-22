"use client";

import { PLACEHOLDERS, STEP_COPY } from "@/data/booking";
import { TextAreaField, TextField } from "./Field";
import { StepHeading } from "./StepHeading";

export type ContactValues = {
  name: string;
  tel: string;
  email: string;
  notes: string;
  /** Honeypot. */
  company: string;
};

/** Step 4 — how to reach you, plus the optional notes box. */
export function StepContact({
  values,
  errors,
  onChange,
}: {
  values: ContactValues;
  errors: Partial<Record<keyof ContactValues, string>>;
  onChange: (field: keyof ContactValues, value: string) => void;
}) {
  const copy = STEP_COPY[3]!;

  return (
    <div>
      <StepHeading heading={copy.heading} sub={copy.sub} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-[14px]">
        <TextField
          id="booking-name"
          name="name"
          label="Name"
          autoComplete="name"
          maxLength={80}
          placeholder={PLACEHOLDERS.name}
          value={values.name}
          error={errors.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <TextField
          id="booking-tel"
          name="tel"
          type="tel"
          label="Mobile"
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          placeholder={PLACEHOLDERS.tel}
          value={values.tel}
          error={errors.tel}
          onChange={(e) => onChange("tel", e.target.value)}
        />
        <TextField
          id="booking-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          maxLength={120}
          placeholder={PLACEHOLDERS.email}
          value={values.email}
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="mt-[18px]">
        <TextAreaField
          id="booking-notes"
          name="notes"
          label="Anything else (optional)"
          rows={3}
          maxLength={2000}
          placeholder={PLACEHOLDERS.notes}
          value={values.notes}
          error={errors.notes}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </div>

      {/* Honeypot. Hidden from people and from assistive technology; bots fill it. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="booking-company">Company</label>
        <input
          id="booking-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => onChange("company", e.target.value)}
        />
      </div>
    </div>
  );
}
