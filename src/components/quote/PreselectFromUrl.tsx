"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { addServices } from "@/lib/quote-store";

/**
 * `/services?add=Window%20Tint` — what the menu, the service cards and each
 * service page link to — lands with that service already in the quote. Several
 * can be passed comma-separated. The parameter is then dropped from the address
 * bar, so a reload or a shared link does not re-add something the visitor has
 * since removed.
 */
export function PreselectFromUrl() {
  const params = useSearchParams();
  const add = params.get("add");

  useEffect(() => {
    if (!add) return;
    addServices(add.split(",").map((name) => name.trim()));
    const url = new URL(window.location.href);
    url.searchParams.delete("add");
    window.history.replaceState(window.history.state, "", url);
  }, [add]);

  return null;
}
