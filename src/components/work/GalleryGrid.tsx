"use client";

import Image from "next/image";
import { ITEMS, altFor, isVideo, serviceForItem } from "@/data/work";

/** How many tiles are shown at a time, and added per "show more". */
export const PAGE_SIZE = 12;

/**
 * The tile grid. Presentational: it owns no state, so both the homepage gallery
 * (which adds filter chips) and the service pages (which do not) render the
 * same tiles from the same code.
 *
 * 4 columns, 3 on tablet, 2 on phone — the design's breakpoints.
 */
export function GalleryGrid({
  ids,
  onOpen,
}: {
  /** Indexes into ITEMS, already sliced to the visible page. */
  ids: readonly number[];
  onOpen: (positionInList: number) => void;
}) {
  return (
    <div className="tablet:grid-cols-3 phone:grid-cols-2 phone:gap-1.5 grid grid-cols-4 gap-2.5">
      {ids.map((id, position) => {
        const item = ITEMS[id];
        if (!item) return null;
        const service = serviceForItem(item);

        return (
          <button
            key={`${id}-${position}`}
            type="button"
            onClick={() => onOpen(position)}
            aria-haspopup="dialog"
            className="mad-tile border-line-8 bg-surface-media text-bone hover:border-red relative m-0 block aspect-[4/5] w-full min-w-0 cursor-pointer overflow-hidden border p-0 text-left transition-colors duration-200"
          >
            <Image
              src={item.thumb}
              alt={altFor(item)}
              fill
              loading="lazy"
              sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
              className="block object-cover"
              style={{ objectPosition: item.position }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex flex-col gap-[5px] px-[14px] pt-10 pb-[13px]"
              style={{
                background:
                  "linear-gradient(0deg,rgba(12,12,13,.92) 10%,rgba(12,12,13,0))",
              }}
            >
              <span className="text-red-bright font-mono text-[10px] tracking-[.14em] uppercase">
                {service?.shortLabel}
              </span>
              <span className="text-[14px] leading-[1.3] font-semibold">{item.car}</span>
            </span>
            {isVideo(item) ? (
              <span
                aria-hidden="true"
                className="bg-ink-80 text-bone absolute top-2.5 left-2.5 flex items-center gap-[7px] px-[9px] py-1.5 font-mono text-[11px] tracking-[.08em]"
              >
                <span className="text-red-bright text-[9px]">▶</span>
                {item.duration}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** The "Show 12 more" button and the "Showing 12 of 77" counter. */
export function ShowMoreRow({
  shown,
  total,
  onMore,
}: {
  shown: number;
  total: number;
  onMore: () => void;
}) {
  const remaining = total - shown;

  return (
    <div className="phone:flex-col phone:items-stretch mt-6 flex flex-wrap items-center gap-x-[18px] gap-y-[14px]">
      {remaining > 0 ? (
        <button
          type="button"
          onClick={onMore}
          className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:w-full cursor-pointer border bg-transparent px-[22px] py-[14px] text-[14px] font-semibold transition-colors duration-200"
        >
          Show {Math.min(PAGE_SIZE, remaining)} more
        </button>
      ) : null}
      <span
        aria-live="polite"
        className="text-bone-42 font-mono text-[12px] tracking-[.06em]"
      >
        Showing {shown} of {total}
      </span>
    </div>
  );
}
