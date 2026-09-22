/**
 * Events from the service cards to the work gallery.
 *
 * The gallery owns the filter state and the lightbox, and lives in its own
 * client island further down the page. These two events let a server-rendered
 * service card drive it without lifting that state up into a provider that
 * would turn every section between them into a client component.
 */

export const FILTER_WORK_EVENT = "mad:filter-work";
export const OPEN_GALLERY_EVENT = "mad:open-gallery";

export type FilterWorkDetail = { key: string };
export type OpenGalleryDetail = { key: string; index: number };

/** Filters the gallery to one service and scrolls to it. */
export function requestWorkFilter(key: string) {
  window.dispatchEvent(
    new CustomEvent<FilterWorkDetail>(FILTER_WORK_EVENT, { detail: { key } }),
  );
}

/** Opens the lightbox on a service's gallery. */
export function requestGalleryOpen(key: string, index = 0) {
  window.dispatchEvent(
    new CustomEvent<OpenGalleryDetail>(OPEN_GALLERY_EVENT, { detail: { key, index } }),
  );
}

export function onWorkFilter(handler: (key: string) => void): () => void {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<FilterWorkDetail>).detail;
    if (detail?.key) handler(detail.key);
  };
  window.addEventListener(FILTER_WORK_EVENT, listener);
  return () => window.removeEventListener(FILTER_WORK_EVENT, listener);
}

export function onGalleryOpen(handler: (detail: OpenGalleryDetail) => void): () => void {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<OpenGalleryDetail>).detail;
    if (detail?.key) handler(detail);
  };
  window.addEventListener(OPEN_GALLERY_EVENT, listener);
  return () => window.removeEventListener(OPEN_GALLERY_EVENT, listener);
}

/** Scrolls the work section into view, honouring reduced motion. */
export function scrollToWork() {
  const target = document.getElementById("work");
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
