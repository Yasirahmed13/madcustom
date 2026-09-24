/**
 * The site's two button treatments, as class strings for <a>, <Link> and
 * <button> alike: the solid red call to action (ink text on red) and the
 * hairline ghost beside it. Square corners, like everything else.
 */

export const BUTTON_PRIMARY =
  "bg-red text-ink hover:bg-red-bright hover:text-ink phone:justify-center inline-flex items-center gap-2.5 px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200";

export const BUTTON_GHOST =
  "border-line-20 text-bone hover:border-red hover:bg-red-10 hover:text-bone phone:justify-center inline-flex items-center gap-2.5 border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200";
