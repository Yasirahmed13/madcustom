/**
 * The design's three typefaces, self-hosted by next/font so there is no
 * render-blocking request to Google and no layout shift.
 *
 * `display: "swap"` plus the fallback metrics next/font generates mean text is
 * painted immediately in a size-matched fallback and swapped without reflow.
 */
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";

/** Display face: every heading, the stat numbers and the era years. */
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

/** Body face: copy, buttons and form fields. */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

/**
 * Mono face: eyebrows, counters, phone numbers, badges and arrows.
 *
 * NOTE: globals.css deliberately does NOT use this variable for --font-mono.
 * See the comment there — the metric-matched fallback face next/font generates
 * would swallow the design's arrow glyphs and render them far too wide.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const fontVariables = `${anton.variable} ${archivo.variable} ${jetbrainsMono.variable}`;
