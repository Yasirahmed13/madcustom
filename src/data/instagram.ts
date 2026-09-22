/**
 * "05 / Live from Instagram".
 *
 * Fetches the @madcustomfl grid from the Instagram Graph API when
 * INSTAGRAM_ACCESS_TOKEN is set, and falls back to the twelve images bundled
 * with the design otherwise — including if the API errors, times out or returns
 * nothing. The section always renders.
 *
 * NOTE: Instagram Basic Display was shut down in December 2024. A working token
 * now requires a Business or Creator account linked to a Facebook Page. See the
 * README for how to get one.
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

/** How many tiles the grid shows. The design renders two rows of six. */
export const INSTAGRAM_GRID_SIZE = 12;

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
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
};

/** First sentence of the caption, trimmed to something usable as alt text. */
function altFromCaption(caption: string | undefined, index: number): string {
  const clean = caption?.replace(/\s+/g, " ").trim();
  if (!clean) return `MAD Custom work on Instagram, post ${index + 1}`;
  const firstLine = clean.split(/[.!?\n]/)[0]?.trim() ?? clean;
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}…` : firstLine;
}

/**
 * The Instagram grid. Cached for an hour; never throws.
 */
export async function getInstagramFeed(): Promise<{
  posts: readonly InstagramPost[];
  live: boolean;
}> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { posts: FALLBACK_POSTS, live: false };

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink",
    );
    url.searchParams.set("limit", String(INSTAGRAM_GRID_SIZE));
    url.searchParams.set("access_token", token);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Instagram responded ${response.status}`);

    const body = (await response.json()) as { data?: GraphMedia[] };
    const posts = (body.data ?? [])
      .map((media, index): InstagramPost | null => {
        const src = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
        if (!src) return null;
        return {
          id: media.id,
          src,
          href: media.permalink ?? SITE.instagramUrl,
          alt: altFromCaption(media.caption, index),
          isLocal: false,
        };
      })
      .filter((p): p is InstagramPost => p !== null)
      .slice(0, INSTAGRAM_GRID_SIZE);

    if (posts.length === 0) throw new Error("Instagram returned no usable media");

    return { posts, live: true };
  } catch (error) {
    // A broken feed must never break the page.
    console.warn(
      "[instagram] falling back to bundled images:",
      error instanceof Error ? error.message : error,
    );
    return { posts: FALLBACK_POSTS, live: false };
  }
}
