"use client";

import { useState } from "react";
import { CONTACT_PLACEHOLDERS, CONTACT_SHOPS } from "@/data/contact";
import { SITE, TEL_HREF } from "@/data/site";
import { whatsappHref } from "@/lib/whatsapp";
import { ChipGroup, TextAreaField, TextField } from "@/components/booking/Field";
import { Chip } from "@/components/ui/Chip";

type FormState = {
  name: string;
  email: string;
  tel: string;
  shop: string;
  message: string;
  /** Honeypot. */
  company: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  tel: "",
  shop: "",
  message: "",
  company: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

/**
 * Client-side rules, identical to the ones the API enforces in
 * `lib/contact-schema.ts`. Kept in step so the inline errors a visitor sees
 * match the ones the server would return.
 */
function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (form.name.trim() === "") errors.name = "We need a name.";

  if (form.email.trim() === "") {
    errors.email = "We need an email to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "That email does not look right.";
  }

  if (form.message.trim() === "") errors.message = "Tell us what you need.";

  return errors;
}

/**
 * The contact message form.
 *
 * On a delivery failure the customer is never shown an error — they get the
 * same thank-you with the phone number and WhatsApp link alongside it, which
 * is the behaviour the booking form has.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [delivered, setDelivered] = useState(true);

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

      // Anything else — including a 429 or a 500 — still shows the thank-you
      // with the fallback contact routes rather than an error screen.
      setDelivered(response.ok && result?.delivered === true);
      setDone(true);
    } catch {
      setDelivered(false);
      setDone(true);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div
        className="border-line-10 border p-[clamp(20px,3vw,38px)]"
        style={{ background: "linear-gradient(180deg,#1a1a1f 0%,#121215 100%)" }}
        role="status"
        aria-live="polite"
      >
        <div className="text-red font-mono text-[11.5px] tracking-[.16em]">
          {delivered ? "MESSAGE SENT" : "MESSAGE RECEIVED"}
        </div>

        <h3 className="font-display mt-3 mb-0 text-[clamp(26px,3.4vw,40px)] leading-[.98] uppercase">
          Thanks, {form.name.split(" ")[0] || "there"}.
        </h3>

        <p className="text-bone-72 mt-4 mb-0 max-w-[52ch] text-[15px] leading-[1.6]">
          {delivered
            ? "It is with the shop. Someone who works on cars — not a call centre — will come back to you, usually the same working day."
            : "We could not put it through by email just now, so use one of the routes below and it will reach us straight away."}
        </p>

        <div className="phone:flex-col phone:items-stretch mt-[26px] flex flex-wrap gap-3">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
            className="bg-red text-ink hover:bg-red-bright phone:justify-center flex items-center gap-2.5 px-7 py-4 text-[15px] font-bold transition-colors duration-200"
          >
            WhatsApp the shop <span className="font-mono">&rarr;</span>
          </a>
          <a
            href={TEL_HREF}
            className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-4 text-[15px] font-semibold transition-colors duration-200"
          >
            Call {SITE.primaryPhoneDisplay}
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setErrors({});
            setDone(false);
            setDelivered(true);
          }}
          className="text-bone-50 hover:text-bone mt-[26px] cursor-pointer border-0 bg-transparent p-0 text-[13.5px] underline underline-offset-4 transition-colors duration-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border-line-10 border p-[clamp(20px,3vw,38px)]"
      style={{ background: "linear-gradient(180deg,#1a1a1f 0%,#121215 100%)" }}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-[14px]">
        <TextField
          id="contact-name"
          name="name"
          label="Name"
          autoComplete="name"
          maxLength={80}
          required
          placeholder={CONTACT_PLACEHOLDERS.name}
          value={form.name}
          error={errors.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <TextField
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          maxLength={120}
          required
          placeholder={CONTACT_PLACEHOLDERS.email}
          value={form.email}
          error={errors.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <TextField
          id="contact-tel"
          name="tel"
          type="tel"
          label="Phone (optional)"
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          placeholder={CONTACT_PLACEHOLDERS.tel}
          value={form.tel}
          error={errors.tel}
          onChange={(e) => set("tel", e.target.value)}
        />
      </div>

      <div className="mt-[18px]">
        <ChipGroup label="Which shop" errorId="contact-shop-error" error={errors.shop}>
          {CONTACT_SHOPS.map((shop) => (
            <Chip
              key={shop}
              active={form.shop === shop}
              aria-pressed={form.shop === shop}
              onClick={() => set("shop", form.shop === shop ? "" : shop)}
              className="px-[15px] py-[11px] text-[13.5px] font-semibold"
            >
              {shop}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div className="mt-[18px]">
        <TextAreaField
          id="contact-message"
          name="message"
          label="Message"
          rows={6}
          maxLength={4000}
          required
          placeholder={CONTACT_PLACEHOLDERS.message}
          value={form.message}
          error={errors.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

      {/* Honeypot. Hidden from people and from assistive technology; bots fill it. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="border-line-10 phone:flex-col phone:items-stretch mt-[30px] flex flex-wrap items-center gap-3 border-t pt-[22px]">
        {/*
          Left enabled even when the form is incomplete: pressing it runs
          validation and surfaces the inline errors. A truly disabled button
          would give a keyboard user no way to find out why.
        */}
        <button
          type="submit"
          disabled={sending}
          className="bg-red text-ink hover:bg-red-bright phone:justify-center flex cursor-pointer items-center gap-2.5 border-0 px-[30px] py-[17px] text-[15px] font-bold transition-colors duration-200 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Sending…" : "Send message"}{" "}
          <span className="font-mono">&rarr;</span>
        </button>

        <p className="text-bone-45 phone:text-center m-0 text-[12.5px] leading-[1.5]">
          We reply from a real inbox, usually the same working day.
        </p>
      </div>
    </form>
  );
}
