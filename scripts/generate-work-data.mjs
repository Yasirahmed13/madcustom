/**
 * One-off: lifts the PHOTOS, VIDEOS and MARQUEE arrays out of the original design's
 * index.html and writes src/data/work.ts. Kept in the repo so the transcription is
 * reproducible and auditable, but work.ts is a normal source file now — edit it
 * directly to add photos. Re-running this would overwrite your edits.
 */
import { readFileSync, writeFileSync } from "fs";

const SRC = process.argv[2] ?? "C:/Users/HP/Downloads/Mad Custom Cars Redesign/index.html";
const html = readFileSync(SRC, "utf8");

function arr(name) {
  const start = html.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error("array not found: " + name);
  const open = html.indexOf("[", start);
  let depth = 0, i = open;
  for (; i < html.length; i++) {
    if (html[i] === "[") depth++;
    else if (html[i] === "]") { depth--; if (depth === 0) break; }
  }
  return eval(html.slice(open, i + 1));
}

const PHOTOS = arr("PHOTOS");
const VIDEOS = arr("VIDEOS");
const MARQUEE = arr("MARQUEE");

const q = (s) => JSON.stringify(s);
const photos = PHOTOS.map(
  (p) =>
    `  { file: ${q(p[0])}, key: ${q(p[1])}, car: ${q(p[2])}, note: ${q(p[3])}` +
    (p[4] ? `, position: ${q(p[4])}` : "") + ` },`,
).join("\n");
const videos = VIDEOS.map(
  (v) =>
    `  {\n    file: ${q(v[0])},\n    key: ${q(v[1])},\n    car: ${q(v[2])},\n    note: ${q(v[3])},\n` +
    `    duration: ${q(v[4])},\n    slot: ${v[5]},` + (v[6] ? `\n    position: ${q(v[6])},` : "") + `\n  },`,
).join("\n");
const marquee = MARQUEE.map((m) => `  { file: ${q(m[0])}, position: ${q(m[1])} },`).join("\n");

