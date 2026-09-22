"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SERVICES } from "@/data/services";
import { ALL, GROUPS, galleryFor } from "@/data/work";
import { chipClass } from "@/components/ui/Chip";
import { requestServiceSelection, scrollToBooking } from "@/lib/booking-events";
import { onGalleryOpen, onWorkFilter } from "@/lib/work-events";
import { GalleryGrid, PAGE_SIZE, ShowMoreRow } from "./GalleryGrid";

/*
 * The lightbox only exists once someone opens it, so its code is fetched on
 * first use rather than shipped with the page. ssr:false because it is a modal
 * that never renders on the server.
 */
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), {
  ssr: false,
});

type LightboxState = { ids: readonly number[]; index: number } | null;

/**
 * The homepage gallery: filter chips, the paged grid and the lightbox.
 *
 * These three share one client island because they share the filter. The chips
 * are also driven from the service cards above via mad:filter-work, and the
 * lightbox via mad:open-gallery.
 */
export function WorkGallery() {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const visibleIds = useMemo(() => galleryFor(filter), [filter]);
  const page = useMemo(() => visibleIds.slice(0, shown), [visibleIds, shown]);

  const pick = useCallback((key: string) => {
    setFilter(key);
    setShown(PAGE_SIZE);
  }, []);

  /* "See the work →" on a service card filters the grid. */
  useEffect(() => onWorkFilter(pick), [pick]);

  /* The service card's image opens that service's gallery directly. */
  useEffect(
    () => onGalleryOpen(({ key, index }) => setLightbox({ ids: galleryFor(key), index })),
    [],
  );

  /* Keep the active chip in view when the rail scrolls horizontally.

     Adjusts the rail's own scrollLeft rather than calling scrollIntoView. The
     old call passed `block: "nearest"`, which also scrolls every ancestor
     scroller — including the page. On the homepage this effect runs on mount,
     when the rail is ~3,200px down, so the browser scrolled the window to it:
     load the homepage and it slid straight past the hero to the gallery. The
     maths below reproduces `inline: "nearest"` exactly and can only ever move
     the rail. */
  useEffect(() => {
    const rail = filtersRef.current;
    const chip = rail?.querySelector(`[data-filter="${filter}"]`);
    if (!rail || !chip) return;

    const railBox = rail.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();

    if (chipBox.left < railBox.left) {
      rail.scrollLeft -= railBox.left - chipBox.left;
    } else if (chipBox.right > railBox.right) {
      rail.scrollLeft += chipBox.right - railBox.right;
    }
  }, [filter]);

  const filters = [
    { key: "all", label: "All work", count: ALL.length },
    ...SERVICES.map((service) => ({
      key: service.galleryKey,
      label: service.shortLabel,
      count: GROUPS[service.galleryKey]?.length ?? 0,
    })),
  ];

  return (
    <>
      <div
        ref={filtersRef}
        role="group"
        aria-label="Filter the work by service"
        className="mad-scroll-none phone:-mx-4 phone:flex-nowrap phone:overflow-x-auto phone:px-4 phone:pb-0.5 mb-5 flex flex-wrap gap-2"
      >
        {filters.map((entry) => (
          <button
            key={entry.key}
            type="button"
            data-filter={entry.key}
            onClick={() => pick(entry.key)}
            aria-pressed={filter === entry.key}
            className={chipClass(
              filter === entry.key,
              "flex flex-none items-center gap-2 px-[14px] py-2.5 text-[13.5px] font-semibold whitespace-nowrap",
            )}
          >
            {entry.label}
            <span className="font-mono text-[11px] opacity-60">{entry.count}</span>
          </button>
        ))}
      </div>

      <GalleryGrid
        ids={page}
        onOpen={(index) => setLightbox({ ids: visibleIds, index })}
      />

      <ShowMoreRow
        shown={page.length}
        total={visibleIds.length}
        onMore={() => setShown((current) => current + PAGE_SIZE)}
      />

      {lightbox ? (
        <Lightbox
          ids={lightbox.ids}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onShow={(index) =>
            setLightbox((current) => (current ? { ...current, index } : current))
          }
          onBook={(title) => {
            setLightbox(null);
            requestServiceSelection(title);
            // Let the dialog unmount and the scroll lock lift first.
            requestAnimationFrame(scrollToBooking);
          }}
        />
      ) : null}
    </>
  );
}
