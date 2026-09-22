/**
 * Every photo and video on the shop floor: 70 stills and 7 clips.
 *
 * Files live in /public/work/{thumb,full,video}. A work item's `file` is the
 * filename without an extension and is shared by all three: thumb/<file>.jpg,
 * full/<file>.jpg and, for videos, video/<file>.mp4 with full/<file>.jpg as its
 * poster frame.
 *
 * To add a photo: drop thumb/<name>.jpg and full/<name>.jpg into /public/work,
 * then add a row to PHOTOS with the matching `key` from services.ts. Order
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
  {
    file: "wheels-bmw-x4m-detail",
    key: "wheels",
    car: "BMW X4 M",
    note: "Gloss-black wheels, red M calipers",
  },
  {
    file: "wheels-911-vossen-detail",
    key: "wheels",
    car: "Porsche 911 Carrera T",
    note: "Vossen wheel, acid-green calipers",
  },
  {
    file: "wheels-range-rover-svr-low",
    key: "wheels",
    car: "Range Rover Sport SVR",
    note: "Gloss-black wheels, blue calipers",
    position: "38% center",
  },
  {
    file: "wheels-amg-gt63-front",
    key: "wheels",
    car: "Mercedes-AMG GT 63",
    note: "Gloss-black wheels, yellow calipers",
    position: "30% center",
  },
  {
    file: "wheels-taycan-detail",
    key: "wheels",
    car: "Porsche Taycan",
    note: "Black multi-spoke wheels, white calipers",
  },
  {
    file: "wheels-yukon-ridge-grappler",
    key: "wheels",
    car: "GMC Yukon",
    note: "22-inch wheels on Nitto Ridge Grapplers",
  },
  {
    file: "wheels-supra-red-calipers",
    key: "wheels",
    car: "Toyota GR Supra",
    note: "Calipers refinished in gloss red",
  },
  {
    file: "wheels-ferrari-f430",
    key: "wheels",
    car: "Ferrari F430",
    note: "Black five-spoke wheels, red calipers",
  },
  {
    file: "wheels-911-carrera-t",
    key: "wheels",
    car: "Porsche 911 Carrera T",
    note: "Gunmetal Vossen wheels",
    position: "40% center",
  },
  {
    file: "wheels-defender",
    key: "wheels",
    car: "Land Rover Defender",
    note: "Black wheels, red calipers, all-terrain tires",
    position: "40% center",
  },
  {
    file: "wheels-amg-gt63-vossen",
    key: "wheels",
    car: "Mercedes-AMG GT 63",
    note: "Vossen wheels, yellow calipers",
  },
  {
    file: "wheels-corvette-c7-grand-sport",
    key: "wheels",
    car: "Chevrolet Corvette Grand Sport",
    note: "Gloss-black wheels",
    position: "45% center",
  },
  {
    file: "wheels-ram-trx",
    key: "wheels",
    car: "Ram 1500 TRX",
    note: "Black wheels, all-terrain tires",
  },
  {
    file: "wheels-yukon",
    key: "wheels",
    car: "GMC Yukon",
    note: "Blacked-out wheel and tire package",
    position: "45% center",
  },
  {
    file: "wheels-taycan",
    key: "wheels",
    car: "Porsche Taycan",
    note: "Black multi-spoke wheels",
  },
  {
    file: "wheels-panamera",
    key: "wheels",
    car: "Porsche Panamera",
    note: "Gloss-black wheels, acid-green calipers",
    position: "40% center",
  },
  {
    file: "wheels-bmw-x4m",
    key: "wheels",
    car: "BMW X4 M",
    note: "Gloss-black wheel package",
    position: "50% center",
  },
  {
    file: "wheels-range-rover-svr",
    key: "wheels",
    car: "Range Rover Sport SVR",
    note: "Gloss-black wheels",
  },
  {
    file: "wheels-defender-rear",
    key: "wheels",
    car: "Land Rover Defender",
    note: "Matching black spare",
  },
  {
    file: "wheels-amg-gt63-rear",
    key: "wheels",
    car: "Mercedes-AMG GT 63",
    note: "Rear wheel, yellow calipers",
  },
  {
    file: "wheels-yukon-denali",
    key: "wheels",
    car: "GMC Yukon Denali",
    note: "Gloss-black multi-spoke wheels",
  },
  {
    file: "wheels-911-carrera-t-front",
    key: "wheels",
    car: "Porsche 911 Carrera T",
    note: "Gunmetal Vossen wheels",
  },
  {
    file: "wheels-taycan-side",
    key: "wheels",
    car: "Porsche Taycan",
    note: "Black multi-spoke wheels",
  },
  {
    file: "wheels-defender-front",
    key: "wheels",
    car: "Land Rover Defender",
    note: "Black wheels, red calipers",
  },
  {
    file: "wheels-yukon-front",
    key: "wheels",
    car: "GMC Yukon",
    note: "Black wheels, all-terrain tires",
  },
  {
    file: "wheels-ram-trx-side",
    key: "wheels",
    car: "Ram 1500 TRX",
    note: "Black wheels, all-terrain tires",
  },
  {
    file: "wheels-bronco-detail",
    key: "wheels",
    car: "Ford Bronco",
    note: "Black wheels, mud-terrain tires",
  },
  {
    file: "wheels-corvette-c8-rear",
    key: "wheels",
    car: "Chevrolet Corvette C8",
    note: "Gloss-black wheels, red calipers",
  },
  {
    file: "wheels-corvette-c8r-storefront",
    key: "wheels",
    car: "Chevrolet Corvette C8.R Edition",
    note: "Silver multi-spoke wheels",
  },
  {
    file: "suspension-bronco-profile",
    key: "suspension",
    car: "Ford Bronco",
    note: "Lifted, on mud-terrain tires",
  },
  {
    file: "suspension-tundra-trd-pro",
    key: "suspension",
    car: "Toyota Tundra",
    note: "Level stance on all-terrain tires",
  },
  {
    file: "suspension-silverado-2500hd-fitment",
    key: "suspension",
    car: "Chevrolet Silverado 2500 HD",
    note: "Wheel-well clearance check",
  },
  {
    file: "suspension-bronco",
    key: "suspension",
    car: "Ford Bronco",
    note: "Lifted, on black wheels",
  },
  {
    file: "suspension-tundra-platinum",
    key: "suspension",
    car: "Toyota Tundra Platinum",
    note: "Level stance, black wheels, mud-terrain tires",
    position: "55% center",
  },
  {
    file: "suspension-tundra-trd-pro-detail",
    key: "suspension",
    car: "Toyota Tundra",
    note: "Wheel-well clearance",
  },
  {
    file: "suspension-silverado-2500hd",
    key: "suspension",
    car: "Chevrolet Silverado 2500 HD",
    note: "Fitting the new setup",
    position: "50% center",
  },
  {
    file: "suspension-bronco-3q",
    key: "suspension",
    car: "Ford Bronco",
    note: "Lifted stance",
  },
  {
    file: "suspension-tundra-platinum-2",
    key: "suspension",
    car: "Toyota Tundra Platinum",
    note: "Level stance, black wheels",
    position: "45% center",
  },
  {
    file: "suspension-bronco-above",
    key: "suspension",
    car: "Ford Bronco",
    note: "Lifted four-door",
  },
  {
    file: "wrap-amg-gt63-olive",
    key: "wrap",
    car: "Mercedes-AMG GT 63",
    note: "Olive green, gloss finish",
  },
  {
    file: "wrap-g63-satin-bronze",
    key: "wrap",
    car: "Mercedes-AMG G 63",
    note: "Satin bronze",
    position: "55% center",
  },
  {
    file: "wrap-amg-gt63-satin-black",
    key: "wrap",
    car: "Mercedes-AMG GT 63",
    note: "Satin black",
  },
  {
    file: "wrap-amg-gt63-olive-2",
    key: "wrap",
    car: "Mercedes-AMG GT 63",
    note: "Olive green, gloss finish",
  },
  {
    file: "wrap-g63-satin-bronze-detail",
    key: "wrap",
    car: "Mercedes-AMG G 63",
    note: "Satin bronze, red calipers",
  },
  {
    file: "wrap-g63-matte-black",
    key: "wrap",
    car: "Mercedes-AMG G 63",
    note: "Matte black",
  },
  {
    file: "wrap-c63-satin-black",
    key: "wrap",
    car: "Mercedes-AMG C 63",
    note: "Satin black",
  },
  {
    file: "ppf-corvette-c8",
    key: "ppf",
    car: "Chevrolet Corvette C8",
    note: "Rapid Blue, gloss finish",
  },
  {
    file: "ppf-escalade",
    key: "ppf",
    car: "Cadillac Escalade",
    note: "Clear front-end film",
  },
  {
    file: "ppf-corvette-c8-showroom",
    key: "ppf",
    car: "Chevrolet Corvette C8",
    note: "Rapid Blue, gloss finish",
  },
  {
    file: "ppf-escalade-front",
    key: "ppf",
    car: "Cadillac Escalade",
    note: "Clear front-end film",
  },
  { file: "ppf-ferrari-portofino", key: "ppf", car: "Ferrari Portofino", note: "" },
  { file: "ppf-nissan-gtr", key: "ppf", car: "Nissan GT-R", note: "" },
  { file: "ppf-tesla-model-y", key: "ppf", car: "Tesla Model Y", note: "" },
  {
    file: "detailing-ferrari-f430-rear",
    key: "detailing",
    car: "Ferrari F430",
    note: "Deep gloss on the rear deck",
  },
  {
    file: "detailing-ferrari-key",
    key: "detailing",
    car: "Ferrari",
    note: "Mirror finish on the hood",
    position: "45% center",
  },
  { file: "detailing-ferrari-f430-2", key: "detailing", car: "Ferrari F430", note: "" },
  { file: "detailing-ferrari-f430", key: "detailing", car: "Ferrari F430", note: "" },
  {
    file: "builds-maverick-x3",
    key: "builds",
    car: "Can-Am Maverick X3 MAX",
    note: "Beadlocks on Cooper Discoverer STT Pro tires",
  },
  {
    file: "builds-amg-gt63-carbon-front",
    key: "builds",
    car: "Mercedes-AMG GT 63",
    note: "Carbon aero kit, Vossen wheels",
    position: "55% center",
  },
  {
    file: "builds-maverick-x3-front",
    key: "builds",
    car: "Can-Am Maverick X3 MAX",
    note: "FOX shocks, front winch",
  },
  {
    file: "builds-amg-gt63-carbon",
    key: "builds",
    car: "Mercedes-AMG GT 63",
    note: "Carbon splitter and side skirts",
    position: "60% center",
  },
  {
    file: "builds-maverick-x3-side",
    key: "builds",
    car: "Can-Am Maverick X3 MAX",
    note: "Custom graphics, rock sliders",
  },
  {
    file: "builds-maverick-x3-cabin",
    key: "builds",
    car: "Can-Am Maverick X3 MAX",
    note: "Harnesses and roll-cage audio",
  },
  {
    file: "upholstery-ferrari-headrest",
    key: "upholstery",
    car: "Ferrari",
    note: "Embroidered prancing-horse headrest",
  },
  {
    file: "upholstery-ferrari-wheel",
    key: "upholstery",
    car: "Ferrari",
    note: "Carbon and leather wheel, red stitching",
  },
  {
    file: "upholstery-sub-enclosure",
    key: "upholstery",
    car: "Truck audio build",
    note: "Custom enclosure trimmed in red",
  },
  {
    file: "tint-install",
    key: "tint",
    car: "Window tint",
    note: "Film squeegeed onto the quarter glass",
    position: "68% center",
  },
  { file: "tint-jaguar-xj", key: "tint", car: "Jaguar XJ", note: "Dark tint all around" },
  {
    file: "tint-trim",
    key: "tint",
    car: "Window tint",
    note: "Film trimmed by hand",
    position: "62% center",
  },
  {
    file: "tint-jaguar-xj-rear",
    key: "tint",
    car: "Jaguar XJ",
    note: "Tinted rear glass",
  },
] as const;

/** Shop videos. The poster frame shares the filename under /public/work/full. */
export const VIDEOS: readonly WorkVideo[] = [
  {
    file: "exhaust-amg-c63",
    key: "exhaust",
    car: "Mercedes-AMG C 63",
    note: "Quad tips and rear diffuser",
    duration: "0:03",
    slot: 0,
    position: "center 85%",
  },
  {
    file: "wheels-ram-trx-mount-balance",
    key: "wheels",
    car: "Ram 1500 TRX",
    note: "Mount, balance and torque, start to finish",
    duration: "0:28",
    slot: 2,
  },
  {
    file: "suspension-bronco-walkaround",
    key: "suspension",
    car: "Ford Bronco",
    note: "Walkaround of the finished build",
    duration: "0:27",
    slot: 3,
  },
  {
    file: "wrap-amg-gt63-olive-rollout",
    key: "wrap",
    car: "Mercedes-AMG GT 63",
    note: "Rolling out in olive green",
    duration: "0:07",
    slot: 2,
  },
  {
    file: "wrap-amg-gt63-olive-walkaround",
    key: "wrap",
    car: "Mercedes-AMG GT 63",
    note: "Olive green walkaround",
    duration: "0:26",
    slot: 5,
  },
  {
    file: "ppf-escalade-install",
    key: "ppf",
    car: "Cadillac Escalade",
    note: "Film going on around the headlight",
    duration: "0:06",
    slot: 3,
  },
  {
    file: "ppf-tesla-model-y-walkaround",
    key: "ppf",
    car: "Tesla Model Y",
    note: "Walkaround with the team",
    duration: "0:22",
    slot: 8,
  },
] as const;

