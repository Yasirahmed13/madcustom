import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The content column: 1280px of content inside a 22px gutter, tightening to
 * 16px below 600px.
 *
 * The max-width is 1324px rather than 1280px because the design's `.mad-wrap`
 * sets `max-width: 1280px` with the browser's default content-box sizing, so
 * the padding sits outside it: 1280 + 22 + 22. Tailwind is border-box, so the
 * same content column needs the padding folded into the max-width. Setting
 * 1280px here would make every section 44px narrower than the design.
 */
export function Container({
  as: Tag = "div",
  id,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag
      id={id}
      className={cn("phone:px-4 mx-auto w-full max-w-[1324px] px-[22px]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
