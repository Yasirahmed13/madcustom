"use client";

import { useSearchParams } from "next/navigation";
import { GhlForm } from "@/components/ghl/GhlEmbed";
import { QUOTE_FIELDS, QUOTE_FORM_ID } from "@/data/quote";
import { readQuoteRequest } from "@/lib/quote-store";

/**
 * The GHL quote form on /quote.
 *
 * The page's query fills the form's hidden fields. This adds `estimated_total`:
 * the "Estimated starting total" QuoteSummary shows, read from the same query
 * the same way, so it follows every change to the selection. GHL takes it as
 * the exact amount with cents and no "$" or commas ("1330.99", "3814.00"), and
 * gets none when the page shows none — an empty request, or only services
 * priced by consultation.
 */
export function QuoteForm() {
  const { total } = readQuoteRequest(useSearchParams());

  return (
    <GhlForm
      formId={QUOTE_FORM_ID}
      name="Quote"
      fields={{
        [QUOTE_FIELDS.estimate]: total > 0 ? total.toFixed(2) : undefined,
      }}
    />
  );
}
