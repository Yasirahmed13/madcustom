// One-off asset generation: app icons from the shield logo, OG card from the hero frame.
// Run with `node scripts/generate-icons.mjs`. Outputs are committed, so this only needs
// re-running if mad-shield.png, the hero poster or the wordmark change.
import sharp from "sharp";
import { mkdirSync } from "fs";

const INK = { r: 12, g: 12, b: 13, alpha: 1 };
const shield = "public/mad-shield.png";
const wordmark = "public/mad-wordmark.png";
const poster = "public/hero/poster.jpg";

mkdirSync("src/app", { recursive: true });

async function icon(size, out, padRatio = 0.16) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const badge = await sharp(shield)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: badge, gravity: "center" }])
    // Palette + max compression: the browser fetches icon.png on every page
    // load, so its size matters. Full colour at 512px was 168 KiB.
    .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
    .toFile(out);
  console.log("wrote", out, `${size}x${size}`);
}

async function og() {
  const W = 1200, H = 630;
  const base = await sharp(poster)
    .resize(W, H, { fit: "cover", position: "attention" })
    .toBuffer();
  const scrim = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stop-color="#0c0c0d" stop-opacity="0.94"/>
          <stop offset="55%" stop-color="#0c0c0d" stop-opacity="0.72"/>
          <stop offset="100%" stop-color="#0c0c0d" stop-opacity="0.45"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#E01B24"/>
    </svg>`,
  );
  const mark = await sharp(wordmark).resize({ height: 92 }).toBuffer();
  const text = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="72" y="392" fill="#F4F3F3" font-family="Arial Black, Arial, sans-serif"
            font-size="76" font-weight="900" letter-spacing="-1">BUILT BEYOND</text>
      <text x="72" y="470" fill="#E01B24" font-family="Arial Black, Arial, sans-serif"
            font-size="76" font-weight="900" letter-spacing="-1">THE ORDINARY</text>
      <text x="72" y="530" fill="#F4F3F3" fill-opacity="0.66" font-family="Arial, sans-serif"
            font-size="26" letter-spacing="3">ORLANDO, FL  ·  BARCELONETA, PR</text>
    </svg>`,
  );
  await sharp(base)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: mark, top: 72, left: 72 },
      { input: text, top: 0, left: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile("src/app/opengraph-image.jpg");
  console.log("wrote src/app/opengraph-image.jpg 1200x630");
}

await icon(192, "src/app/icon.png");
await icon(180, "src/app/apple-icon.png", 0.12);
await og();
