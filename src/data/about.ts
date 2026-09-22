/**
 * Copy and photo selections that belong to /about and nowhere else.
 *
 * The family story itself is NOT duplicated here — it lives in `timeline.ts`
 * (ABOUT, ERAS, CARLY, LINEAGE, LEGACY) and the page imports it from there, so
 * the homepage section and the full page can never drift apart. What this file
 * holds is the page-level framing: the hero, the three values, and the
 * shop-floor gallery.
 *
 * Every photo named below is a real shot from /public/work — the same library
 * the homepage gallery and the service pages draw on. Nothing here is stock.
 */

export type ShopShot = {
  /** Filename without extension, shared by /work/thumb and /work/full. */
  file: string;
  /** Mono label above the caption. A discipline, never a location — see below. */
  eyebrow: string;
  caption: string;
  /** Full alt text. */
  alt: string;
  /** CSS object-position for the crop. Defaults to "center". */
  position?: string;
};

export const ABOUT_HERO = {
  eyebrow: "OUR STORY",
  headingLines: ["A family legacy", "since 1973"] as const,
  lede: "Three generations of one family, four business names and more than fifty years of the same work: getting the fitment right, getting the finish right, and handing the keys back to someone who is glad they came to us.",
  /**
   * The showroom floor in Orlando — the MAD shield on the wall, the wheel
   * display along the back, a Rapid Blue C8 on the tile.
   */
  image: {
    file: "ppf-corvette-c8-showroom",
    position: "center 42%",
    alt: "The MAD Custom showroom floor, with a Rapid Blue Corvette C8 under the light bars and the MAD shield on the back wall",
  },
  /** The mono strip under the hero copy. */
  meta: ["Established 1973", "Three generations", "Orlando, FL · Barceloneta, PR"],
} as const;

/**
 * The one workshop shot that runs beside the family story.
 *
 * Deliberately a working photo rather than a finished car: a TRX up on the lift
 * with the wheels off, which is what the other fifty years actually looked like.
 */
export const STORY_SHOT: ShopShot = {
  file: "wheels-ram-trx-mount-balance",
  eyebrow: "ON THE LIFT",
  caption: "A Ram 1500 TRX up on the rack mid-swap, wheels off and torque still to come.",
  alt: "A black Ram 1500 TRX raised on the two-post lift inside the MAD Custom workshop, one wheel off",
  position: "center 45%",
};

/**
 * "What we run on" — the three values.
 *
 * These are not invented. They are the three Cheo laid down, quoted from the
 * family's own sentence in `timeline.ts`: "honest work, commitment to our
 * customers, and a genuine passion for the automotive industry." The body lines
 * below explain what each one means on the shop floor today; keep them tied to
 * things the shop actually does.
 */
export const VALUES = [
  {
    num: "01",
    title: "Honest work",
    body: "We quote what the job needs and we say so when it does not need doing. Fitment gets measured, not guessed — every wheel-well clearance is checked on the vehicle before anything is ordered.",
  },
  {
    num: "02",
    title: "Commitment to our customers",
    body: "One shop, start to finish. The person who scopes your build is the person who calls you about it, and a real person answers the phone during shop hours.",
  },
  {
    num: "03",
    title: "Passion for the industry",
    body: "Wheels, suspension, wrap, film, trim, audio and exhaust under one roof — because the people here wanted to do all of it, not because a spreadsheet said to.",
  },
] as const;

/**
 * "Inside the shop" — the workshop gallery.
 *
 * Ordered feature-first: the opening entry is rendered as the large 2×2 tile
 * and the rest fill the grid around it.
 *
 * A NOTE ON ATTRIBUTION, same rule the homepage marquee follows: the photo
 * library carries no record of which of the two shops a given car was worked on
 * in, so no caption here names a location. The one exception is the storefront
 * shot at the end, where the "MAD CUSTOM FL" shield is on the building itself.
 */
export const SHOP_FLOOR: readonly ShopShot[] = [
  {
    file: "ppf-tesla-model-y-walkaround",
    eyebrow: "SHOWROOM",
    caption: "Walking a finished Model Y back to its owner under the light bars.",
    alt: "A MAD Custom team member walking alongside a white Tesla Model Y on the showroom floor",
    position: "center 40%",
  },
  {
    file: "suspension-silverado-2500hd",
    eyebrow: "SUSPENSION BAY",
    caption:
      "A Silverado 2500 HD getting its new setup fitted, tire stacks waiting behind.",
    alt: "A technician fitting a wheel to a white Chevrolet Silverado 2500 HD inside the MAD Custom workshop",
    position: "center",
  },
  {
    file: "ppf-escalade-install",
    eyebrow: "FILM BAY",
    caption: "Paint protection film worked around an Escalade headlight by hand.",
    alt: "Hands squeegeeing paint protection film around the headlight of a white Cadillac Escalade, wheels on display behind",
    position: "center 45%",
  },
  {
    file: "tint-install",
    eyebrow: "TINT BENCH",
    caption: "Film squeegeed onto the quarter glass, wet and still moving.",
    alt: "A MAD Custom installer squeegeeing window film onto the quarter glass of a dark grey car",
    position: "62% center",
  },
  {
    file: "suspension-tundra-trd-pro-detail",
    eyebrow: "UNDER THE ARCH",
    caption: "A Tundra TRD Pro in the dark end of the bay, new wheel and tire on.",
    alt: "The front wheel arch of a grey Toyota Tundra TRD Pro on a black TRD wheel and all-terrain tire inside the shop",
    position: "center",
  },
  {
    file: "suspension-silverado-2500hd-fitment",
    eyebrow: "FITMENT CHECK",
    caption: "Clearance checked on the vehicle before a single part is ordered.",
    alt: "A technician in a MAD Custom shirt checking wheel-well clearance on a Silverado 2500 HD",
    position: "center 35%",
  },
  {
    file: "tint-trim",
    eyebrow: "TRIM WORK",
    caption: "Film trimmed by hand along the glass, blade against the edge.",
    alt: "An installer trimming window film by hand along the rear glass of a car inside the workshop",
    position: "55% center",
  },
  {
    file: "upholstery-sub-enclosure",
    eyebrow: "TRIM & AUDIO",
    caption: "A custom enclosure built into the cab and trimmed in red to match.",
    alt: "A custom subwoofer and amplifier enclosure trimmed in red, built into the rear of a truck cab",
    position: "center",
  },
  {
    file: "wheels-corvette-c8r-storefront",
    eyebrow: "ORLANDO",
    caption: "Out front on Westmoreland, under the shield.",
    alt: "A white Corvette C8.R Edition parked outside the MAD Custom Florida shop beneath the MAD shield sign",
    position: "center 60%",
  },
] as const;

/** The closing "come and see it" section. */
export const VISIT = {
  eyebrow: "05 / WHERE TO FIND US",
  title: "Two shops, one standard",
  lede: "One shop in Orlando, one in Barceloneta, and the same family name on both. Walk in during shop hours or call ahead and we will have the bay ready.",
} as const;
