import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SITE } from "@/data/site";

/**
 * The shell for /terms and /privacy: a compact hero, then a sticky "On this
 * page" index beside numbered sections, closing on a contact card.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  toc,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  /** As printed, e.g. "18 September 2026". */
  updated: string;
  toc: readonly { id: string; title: string }[];
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <PageHero
          compact
          crumbs={[{ label: "Home", href: "/" }, { label: title }]}
          eyebrow={eyebrow}
          title={title}
          meta={
            <>
              <span>Last updated {updated}</span>
              <span>{SITE.legalEntity}</span>
            </>
          }
        />

        <section className="border-line-9 bg-surface border-t">
          <Container className="phone:pt-10 phone:pb-16 tablet:grid-cols-1 grid grid-cols-[260px_minmax(0,1fr)] items-start gap-[clamp(28px,5vw,72px)] pt-[64px] pb-[90px]">
            <nav
              aria-label="On this page"
              className="tablet:static border-line-10 sticky top-[96px] border-t pt-5"
            >
              <Eyebrow tone="muted" className="mb-4 text-[10.5px]">
                ON THIS PAGE
              </Eyebrow>
              <ol className="m-0 flex list-none flex-col p-0">
                {toc.map((entry, i) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className="text-bone-60 hover:text-bone group grid grid-cols-[30px_1fr] py-[7px] text-[13.5px] leading-[1.4] transition-colors duration-200"
                    >
                      <span className="text-bone-32 group-hover:text-red font-mono text-[11px] transition-colors duration-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-[72ch] min-w-0">
              <p className="text-bone-86 mt-0 mb-12 text-[clamp(16px,1.5vw,18px)] leading-[1.65]">
                {intro}
              </p>
              {children}
              <LegalContact />
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}

/** One numbered section. `num` is 1-based. */
export function LegalSection({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="border-line-10 text-bone-72 [&_strong]:text-bone scroll-mt-[96px] border-t pt-8 pb-10 text-[15.5px] leading-[1.7] [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:top-[.72em] [&_li]:before:left-0 [&_li]:before:h-px [&_li]:before:w-2.5 [&_li]:before:bg-(--color-red) [&_p]:my-0 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_strong]:font-semibold [&_ul]:m-0 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:p-0 [&_ul+p]:mt-4"
    >
      <div className="mb-5 flex items-baseline gap-4">
        <span className="text-red font-mono text-[12px] tracking-[.14em]">
          {String(num).padStart(2, "0")}
        </span>
        <h2
          id={`${id}-h`}
          className="font-display text-bone m-0 text-[clamp(24px,2.6vw,34px)] leading-none uppercase"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/** The red-ruled highlight box for the lines that matter most. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="border-red bg-red-05 text-bone-86 my-5 border-l-2 px-5 py-4">
      {children}
    </div>
  );
}

/** An SMS keyword: STOP, START, HELP. */
export function Keyword({ children }: { children: ReactNode }) {
  return (
    <span className="border-line-20 text-bone mx-0.5 border px-1.5 py-px font-mono text-[13px] font-semibold tracking-[.06em]">
      {children}
    </span>
  );
}

/** The messaging line the legal pages name, as a link. */
export function MessagingPhone() {
  return (
    <a href={`tel:${SITE.messagingPhoneE164}`} className="font-mono text-[14px]">
      {SITE.messagingPhoneDisplay}
    </a>
  );
}

export function EmailLink() {
  return <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
}

function LegalContact() {
  return (
    <div className="bg-surface-panel border-line-10 mt-4 border p-[clamp(20px,2.6vw,30px)]">
      <Eyebrow className="text-[10.5px]">CONTACT</Eyebrow>
      <p className="text-bone-72 mt-3 mb-0 text-[15px] leading-[1.6]">
        Questions about this page, or about a message you received from us, can come
        straight to MAD Custom.
      </p>
      <dl className="phone:grid-cols-1 m-0 mt-5 grid grid-cols-3 gap-5">
        {[
          { label: "Phone", value: <MessagingPhone /> },
          { label: "Email", value: <EmailLink /> },
          { label: "Legal business name", value: SITE.legalEntity },
        ].map((row) => (
          <div key={row.label}>
            <dt className="text-bone-40 font-mono text-[10.5px] tracking-[.14em] uppercase">
              {row.label}
            </dt>
            <dd className="text-bone mt-1.5 mb-0 text-[14px] break-words">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
