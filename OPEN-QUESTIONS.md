# Handover — decisions, deviations and what I need from you

The build is complete. `npm run build` and `npm run lint` both pass clean, and there are no
TypeScript errors. This file replaces the pre-build questions with what actually happened.

---

## 1. What I need from you

| Item | Why | Blocking? |
| --- | --- | --- |
| **Confirm the WhatsApp number** — see §2 | Every WhatsApp link on the site | No — a working number is in place |
| `RESEND_API_KEY` + a verified sending domain | Booking emails to madcustomfl@outlook.com | No — form works, logs server-side, shows the fallback |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, social cards | Before launch |
| Latitude/longitude for both shops | Optional `geo` in the LocalBusiness schema | No — omitted rather than guessed |
| Terms and Privacy copy | Replaces the marked placeholders | Before launch |
| Body copy per service (optional) | `/services/[slug]` currently uses the real one-line description | No |
| `INSTAGRAM_ACCESS_TOKEN` | Live feed instead of the twelve bundled images | No |

---

## 2. The WhatsApp number — please confirm

The design contains no phone number for WhatsApp, only the short link
`https://wa.link/c2aabg`. I resolved it. It redirects to:

- **number `+1 787 421 1779`**
- prefilled message: *"Hi MAD Custom, I'm interested in upgrading my vehicle. Could I get
  more information about your services and pricing?"*

**This is a third number.** It matches neither the Florida shop (+1 407 286 4426) nor the
Puerto Rico shop (+1 787 846 5115) in your footer. I did not invent it, but I also cannot
confirm it is the one you want customers messaging.

It is set as the default of `NEXT_PUBLIC_WHATSAPP_NUMBER`. Change that one env var and
every WhatsApp link on the site follows. `wa.link/c2aabg` is kept in `src/data/site.ts` as
a documented fallback.

---

## 3. Where your brief and the design disagreed

**"See the work →"** — your brief says it filters the gallery and scrolls to it; the
design opens the lightbox. I followed your brief and kept the lightbox on the card image,
so both routes exist and nothing was lost.

One consequence: the design put `tabIndex="-1"` on the card image, which looked like a bug
but was a deliberate de-duplication of tab stops — both buttons went to the same place.
Now that they do different things, the image is back in the tab order with its own label.

**The mobile action bar** — your brief calls it a "mobile sticky bottom bar", but the
design has no media query on it: the Call / WhatsApp / Book bar is pinned at every width,
including desktop, and the footer carries 96px of bottom padding to clear it. Since you
asked for the design matched "pixel for pixel, on desktop and mobile", I reproduced it as
designed. To make it phone-only, add `tablet:hidden` to the wrapper in
`src/components/layout/MobileActionBar.tsx` and drop `pb-24` from the footer. It is a
two-line change and I have left a comment saying so.

**The FAQ** — the design defines eleven questions and renders five. The homepage still
renders five; the other six appear on the service pages they relate to. Those
question-to-service tags are **mine, not yours** — the design has no such mapping. They
are in `src/data/faq.ts` and easy to retag.

---

## 4. Things I added that the design does not have

All requested by your brief, all built in the design's own visual language:

- the mobile menu (the design just hides the nav below 900px)
- inline per-field validation errors, alongside the design's helper text, which is unchanged
- the honeypot field and the rate limit on the booking endpoint
- `/services/[slug]`, at the same nine slugs the design linked out to
- `/terms`, `/privacy`, the 404 page
- sitemap, robots, icons, the Open Graph card

I did **not** add a scroll-shrinking header or a mobile testimonial carousel. Neither is in
your brief or the design.

---

## 5. Known deviations from the design

Two, both deliberate. Everything else matches to the pixel — verified by measuring both
pages section by section at 1440px and 390px (see §7).

**a. The About section is 6px shorter on mobile** (3506px against 3512px, 0.17%).
The design's two square About photos are content-box with `width: 100%` and a 1px border,
so each one overflows its own grid track by 2px. I reproduced that for the widths where it
is visible; the residual 6px at 390px comes from the same quirk compounding and is not
visible. Chasing it further would mean reproducing an overflow bug more precisely than the
bug reproduces itself.

**b. The hero shows the poster instead of the reel under `prefers-reduced-motion`.**
The design plays the video regardless. Your brief asked for reduced motion to be respected,
so the reel is not downloaded at all for those visitors, or for anyone with Data Saver on.

**c. Headings render at Anton's true weight, not synthetic bold — at your request.**
Anton ships one weight (400). The original design leaves headings at the browser's default
bold, so the browser manufactures one by thickening every stroke, which closes up the
counters in B, R, D and O. You asked for it toned down for legibility, so
`font-synthesis-weight: none` now turns that off site-wide and headings show the
letterforms Anton was drawn with.

There is no middle setting available: with only a 400 face, any weight from 600 up
synthesises the same bold and anything below renders as 400. Synthetic bold changes stroke
thickness but not glyph metrics, so **the layout is unchanged** — still 20 of 21 sections
matching the original exactly. To revert, delete the `h1…h6` rule in `src/app/globals.css`.

