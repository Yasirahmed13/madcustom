"use client";

import { useEffect, useRef, useState } from "react";
import { useHeavyMediaAllowed } from "@/lib/client-hooks";

/**
 * The hero background reel.
 *
 * Sits on top of the poster image, which is the LCP element and is always
 * painted first. The video starts transparent and fades in over 1.4s on its
 * `playing` event, so a slow or blocked reel simply leaves the poster showing.
 *
 * The video is not rendered at all when the visitor prefers reduced motion or
 * has Data Saver on — in those cases the 7.8MB download never starts.
 *
 * Autoplay policies: the element is muted every way the browser recognises
 * before play() is called, and if the promise still rejects the attempt is
 * retried once on the first user interaction.
 */
export function HeroVideo() {
  const allowed = useHeavyMediaAllowed();
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!allowed || !video) return;

    let cancelled = false;
    let retryArmed = false;
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const silence = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    };

    const retry = () => {
      retryArmed = false;
      void attempt();
    };

    const attempt = async () => {
      if (cancelled) return;
      silence();
      try {
        await video.play();
      } catch {
        if (retryArmed) return;
        retryArmed = true;
        for (const event of events) {
          document.addEventListener(event, retry, { once: true, passive: true });
        }
      }
    };

    const onPlaying = () => setVisible(true);
    video.addEventListener("playing", onPlaying, { once: true });

    /*
     * The reel is ~7.8MB and purely decorative: the poster is the LCP element
     * and is painted long before it. So the download waits for the page to
     * finish loading and then for the main thread to go idle, and competes with
     * nothing the visitor is actually waiting for. On a fast connection that is
     * a few hundred milliseconds; on a slow one the poster simply stays up
     * longer, which is the right trade either way.
     */
    let idle: number | undefined;
    const startWhenIdle = () => {
      if (cancelled) return;
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => void attempt(), { timeout: 2000 })
        : window.setTimeout(() => void attempt(), 500);
    };

    if (document.readyState === "complete") startWhenIdle();
    else window.addEventListener("load", startWhenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", startWhenIdle);
      if (idle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
      video.removeEventListener("playing", onPlaying);
      for (const event of events) document.removeEventListener(event, retry);
    };
  }, [allowed]);

  if (!allowed) return null;

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-linear"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <source src="/hero/1.mp4" type="video/mp4" />
    </video>
  );
}
