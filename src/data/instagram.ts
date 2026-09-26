/**
 * "05 / Live from Instagram".
 *
 * Fetches the @madcustomfl feed from the Instagram API when
 * INSTAGRAM_ACCESS_TOKEN is set, and splits it in two: the latest reels, which
 * play on the site, and a grid of the latest posts. Without a token — or if
 * the API errors, times out or returns nothing — the section shows the twelve
 * images bundled with the design and no reels. The section always renders.
 *
 * NOTE: Instagram Basic Display was shut down in December 2024. The token has
 * to come from the Instagram API with Instagram Login, for a Business or
 * Creator account, and expires after 60 days unless refreshed. See the README.
 */
import { SITE } from "./site";

export type InstagramPost = {
  id: string;
  /** Image to show in the grid. For videos this is the thumbnail. */
  src: string;
  /** Where the tile links to. */
  href: string;
  alt: string;
  /** Local fallbacks are in /public and can be optimised at build time. */
  isLocal: boolean;
};

export type InstagramReel = {
  id: string;
  /**
   * The MP4. Instagram leaves it out for reels with copyrighted material —
   * licensed music, typically — and those link out to Instagram instead of
   * playing here.
   */
  video?: string;
  /** The cover image. */
  poster?: string;
  /** The reel on Instagram. */
  href: string;
  /** First line of the caption, for labels and alt text. */
  title: string;
  /** The caption, trimmed, for the player. */
  caption: string;
  /** "Sep 24, 2026", or undefined if Instagram sent no usable timestamp. */
  date?: string;
};

/** How many tiles the grid shows. The design renders two rows of six. */
export const INSTAGRAM_GRID_SIZE = 12;

/** How many reels the strip above the grid shows. */
export const INSTAGRAM_REEL_COUNT = 8;

/**
 * How many recent items are requested. Enough to fill the reel strip and the
 * grid from a mixed feed in a single call — the API allows 200 an hour, and
 * this makes one every 15 minutes at most.
 */
const FETCH_LIMIT = 30;

/**
 * The bundled fallback grid, downloaded from the original design.
 * Replace the files in /public/instagram to change these.
 */
export const FALLBACK_POSTS: readonly InstagramPost[] = Array.from(
  { length: INSTAGRAM_GRID_SIZE },
  (_, i) => ({
    id: `fallback-${i + 1}`,
    src: `/instagram/post-${String(i + 1).padStart(2, "0")}.jpg`,
    href: SITE.instagramUrl,
    alt: `MAD Custom work on Instagram, post ${i + 1} of ${INSTAGRAM_GRID_SIZE}`,
    isLocal: true,
  }),
);

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: "AD" | "FEED" | "STORY" | "REELS";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  /** "2026-09-24T18:03:11+0000" */
  timestamp?: string;
};

/** First sentence of the caption, trimmed to something usable as alt text. */
function altFromCaption(caption: string | undefined, index: number): string {
  const clean = caption?.replace(/\s+/g, " ").trim();
  if (!clean) return `MAD Custom work on Instagram, post ${index + 1}`;
  const firstLine = clean.split(/[.!?\n]/)[0]?.trim() ?? clean;
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}…` : firstLine;
}

/** The caption with its line breaks kept, runs of blank lines and spaces collapsed. */
function tidyCaption(caption: string | undefined): string {
  const clean = (caption ?? "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
  return clean.length > 400 ? `${clean.slice(0, 399)}…` : clean;
}

/** Dates are shown in shop time, so the server and every visitor agree. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

function formatDate(timestamp: string | undefined): string | undefined {
  if (!timestamp) return undefined;
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? undefined : DATE_FORMAT.format(date);
}

function toReel(media: GraphMedia, index: number): InstagramReel | null {
  if (!media.media_url && !media.thumbnail_url) return null;
  return {
    id: media.id,
    video: media.media_url,
    poster: media.thumbnail_url,
    href: media.permalink ?? SITE.instagramUrl,
    title: altFromCaption(media.caption, index),
    caption: tidyCaption(media.caption),
    date: formatDate(media.timestamp),
  };
}

function toPost(media: GraphMedia, index: number): InstagramPost | null {
  const src = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
  if (!src) return null;
  return {
    id: media.id,
    src,
    href: media.permalink ?? SITE.instagramUrl,
    alt: altFromCaption(media.caption, index),
    isLocal: false,
  };
}

/**
 * The Instagram feed. Cached for 15 minutes; never throws.
 *
 * `reels` is empty unless the feed is live. `posts` is the latest items not
 * already in the reel strip — older reels included, as thumbnails — and can be
 * empty for an account that posts nothing but reels.
 *
 * Instagram's media URLs are signed and expire, which is why they are
 * re-fetched on this cadence rather than stored.
 */
export async function getInstagramFeed(): Promise<{
  posts: readonly InstagramPost[];
  reels: readonly InstagramReel[];
  live: boolean;
}> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { posts: FALLBACK_POSTS, reels: [], live: false };

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
    );
    url.searchParams.set("limit", String(FETCH_LIMIT));
    url.searchParams.set("access_token", token);

    const response = await fetch(url, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Instagram responded ${response.status}`);

    const body = (await response.json()) as { data?: GraphMedia[] };
    const media = body.data ?? [];

    const reels = media
      .filter((item) => item.media_product_type === "REELS")
      .map(toReel)
      .filter((reel): reel is InstagramReel => reel !== null)
      .slice(0, INSTAGRAM_REEL_COUNT);

    const inStrip = new Set(reels.map((reel) => reel.id));
    const posts = media
      .filter((item) => !inStrip.has(item.id))
      .map(toPost)
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, INSTAGRAM_GRID_SIZE);

    if (reels.length === 0 && posts.length === 0) {
      throw new Error("Instagram returned no usable media");
    }

    return { posts, reels, live: true };
  } catch (error) {
    // A broken feed must never break the page.
    console.warn(
      "[instagram] falling back to bundled images:",
      error instanceof Error ? error.message : error,
    );
    return { posts: FALLBACK_POSTS, reels: [], live: false };
  }
}
