/**
 * The design's three typefaces, self-hosted from src/fonts so there is no
 * render-blocking request to Google and no layout shift.
 *
 * They are the Latin subsets from Google Fonts, committed to the repo and
 * loaded with next/font/local rather than next/font/google. next/font/google
 * downloads the files at build time, and Turbopack's handling of that download
 * failed on the deploy host ("next/font/google queries have exactly one
 * entry") while passing locally — so the build now never touches the network
 * for fonts. Archivo and JetBrains Mono are variable fonts: one file covers
 * every weight the design uses.
 *
 * `display: "swap"` plus the fallback metrics next/font generates mean text is
 * painted immediately in a size-matched fallback and swapped without reflow.
 */
import localFont from "next/font/local";

/** Display face: every heading, the stat numbers and the era years. */
export const anton = localFont({
  src: "../fonts/anton-latin.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-anton",
  adjustFontFallback: "Arial",
});

/** Body face: copy, buttons and form fields. Variable, 400–700. */
export const archivo = localFont({
  src: "../fonts/archivo-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  adjustFontFallback: "Arial",
});

/**
 * Mono face: eyebrows, counters, phone numbers, badges and arrows. Variable,
 * 400–600.
 *
 * No metric-matched fallback face (`adjustFontFallback: false`): one would also
 * claim every character the Latin subset omits — including the arrows this
 * design uses (→ ← ↗ ▶ ✕) — and render them far wider than the design does.
 * Without it, those glyphs fall through to the generic monospace family, as
 * the original design has them.
 */
export const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-var.woff2",
  weight: "400 600",
  style: "normal",
  display: "swap",
  variable: "--font-jetbrains-mono",
  adjustFontFallback: false,
});

export const fontVariables = `${anton.variable} ${archivo.variable} ${jetbrainsMono.variable}`;
