"use client";

import { useEffect } from "react";

/**
 * Drives the reveal-on-scroll animation for the whole page.
 *
 * Mounted once in the layout. Server components opt in by adding a `data-reveal`
 * attribute — they stay server components, and there is no per-section client
 * boundary.
 *
 * Behaviour is ported from the design: a 26px rise over 0.7s, staggered by
 * (index % 6) * 70ms, triggered at 8% visibility with a -12% bottom margin so
 * elements settle just before they reach the fold. Each element is revealed once.
 *
 * Two departures from the original, both improvements with no visual difference:
 * a MutationObserver picks up nodes added later (the work grid's "show more")
 * instead of re-scanning on a 900ms interval for six seconds, and the hidden
 * state is applied by this component rather than declared in CSS, so a JS
 * failure leaves the page fully visible.
 */
export function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const armed = new WeakSet<Element>();
    let index = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const arm = () => {
      for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (armed.has(element)) continue;
        armed.add(element);
        element.style.transitionDelay = `${(index % 6) * 70}ms`;
        index += 1;
        element.setAttribute("data-reveal-pending", "");
        observer.observe(element);
      }
    };

    arm();

    const mutations = new MutationObserver(arm);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
