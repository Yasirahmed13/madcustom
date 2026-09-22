import Image from "next/image";
import { MARQUEE } from "@/data/work";

/**
 * The scrolling strip of recent work.
 *
 * The twelve shots are rendered twice and the track translates -50% over 48s,
 * so the loop is seamless. It is a CSS animation with no JavaScript, which
 * keeps this a server component; `prefers-reduced-motion` stops it in
 * globals.css.
 *
 * Decorative, and every shot appears in the gallery below, so the whole strip
 * is aria-hidden.
 */
export function Marquee() {
  const tiles = [...MARQUEE, ...MARQUEE];

  return (
    <div
      aria-hidden="true"
      className="mad-marquee phone:pb-14 flex w-max animate-[madmarq_48s_linear_infinite] gap-[14px] pb-[70px]"
    >
      {tiles.map((tile, index) => (
        <div
          key={`${tile.file}-${index}`}
          className="border-line-8 bg-surface-media relative box-content aspect-[4/3] w-[clamp(240px,26vw,380px)] overflow-hidden border"
        >
          <Image
            src={`/work/thumb/${tile.file}.jpg`}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 600px) 60vw, 26vw"
            className="object-cover"
            style={{ objectPosition: tile.position }}
          />
        </div>
      ))}
    </div>
  );
}
