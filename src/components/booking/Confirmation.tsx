"use client";

import { SITE, TEL_HREF } from "@/data/site";
import { whatsappBookingHref } from "@/lib/whatsapp";

/**
 * The success state.
 *
 * `delivered` is false when the notification email could not be sent. The slot
 * is still treated as held — the customer sees the same confirmation plus a
 * short line asking them to confirm by phone or WhatsApp. A provider outage
 * must never read as a broken form.
 */
export function Confirmation({
  name,
  slotSummary,
  services,
  vehicle,
  delivered,
  onReset,
}: {
  name: string;
  slotSummary: string;
  services: readonly string[];
  vehicle: string;
  delivered: boolean;
  onReset: () => void;
}) {
  const firstName = name.trim().split(" ")[0] || "you";
  const whatsapp = whatsappBookingHref({ name, services, vehicle, slot: slotSummary });

  return (
    <div className="animate-[madup_.5s_ease_both]">
      <div
        aria-hidden="true"
        className="bg-green text-ink grid h-12 w-12 place-items-center text-[24px] font-bold"
      >
        ✓
      </div>

      <h3 className="font-display mt-5 mb-2 text-[30px] uppercase">
        Slot held for {firstName}
      </h3>

      <p className="text-bone-68 m-0 mb-[22px] max-w-[46ch] text-[15px] leading-[1.55]">
        We&rsquo;ve pencilled in{" "}
        <strong className="text-red-bright font-semibold">{slotSummary}</strong>.
        You&rsquo;ll get a text confirmation with the tech assigned to your build. Want it
        faster?
      </p>

      {!delivered ? (
        <p className="border-line-14 bg-white-3 text-bone-72 m-0 mb-[22px] max-w-[46ch] border p-4 text-[13.5px] leading-[1.55]">
          One thing — our booking inbox did not acknowledge this one. Your slot is still
          held, but please confirm it directly so nothing slips:{" "}
          <a href={TEL_HREF} className="font-semibold">
            {SITE.primaryPhoneDisplay}
          </a>{" "}
          or WhatsApp below.
        </p>
      ) : null}

      <div className="phone:flex-col phone:items-stretch flex flex-wrap gap-2.5">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          className="bg-red text-ink hover:bg-red-bright phone:text-center px-5 py-[14px] text-[14px] font-bold transition-colors duration-200"
        >
          Message us on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="border-line-18 text-bone hover:border-red cursor-pointer border bg-transparent px-5 py-[14px] text-[14px] font-semibold transition-colors duration-200"
        >
          Book another vehicle
        </button>
      </div>
    </div>
  );
}
