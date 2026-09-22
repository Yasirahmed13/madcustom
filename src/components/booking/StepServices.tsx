"use client";

import { STEP_COPY } from "@/data/booking";
import { SERVICES } from "@/data/services";
import { chipClass } from "@/components/ui/Chip";
import { FieldError } from "./Field";
import { StepHeading } from "./StepHeading";

/** Step 1 — multi-select service cards. Nothing is locked in. */
export function StepServices({
  selected,
  onToggle,
  error,
}: {
  selected: readonly string[];
  onToggle: (title: string) => void;
  error?: string;
}) {
  const copy = STEP_COPY[0]!;

  return (
    <div>
      <StepHeading heading={copy.heading} sub={copy.sub} />
      <div
        role="group"
        aria-label="Services"
        aria-describedby={error ? "services-error" : undefined}
        className="phone:grid phone:grid-cols-2 flex flex-wrap gap-2.5"
      >
        {SERVICES.map((service) => {
          const active = selected.includes(service.title);
          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => onToggle(service.title)}
              aria-pressed={active}
              className={chipClass(
                active,
                "phone:min-w-0 phone:items-start phone:p-3 phone:text-[13px] flex items-center gap-[9px] px-4 py-[13px] text-left text-[14px] font-semibold",
              )}
            >
              <span className="font-mono text-[11px] opacity-60">{service.num}</span>
              {service.title}
            </button>
          );
        })}
      </div>
      <FieldError id="services-error" message={error} />
    </div>
  );
}
