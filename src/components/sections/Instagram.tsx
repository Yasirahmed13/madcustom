import Image from "next/image";
import { SITE } from "@/data/site";
import { getInstagramFeed } from "@/data/instagram";
import { Container } from "@/components/ui/Container";
import { ReelStrip } from "@/components/instagram/ReelStrip";

/**
 * "05 / Live from Instagram".
 *
 * An async server component: the feed is fetched on the server and cached for
 * 15 minutes, so the reels and the grid are part of the static HTML and no
 * visitor ever calls Instagram's API. The reel strip is the one client island.
 * Without a token it renders the bundled fallback images, with no reels and no
 * note under the grid.
 */
export async function Instagram() {
  const { posts, reels, live } = await getInstagramFeed();

  return (
    <section className="border-line-9 border-t">
      <Container className="phone:pt-14 phone:pb-16 py-[72px]">
        <div className="phone:gap-2.5 mb-[30px] flex flex-wrap items-center gap-[14px]">
          <span
            aria-hidden="true"
            className="bg-green h-2 w-2 animate-[madpulse_1.8s_ease-in-out_infinite] rounded-full"
          />
          <h2 className="text-bone-60 m-0 font-mono text-[11.5px] font-normal tracking-[.16em]">
            05 / LIVE FROM INSTAGRAM
          </h2>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener"
            className="font-display text-bone hover:text-red-bright phone:ml-0 ml-1 text-[clamp(26px,3.4vw,42px)] tracking-[.01em] uppercase transition-colors duration-200"
          >
            {SITE.instagramHandle}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener"
            className="bg-red text-ink hover:bg-red-bright phone:ml-0 phone:w-full phone:text-center ml-auto px-5 py-[13px] text-[14px] font-bold transition-colors duration-200"
          >
            Follow the feed
          </a>
        </div>

        {reels.length > 0 ? <ReelStrip reels={reels} /> : null}

        {posts.length > 0 ? (
          <>
            {reels.length > 0 ? (
              <h3 className="text-bone-60 mt-0 mb-3.5 font-mono text-[11.5px] font-normal tracking-[.16em]">
                LATEST POSTS
              </h3>
            ) : null}
            <div className="phone:grid-cols-3 phone:gap-1.5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,180px),1fr))] gap-2.5">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  target="_blank"
                  rel="noopener"
                  className="border-line-7 bg-surface-media hover:border-red relative block aspect-square overflow-hidden border transition-colors duration-200"
                >
                  <Image
                    src={post.src}
                    alt={post.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) 33vw, (max-width: 900px) 25vw, 180px"
                    className="object-cover"
                    // Remote Instagram CDN URLs are signed and expire, so they are
                    // passed through rather than run through the optimiser.
                    unoptimized={!post.isLocal}
                  />
                </a>
              ))}
            </div>
          </>
        ) : null}

        {live ? (
          <p className="text-bone-35 mt-[18px] mb-0 font-mono text-[12px] tracking-[.06em]">
            Live from the {SITE.instagramHandle} feed, refreshed every 15 minutes.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
