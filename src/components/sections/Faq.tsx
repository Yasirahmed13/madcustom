import type { FaqEntry } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { whatsappHref } from "@/lib/whatsapp";
import { FaqAccordion } from "./FaqAccordion";

/**
 * "07 / Questions" — the sticky intro rail and the accordion.
 *
 * Takes its entries as a prop so the service pages can reuse the same layout
 * with their own related questions.
 */
export function Faq({
  entries,
  eyebrow = "07 / QUESTIONS",
  heading = "What people ask before they book",
  lede = "What the work involves, what we need from you, and how long your car is with us. Straight answers — including the ones where the honest answer is “it depends on the car.”",
  servicesHref = "#services",
}: {
  entries: readonly FaqEntry[];
  eyebrow?: string;
  heading?: string;
  lede?: string;
  servicesHref?: string;
}) {
  if (entries.length === 0) return null;

  return (
    <section id="faq" className="border-line-9 border-t">
      <Container className="phone:gap-8 phone:pt-14 phone:pb-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-12 py-[76px]">
        <div data-reveal className="tablet:static sticky top-[98px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display mt-3 mb-[18px] text-[clamp(30px,4vw,52px)] leading-[.98] uppercase">
            {heading}
          </h2>
          <p className="text-bone-62 mt-0 mb-[26px] max-w-[40ch] text-[15px] leading-[1.65] text-pretty">
            {lede}
          </p>
          <div className="phone:flex-col phone:items-stretch flex flex-wrap gap-2.5">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              className="bg-red text-ink hover:bg-red-bright phone:text-center px-5 py-[14px] text-[14px] font-bold transition-colors duration-200"
            >
              Ask us something else
            </a>
            <a
              href={servicesHref}
              className="border-line-20 text-bone hover:border-red phone:text-center border px-5 py-[14px] text-[14px] font-semibold transition-colors duration-200"
            >
              Browse services
            </a>
          </div>
        </div>

        <FaqAccordion entries={entries} />
      </Container>
    </section>
  );
}
