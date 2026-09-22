"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HINT_FINAL,
  HINT_VALID,
  STEP_HINTS,
  TOTAL_STEPS,
  slotSummary,
} from "@/data/booking";
import { SERVICE_BY_SLUG } from "@/data/services";
import { useBookableDays, useQueryParam } from "@/lib/client-hooks";
import { onServiceSelection } from "@/lib/booking-events";
import { cn } from "@/lib/cn";
import { SpecSummary, type SummaryRow } from "./SpecSummary";
import { StepProgress } from "./StepProgress";
import { StepServices } from "./StepServices";

/*
 * Only step 1 is on screen when the page loads. Steps 2 to 4 and the
 * confirmation are fetched when the visitor reaches them, which keeps their
 * code out of the initial bundle and out of hydration. Each is a few hundred
 * bytes over an already-open connection by the time it is needed.
 */
const StepVehicle = dynamic(() => import("./StepVehicle").then((m) => m.StepVehicle));
const StepSlot = dynamic(() => import("./StepSlot").then((m) => m.StepSlot));
const StepContact = dynamic(() => import("./StepContact").then((m) => m.StepContact));
const Confirmation = dynamic(() => import("./Confirmation").then((m) => m.Confirmation));

type FormState = {
  year: string;
  make: string;
  model: string;
  condition: string;
  day: string;
  time: string;
  place: string;
  name: string;
  tel: string;
  email: string;
  notes: string;
  company: string;
};

const EMPTY: FormState = {
  year: "",
  make: "",
  model: "",
  condition: "",
  day: "",
  time: "",
  place: "",
  name: "",
  tel: "",
  email: "",
  notes: "",
  company: "",
};

type Errors = Partial<Record<keyof FormState | "services", string>>;