const file = `/**
 * Every photo and video on the shop floor: 70 stills and 7 clips.
 *
 * Files live in /public/work/{thumb,full,video}. A work item's \`file\` is the
 * filename without an extension and is shared by all three: thumb/<file>.jpg,
 * full/<file>.jpg and, for videos, video/<file>.mp4 with full/<file>.jpg as its
 * poster frame.
 *
 * To add a photo: drop thumb/<name>.jpg and full/<name>.jpg into /public/work,
 * then add a row to PHOTOS with the matching \`key\` from services.ts. Order
 * matters — the first item of each service is its gallery cover.
 *
 * Generated once from the original design by scripts/generate-work-data.mjs.
 * Edit this file directly from here on.
 */
import { SERVICES, SERVICE_BY_KEY, type Service } from "./services";

export type WorkPhoto = {
  /** Filename without extension, shared by the thumb and full versions. */
  file: string;
  /** Gallery key of the owning service. */
  key: string;
  /** Vehicle, e.g. "BMW X4 M". */
  car: string;
  /** One-line detail. May be empty. */
  note: string;
  /** CSS object-position for the tile crop. Defaults to "center". */
  position?: string;
};

export type WorkVideo = WorkPhoto & {
  /** Display length, e.g. "0:28". */
  duration: string;
  /** Index this clip is spliced into within its service gallery. */
  slot: number;
};

export type WorkItem = WorkPhoto & {
  /** Present only on videos. */
  duration?: string;
  thumb: string;
  full: string;
  /** Present only on videos. */
  video?: string;
};

/** Shop photos, best first within each service. */
export const PHOTOS: readonly WorkPhoto[] = [
${photos}
] as const;

/** Shop videos. The poster frame shares the filename under /public/work/full. */
export const VIDEOS: readonly WorkVideo[] = [
${videos}
] as const;

/** The 12 shots in the "Recent metal" marquee, doubled at render time. */
export const MARQUEE: readonly { file: string; position: string }[] = [
${marquee}
] as const;

function toItem(w: WorkPhoto | WorkVideo, isVideo: boolean): WorkItem {
  return {
    ...w,
    position: w.position ?? "center",
    thumb: \`/work/thumb/\${w.file}.jpg\`,
    full: \`/work/full/\${w.file}.jpg\`,
    ...(isVideo ? { video: \`/work/video/\${w.file}.mp4\` } : {}),
  };
}

/**
 * Every work item, photos first then videos — the canonical order the rest of
 * the site indexes into.
 */
export const ITEMS: readonly WorkItem[] = [
  ...PHOTOS.map((p) => toItem(p, false)),
  ...VIDEOS.map((v) => toItem(v, true)),
];

export const isVideo = (item: WorkItem): boolean => Boolean(item.video);

/**
 * Per-service galleries, as indexes into ITEMS.
 *
 * Videos are not appended — each one is spliced into its service's list at its
 * declared \`slot\`, so clips land mid-grid rather than all at the end. This is
 * the original design's behaviour and the ordering is deliberate.
 */
export const GROUPS: Readonly<Record<string, number[]>> = (() => {
  const groups: Record<string, number[]> = {};
  for (const service of SERVICES) groups[service.galleryKey] = [];

  ITEMS.forEach((item, index) => {
    if (!isVideo(item)) groups[item.key]?.push(index);
  });
  // Second pass: videos splice in at their slot, which requires the photos to
  // already be in place.
  ITEMS.forEach((item, index) => {
    if (!isVideo(item)) return;
    const video = VIDEOS.find((v) => v.file === item.file);
    groups[item.key]?.splice(video?.slot ?? 0, 0, index);
  });

  return groups;
})();

/**
 * The "All work" ordering.
 *
 * Not a flat concatenation: it deals one shot per service per round, starting at
 * round 1 so each gallery's cover is skipped, then appends every cover at the
 * very end — the covers already lead the service cards above, so repeating them
 * at the top of the grid would be redundant.
 */
export const ALL: readonly number[] = (() => {
  const all: number[] = [];
  const deepest = Math.max(...Object.values(GROUPS).map((g) => g.length));

  for (let round = 1; round < deepest; round++) {
    for (const service of SERVICES) {
      const id = GROUPS[service.galleryKey]?.[round];
      if (id !== undefined) all.push(id);
    }
  }
  for (const service of SERVICES) {
    const cover = GROUPS[service.galleryKey]?.[0];
    if (cover !== undefined) all.push(cover);
  }

  return all;
})();

const plural = (n: number, word: string) => \`\${n} \${word}\${n === 1 ? "" : "s"}\`;

/** "29 photos · 1 video", correctly singularised, empty parts dropped. */
export function countLabel(ids: readonly number[]): string {
  const videos = ids.filter((id) => {
    const item = ITEMS[id];
    return item ? isVideo(item) : false;
  }).length;
  const photos = ids.length - videos;
  return [photos && plural(photos, "photo"), videos && plural(videos, "video")]
    .filter(Boolean)
    .join(" · ");
}

/** The item ids shown for a filter: a service's gallery key, or "all". */
export function galleryFor(key: string): readonly number[] {
  return key === "all" ? ALL : (GROUPS[key] ?? []);
}

export function serviceForItem(item: WorkItem): Service | undefined {
  return SERVICE_BY_KEY[item.key];
}

/** Alt text, built the same way the original design built it. */
export function altFor(item: WorkItem): string {
  const service = serviceForItem(item);
  const suffix = service ? \` (\${service.title}\${isVideo(item) ? " video" : ""})\` : "";
  return \`\${item.car}\${item.note ? \` — \${item.note}\` : ""}\${suffix}\`;
}
`;

writeFileSync("src/data/work.ts", file);
console.log(
  `wrote src/data/work.ts — ${PHOTOS.length} photos, ${VIDEOS.length} videos, ${MARQUEE.length} marquee`,
);
