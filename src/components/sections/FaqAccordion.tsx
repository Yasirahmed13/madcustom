"use client";

import { useId, useState } from "react";
import type { FaqEntry } from "@/data/faq";

/**
 * The FAQ accordion.
 *
 * One panel open at a time, as designed. Each row is a real <button> with
 * aria-expanded and aria-controls, so it is reachable and operable by keyboard
 * with no extra handlers; the panel is a region labelled by its button.
 *
 * The open animation is the design's: grid-template-rows 0fr → 1fr over .44s,
 * with the body fading in .34s behind an .08s delay. It animates height without
 * measuring anything, and collapses cleanly under prefers-reduced-motion.
 */
export function FaqAccordion({ entries }: { entries: readonly FaqEntry[] }) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <div className="border-line-12 border-t">
      {entries.map((entry, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={entry.question} data-reveal className="border-line-12 border-b">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="hover:text-red-bright phone:gap-3 phone:py-[18px] phone:pr-0 phone:text-[15.5px] flex w-full cursor-pointer items-center gap-4 border-none pt-[22px] pr-[14px] pb-[22px] pl-0 text-left text-[16.5px] leading-[1.4] font-semibold transition-colors duration-[250ms]"
                style={{
                  color: isOpen ? "#FF4A52" : "#F4F3F3",
                  background: isOpen ? "rgba(224,27,36,.05)" : "transparent",
                }}
              >
                <span className="text-red flex-none font-mono text-[12px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-pretty">{entry.question}</span>
                <span
                  aria-hidden="true"
                  className="ease-mad box-content grid h-[26px] w-[26px] flex-none place-items-center border transition-[transform,background-color,border-color] duration-[420ms]"
                  style={{
                    transform: `rotate(${isOpen ? 135 : 0}deg)`,
                    background: isOpen ? "#E01B24" : "transparent",
                    color: isOpen ? "#0c0c0d" : "#E01B24",
                    borderColor: isOpen ? "#E01B24" : "rgba(224,27,36,.5)",
                  }}
                >
                  <span className="text-[15px] leading-none font-bold">+</span>
                </span>
              </button>
            </h3>

            <div
              className="ease-mad grid transition-[grid-template-rows] duration-[440ms]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div
                className="min-h-0 overflow-hidden transition-opacity duration-[340ms]"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? ".08s" : "0s",
                }}
              >
                <div id={panelId} role="region" aria-labelledby={buttonId}>
                  <p className="text-bone-66 phone:pl-0 phone:text-[14.5px] m-0 max-w-[62ch] pt-0 pr-0 pb-6 pl-8 text-[15px] leading-[1.7] text-pretty">
                    {entry.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
