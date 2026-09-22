"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { isExternalHref } from "@/data/links";
import { MegaMenuContent } from "./MegaMenuContent";

/**
 * The nav as it appears below 900px: a second header row of chips that scrolls
 * sideways, so every page is visible without opening anything.
 *
 * "Services" is a button rather than a link — it drops the same mega menu
 * content as the desktop panel, stacked into a sheet. The hamburger drawer is
 * still there beside the CTA for the full menu and the contact actions.
 *
 * The sheet sits outside the header bar, so its `top-full` resolves against the
 * sticky header and it hangs below this strip rather than below the bar.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

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

  const chip =
    "flex-none whitespace-nowrap border px-[11px] py-[6px] font-mono text-[11px] tracking-[.1em] uppercase transition-colors duration-200";
  const chipIdle = "border-line-12 text-bone-62 hover:text-bone";

  return (
    <div ref={wrapperRef} className="tablet:block hidden">
      <nav
        aria-label="Pages"
        className="border-line-9 border-t"
        // The right edge fades instead of cutting off, so it reads as scrollable.
        style={{
          maskImage: "linear-gradient(90deg,#000 calc(100% - 30px),transparent)",
          WebkitMaskImage: "linear-gradient(90deg,#000 calc(100% - 30px),transparent)",
        }}
      >
        <div className="phone:px-4 phone:gap-1.5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-[22px] py-2 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
          {SITE.nav.map((item) => {
            if (item.mega) {
              return (
                <button
                  key={item.label}
                  ref={triggerRef}
                  type="button"
                  onClick={() => setOpen((wasOpen) => !wasOpen)}
                  aria-expanded={open}
                  aria-controls={open ? sheetId : undefined}
                  className={`${chip} flex cursor-pointer items-center gap-1.5 ${
                    open ? "border-red bg-red-12 text-bone" : `${chipIdle} bg-transparent`
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`text-[7px] leading-none transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
              );
            }

            return isExternalHref(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener"
                onClick={close}
                className={`${chip} ${chipIdle}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                className={`${chip} ${chipIdle}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {open ? (
        <div
          id={sheetId}
          className="border-line-9 bg-ink-95 animate-madmenu absolute inset-x-0 top-full z-[60] max-h-[calc(100vh-120px)] overflow-y-auto border-t shadow-[0_28px_60px_-24px_rgba(0,0,0,.9)] backdrop-blur-[16px]"
        >
          <MegaMenuContent stacked onNavigate={close} />
        </div>
      ) : null}
    </div>
  );
}
