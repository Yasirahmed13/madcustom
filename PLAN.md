# MAD Custom — Next.js rebuild plan

**Status: awaiting your OK before any code is written.**

Source read end to end and verified against disk:
`C:\Users\HP\Downloads\Mad Custom Cars Redesign\index.html` (1107 lines — an inline `<style>`
block, mustache-templated markup, and a `Component` class holding every data array).
`support.js` (1911 lines) is the generated template runtime — grepped for content strings,
found none. It is not ported.

---

## 1. Verified content inventory

All content lives in the `<script type="text/x-dc">` block at index.html:654–1105.

| Array      | Count             | Notes                                                                           |
| ---------- | ----------------- | ------------------------------------------------------------------------------- |
| `SERVICES` | 9                 | num, title, description, slug, gallery key, short label, cover shot, cover crop |
| `PHOTOS`   | 70                | file, service key, vehicle, detail note, tile crop                              |
| `VIDEOS`   | 7                 | + length string and slot index into its gallery                                 |
| `MARQUEE`  | 12                | doubled to 24 in render, 48s linear scroll                                      |
| `INSTA`    | 12                | remote filenames, sliced to `instaRows * 6` (default 12)                        |
| `FAQ`      | 11                | **only the first 5 render** (`FAQ.slice(0,5)`)                                  |
| `REVIEWS`  | 3                 | name, date, quote                                                               |
| `eras`     | 4                 | 1973 / 2000 / 2010 / 2021                                                       |
| `lineage`  | 4                 | the four business names                                                         |
| `trust`    | 4                 | 3,160+ / 35K+ / 5.0 / 2                                                         |
| `pillars`  | 4                 | **dead data — no markup consumes it**                                           |
| step chips | 9 / 3 / 6 / 4 / 3 | services, condition, days, time windows, locations                              |

### Media integrity — checked file by file

70 photos + 7 videos = 77 items. Every one has a `thumb/*.jpg` **and** a `full/*.jpg`;
all 7 `video/*.mp4` present. **Zero missing, zero orphaned.** Every service cover shot and
every marquee entry resolves.

| Service                      | Photos | Videos | Total  |
| ---------------------------- | ------ | ------ | ------ |
| Rims & Tires                 | 29     | 1      | 30     |
| Performance Suspension       | 10     | 1      | 11     |
| Premium Vinyl Wrap           | 7      | 2      | 9      |
| Paint Protection Film        | 7      | 2      | 9      |
| Bespoke Custom Builds        | 6      | 0      | 6      |
| Detailing & Paint Correction | 4      | 0      | 4      |
| Window Tint                  | 4      | 0      | 4      |
| Upholstery                   | 3      | 0      | 3      |
| Performance Exhaust          | 0      | 1      | 1      |
| **All work**                 | **70** | **7**  | **77** |

### Gallery ordering — ported exactly, not approximated

Two subtleties that are easy to get wrong:

1. **Videos are spliced mid-gallery**, not appended. Each video declares a slot index
   (`VIDEOS[i][5]`), inserted after the photos are grouped.
