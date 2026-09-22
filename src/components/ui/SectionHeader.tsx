import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The numbered section label: "01 / BOOK", "02 / CAPABILITIES", and so on.
 */
export function Eyebrow({
  children,
  className,
  tone = "red",
}: {
  children: ReactNode;
  className?: string;
  /** The Instagram and legacy eyebrows are muted rather than red. */
  tone?: "red" | "muted" | "bright";
}) {
  return (
    <div
      className={cn(
        "font-mono text-[11.5px] tracking-[.16em]",
        tone === "red" && "text-red",
        tone === "bright" && "text-red-bright",
        tone === "muted" && "text-bone-60",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section heading block: eyebrow, h2, and an optional lede that sits bottom-right
 * on desktop and drops below the heading on tablet.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  ledeWidth = "34ch",
  titleClassName,
  className,
  reveal = true,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** max-width of the lede, in ch, as the design sets it per section. */
  ledeWidth?: string;
  titleClassName?: string;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <div
      {...(reveal ? { "data-reveal": "" } : {})}
      className={cn("flex flex-wrap items-end gap-[18px]", className)}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "font-display mt-3 mb-0 text-[clamp(32px,4.6vw,58px)] leading-[.95] uppercase",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {lede ? (
        <p
          className="text-bone-60 tablet:ml-0 mt-0 mr-0 mb-1.5 ml-auto text-[14.5px] leading-[1.5]"
          style={{ maxWidth: ledeWidth }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
