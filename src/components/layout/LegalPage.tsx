import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileActionBar } from "./MobileActionBar";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SITE } from "@/data/site";

/**
 * Shared shell for /terms and /privacy.
 *
 * Both pages are placeholders. The banner below says so in plain language and
 * is impossible to miss — better than shipping invented legal text that reads
 * as though a lawyer wrote it. Replace the sections and delete the banner.
 */
export function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <section className="border-line-9 bg-surface border-b">
          <Container className="phone:pt-16 phone:pb-10 pt-[104px] pb-12">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display mt-3 mb-0 text-[clamp(34px,5vw,64px)] leading-[.95] uppercase">
              {title}
            </h1>
          </Container>
        </section>

        <Container className="phone:pt-9 phone:pb-16 max-w-[820px] pt-12 pb-[90px]">
          <div
            role="note"
            className="border-red-34 bg-red-05 text-bone-76 mb-10 border p-5 text-[14px] leading-[1.6]"
          >
            <strong className="text-red-bright block font-mono text-[11px] tracking-[.16em] uppercase">
              Placeholder text
            </strong>
            <span className="mt-2 block">
              This page is a styled placeholder. Nothing below has been reviewed by a
              lawyer and none of it is binding. Replace it with {SITE.name}&rsquo;s real
              terms before launch.
            </span>
          </div>

          <div className="flex flex-col gap-9">{children}</div>
        </Container>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}

/** One heading-and-body block inside a legal page. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display mt-0 mb-3 text-[22px] tracking-[.01em] uppercase">
        {heading}
      </h2>
      <div className="text-bone-66 flex flex-col gap-3 text-[15px] leading-[1.7] text-pretty">
        {children}
      </div>
    </section>
  );
}
