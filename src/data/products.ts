/**
 * The retail products shown in the "Performance essentials" column of the
 * services mega menu.
 *
 * Every one of them links to the same place — the products section of the
 * services page — so `PRODUCTS_URL` is applied at render time rather than
 * repeated on each entry.
 *
 * `image` is the filename (no extension) of a shot in /public/products. Drop a
 * photo in there and set the field; until then the card renders a lettered
 * placeholder tile rather than a broken image.
 */

export type Product = {
  name: string;
  /** As printed, e.g. "$2.99". */
  price: string;
  /** Optional photo in /public/products, without its extension. */
  image?: string;
  /** Three or four characters shown on the placeholder tile. */
  tag: string;
};

export const PRODUCTS: readonly Product[] = [
  { name: "Premium Foam Applicator Pad", price: "$2.99", tag: "PAD" },
  {
    name: "Formula 1 Detail Express Multi-Purpose Interior Cleaner",
    price: "$24.99",
    tag: "INT",
  },
  { name: "Black Magic All Wheel Foaming Cleaner", price: "$6.49", tag: "WHL" },
] as const;