/** The per-step rules, identical to the design's `valid(step)`. */
function validate(step: number, form: FormState, services: readonly string[]): Errors {
  const errors: Errors = {};

  if (step === 1 && services.length === 0) {
    errors.services = "Pick at least one service to continue.";
  }

  if (step === 2) {
    if (form.make.trim() === "") errors.make = "Tell us the make.";
    if (form.model.trim() === "") errors.model = "Tell us the model.";
  }

  if (step === 3) {
    if (!form.day) errors.day = "Choose a day.";
    if (form.time === "") errors.time = "Choose a time window.";
  }

  if (step === 4) {
    if (form.name.trim() === "") errors.name = "We need a name.";
    if (form.tel.trim() === "" && form.email.trim() === "") {
      errors.tel = "Add a phone number or an email so we can reach you.";
    }
    if (
      form.email.trim() !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      errors.email = "That email does not look right.";
    }
  }

  return errors;
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [delivered, setDelivered] = useState(true);

  const days = useBookableDays();

  /**
   * Service selection.
   *
   * A service page links here as /?service=rims-tires#book, and that service
   * starts ticked. Rather than writing it into state after mount, the selection
   * is derived: the preselected title is included unless the visitor has since
   * unticked it. Same result, no effect, and nothing to go stale.
   */
  const preselectSlug = useQueryParam("service");
  const preselectTitle = preselectSlug
    ? (SERVICE_BY_SLUG[preselectSlug]?.title ?? null)
    : null;

  const [picked, setPicked] = useState<string[]>([]);
  const [unpicked, setUnpicked] = useState<string[]>([]);

  const services = useMemo(() => {
    const fromUrl =
      preselectTitle &&
      !unpicked.includes(preselectTitle) &&
      !picked.includes(preselectTitle)
        ? [preselectTitle]
        : [];
    return [...fromUrl, ...picked];
  }, [preselectTitle, picked, unpicked]);

  const addService = useCallback((title: string) => {
    setPicked((prev) => (prev.includes(title) ? prev : [...prev, title]));
    setUnpicked((prev) => prev.filter((t) => t !== title));
    setErrors((prev) => ({ ...prev, services: undefined }));
  }, []);

  const toggleService = useCallback(
    (title: string) => {
      if (services.includes(title)) {
        setPicked((prev) => prev.filter((t) => t !== title));
        setUnpicked((prev) => (prev.includes(title) ? prev : [...prev, title]));
      } else {
        addService(title);
      }
      setErrors((prev) => ({ ...prev, services: undefined }));
    },
    [services, addService],
  );

  /* "Book <service> →" from the gallery lightbox. */
  useEffect(() => {
    return onServiceSelection((title) => {
      addService(title);
      setDone(false);
      setStep(1);
    });
  }, [addService]);

  const set = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const selectedDay = useMemo(
    () => days.find((d) => d.key === form.day),
    [days, form.day],
  );
  const vehicle = [form.year, form.make, form.model].filter(Boolean).join(" ");
  const slot = slotSummary(selectedDay, form.time, form.place);
  const stepValid = Object.keys(validate(step, form, services)).length === 0;

  const summaryRows: SummaryRow[] = [
    {
      label: "Services",
      value: services.length ? services.join(", ") : "Nothing picked yet",
      tone: services.length ? "set" : "empty",
    },
    {
      label: "Vehicle",
      value: vehicle || "Awaiting details",
      tone: vehicle ? "set" : "empty",
    },
    {
      label: "Condition",
      value: form.condition || "—",
      tone: form.condition ? "set" : "empty",
    },
    {
      label: "Consultation",
      value: selectedDay ? slot : "Not scheduled",
      tone: selectedDay ? "accent" : "empty",
    },
    {
      label: "Contact",
      value: [form.name, form.tel, form.email].filter(Boolean).join(" · ") || "—",
      tone: form.name ? "set" : "empty",
    },
  ];

  async function submit() {
    setSending(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services,
          dayLabel: selectedDay
            ? `${selectedDay.dow} ${selectedDay.num} ${selectedDay.mon}`
            : "",
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        delivered?: boolean;
        fieldErrors?: Record<string, string>;
      } | null;

      if (response.status === 422 && result?.fieldErrors) {
        setErrors(result.fieldErrors as Errors);
        return;
      }

      // Anything else — including a 429 or a 500 — still holds the slot and
      // shows the fallback contact route rather than an error screen.
      setDelivered(response.ok && result?.delivered === true);
      setDone(true);
    } catch {
      setDelivered(false);
      setDone(true);
    } finally {
      setSending(false);
    }
  }

  function next() {
    const found = validate(step, form, services);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    void submit();
  }

  function reset() {
    setForm(EMPTY);
    setPicked([]);
    setUnpicked([]);
    setErrors({});
    setStep(1);
    setDone(false);
    setDelivered(true);
  }

  const hint = stepValid
    ? step === TOTAL_STEPS
      ? HINT_FINAL
      : HINT_VALID
    : (STEP_HINTS[step - 1] ?? "");

  return (
    <div className="tablet:grid-cols-[minmax(0,1fr)] grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-start gap-[22px]">
      <div
        className="border-line-10 border p-[clamp(20px,3vw,38px)]"
        style={{ background: "linear-gradient(180deg,#1a1a1f 0%,#121215 100%)" }}
      >
        {done ? (
          <Confirmation
            name={form.name}
            slotSummary={slot}
            services={services}
            vehicle={vehicle}
            delivered={delivered}
            onReset={reset}
          />
        ) : (
          <>
            <StepProgress step={step} done={done} />

            {step === 1 ? (
              <StepServices
                selected={services}
                onToggle={toggleService}
                error={errors.services}
              />
            ) : null}

            {step === 2 ? (
              <StepVehicle
                values={form}
                errors={errors}
                onChange={(field, value) => set(field, value)}
                onCondition={(value) => set("condition", value)}
              />
            ) : null}

            {step === 3 ? (
              <StepSlot
                days={days}
                values={form}
                errors={errors}
                onPick={(field, value) => set(field, value)}
              />
            ) : null}

            {step === 4 ? (
              <StepContact
                values={form}
                errors={errors}
                onChange={(field, value) => set(field, value)}
              />
            ) : null}

            <div className="border-line-10 mt-[34px] flex items-center gap-3 border-t pt-[22px]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setStep(step - 1);
                  }}
                  className="border-line-16 text-bone-80 hover:border-red hover:text-bone cursor-pointer border bg-transparent px-[18px] py-[14px] text-[14px] font-semibold transition-colors duration-200"
                >
                  Back
                </button>
              ) : null}

              {/*
                Left enabled even when the step is incomplete: pressing it runs
                validation and surfaces the inline errors. A truly disabled
                button would give a keyboard user no way to find out why.
              */}
              <button
                type="button"
                onClick={next}
                aria-disabled={!stepValid || sending}
                className={cn(
                  "ml-auto border-none px-[26px] py-[15px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200",
                  stepValid && !sending
                    ? "bg-red text-ink cursor-pointer hover:brightness-[1.08]"
                    : "bg-line-8 text-bone-35 cursor-not-allowed",
                )}
              >
                {sending
                  ? "Holding…"
                  : step === TOTAL_STEPS
                    ? "Hold my slot"
                    : "Continue"}
              </button>
            </div>

            <p className="text-bone-38 mt-[14px] mb-0 text-[12px]">{hint}</p>
          </>
        )}
      </div>

      <SpecSummary rows={summaryRows} />
    </div>
  );
}
