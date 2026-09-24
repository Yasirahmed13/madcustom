"use client";

import { useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * GoHighLevel's form and calendar widgets, embedded exactly as GHL's own
 * "Embed" code does it: an iframe on api.leadconnectorhq.com plus GHL's
 * form_embed.js, which sizes the iframe to its content and handles the
 * redirect to the thank-you page after a submission or booking.
 *
 * The page's own query string is passed through to the widget. On /quote that
 * is what fills the form's hidden fields (selected_services, order_items,
 * order_total); everywhere it also carries UTM tags and any prefill
 * (first_name, email, phone…) into the CRM.
 *
 * The widget's inside — fields, colours, corners — is styled in GHL, not here.
 * Everything around it is the site's.
 */

const EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";
const WIDGET_BASE = "https://api.leadconnectorhq.com/widget";

function Frame({
  src,
  id,
  title,
  minHeight,
  loadingLabel,
  extra,
}: {
  src: string;
  id: string;
  title: string;
  minHeight: number;
  loadingLabel: string;
  extra?: Record<string, string>;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ minHeight }}>
      <div
        aria-hidden="true"
        className={cn(
          "text-bone-50 pointer-events-none absolute inset-0 flex items-center justify-center gap-3 font-mono text-[11.5px] tracking-[.14em] uppercase transition-opacity duration-300",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="bg-red animate-madpulse size-2 rounded-full" />
        {loadingLabel}
      </div>

      <iframe
        src={src}
        id={id}
        title={title}
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className="relative block w-full border-0 bg-transparent"
        style={{ minHeight, overflow: "hidden" }}
        {...extra}
      />

      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}

function useQuery() {
  const query = useSearchParams().toString();
  // URLSearchParams writes spaces as "+"; GHL reads the raw value.
  return query ? `?${query.replace(/\+/g, "%20")}` : "";
}

/** A GHL form, inline. */
export function GhlForm({
  formId,
  name,
  minHeight = 900,
}: {
  formId: string;
  /** The form's name in GHL. */
  name: string;
  minHeight?: number;
}) {
  const query = useQuery();
  const iframeId = `inline-${formId}`;

  return (
    <Frame
      // Re-mount when the query changes, so the hidden fields always match it.
      key={query}
      src={`${WIDGET_BASE}/form/${formId}${query}`}
      id={iframeId}
      title={name}
      minHeight={minHeight}
      loadingLabel="Loading form"
      extra={{
        "data-layout": "{'id':'INLINE'}",
        "data-trigger-type": "alwaysShow",
        "data-trigger-value": "",
        "data-activation-type": "alwaysActivated",
        "data-activation-value": "",
        "data-deactivation-type": "neverDeactivate",
        "data-deactivation-value": "",
        "data-form-name": name,
        "data-height": String(minHeight),
        "data-layout-iframe-id": iframeId,
        "data-form-id": formId,
      }}
    />
  );
}

/** A GHL booking calendar. */
export function GhlCalendar({
  calendarId,
  title,
  minHeight = 780,
}: {
  calendarId: string;
  title: string;
  minHeight?: number;
}) {
  const query = useQuery();

  return (
    <Frame
      key={query}
      src={`${WIDGET_BASE}/booking/${calendarId}${query}`}
      id={`${calendarId}_embed`}
      title={title}
      minHeight={minHeight}
      loadingLabel="Loading available times"
    />
  );
}
