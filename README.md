# MAD Custom

The website for MAD Custom — high-end automotive customization, family-run since 1973,
with shops in Orlando, Florida and Barceloneta, Puerto Rico.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React 19

---

## Running it

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```

Nothing in `.env.local` is required to run the site. Without it:

- the booking form still works end to end; submissions are logged to the server console
  instead of emailed, and the customer sees the phone number and WhatsApp link,
- the Instagram grid shows the twelve bundled images,
- URLs fall back to `https://madcustomcars.com`.

| Command             | What it does               |
| ------------------- | -------------------------- |
| `npm run dev`       | development server         |
| `npm run build`     | production build           |
| `npm start`         | serve the production build |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | TypeScript, no emit        |
| `npm run format`    | Prettier, write            |

---

## Editing the content

**All the words and data on this site live in `src/data/`.** You can change any of it
without opening a component.

| File           | What it holds                                                                             |
| -------------- | ----------------------------------------------------------------------------------------- |
| `site.ts`      | Phone numbers, addresses, shop hours, email, social links, the four hero stats, nav items |
| `services.ts`  | The nine services: number, title, description, URL slug, cover photo                      |
| `work.ts`      | All 70 photos and 7 videos, and the logic that groups them per service                    |
| `timeline.ts`  | The "Our story" section — the eras, the Carly block, the lineage, the closing lines       |
| `reviews.ts`   | Customer reviews                                                                          |
| `faq.ts`       | All eleven questions and which services each relates to                                   |
| `booking.ts`   | Every piece of copy in the booking wizard, plus the option lists                          |
| `instagram.ts` | The Instagram fetch and its fallback images                                               |

### Changing a phone number or an address

`src/data/site.ts`. Each location has a `phoneDisplay` (what people read) and a
`phoneE164` (what `tel:` links and Google use). Change both. Everything that shows a
number — header, footer, mobile bar, spec summary, CTA band, structured data — follows.

### Adding a service

Add an entry to `SERVICES` in `src/data/services.ts` with a unique `galleryKey` and
`slug`, then tag work items with that `galleryKey` in `work.ts`. The service card, the
gallery filter chip, the footer link, the booking checkbox, the sitemap and its own page
at `/services/<slug>` all appear automatically.

### Adding work photos

Each work item needs **two** files, sharing one name:

```
public/work/thumb/<name>.jpg    grid tile and card cover  (~720x960)
public/work/full/<name>.jpg     the lightbox view         (~1200x1600)
```

Then add a row to `PHOTOS` in `src/data/work.ts`:

```ts
{ file: "wheels-bmw-x4m-detail", key: "wheels", car: "BMW X4 M",
  note: "Gloss-black wheels, red M calipers" },
```

- `file` — the filename, without `.jpg`
- `key` — the `galleryKey` of the service it belongs to
- `car` — the vehicle, shown on the tile and in the lightbox
- `note` — one line of detail; may be `""`
- `position` — optional CSS `object-position` if the default centre crop cuts badly,
  e.g. `"center 62%"`

**Order matters.** The first photo listed for a service becomes that service's card
cover, and is skipped at the top of the "All work" grid because it already appears above.

### Adding a video

Three files, one name:

```
public/work/video/<name>.mp4    the clip (portrait, 9:16)
public/work/full/<name>.jpg     its poster frame
public/work/thumb/<name>.jpg    its grid tile
```

Then add a row to `VIDEOS`, which takes two extra fields:

```ts
{ file: "wheels-ram-trx-mount-balance", key: "wheels", car: "Ram 1500 TRX",
  note: "Mount, balance and torque, start to finish", duration: "0:28", slot: 2 },
```

- `duration` — what the ▶ badge shows
- `slot` — where the clip is inserted in that service's gallery. `2` puts it third,
  so clips land among the photos rather than all at the end.

### The FAQ

`src/data/faq.ts` has eleven questions; the homepage shows the first five, which is what
the design does. `HOME_FAQ_COUNT` controls that — set it to `FAQ.length` to show all of
them. The remaining questions appear on the service pages they are tagged for, via the
`services` array on each entry. Those tags are a starting point; retag them freely.

The FAQ structured data is generated from whatever is actually rendered, so it stays
consistent with the page automatically.

---

## Connecting email

Booking submissions go to `POST /api/booking`, which validates them and hands off to
`deliverBooking()` in `src/lib/email.ts`.

