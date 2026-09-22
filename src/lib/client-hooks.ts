"use client";

import { useSyncExternalStore } from "react";
import { nextDays, type Day } from "@/data/booking";

/**
 * Reads of browser-only state.
 *
 * These use useSyncExternalStore rather than "set state in an effect after
 * mount". The server snapshot is the safe default, the client snapshot is the
 * real value, and React reconciles the two on hydration — so there is no
 * mismatch, no cascading render, and no flash of the wrong state.
 */

const noopSubscribe = () => () => {};

/* ------------------------------------------------------------------------ */
/* Motion and data preferences                                               */
/* ------------------------------------------------------------------------ */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function heavyMediaSnapshot(): boolean {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) return false;

  return true;
}

/**
 * Whether it is appropriate to download and autoplay background video.
 * False during server rendering, so no reel is ever in the initial HTML.
 */
export function useHeavyMediaAllowed(): boolean {
  return useSyncExternalStore(subscribeToMotion, heavyMediaSnapshot, () => false);
}

/* ------------------------------------------------------------------------ */
/* Bookable days                                                             */
/* ------------------------------------------------------------------------ */

const NO_DAYS: readonly Day[] = [];
let cachedDays: readonly Day[] | null = null;

/**
 * The next six bookable days.
 *
 * Computed in the browser only: the server and the visitor can be in different
 * time zones, and "tomorrow" would not agree between them. The result is cached
 * at module scope so the snapshot keeps a stable identity.
 */
export function useBookableDays(): readonly Day[] {
  return useSyncExternalStore(
    noopSubscribe,
    () => (cachedDays ??= nextDays()),
    () => NO_DAYS,
  );
}

/* ------------------------------------------------------------------------ */
/* Query string                                                              */
/* ------------------------------------------------------------------------ */

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * One query parameter, or null. Returns null on the server, which keeps the
 * page statically renderable — unlike useSearchParams, which would opt the
 * whole route out of static generation or force a Suspense boundary.
 */
export function useQueryParam(name: string): string | null {
  return useSyncExternalStore(
    subscribeToUrl,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}
