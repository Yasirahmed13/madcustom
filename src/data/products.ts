/**
 * The Pro Shop: the retail products on the services page, which customers add
 * to the same quote request as their services.
 *
 * `id` is also the photo's filename in /public/products (`<id>.webp`) and the
 * key the quote cart stores, so keep it stable once live — renaming one drops
 * it from any cart a visitor already has saved.
 *
 * Prices are in US dollars. `sale`, when set, is the price actually charged and
 * `price` is shown struck through beside it.
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  sale: number | null;
  /** Whole stars, 0–5. 0 hides the rating. */
  rating: number;
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "turtle-wax",
    name: "Turtle Wax Original Hard Shell Shine Car Wax",
    price: 7.49,
    sale: null,
    rating: 0,
  },
  {
    id: "nano-suds",
    name: "Nanoskin NANO SUDS Wash & Shine Shampoo",
    price: 32.99,
    sale: 28.99,
    rating: 0,
  },
  {
    id: "kenolon-v1",
    name: "Kenolon Ceramic Shield V1 Box – SiO₂ Coating Kit",
    price: 59.65,
    sale: null,
    rating: 0,
  },
  {
    id: "gold-class",
    name: "Meguiar’s Gold Class Car Wash Shampoo",
    price: 11.99,
    sale: null,
    rating: 5,
  },
  {
    id: "formula1-interior",
    name: "Formula 1 Detail Express Multi-Purpose Interior Cleaner",
    price: 24.99,
    sale: null,
    rating: 0,
  },
  {
    id: "black-magic",
    name: "Black Magic All Wheel Foaming Cleaner",
    price: 6.49,
    sale: null,
    rating: 0,
  },
  {
    id: "3d-pink",
    name: "3D Pink Car Soap – pH Balanced Formula",
    price: 29.92,
    sale: null,
    rating: 5,
  },
  {
    id: "meguiars-da-kit",
    name: "Meguiar’s DA Microfiber Correction & Finishing Kit",
    price: 129,
    sale: null,
    rating: 0,
  },
  {
    id: "microfiber-towel",
    name: "Premium Microfiber Cleaning Towel",
    price: 7.49,
    sale: null,
    rating: 0,
  },
  {
    id: "foam-pad",
    name: "Premium Foam Applicator Pad",
    price: 2.99,
    sale: null,
    rating: 0,
  },
] as const;

export const PRODUCT_BY_ID: Readonly<Record<string, Product>> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p]),
);

/** The three shown in the services menu and the footer. */
export const FEATURED_PRODUCTS: readonly Product[] = [
  "foam-pad",
  "formula1-interior",
  "black-magic",
].flatMap((id) => (PRODUCT_BY_ID[id] ? [PRODUCT_BY_ID[id]] : []));

/** What the customer pays: the sale price when there is one. */
export const priceOf = (product: Product) => product.sale ?? product.price;

/** "$1,795" for whole amounts, "$28.99" otherwise. */
export function formatMoney(amount: number): string {
  return `$${amount
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const productImage = (product: Product) => `/products/${product.id}.webp`;
