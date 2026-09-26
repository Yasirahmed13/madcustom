"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { InstagramReel } from "@/data/instagram";
import { useHeavyMediaAllowed } from "@/lib/client-hooks";

/*
 * Like the work lightbox, the player's code is only fetched once someone opens
 * a reel. ssr:false because it is a modal that never renders on the server.
 */
const ReelPlayer = dynamic(() => import("./ReelPlayer").then((m) => m.ReelPlayer), {
  ssr: false,
});

/**
 * The latest reels, as a horizontal strip of 9:16 tiles above the Instagram
 * grid.
 *
 * A click plays the reel on the site, in ReelPlayer. Reels Instagram sends no
 * video for — ones with licensed music, usually — link out to Instagram
 * instead.
 *
 * With a mouse, hovering a tile plays a silent preview. It is not offered to
 * touch, to reduced motion or to Data Saver, and nothing is downloaded until
 * the pointer arrives.
 */
export function ReelStrip({ reels }: { reels: readonly InstagramReel[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewsAllowed = useHeavyMediaAllowed();
  const stripRef = useRef<HTMLDivElement>(null);

  /** The player pages through the reels that can play here, and only those. */
  const playable = useMemo(() => reels.filter((reel) => reel.video), [reels]);

  const scroll = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({
      left: direction * strip.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div className="phone:mb-8 mb-10">
      <div className="mb-3.5 flex items-center gap-3">
        <h3 className="text-bone-60 m-0 font-mono text-[11.5px] font-normal tracking-[.16em]">
          LATEST REELS
        </h3>
        {reels.length > 4 ? (
          <div className="phone:hidden ml-auto flex gap-1.5">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => scroll(direction)}
                aria-label={direction < 0 ? "Scroll reels back" : "Scroll reels forward"}
                className="border-line-18 text-bone hover:border-red hover:bg-red-20 box-content grid h-9 w-9 cursor-pointer place-items-center border bg-transparent font-mono text-[15px] transition-colors duration-200"
              >
                {direction < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        ref={stripRef}
        className="mad-scroll-thin phone:gap-1.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-3"
      >
        {reels.map((reel) => {
          const position = reel.video ? playable.indexOf(reel) : -1;
          const tileClass =
            "mad-tile border-line-8 bg-surface-media text-bone hover:border-red phone:w-[40vw] relative m-0 block aspect-[9/16] w-[224px] flex-none cursor-pointer snap-start overflow-hidden border p-0 text-left transition-colors duration-200";

          const inner = (
            <>
              {reel.poster ? (
                <Image
                  src={reel.poster}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) 40vw, 224px"
                  className="block object-cover"
                  // Instagram's CDN links are signed and expire, so they are
                  // passed through rather than run through the optimiser.
                  unoptimized
                />
              ) : null}
              {previewsAllowed && previewId === reel.id && reel.video ? (
                <ReelPreview src={reel.video} />
              ) : null}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 px-3 pt-10 pb-3"
                style={{
                  background:
                    "linear-gradient(0deg,rgba(12,12,13,.92) 10%,rgba(12,12,13,0))",
                }}
              >
                <span className="line-clamp-2 text-[13px] leading-[1.3] font-semibold">
                  {reel.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="bg-ink-80 text-bone absolute top-2.5 left-2.5 flex items-center gap-[7px] px-[9px] py-1.5 font-mono text-[11px] tracking-[.08em]"
              >
                <span className="text-red-bright text-[9px]">
                  {reel.video ? "▶" : "↗"}
                </span>
                REEL
              </span>
            </>
          );

          if (position < 0) {
            return (
              <a
                key={reel.id}
                href={reel.href}
                target="_blank"
                rel="noopener"
                aria-label={`Watch on Instagram: ${reel.title}`}
                className={tileClass}
              >
                {inner}
              </a>
            );
          }

          return (
            <button
              key={reel.id}
              type="button"
              onClick={() => {
                setPreviewId(null);
                setOpen(position);
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setPreviewId(reel.id);
              }}
              onPointerLeave={() => setPreviewId(null)}
              aria-haspopup="dialog"
              aria-label={`Play reel: ${reel.title}`}
              className={tileClass}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {open !== null ? (
        <ReelPlayer
          reels={playable}
          index={open}
          onClose={() => setOpen(null)}
          onShow={setOpen}
        />
      ) : null}
    </div>
  );
}

/**
 * The silent hover preview. Fades in over the cover once it is actually
 * playing, so a slow start just leaves the cover up. Muted as a property as
 * well as an attribute, which is what lets it autoplay everywhere.
 */
function ReelPreview({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
      style={{ opacity: playing ? 1 : 0 }}
    />
  );
}
