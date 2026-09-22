"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Suspends CSS smooth scrolling for the duration of a route change.
 *
 * WHY THIS EXISTS
 * ---------------
 * `globals.css` sets `html { scroll-behavior: smooth }` — the design's own rule,
 * and what animates this site's in-page anchor jumps (#top, #book, /#work,
 * /#services).
 *
 * On a route change, the App Router's scroll handler calls `scrollIntoView()`
 * on the new page's top-level nodes in turn, reading the scroll position
 * between calls to decide whether it still needs to move. Those reads assume
 * the previous call already scrolled. With `scroll-behavior: smooth` in force
 * each call only *starts* an animation, so every read returns the old position,
 * the handler settles on the wrong target, and the page animates away from the
 * top — in practice to the very bottom of the document.
 *
 * Measured on Next 16.3.5, clicking the header's "Contact Us" from the top of
 * /about: the page animated to y=3660 on a document whose maximum scroll is
 * 3660. Same for /contact -> About (y=5779 of 5779). Forcing `scroll-behavior:
 * auto` made both land at 0.
 *
 * So: an inline `scroll-behavior: auto` (inline beats the stylesheet) is set in
 * the capture phase, before the router sees the click, and cleared once the new
 * route has painted. Same-page hash jumps are left alone — those are the ones
 * the design wants animated, and they are not affected by the bug.
 *
 * If a future Next release fixes this, delete the component and its mount in
 * `app/layout.tsx`; the symptom to re-test is in the paragraph above.
 */
export function ScrollBehaviorGuard() {
  const pathname = usePathname();
  const suspended = useRef(false);
  const frame = useRef(0);
  // The path we are currently on, so popstate can tell a route change from a
  // hash jump. Kept in a ref because the listeners are registered once.
  const lastPath = useRef(pathname);

  // Suspend on anything that starts a route change.
  useEffect(() => {
    const html = document.documentElement;

    const suspend = () => {
      suspended.current = true;
      html.style.scrollBehavior = "auto";
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      // Anything off-site — and every tel:/mailto:/wa.me link — has a different
      // origin and is not a route change.
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;

      // A hash jump inside the current page is the case the design animates.
      if (url.pathname === location.pathname) return;

      suspend();
    };

    /* Back/forward. The router also fires popstate for a same-page hash jump —
       clicking the hero's "#book" emits popstate:/#book — so this compares the
       path rather than suspending on every event. Without that check the hero
       and FAQ anchors jump instead of gliding. */
    const onPopState = () => {
      if (location.pathname === lastPath.current) return;
      suspend();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Restore once the new route has rendered and the router's scroll work has
  // flushed. Two frames: one for the paint, one for the scroll that follows it.
  useEffect(() => {
    lastPath.current = pathname;
    if (!suspended.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = "";
        suspended.current = false;
      });
    });

    return () => cancelAnimationFrame(frame.current);
  }, [pathname]);

  return null;
}
