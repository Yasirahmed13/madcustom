"use client";

import { useEffect, useRef, type PointerEvent, type RefObject } from "react";

/**
 * The behaviour the two full-screen viewers share: the work lightbox and the
 * Instagram reel player.
 *
 * Built to the ARIA dialog pattern: focus moves to `initialFocusRef` on open
 * and back to whatever opened the viewer on close, a real focus trap runs over
 * every focusable element in `dialogRef`, and the background is locked while
 * it is up.
 *
 * Keyboard: ← → step, Esc closes. Arrow keys are ignored while a video has
 * focus so they still scrub it.
 *
 * Returns the pointer handlers for the stage: a horizontal swipe over 50px
 * steps, and a tap on the stage itself — not on what it holds — closes.
 */
export function useViewer({
  dialogRef,
  initialFocusRef,
  onClose,
  onStep,
}: {
  dialogRef: RefObject<HTMLElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}) {
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  /* Background scroll lock and focus restore. */
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const gap = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;

    const returnTo = document.activeElement as HTMLElement | null;
    initialFocusRef.current?.focus();

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      returnTo?.focus?.();
    };
  }, [initialFocusRef]);

  /* Keyboard: navigation, close and the focus trap. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      const onVideo = (event.target as HTMLElement | null)?.tagName === "VIDEO";
      if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && !onVideo) {
        event.preventDefault();
        onStep(event.key === "ArrowRight" ? 1 : -1);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const stops = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el.tagName === "VIDEO");
      if (stops.length === 0) return;

      const first = stops[0]!;
      const last = stops[stops.length - 1]!;

      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogRef, onClose, onStep]);

  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      swipeRef.current =
        (event.target as HTMLElement).tagName === "VIDEO"
          ? null
          : { x: event.clientX, y: event.clientY };
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const start = swipeRef.current;
      swipeRef.current = null;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        onStep(dx < 0 ? 1 : -1);
      } else if (
        Math.abs(dx) < 8 &&
        Math.abs(dy) < 8 &&
        event.target === event.currentTarget
      ) {
        onClose();
      }
    },
  };
}