1. Create an account at [resend.com](https://resend.com) and verify the sending domain.
2. Put the API key in `RESEND_API_KEY`.
3. Set `BOOKING_TO_EMAIL` (where bookings land) and `BOOKING_FROM_EMAIL` (an address on
   the verified domain).

Until the domain is verified, Resend accepts `onboarding@resend.dev` as the From address
for testing.

**Switching providers** — `src/lib/email.ts` is the only file that talks to an email
service. Replace the body of `deliverBooking()`, keep its signature, and nothing else
changes. It must never throw: a failed send is reported as `{ delivered: false }` and the
booking UI shows the customer the phone number and WhatsApp link rather than an error, so
a provider outage never costs a lead.

The endpoint also drops honeypot submissions silently and throttles to five per IP per ten
minutes. That throttle is per server instance and resets on deploy — it is a speed bump,
not a real rate limiter. Put Vercel's WAF or similar in front if the form is ever targeted.

---

## Connecting Instagram

Set `INSTAGRAM_ACCESS_TOKEN` to a long-lived Instagram Graph API token for
`@madcustomfl`. The grid then fetches real posts, cached for an hour, and falls back to
the bundled images on any error.

**This needs a Business or Creator account linked to a Facebook Page.** Instagram Basic
Display — the old, simpler path — was shut down in December 2024 and no longer works.

To change the fallback images, replace `public/instagram/post-01.jpg` … `post-12.jpg`.

---

## Deploying on Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repo. The framework is detected; no build
   settings to change.
3. Add the environment variables from `.env.example` under **Settings → Environment
   Variables**. `NEXT_PUBLIC_SITE_URL` must be the real production URL with no trailing
   slash — canonical URLs, the sitemap and the social cards are built from it.
4. Deploy, then add the custom domain under **Settings → Domains**.

After the first deploy, submit `https://<your-domain>/sitemap.xml` in Google Search
Console.

Everything except `/api/booking` is statically generated. The homepage revalidates hourly
so the Instagram grid stays current.

---

## Project structure

```
src/
  app/                    routes, metadata, sitemap, robots, icons
    api/booking/          the booking endpoint
    services/[slug]/      one page per service, generated at build time
  components/
    booking/              the four-step wizard
    layout/               header, footer, mobile menu, mobile action bar
    sections/             one component per section of the page
    ui/                   Button, Chip, Container, SectionHeader, Reveal
    work/                 gallery grid, filters, lightbox, marquee
  data/                   all editable content (above)
  lib/                    email, structured data, metadata, WhatsApp links
public/
  work/{thumb,full,video} the shop's photos and clips
  hero/                   poster and background reel (1.mp4)
  instagram/              fallback grid images
scripts/                  one-off asset generation (icons, OG image)
```

Everything is a Server Component unless it needs interactivity. The nine client
components are: the mobile menu, the hero video, the booking wizard, the gallery filters
and grid, the lightbox, the FAQ accordion, and the scroll-reveal observer.

---

## Notes for whoever works on this next

A few decisions that will look odd without the reason:

- **The container is `max-w-[1324px]`, not `1280px`.** The original design set
  `max-width: 1280px` with the browser's default content-box sizing, so its 22px padding
  sat outside that. Tailwind is border-box, so the padding has to be folded in to get the
  same 1280px content column.
- **`box-content` appears on a few elements** — the marquee tiles, the FAQ plus/minus
  icon, the lightbox buttons, two of the About photos. Same reason: in the design their
  borders sit outside a fixed width or height.
- **Headings are `font-weight: 400` with `font-synthesis-weight: none`.** This is the one
  intentional visual departure from the original design. Anton ships a single weight, and
  the original leaves headings at the browser's default bold, so the browser fakes one by
  thickening every stroke — which closes up the counters in B, R, D and O and hurts
  legibility at the hero's 124px. Turning synthesis off shows Anton's real letterforms.
  Synthetic bold does not change glyph metrics, so this affects stroke weight only and
  the layout is byte-for-byte identical either way. Delete the rule to go back.
- **`--font-mono` names `"JetBrains Mono"` directly** instead of using next/font's
  variable. That variable includes a metric-matched fallback face which also captures
  characters outside the Latin subset — including the arrows the design uses (→ ← ↗ ▶ ✕),
  which it renders more than twice as wide.
- **`line-height: normal` on `html`.** The design sets no line-height, so anything
  without an explicit one inherits the browser default. Tailwind's preflight would impose
  1.5 and grow the footer and every small label.

These are all in service of matching the original design exactly. Verified by measuring
both pages: every section matches to the pixel at 1440px and at 390px, apart from the
About section on mobile, which is 6px shorter out of 3512.

### Regenerating the icons and the social card

```bash
node scripts/generate-icons.mjs
```

Builds `src/app/icon.png`, `src/app/apple-icon.png` and `src/app/opengraph-image.jpg`
from the shield logo, the wordmark and the hero poster. Only needed if those change.

### Changing or compressing the hero reel

The hero plays `public/hero/1.mp4` (1280x720, 27.8s, silent, 7.8MB). To swap it for a
different clip, drop the file into `public/hero/` and change the one `<source>` in
`src/components/sections/HeroVideo.tsx`.

The page does not wait for the reel — the poster is shown immediately and the video only
starts downloading once the page has loaded and the main thread is idle — but at 7.8MB
smaller would still be better:

```bash
# roughly halves it, with no visible loss at the size it plays on screen
ffmpeg -i public/hero/1.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow \
  -an -movflags +faststart public/hero/1-small.mp4

# optional VP9 companion, ~20% smaller again for Chrome and Firefox.
# Add it as a <source type="video/webm"> ABOVE the mp4 one — first match wins.
ffmpeg -i public/hero/1.mp4 -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 40 -b:v 0 \
  -an -row-mt 1 public/hero/1.webm
```

Both are silent by design (`-an`), so dropping the audio track costs nothing.
