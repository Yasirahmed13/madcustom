/**
 * A one-event bus between the work gallery and the booking form.
 *
 * The lightbox's "Book <service> →" button has to add a service to the build
 * sheet and scroll to it, but the gallery and the form are separate client
 * islands with a server-rendered tree between them. A CustomEvent keeps them
 * decoupled — no shared provider wrapping half the page, and no state lifted
 * into a client component that would pull the sections along with it.
 */

export const SELECT_SERVICE_EVENT = "mad:select-service";

export type SelectServiceDetail = { title: string };

/** Adds a service to the build sheet and scrolls to it. */
export function requestServiceSelection(title: string) {
  window.dispatchEvent(
    new CustomEvent<SelectServiceDetail>(SELECT_SERVICE_EVENT, { detail: { title } }),
  );
}

export function onServiceSelection(handler: (title: string) => void): () => void {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<SelectServiceDetail>).detail;
    if (detail?.title) handler(detail.title);
  };
  window.addEventListener(SELECT_SERVICE_EVENT, listener);
  return () => window.removeEventListener(SELECT_SERVICE_EVENT, listener);
}

/** Smooth-scrolls to the booking section, honouring reduced motion. */
export function scrollToBooking() {
  const target = document.getElementById("book");
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
