"use client";

import type { ReactNode } from "react";
import { requestGalleryOpen, requestWorkFilter, scrollToWork } from "@/lib/work-events";

/**
 * The card's image, as a button that opens the lightbox on that service's
 * gallery. Children are server-rendered and passed straight through, so the
 * <Image> stays in the server tree.
 *
 * NOTE: the design gave this button tabIndex="-1", because it and the
 * "See the work →" button below went to the same place and one tab stop was
 * enough. They now do different things — this opens the gallery, that one
 * filters the grid — so it is back in the tab order with its own label.
 */
export function ServiceMediaButton({
  galleryKey,
  label,
  children,
}: {
  galleryKey: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => requestGalleryOpen(galleryKey, 0)}
      aria-haspopup="dialog"
      aria-label={label}
      className="mad-svc-media bg-surface-media relative block aspect-[16/10] w-full cursor-pointer overflow-hidden border-none p-0"
    >
      {children}
    </button>
  );
}

/**
 * "See the work →" — filters the gallery below to this service and scrolls to it.
 */
export function SeeTheWorkButton({
  galleryKey,
  label,
}: {
  galleryKey: string;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        requestWorkFilter(galleryKey);
        scrollToWork();
      }}
      className="text-red hover:text-red-soft cursor-pointer border-none bg-transparent p-0 text-[12px] tracking-[.1em] uppercase transition-colors duration-200"
    >
      See the work →
    </button>
  );
}
