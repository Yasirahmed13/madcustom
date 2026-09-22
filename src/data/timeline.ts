/**
 * "04 / Our story" — the family history.
 *
 * This section's wording is personal to the Rodríguez family and is reproduced
 * exactly as written, accents, curly quotes and all. Please do not tidy the
 * spelling here: "Magueyes Auto Desing" is the business's own name as it appears
 * in the design, not a typo to be corrected.
 */

export type Era = {
  year: string;
  title: string;
  /** Mono label along the bottom of the card. */
  tag: string;
  body: string;
  /** Colour of the 3px rule across the top of the card. */
  rule: string;
};

export type LineageEntry = {
  name: string;
  /** The last entry is the current business and is filled solid red. */
  current?: boolean;
};

export const ABOUT = {
  eyebrow: "04 / OUR STORY",
  /** Rendered with a line break between the two halves. */
  headingLines: ["A family legacy", "since 1973"] as const,
  subheading: "Three generations. One passion.",
  /**
   * Two intro paragraphs. The emphasised fragments are marked up in the
   * component: "MAD Custom" is bolded and the Cheo Colega nickname is italicised
   * without italic styling, matching the design.
   */
  intro: {
    leadBefore: "The story of ",
    leadBrand: "MAD Custom",
    leadAfter:
      " began in 1973 with the vision, hard work and passion of our grandfather, José Rodríguez — affectionately known as ",
    leadNickname: "“Cheo Colega.”",
    body: "Cheo laid the foundation for the values that still define our family today: honest work, commitment to our customers, and a genuine passion for the automotive industry. What began as one man's dream became a legacy passed from generation to generation.",
  },
  /** The photo trio beside the story. */
  photos: [
    {
      file: "wheels-corvette-c8r-storefront",
      alt: "The MAD Custom Florida storefront with a Corvette C8.R Edition out front",
      position: "center 30%",
      /** Spans both rows in the 2x2 grid. */
      tall: true,
    },
    {
      file: "suspension-silverado-2500hd-fitment",
      alt: "A MAD Custom technician checking wheel-well clearance on a Silverado 2500 HD",
      position: "center",
      tall: false,
    },
    {
      file: "ppf-corvette-c8-showroom",
      alt: "A Rapid Blue Corvette C8 in the MAD Custom showroom",
      position: "center 58%",
      tall: false,
    },
  ],
} as const;

export const ERAS: readonly Era[] = [
  {
    year: "1973",
    title: "Magueyes Tires Service",
    tag: "FIRST GENERATION · CHEO COLEGA",
    rule: "#E01B24",
    body: "José “Cheo Colega” Rodríguez opens the doors, serving the tire and automotive needs of the local community — and setting the values we still run on.",
  },
  {
    year: "2000",
    title: "The second generation",
    tag: "CARLOS RODRÍGUEZ RAMOS",
    rule: "rgba(224,27,36,.6)",
    body: "His son Carlos joined with new ideas and determination, growing the shop into Magueyes Auto Accesorios and strengthening the family name in the industry.",
  },
  {
    year: "2010",
    title: "Carly changes the game",
    tag: "MAGUEYES AUTO DESING",
    rule: "rgba(224,27,36,.6)",
    body: "Carly transformed how wheels, tires and accessories were sold in Puerto Rico — modernizing the business and taking it to #1 in wheel and tire sales.",
  },
  {
    year: "2021",
    title: "The legacy reaches Orlando",
    tag: "MAD CUSTOM FLORIDA",
    rule: "#E01B24",
    body: "José Emanuel Rodríguez Colón carried the vision to Florida: one complete automotive destination built on quality, innovation and professionalism.",
  },
] as const;

/** The "In memory — Carly" block. */
export const CARLY = {
  eyebrow: "IN MEMORY — CARLY",
  heading: "Carly changed the game in Puerto Rico",
  /** Split around the bolded claim. */
  bodyBefore:
    "Carlos Rodríguez — “Carly” — arrived in 2010 with a different vision and an extraordinary passion for the industry. He modernized the business, raised the standard, and led us to becoming the ",
  bodyStrong: "#1 store in wheel and tire sales in Puerto Rico",
  bodyAfter:
    ". His impact went far beyond product: he built a culture and an entire experience around automotive customization.",
  quote:
    "Today Carly rests with the Lord, but his vision, his lessons and his legacy remain alive in every step we take. His absence is deeply felt — his legacy keeps driving us forward.",
  attribution: "We remember Carly with love.",
} as const;

/** "The legacy continues" — the four business names, oldest first. */
export const LINEAGE: readonly LineageEntry[] = [
  { name: "Magueyes Tires Service" },
  { name: "Magueyes Auto Accesorios" },
  { name: "Magueyes Auto Desing" },
  { name: "MAD Custom Florida", current: true },
] as const;

export const LEGACY = {
  eyebrow: "THE LEGACY CONTINUES — FIVE DECADES, FOUR NAMES",
  columns: [
    "More than five decades of hard work, sacrifice, innovation and evolution. We are a family business built generation after generation — every member has given their vision, effort and heart to keep this dream growing.",
    "We honor the path built by those who came before us, and we keep working so the generations that follow can carry this legacy even further.",
  ],
  /** Rendered with a line break after each line. */
  closingLines: [
    "We honor our past.",
    "We pursue excellence in the present.",
    "We build the future.",
  ],
  /** Beside the shield logo, with a line break between. */
  shieldLines: ["Family built.", "Driven by legacy."],
} as const;