2. **"All work" is not a flat concat.** It deals one shot per service per round starting at
   round 1 (skipping each group's cover), then appends every group's cover at the very end —
   because the covers already lead the service cards.

This ships as a documented, unit-tested `buildGallery()` in `src/data/work.ts`.

---

## 2. Asset map

| Asset                                              | Count | Used by                                                                                               |
| -------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| `mad-wordmark.png`                                 | 1     | header (38px, 30px on phone), footer lockup (34px)                                                    |
| `mad-shield.png`                                   | 1     | About closing block (52px), footer (58px), **+ favicon/app icons**                                    |
| `merge_all_three_videos_remove.mp4`                | 1     | hero background reel, 3.9 MB                                                                          |
| `hero-reel.webm`                                   | 1     | unused by the source and `.gitignore`d — same reel, 3.7 MB. Shipped as a `<source>` ahead of the mp4. |
| `work/thumb/*.jpg`                                 | 77    | gallery tiles 4:5, service covers 16:10, marquee 4:3, About triptych, lightbox filmstrip              |
| `work/full/*.jpg`                                  | 77    | lightbox stage; video poster frames                                                                   |
| `work/video/*.mp4`                                 | 7     | lightbox video stage 9:16, `preload="none"`                                                           |
| `WhatsApp Image/Video …`                           | 81    | raw originals, byte-identical to the renamed `work/` files — not copied                               |
| `WhatsApp Unknown ….zip`, `uploads/`, `.thumbnail` | —     | unreferenced editor scratch — not copied                                                              |

**14 images the design hot-links from `madcustomcars.com` and are NOT in `assets/`** —
all verified HTTP 200 today: `DSC4123-scaled.jpeg` (hero poster / LCP element, 240 KB),
`DSC4114-scaled.jpeg` (CTA band background, 745 KB), and the 12 Instagram grid images.
**See OPEN-QUESTIONS Q1.**

---

## 3. Folder structure

```
src/
  app/
    layout.tsx              fonts, JSON-LD, skip link
    page.tsx                the landing page
    globals.css             tokens + effects Tailwind cannot express cleanly
    not-found.tsx
    sitemap.ts  robots.ts
    icon.png  apple-icon.png          (generated from mad-shield.png)
    opengraph-image.tsx
    api/booking/route.ts    zod + Resend
    services/[slug]/page.tsx
    terms/page.tsx  privacy/page.tsx
  data/                     <- all editable content, no JSX
    site.ts        phones, addresses, hours, email, socials, stats, WhatsApp helpers
    services.ts    the 9 services
    work.ts        70 photos + 7 videos + buildGallery()
    timeline.ts    eras, lineage, story copy, Carly block
    reviews.ts     the 3 reviews
    faq.ts         all 11 questions
    booking.ts     conditions, time windows, locations, step copy, helper text
    instagram.ts   fallback set + getInstagramFeed()
  components/
    ui/            Button, SectionHeader, Chip, Eyebrow, Reveal
    layout/        SiteHeader, MobileMenu, SiteFooter, MobileActionBar
    sections/      Hero, Booking, Services, Work, About, Instagram, Reviews, Faq, CtaBand
    booking/       StepProgress, StepServices, StepVehicle, StepSlot, StepContact,
                   SpecSummary, Confirmation
    work/          Marquee, WorkFilters, WorkGrid, Lightbox
  lib/             seo.ts, jsonld.ts, whatsapp.ts, email.ts
public/
  mad-wordmark.png  mad-shield.png
  hero/             poster + reel (mp4 + webm)
  work/{thumb,full,video}/
  instagram/        the 12 fallback images
```

## 4. Client components (everything else is a Server Component)

`MobileMenu`, `HeroVideo`, `Booking` (wizard root), `Marquee`, `WorkFilters` + `WorkGrid` +
`Lightbox` (one client island sharing filter state), `Faq`, `MobileActionBar`, `Reveal`.
Nine in total — the rest render on the server.

## 5. Dependencies

`next`, `react`, `react-dom`, `tailwindcss`, `zod`, `resend`. Plus `eslint`,
`eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`, `typescript`, `@types/*`.

**Nothing else.** Specifically no animation library — the design's reveal is a plain
IntersectionObserver with a `(i % 6) * 70ms` stagger, which is ~25 lines in a `useReveal`
hook and reproduces the original exactly rather than approximating it. Form state is plain
React state, matching the source, so no form library either.

## 6. Design tokens

- **Colors** — ink `#0c0c0d`, ink-deep `#090909`, surface `#111113`, card `#101013`,
  panel `#121215`, media `#141418`, bone `#F4F3F3`, red `#E01B24`, red-bright `#FF4A52`,
  red-soft `#FF8A90`, green `#3FCB6E`. Text alphas on bone and border alphas on white become
  named tokens rather than scattered `rgba()` literals.
- **Type** — Anton (display), Archivo 400/500/600/700 (body), JetBrains Mono 400/600
  (eyebrows, counters, arrows). Self-hosted via `next/font/google`, `display: swap`.
  Every `clamp()` in the type scale is carried across verbatim.
- **Radius: 0 everywhere.** The only curve in the design is `border-radius:50%` on two status
  dots. This is load-bearing to the look.
- **Container** 1280px, gutter 22px going to 16px below 600px. Section rhythm 78/90 to 56/64.
- **Easing** `cubic-bezier(.22,.7,.2,1)`. Keyframes `madup`, `madfade`, `madpulse` (1.8s),
  `madmarq` (48s). Image hover `scale(1.04)` service / `scale(1.05)` tile over `.7s`.
  FAQ `grid-template-rows 0fr -> 1fr` over `.44s`, icon rotates to 135deg.
- **Breakpoints: exactly two** — 900px and 600px, mapped to custom `tablet:` / `phone:`
  variants so each media-query body ports one-for-one instead of being bent into `sm/md/lg`.

## 7. Build order

1. Scaffold, tokens, fonts, assets → 2. Header + mobile menu → 3. Hero → 4. Booking wizard +
   `/api/booking` → 5. Services → 6. Work + lightbox → 7. About → 8. Instagram → 9. Reviews →
2. FAQ → 11. CTA band, footer, mobile bar → 12. `/services/[slug]`, legal pages, 404, SEO →
3. accessibility + performance pass, `npm run build` and `npm run lint` green, README.
