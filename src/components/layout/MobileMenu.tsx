"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE, TEL_HREF } from "@/data/site";
import { SERVICES } from "@/data/services";
import { APPOINTMENT_URL, PRODUCTS_URL, SERVICES_URL, linkTarget } from "@/data/links";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * The mobile navigation drawer.
 *
 * NOTE: this is an addition. The design simply hides the nav below 900px with
 * `display:none` and offers no menu; the brief asks for a working one. It uses
 * the design's own visual language — hairline rules, mono eyebrows, the red CTA —
 * and nothing about the desktop header changes.
 *
 * Closes on Escape, on backdrop click, and whenever a link is followed. Focus is
 * trapped while open and returned to the toggle on close, and the background is
 * locked without the layout shifting.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  /** The "Services" group inside the drawer, collapsed until it is tapped. */
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const { scrollBarGap } = {
      scrollBarGap: window.innerWidth - document.documentElement.clientWidth,
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (scrollBarGap > 0) root.style.paddingRight = `${scrollBarGap}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const stops = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (stops.length === 0) return;

      const first = stops[0]!;
      const last = stops[stops.length - 1]!;

      if (!panel.contains(document.activeElement)) {
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
    // Move focus into the drawer once it is painted.
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    // Captured now: by cleanup time the ref may already point somewhere else.
    const returnFocusTo = toggleRef.current;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      returnFocusTo?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="border-line-14 text-bone hover:border-red tablet:grid phone:h-[34px] phone:w-[34px] hidden h-[38px] w-[38px] flex-none cursor-pointer place-items-center border bg-transparent transition-colors duration-200"
      >
        <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
          <span className="bg-bone block h-[1.5px] w-full" />
          <span className="bg-bone block h-[1.5px] w-full" />
          <span className="bg-bone block h-[1.5px] w-full" />
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="bg-ink-95 fixed inset-0 z-[90] animate-[madfade_.2s_ease_both] backdrop-blur-[14px]"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div ref={panelRef} className="flex h-full flex-col">
            <div className="border-line-9 phone:px-4 phone:py-2.5 flex items-center gap-4 border-b px-[22px] py-[14px]">
              <Image
                src="/mad-wordmark.png"
                alt="MAD Custom"
                width={116}
                height={38}
                className="h-[30px] w-auto"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="border-line-16 text-bone hover:border-red hover:bg-red-12 ml-auto grid h-11 w-11 flex-none cursor-pointer place-items-center border bg-transparent text-[18px] leading-none transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <nav
              className="phone:px-4 flex-1 overflow-y-auto px-[22px]"
              aria-label="Main"
            >
              <div className="flex flex-col">
                {SITE.nav.map((item) =>
                  item.mega ? (
                    <div key={item.label} className="border-line-9 border-b">
                      <button
                        type="button"
                        onClick={() => setServicesOpen((wasOpen) => !wasOpen)}
                        aria-expanded={servicesOpen}
                        className="font-display text-bone hover:text-red-bright flex w-full cursor-pointer items-center justify-between gap-3 border-none bg-transparent px-0 py-[22px] text-left text-[26px] uppercase transition-colors duration-200"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`text-[12px] transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {servicesOpen ? (
                        <div className="pb-5">
                          {SERVICES.map((service) => (
                            <a
                              key={service.slug}
                              href={SERVICES_URL}
                              target="_blank"
                              rel="noopener"
                              onClick={close}
                              className="text-bone-68 hover:text-red-bright block py-2 text-[15px] transition-colors duration-200"
                            >
                              {service.title}
                            </a>
                          ))}
                          <a
                            href={PRODUCTS_URL}
                            target="_blank"
                            rel="noopener"
                            onClick={close}
                            className="text-red hover:text-red-soft mt-2 block py-2 text-[12px] tracking-[.1em] uppercase transition-colors duration-200"
                          >
                            Shop products ↗
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      {...linkTarget(item.href)}
                      onClick={close}
                      className="border-line-9 font-display text-bone hover:text-red-bright border-b py-[22px] text-[26px] uppercase transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </nav>

            <div className="phone:px-4 border-line-9 flex flex-none flex-col gap-2.5 border-t px-[22px] pt-6 pb-10">
              <a
                href={TEL_HREF}
                onClick={close}
                className="border-line-14 text-bone-80 hover:border-red hover:text-bone border px-[13px] py-[14px] text-center font-mono text-[13px] transition-colors duration-200"
              >
                {SITE.primaryPhoneDisplay}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                onClick={close}
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 border px-5 py-[14px] text-center text-[14px] font-semibold transition-colors duration-200"
              >
                WhatsApp the shop
              </a>
              <a
                href={APPOINTMENT_URL}
                target="_blank"
                rel="noopener"
                onClick={close}
                className="bg-red text-ink hover:bg-red-bright px-5 py-[15px] text-center text-[14px] font-bold tracking-[.03em] transition-colors duration-200"
              >
                Make Appointment
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
