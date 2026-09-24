import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Crumb = { label: string; href?: string };

/**
 * The inner-page hero the service and contact pages use: a darkened full-bleed
 * photo, breadcrumb, eyebrow, Anton headline, lede, actions, and a mono meta
 * row under a hairline.
 *
 * Without `image` it renders on flat ink with the red wash off the top-left
 * corner — for mid-funnel pages where a photo would only pull focus.
 */
export function PageHero({
  image,
  imagePosition = "center",
  crumbs,
  eyebrow,
  title,
  titleWidth = "16ch",
  lede,
  actions,
  meta,
  children,
  compact = false,
}: {
  image?: string;
  imagePosition?: string;
  crumbs: readonly Crumb[];
  eyebrow: ReactNode;
  title: ReactNode;
  titleWidth?: string;
  lede?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  /** Anything after the meta row, e.g. a stat strip. */
  children?: ReactNode;
  /** Shorter hero without a minimum height. */
  compact?: boolean;
}) {
  return (
    <section
      className={`border-line-9 relative flex items-end border-b ${compact ? "" : "min-h-[62vh]"}`}
    >
      <div className="bg-ink absolute inset-0 overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={72}
              aria-hidden="true"
              className="object-cover brightness-[.55] saturate-[.8]"
              style={{ objectPosition: imagePosition }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg,rgba(12,12,13,.94) 0%,rgba(12,12,13,.66) 42%,rgba(12,12,13,.14) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg,#0c0c0d 1%,rgba(12,12,13,.35) 26%,rgba(12,12,13,0) 55%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 120% at 8% 0%, rgba(224,27,36,.14), rgba(224,27,36,0) 60%)",
            }}
          />
        )}
      </div>

      <Container
        className={`relative ${compact ? "phone:pt-12 phone:pb-10 pt-[72px] pb-12" : "phone:pt-[72px] phone:pb-10 pt-[104px] pb-14"}`}
      >
        <nav
          aria-label="Breadcrumb"
          className="text-bone-45 mb-[26px] font-mono text-[11px] tracking-[.12em] uppercase"
        >
          {crumbs.map((crumb, i) => (
            <span key={crumb.label}>
              {i > 0 ? <span aria-hidden="true"> / </span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="text-bone-45 hover:text-bone">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-red-bright" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="text-red font-mono text-[11.5px] tracking-[.16em] uppercase">
          {eyebrow}
        </div>

        <h1
          className="font-display mt-3 mb-0 text-[clamp(38px,6vw,86px)] leading-[.9] tracking-[-.01em] uppercase"
          style={{ maxWidth: titleWidth }}
        >
          {title}
        </h1>

        {lede ? (
          <p className="text-bone-74 mt-[22px] mb-0 max-w-[58ch] text-[clamp(15px,1.5vw,19px)] leading-[1.55] text-pretty">
            {lede}
          </p>
        ) : null}

        {actions ? (
          <div className="phone:flex-col phone:items-stretch mt-[30px] flex flex-wrap gap-3">
            {actions}
          </div>
        ) : null}

        {meta ? (
          <div className="border-line-10 text-bone-50 mt-[34px] flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-[22px] font-mono text-[11.5px] tracking-[.1em] uppercase">
            {meta}
          </div>
        ) : null}

        {children}
      </Container>
    </section>
  );
}

/** The Anton stat strip from the homepage hero: big value, small caps label. */
export function StatStrip({
  stats,
}: {
  stats: readonly { value: string; label: string }[];
}) {
  return (
    <dl className="border-line-10 phone:gap-x-6 phone:gap-y-5 phone:grid phone:grid-cols-2 mt-[34px] mb-0 flex flex-wrap gap-x-12 gap-y-5 border-t pt-[26px]">
      {stats.map((stat) => (
        <div key={stat.label} className="phone:min-w-0 min-w-[130px]">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="m-0">
            <span className="font-display text-bone block text-[30px] leading-none uppercase">
              {stat.value}
            </span>
            <span
              aria-hidden="true"
              className="text-bone-50 mt-1.5 block text-[12px] tracking-[.1em] uppercase"
            >
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
