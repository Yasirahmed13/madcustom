"use client";

import { useEffect } from "react";
import { clearQuote } from "@/lib/quote-store";

/** The quote has been submitted: empty it so the next visit starts fresh. */
export function ClearQuoteOnMount() {
  useEffect(() => {
    clearQuote();
  }, []);
  return null;
}
