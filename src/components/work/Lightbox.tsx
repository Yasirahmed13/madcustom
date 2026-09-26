"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ITEMS, altFor, isVideo, serviceForItem } from "@/data/work";
import { useViewer } from "@/lib/viewer";

/**
 * The full-screen gallery viewer.
 *
 * Built to the ARIA dialog pattern: role="dialog", aria-modal, a real focus
 * trap over every focusable element, focus returned to whatever opened it, and
 * the background locked while it is up. That behaviour, the keyboard and the
 * swipe live in useViewer, shared with the Instagram reel player.
 *
 * Keyboard: ← → to move, Esc to close. Arrow keys are ignored while a video has
 * focus so they still scrub it. Touch: a horizontal swipe over 50px moves; a tap
 * on the backdrop closes.
 *
 * The two neighbouring stills are preloaded so paging feels instant.
 */
export function Lightbox({
  ids,
  index,
  onClose,
  onShow,
  onBook,
}: {
  /** Indexes into ITEMS. */
  ids: readonly number[];
  /** Position within `ids`. */
  index: number;
  onClose: () => void;
  onShow: (next: number) => void;
  onBook: (serviceTitle: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const itemId = ids[index];
  const item = itemId !== undefined ? ITEMS[itemId] : undefined;
  const service = item ? serviceForItem(item) : undefined;
  const multiple = ids.length > 1;

  const show = useCallback(
    (next: number) => onShow((next + ids.length) % ids.length),
    [ids.length, onShow],
  );

  const step = useCallback((direction: 1 | -1) => show(index + direction), [index, show]);
  const stage = useViewer({
    dialogRef,
    initialFocusRef: closeRef,
    onClose,
    onStep: step,
  });

  /* Preload the neighbouring stills, and keep the filmstrip in view. */
  useEffect(() => {
    for (const step of [1, -1]) {
      const neighbour = ids[(index + step + ids.length) % ids.length];
      const target = neighbour !== undefined ? ITEMS[neighbour] : undefined;
      if (target && !isVideo(target)) {
        const preload = new window.Image();
        preload.src = target.full;
      }
    }

    dialogRef.current
      ?.querySelector(`[data-lb-thumb="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [ids, index]);

  /* Start the clip when a video comes into view. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = video.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, [index]);

  if (!item) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(ids.length).padStart(2, "0")}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={service ? `${service.title} gallery` : "Gallery"}
      className="bg-ink-lightbox fixed inset-0 z-[100] flex animate-[madfade_.25s_ease_both] flex-col"
    >
      <div className="border-line-8 flex items-center gap-4 border-b py-3 pr-3 pl-[18px]">
        <span className="text-red overflow-hidden font-mono text-[11.5px] tracking-[.16em] overflow-ellipsis whitespace-nowrap uppercase">
          <span className="phone:hidden">{service?.title}</span>
          <span className="phone:inline hidden">{service?.shortLabel}</span>
        </span>
        <span className="text-bone-50 font-mono text-[11.5px] tracking-[.12em] whitespace-nowrap">
          {counter}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="border-line-16 text-bone hover:border-red hover:bg-red-12 ml-auto box-content grid h-11 w-11 flex-none cursor-pointer place-items-center border bg-transparent text-[18px] leading-none transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <div
        className="phone:px-0 phone:py-2 relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-[76px] py-[18px]"
        onPointerDown={stage.onPointerDown}
        onPointerUp={stage.onPointerUp}
      >
        {isVideo(item) ? (
          <video
            ref={videoRef}
            key={item.video}
            controls
            playsInline
            preload="none"
            poster={item.full}
            src={item.video}
            aria-label={altFor(item)}
            className="block aspect-[9/16] h-full max-h-full max-w-full bg-black"
          />
        ) : (
          <div className="relative h-full w-full animate-[madfade_.3s_ease_both]">
            <Image
              key={item.full}
              src={item.full}
              alt={altFor(item)}
              fill
              sizes="100vw"
              quality={82}
              draggable={false}
              className="object-contain select-none"
            />
          </div>
        )}

        {multiple ? (
          <>
            <button
              type="button"
              onClick={() => show(index - 1)}
              aria-label="Previous"
              className="border-line-18 bg-ink-72 text-bone hover:border-red hover:bg-red-20 phone:left-2 phone:h-10 phone:w-10 phone:text-[16px] absolute top-1/2 left-4 box-content grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center border font-mono text-[18px] transition-colors duration-200"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => show(index + 1)}
              aria-label="Next"
              className="border-line-18 bg-ink-72 text-bone hover:border-red hover:bg-red-20 phone:right-2 phone:h-10 phone:w-10 phone:text-[16px] absolute top-1/2 right-4 box-content grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center border font-mono text-[18px] transition-colors duration-200"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      <div
        aria-live="polite"
        className="border-line-8 phone:px-4 phone:pt-3 phone:pb-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t px-[18px] pt-[14px] pb-2.5"
      >
        <div className="min-w-0 flex-[1_1_260px]">
          <div className="font-display text-[21px] leading-[1.1] tracking-[.01em] uppercase">
            {item.car}
          </div>
          <div className="text-bone-60 mt-[5px] text-[13.5px] leading-[1.45]">
            {item.note || service?.title}
          </div>
        </div>
        {service ? (
          <button
            type="button"
            onClick={() => onBook(service.title)}
            className="bg-red text-ink hover:bg-red-bright phone:w-full flex-none cursor-pointer border-none px-5 py-[14px] text-[14px] font-bold tracking-[.02em] transition-colors duration-200"
          >
            Book {service.shortLabel} →
          </button>
        ) : null}
      </div>

      {multiple ? (
        <div className="mad-scroll-thin phone:px-4 phone:pt-1.5 phone:pb-3.5 flex gap-1.5 overflow-x-auto px-[18px] pt-2 pb-4">
          {ids.map((id, i) => {
            const thumbItem = ITEMS[id];
            if (!thumbItem) return null;
            const current = i === index;

            return (
              <button
                key={`${id}-${i}`}
                type="button"
                data-lb-thumb={i}
                onClick={() => onShow(i)}
                aria-label={`${i + 1}: ${thumbItem.car}${isVideo(thumbItem) ? " (video)" : ""}`}
                aria-current={current}
                className="bg-surface-media phone:h-[52px] phone:w-[52px] relative box-content h-16 w-16 flex-none cursor-pointer overflow-hidden border-2 p-0 transition-opacity duration-200 hover:opacity-100"
                style={{
                  borderColor: current ? "#E01B24" : "transparent",
                  opacity: current ? 1 : 0.5,
                }}
              >
                <Image
                  src={thumbItem.thumb}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="64px"
                  className="object-cover"
                />
                {isVideo(thumbItem) ? (
                  <span
                    aria-hidden="true"
                    className="bg-ink-35 text-bone absolute inset-0 grid place-items-center text-[12px]"
                  >
                    ▶
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
