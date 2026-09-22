import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The two-state selectable chip used by the booking steps and the work filters.
 *
 * Selected is solid red with ink text; unselected is a 3% white wash behind a
 * hairline border — the design's `chip()` helper, unchanged.
 */
export function chipClass(active: boolean, className?: string) {
  return cn(
    "cursor-pointer border transition-colors duration-200",
    active
      ? "border-red bg-red text-ink"
      : "border-line-14 bg-white-3 text-bone-86 hover:border-line-22",
    className,
  );
}

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
  children: ReactNode;
};

export function Chip({ active, className, ...props }: ChipProps) {
  return <button type="button" className={chipClass(active, className)} {...props} />;
}
