"use client";

import { useSearchParams } from "next/navigation";

/**
 * The booked time on a calendar thank-you page.
 *
 * GHL's calendar redirect appends the booked slot to the thank-you URL. The
 * parameter name has changed across widget versions, so several are checked.
 * If none is present, or the value is not a date, nothing renders — the page
 * never shows a broken or empty time.
 */
export function BookedSlot() {
  const params = useSearchParams();
  const raw =
    params.get("event_start_time") ??
    params.get("start_time") ??
    params.get("startTime") ??
    params.get("selected_slot");
  if (!raw) return null;

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;

  const timeZone = params.get("timezone") ?? params.get("event_timezone") ?? undefined;
  let label: string;
  try {
    label = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      ...(timeZone ? { timeZone, timeZoneName: "short" } : {}),
    }).format(date);
  } catch {
    return null; // an unknown time zone name
  }

  return (
    <p className="border-red bg-red-10 mt-[26px] mb-0 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border px-4 py-3">
      <span className="text-red-bright font-mono text-[10.5px] tracking-[.16em] uppercase">
        Your slot
      </span>
      <span className="text-bone font-mono text-[13px]">{label}</span>
    </p>
  );
}
