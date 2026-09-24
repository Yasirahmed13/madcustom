/**
 * The quote the visitor is building on /services: the services they picked and
 * the products in their cart.
 *
 * Kept in localStorage so it survives a reload or a detour to another page, and
 * shared between every component that shows it through one external store —
 * the service cards, the product cards and the quote bar stay in step without a
 * context provider. The storage keys are the ones the original GHL pages used,
 * so a visitor who started a quote there keeps it.
 *
 * The finished quote leaves as a link to /quote carrying the three query keys
 * the GHL form's hidden fields read (see QUOTE_FIELDS).
 */
import { useSyncExternalStore } from "react";
import { SERVICES } from "@/data/services";
import { PRODUCTS, PRODUCT_BY_ID, priceOf } from "@/data/products";
import { QUOTE_FIELDS } from "@/data/quote";
import { QUOTE_URL } from "@/data/links";

const PICKED_KEY = "mcPicked2";
const CART_KEY = "mcCart";
const CHANGE_EVENT = "mad:quote-change";
const MAX_QTY = 99;

const SERVICE_NAMES = new Set(SERVICES.map((s) => s.quoteName));

export type QuoteState = {
  /** Picked services by `quoteName`, in the order the site lists them. */
  services: readonly string[];
  /** Product id → quantity. Only positive quantities are kept. */
  cart: Readonly<Record<string, number>>;
};

const EMPTY: QuoteState = { services: [], cart: {} };

/* ---------------------------------------------------------------------------
   Storage
   --------------------------------------------------------------------------- */

function readRaw(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeRaw(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode or storage full — the quote still works for this page view */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function parseServices(raw: string): string[] {
  try {
    const list: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(list)) return [];
    const picked = new Set(
      list
        .filter((x): x is string => typeof x === "string" && x.startsWith("service|"))
        .map((x) => x.slice("service|".length)),
    );
    return SERVICES.map((s) => s.quoteName).filter((name) => picked.has(name));
  } catch {
    return [];
  }
}

function parseCart(raw: string): Record<string, number> {
  try {
    const cart: unknown = JSON.parse(raw || "{}");
    if (!cart || typeof cart !== "object") return {};
    const out: Record<string, number> = {};
    for (const [id, qty] of Object.entries(cart)) {
      const n = Math.min(MAX_QTY, Math.floor(Number(qty)));
      if (PRODUCT_BY_ID[id] && n > 0) out[id] = n;
    }
    return out;
  } catch {
    return {};
  }
}

// useSyncExternalStore needs the same object back while nothing has changed.
let cache: { key: string; state: QuoteState } | null = null;

function snapshot(): QuoteState {
  const picked = readRaw(PICKED_KEY);
  const cart = readRaw(CART_KEY);
  const key = `${picked}\u0000${cart}`;
  if (cache?.key !== key) {
    cache = { key, state: { services: parseServices(picked), cart: parseCart(cart) } };
  }
  return cache.state;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === PICKED_KEY || event.key === CART_KEY || event.key === null) {
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** The current quote. Empty on the server and on the first client render. */
export function useQuote(): QuoteState {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

/* ---------------------------------------------------------------------------
   Actions
   --------------------------------------------------------------------------- */

function saveServices(names: readonly string[]) {
  writeRaw(PICKED_KEY, JSON.stringify(names.map((name) => `service|${name}`)));
}

function saveCart(cart: Record<string, number>) {
  writeRaw(CART_KEY, JSON.stringify(cart));
}

export function toggleService(name: string) {
  const current = snapshot().services;
  saveServices(
    current.includes(name) ? current.filter((n) => n !== name) : [...current, name],
  );
}

/** Adds services without removing any. Unknown names are ignored. */
export function addServices(names: readonly string[]) {
  const current = snapshot().services;
  const extra = names.filter((n) => SERVICE_NAMES.has(n) && !current.includes(n));
  if (extra.length) saveServices([...current, ...extra]);
}

/** Sets a product's quantity; 0 removes it. */
export function setProductQty(id: string, qty: number) {
  if (!PRODUCT_BY_ID[id]) return;
  const cart = { ...snapshot().cart };
  const n = Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));
  if (n === 0) delete cart[id];
  else cart[id] = n;
  saveCart(cart);
}

export function clearQuote() {
  saveServices([]);
  saveCart({});
}

/* ---------------------------------------------------------------------------
   Derived
   --------------------------------------------------------------------------- */

/** Always two decimals — the format the GHL fields have always received. */
const exactMoney = (n: number) => `$${n.toFixed(2)}`;

export function cartSummary(cart: QuoteState["cart"]) {
  let total = 0;
  let count = 0;
  const lines: string[] = [];
  for (const product of PRODUCTS) {
    const qty = cart[product.id];
    if (!qty) continue;
    lines.push(`${qty}× ${product.name} (${exactMoney(priceOf(product))})`);
    total += priceOf(product) * qty;
    count += qty;
  }
  return { lines, total, count };
}

/** Number of things in the quote: services plus product units. */
export function quoteCount(state: QuoteState) {
  return state.services.length + cartSummary(state.cart).count;
}

/** The link to /quote that carries the whole request into the GHL form. */
export function quoteHref(state: QuoteState): string {
  const params = new URLSearchParams();
  if (state.services.length) params.set(QUOTE_FIELDS.services, state.services.join(", "));
  const cart = cartSummary(state.cart);
  if (cart.count) {
    params.set(QUOTE_FIELDS.items, cart.lines.join("; "));
    params.set(QUOTE_FIELDS.total, exactMoney(cart.total));
  }
  // URLSearchParams writes spaces as "+", which the GHL form does not decode.
  const query = params.toString().replace(/\+/g, "%20");
  return query ? `${QUOTE_URL}?${query}` : QUOTE_URL;
}