---

## 6. Colour contrast — needs your decision

This is the one place where your brief contradicts itself, so I have left the design
untouched and am reporting it rather than deciding for you.

Your brief asks for "good color contrast" and Lighthouse 95+ on accessibility, and also
says not to redesign anything. The design's palette fails WCAG AA for small text in three
families — 51 elements, 19 distinct colour pairs:

| Combination | Ratio | Needs | Where |
| --- | --- | --- | --- |
| `#0c0c0d` on `#E01B24` | **4.05** | 4.5 | text on every red button |
| `#E01B24` on `#0c0c0d` / `#111113` | **4.05 / 3.90** | 4.5 | the numbered eyebrows, counters, small red labels |
| bone at 35–45% on dark | **2.97–3.83** | 4.5 | small uppercase captions, helper text, footer column titles |

Everything else is fixed: accessibility is **96**, and contrast is the only remaining
violation across all five page types. Options, in order of how little they change:

1. **Leave it.** It is the brand. Accessibility stays at 96.
2. **Small text only.** Bump the sub-4.5 bone alphas up by roughly 10 points
   (`bone-40` → `bone-50`, etc.). Barely perceptible, clears one whole family.
3. **Red on dark.** Use `#FF4A52` — already in the design — instead of `#E01B24` for the
   small red labels. 6.6:1. Visible, but the design already mixes both reds.
4. **Text on red.** Only white clears 4.5 on `#E01B24` (4.82). Black does not — it is 4.35.
   This would change the signature ink-on-red button, so I would not do it without you
   asking.

All four are token-level edits in `src/app/globals.css`. Say which and I will apply it.

---

## 7. What I verified

- **Pixel fidelity.** Both pages measured element by element in a real browser. Every
  section matches exactly at 1440px and 390px except the 6px in §5a. The h1's `16ch`
  max-width computes differently because of next/font's fallback metrics, but the rendered
  text is identical to the pixel (560.8px wide, 207.8px tall on both), and the box is
  wider than the text either way.
- **Gallery ordering.** The ported grouping and the "All work" interleave were diffed
  against the original algorithm run on the original data: identical, item for item.
- **Media.** All 77 items resolve — 70 photos and 7 videos, each with a thumb and a full,
  every video present. Zero missing, zero orphaned.
- **Booking.** Full run through all four steps: per-step validation, live spec summary,
  the day picker skipping Sundays, submission, the payload, the confirmation and the reset.
  The endpoint tested directly for valid input, honeypot, each validation failure,
  malformed JSON and the rate limit.
- **Lightbox.** Opens, locks scroll, traps focus, ← → Esc, returns focus to the tile.
- **Accessibility.** axe-core across all five page types: one violation type left
  (contrast, §6). One h1 per page, every image has alt text, all landmarks correct.
- **Structured data.** Both AutoRepair nodes, FAQPage, Service and BreadcrumbList all
  parse, with real addresses, phone numbers and hours.

### Lighthouse

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop, homepage | **98** | 96 | 100 | 100 |
| Desktop, service page | **99** | 96 | 100 | 100 |
| Mobile, homepage | see below | 96 | 100 | 100 |

CLS is **0** on every run. Accessibility is 96 on every page, held back only by §6.

**Mobile performance could not be measured reliably here.** Repeated runs on this machine
swung between 60 and 91 because Lighthouse's mobile score is derived from simulated CPU
throttling, and the host had 33 Chrome processes of your own running throughout. The
figure that does not depend on the simulation — LCP measured directly under real 4x CPU
throttling and slow 4G — is **2.8s**, down from 3.5s before I optimised it. Run
`npx lighthouse http://localhost:3000 --preset=perf` on a quiet machine for a number you
can trust.

What I changed to get there: the hero reel (3.6MB) now waits for the page to finish
loading and the main thread to go idle, so it is no longer in the critical path; the
booking steps 2–4 and the lightbox are code-split out of the initial bundle; and the app
icon went from 168KB to 8.8KB. On desktop that took performance from 87 to 98 and total
blocking time from 240ms to 40ms.

The remaining mobile cost is React hydrating a large page — the LCP image arrives at
811ms but cannot paint until hydration yields. The structural fix would be to
server-render the work grid and keep only the filter chips and lightbox on the client.
That is a real refactor with real risk to the pixel fidelity above, so I have not done it
speculatively. Say the word and I will.

---

## 8. Two things in the design worth a second look

- **The stats are unsourced.** `3,160+ cars delivered`, `35K+ shop hours`, `5.0 Google
  rating`, `2 locations`. All four carried across verbatim, nothing invented. A public
  "5.0 Google rating" is worth being certain of.
- **`Magueyes Auto Desing`** is spelled that way in both the 2010 era tag and the lineage
  chip. It reads like the business's registered name rather than a slip, so I left it
  exactly as written. One-word fix if it is a typo.
- **`pillars` was dead data.** The design builds a four-item array — Master craft / Bespoke
  programs / Premium protection / White-glove aftercare — that no markup consumes. Left
  out. Say so if there was meant to be a pillars section.