/** The 12 shots in the "Recent metal" marquee, doubled at render time. */
export const MARQUEE: readonly { file: string; position: string }[] = [
  { file: "wheels-range-rover-svr-low", position: "center" },
  { file: "builds-amg-gt63-carbon", position: "center" },
  { file: "suspension-tundra-platinum", position: "center" },
  { file: "wheels-911-carrera-t", position: "center 60%" },
  { file: "wrap-amg-gt63-satin-black", position: "center 62%" },
  { file: "wheels-corvette-c7-grand-sport", position: "center" },
  { file: "suspension-bronco", position: "center 64%" },
  { file: "wheels-yukon", position: "center 58%" },
  { file: "ppf-ferrari-portofino", position: "center 72%" },
  { file: "wheels-defender", position: "center 62%" },
  { file: "wheels-bmw-x4m", position: "center" },
  { file: "wheels-amg-gt63-front", position: "center 70%" },
] as const;

function toItem(w: WorkPhoto | WorkVideo, isVideo: boolean): WorkItem {
  return {
    ...w,
    position: w.position ?? "center",
    thumb: `/work/thumb/${w.file}.jpg`,
    full: `/work/full/${w.file}.jpg`,
    ...(isVideo ? { video: `/work/video/${w.file}.mp4` } : {}),
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
 * declared `slot`, so clips land mid-grid rather than all at the end. This is
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

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

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
  const suffix = service ? ` (${service.title}${isVideo(item) ? " video" : ""})` : "";
  return `${item.car}${item.note ? ` — ${item.note}` : ""}${suffix}`;
}
