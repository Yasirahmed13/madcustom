"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SERVICES_URL } from "@/data/links";
import { MegaMenuContent } from "./MegaMenuContent";

/**
 * The desktop "Services" nav item and the panel it opens.
 *
 * Opens on hover and on click, closes on Escape, on click outside, and when
 * focus leaves it. The trigger is also a real link, so following it instead of
 * opening the panel still lands on the services page.
 *
 * The panel is positioned against the header bar, which carries `relative`, so
 * it spans the bar's full width rather than this trigger's. It is still a DOM
 * child of the wrapper below, which is what keeps the hover intent honest.
 *
 * Below 900px this is hidden with the rest of the nav and `MobileNav` shows the
 * same content as a stacked sheet.
 */
export function ServicesMegaMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = undefined;
  }, []);

  /** A short grace period, so a diagonal sweep to the panel does not close it. */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="static"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <a
        ref={triggerRef}
        href={SERVICES_URL}
        target="_blank"
        rel="noopener"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={(event) => {
          // A first click opens the panel rather than leaving the site; a second
          // one follows the link.
          if (!open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`relative flex items-center gap-1.5 py-1 transition-colors duration-200 ${
          open ? "text-bone" : "text-bone-72 hover:text-bone"
        }`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-[8px] leading-none transition-transform duration-300 ${
            open ? "text-red rotate-180" : ""
          }`}
        >
          ▼
        </span>
        {/* Ties the open trigger to the panel edge below it. */}
        <span
          aria-hidden="true"
          className={`bg-red absolute -bottom-[15px] left-0 h-[2px] w-full transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      </a>

      {open ? (
        <div
          id={panelId}
          className="border-line-9 bg-ink-95 animate-madmenu absolute inset-x-0 top-full z-[60] max-h-[calc(100vh-70px)] overflow-y-auto border-t shadow-[0_28px_60px_-24px_rgba(0,0,0,.9)] backdrop-blur-[16px]"
        >
          <MegaMenuContent onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
