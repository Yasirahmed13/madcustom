"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  PRODUCTS,
  formatMoney,
  priceOf,
  productImage,
  type Product,
} from "@/data/products";
import { setProductQty, useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";

/**
 * The Pro Shop grid. Products go into the same quote request as the services.
 *
 * Before a product is added, the stepper sets how many to add; once it is in
 * the quote, the stepper edits the quantity in the quote directly, and taking
 * it to zero removes it. Every change is announced through one polite live
 * region.
 */
export function ProductShop() {
  const { cart } = useQuote();
  const [pending, setPending] = useState<Record<string, number>>({});
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef<number | undefined>(undefined);

  function announce(text: string) {
    setAnnouncement(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAnnouncement(""), 2600);
  }

  function step(product: Product, delta: number) {
    const inCart = cart[product.id] ?? 0;
    if (inCart > 0) {
      const next = inCart + delta;
      setProductQty(product.id, next);
      announce(
        next <= 0
          ? `${product.name} removed from your quote`
          : `${product.name}: quantity ${Math.min(99, next)}`,
      );
    } else {
      setPending((p) => ({
        ...p,
        [product.id]: Math.max(1, Math.min(99, (p[product.id] ?? 1) + delta)),
      }));
    }
  }

  function add(product: Product) {
    const qty = pending[product.id] ?? 1;
    setProductQty(product.id, qty);
    setPending((p) => ({ ...p, [product.id]: 1 }));
    announce(`${qty > 1 ? `${qty}× ` : ""}${product.name} added to your quote`);
  }

  return (
    <>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="border-line-10 tablet:grid-cols-3 phone:grid-cols-2 grid grid-cols-5 border-t border-l">
        {PRODUCTS.map((product) => {
          const inCart = cart[product.id] ?? 0;
          const qty = inCart || (pending[product.id] ?? 1);
          const off = product.sale
            ? Math.round((1 - product.sale / product.price) * 100)
            : 0;

          return (
            <article
              key={product.id}
              className={cn(
                "border-line-10 relative flex min-w-0 flex-col border-r border-b p-4 transition-colors duration-200",
                inCart ? "bg-surface-raised" : "bg-surface-card hover:bg-[#171512]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "border-red pointer-events-none absolute inset-0 border-2 transition-opacity duration-200",
                  inCart ? "opacity-100" : "opacity-0",
                )}
              />

              <div className="bg-surface-media relative aspect-square overflow-hidden">
                <Image
                  src={productImage(product)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 20vw"
                  className="object-contain p-3 transition-transform duration-500 ease-(--ease-mad) hover:scale-105"
                />
                {off ? (
                  <span className="bg-red text-ink absolute top-2 left-2 px-1.5 py-1 font-mono text-[10.5px] font-semibold tracking-[.06em]">
                    −{off}%
                  </span>
                ) : null}
              </div>

              <h3 className="text-bone-86 mt-3.5 mb-0 line-clamp-2 min-h-[2.7em] text-[13.5px] leading-[1.35] font-semibold">
                {product.name}
              </h3>

              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="m-0 font-mono text-[14px]">
                  {product.sale ? (
                    <>
                      <s className="text-bone-40 mr-1.5 text-[12px]">
                        {formatMoney(product.price)}
                      </s>
                      <span className="text-red-bright">
                        {formatMoney(priceOf(product))}
                      </span>
                    </>
                  ) : (
                    <span className="text-red-bright">{formatMoney(product.price)}</span>
                  )}
                </p>
                {product.rating ? (
                  <span
                    role="img"
                    aria-label={`Rated ${product.rating} out of 5`}
                    className="text-red text-[11px] tracking-[1px]"
                  >
                    {"★".repeat(product.rating)}
                  </span>
                ) : null}
              </div>

              <div className="mt-auto pt-3.5">
                <div className="border-line-14 flex items-stretch border">
                  <button
                    type="button"
                    onClick={() => step(product, -1)}
                    aria-label={
                      inCart === 1 ? `Remove ${product.name}` : `Fewer ${product.name}`
                    }
                    className="text-bone-72 hover:bg-white-5 hover:text-bone w-10 cursor-pointer bg-transparent font-mono text-[15px] transition-colors duration-200"
                  >
                    −
                  </button>
                  <span className="border-line-14 text-bone flex flex-1 items-center justify-center gap-1.5 border-x py-2 font-mono text-[12.5px]">
                    <span className="text-bone-40 text-[10px] tracking-[.12em] uppercase">
                      {inCart ? "In quote" : "Qty"}
                    </span>
                    <span aria-live="off">{qty}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => step(product, 1)}
                    aria-label={`More ${product.name}`}
                    className="text-bone-72 hover:bg-white-5 hover:text-bone w-10 cursor-pointer bg-transparent font-mono text-[15px] transition-colors duration-200"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => (inCart ? setProductQty(product.id, 0) : add(product))}
                  className={cn(
                    "mt-2 w-full cursor-pointer border px-3 py-[11px] text-[12.5px] font-bold tracking-[.02em] transition-colors duration-200",
                    inCart
                      ? "border-red bg-red text-ink hover:bg-red-bright hover:border-red-bright"
                      : "border-line-20 text-bone hover:border-red hover:bg-red-10 bg-transparent",
                  )}
                >
                  {inCart ? (
                    <>
                      In your quote ✓
                      <span className="sr-only"> — remove {product.name}</span>
                    </>
                  ) : (
                    <>
                      Add to quote<span className="sr-only"> — {product.name}</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
