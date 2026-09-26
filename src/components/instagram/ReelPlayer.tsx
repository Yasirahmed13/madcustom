"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import type { InstagramReel } from "@/data/instagram";
import { useViewer } from "@/lib/viewer";

/**
 * The full-screen reel player, opened from the reel strip. Same dialog,
 * keyboard and swipe behaviour as the work lightbox (see useViewer).
 *
 * Reels play with sound, since a click opened the player. If the browser still
 * refuses — iOS Safari can, once the gesture is spent — the reel falls back to
 * playing muted and the controls unmute it.
 *
 * Instagram's video links are signed and expire. The feed refreshes them every
 * 15 minutes, but a page served stale after a long quiet spell can carry dead
 * ones, so a reel that fails to load offers the Instagram link instead of a
 * broken player.
 */
export function ReelPlayer({
  reels,
  index,
  onClose,
  onShow,
}: {
  /** Only reels with a video. */
  reels: readonly InstagramReel[];
  index: number;
  onClose: () => void;
  onShow: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failedId, setFailedId] = useState<string | null>(null);

  const reel = reels[index];
  const multiple = reels.length > 1;

  const step = useCallback(
    (direction: 1 | -1) => onShow((index + direction + reels.length) % reels.length),
    [index, reels.length, onShow],
  );
  const stage = useViewer({
    dialogRef,
    initialFocusRef: closeRef,
    onClose,
    onStep: step,
  });

  /* Start each reel as it comes into view. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch((error: unknown) => {
      // AbortError means it was paged away from or closed; leave it be.
      if (!(error instanceof DOMException) || error.name !== "NotAllowedError") return;
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [reel?.id]);

  if (!reel?.video) return null;

  const failed = failedId === reel.id;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(reels.length).padStart(2, "0")}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Instagram reels"
      className="bg-ink-lightbox fixed inset-0 z-[100] flex animate-[madfade_.25s_ease_both] flex-col"
    >
      <div className="border-line-8 flex items-center gap-4 border-b py-3 pr-3 pl-[18px]">
        <span className="text-red overflow-hidden font-mono text-[11.5px] tracking-[.16em] overflow-ellipsis whitespace-nowrap uppercase">
          {SITE.instagramHandle} / Reels
        </span>
        <span className="text-bone-50 font-mono text-[11.5px] tracking-[.12em] whitespace-nowrap">
          {counter}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close reels"
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
        {failed ? (
          <div className="bg-surface-media border-line-8 flex aspect-[9/16] h-full max-h-full max-w-full flex-col items-center justify-center gap-4 border px-6 text-center">
            <p className="text-bone-70 m-0 text-[14.5px] leading-[1.5]">
              This reel won’t play here right now.
            </p>
            <a
              href={reel.href}
              target="_blank"
              rel="noopener"
              className="bg-red text-ink hover:bg-red-bright px-5 py-[13px] text-[14px] font-bold transition-colors duration-200"
            >
              Watch on Instagram ↗
            </a>
          </div>
        ) : (
          <video
            ref={videoRef}
            key={reel.id}
            controls
            loop
            playsInline
            preload="none"
            poster={reel.poster}
            src={reel.video}
            aria-label={reel.title}
            onError={() => setFailedId(reel.id)}
            className="block aspect-[9/16] h-full max-h-full max-w-full bg-black"
          />
        )}

        {multiple ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous reel"
              className="border-line-18 bg-ink-72 text-bone hover:border-red hover:bg-red-20 phone:left-2 phone:h-10 phone:w-10 phone:text-[16px] absolute top-1/2 left-4 box-content grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center border font-mono text-[18px] transition-colors duration-200"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next reel"
              className="border-line-18 bg-ink-72 text-bone hover:border-red hover:bg-red-20 phone:right-2 phone:h-10 phone:w-10 phone:text-[16px] absolute top-1/2 right-4 box-content grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center border font-mono text-[18px] transition-colors duration-200"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      <div
        aria-live="polite"
        className="border-line-8 phone:px-4 phone:pt-3 phone:pb-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t px-[18px] pt-[14px] pb-4"
      >
        <div className="min-w-0 flex-[1_1_260px]">
          {reel.date ? (
            <div className="text-bone-50 font-mono text-[11px] tracking-[.12em] uppercase">
              {reel.date}
            </div>
          ) : null}
          {reel.caption ? (
            <p className="text-bone-75 mt-[5px] mb-0 line-clamp-3 text-[13.5px] leading-[1.45] whitespace-pre-line">
              {reel.caption}
            </p>
          ) : null}
        </div>
        <a
          href={reel.href}
          target="_blank"
          rel="noopener"
          className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:w-full phone:text-center flex-none border px-5 py-[13px] text-[14px] font-semibold transition-colors duration-200"
        >
          View on Instagram ↗
        </a>
      </div>
    </div>
  );
}
