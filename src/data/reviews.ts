/**
 * "06 / Five stars, no asterisks".
 *
 * Real customer reviews, reproduced from the design. Add an entry here and it
 * appears in the grid. All three are five-star; the component renders five stars
 * unconditionally, matching the design.
 */

export type Review = {
  name: string;
  /** Month and year, e.g. "Dec 2025". */
  date: string;
  quote: string;
};

export const REVIEWS: readonly Review[] = [
  {
    name: "Carlos M. Rivera",
    date: "Dec 2025",
    quote:
      "MAD Custom exceeded my expectations. The wheel fitment and suspension setup completely transformed my truck. The attention to detail and professionalism truly sets them apart.",
  },
  {
    name: "Melissa Martinez",
    date: "Jan 2026",
    quote:
      "I trusted MAD Custom with a full build and couldn't be happier. Quality, communication and craftsmanship were top-level. Definitely the go-to shop for serious customization.",
  },
  {
    name: "Daniel Torres",
    date: "Feb 2026",
    quote:
      "From consultation to final delivery the experience was outstanding. Perfect wheels, flawless PPF. My car looks aggressive yet refined — you can tell they take pride in their work.",
  },
] as const;
