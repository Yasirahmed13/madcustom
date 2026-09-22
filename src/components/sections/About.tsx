import Image from "next/image";
import Link from "next/link";
import { ABOUT, CARLY, ERAS, LEGACY, LINEAGE } from "@/data/timeline";
import { ABOUT_URL } from "@/data/links";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";

/**
 * "04 / Our story" — the Rodríguez family history.
 *
 * The copy in this section is personal and is reproduced exactly as written,
 * including the accents, the curly quotes and "Magueyes Auto Desing" as the
 * business spelled it. It lives in data/timeline.ts.
 */
export function About() {
  return (
    <section id="about" className="border-line-9 bg-surface border-t">
      {/* --- The story and the photo trio --- */}
      <Container className="phone:gap-9 phone:pt-[60px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[52px] pt-[84px] pb-10">
        <div data-reveal>
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[14px] mb-2.5 text-[clamp(30px,4.2vw,56px)] leading-[.98] uppercase">
            {ABOUT.headingLines[0]}
            <br />
            {ABOUT.headingLines[1]}
          </h2>
          <div className="font-display text-red-bright mb-[22px] text-[clamp(17px,1.9vw,23px)] tracking-[.03em] uppercase">
            {ABOUT.subheading}
          </div>
          <p className="text-bone-74 mt-0 mb-4 text-[clamp(15px,1.5vw,17.5px)] leading-[1.68] text-pretty">
            {ABOUT.intro.leadBefore}
            <strong className="text-bone font-semibold">{ABOUT.intro.leadBrand}</strong>
            {ABOUT.intro.leadAfter}
            <em className="text-bone not-italic">{ABOUT.intro.leadNickname}</em>
          </p>
          <p className="text-bone-62 m-0 text-[15.5px] leading-[1.68] text-pretty">
            {ABOUT.intro.body}
          </p>

          {/* The long form: the four eras in full, plus the shop floor itself. */}
          <Link
            href={ABOUT_URL}
            className="border-line-20 text-bone hover:border-red hover:bg-red-10 mt-[26px] inline-flex items-center gap-2.5 border px-[22px] py-[14px] text-[14.5px] font-semibold transition-colors duration-200"
          >
            Read our full story
            <span aria-hidden="true" className="font-mono text-[13px]">
              &rarr;
            </span>
          </Link>
        </div>

        <div data-reveal className="grid grid-cols-2 gap-3">
          {ABOUT.photos.map((photo) => (
            <div
              key={photo.file}
              /* The two square shots are content-box in the design (`width:100%`
                 with a 1px border and no box-sizing), so each is 2px taller than
                 its grid track. The tall shot sets box-sizing:border-box and is
                 not. Reproduced as-is: it is what sets this section's height. */
              className={`border-line-8 relative border ${
                photo.tall ? "row-span-2 min-h-full" : "box-content aspect-square w-full"
              }`}
            >
              <Image
                src={`/work/thumb/${photo.file}.jpg`}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(max-width: 900px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          ))}
        </div>
      </Container>

      {/* --- The four eras --- */}
      <Container className="pt-5 pb-[30px]">
        <div className="border-line-10 bg-line-10 tablet:grid-cols-2 phone:grid-cols-1 grid grid-cols-4 gap-px border">
          {ERAS.map((era) => (
            <article
              key={era.year}
              data-reveal
              className="bg-surface-card flex min-w-0 flex-col gap-3 px-6 pt-7 pb-[30px]"
              style={{ borderTop: `3px solid ${era.rule}` }}
            >
              <div className="font-display text-bone text-[40px] leading-none tracking-[.01em]">
                {era.year}
              </div>
              <h3 className="font-display text-red-bright m-0 text-[17px] tracking-[.02em] uppercase">
                {era.title}
              </h3>
              <p className="text-bone-64 m-0 text-[14px] leading-[1.6] text-pretty">
                {era.body}
              </p>
              <div className="text-bone-38 mt-auto pt-[14px] font-mono text-[11px] tracking-[.1em]">
                {era.tag}
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* --- In memory: Carly --- */}
      <Container className="pt-[14px] pb-[30px]">
        <div
          data-reveal
          className="border-red-34 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-8 border p-[clamp(24px,3.4vw,42px)]"
          style={{
            background:
              "linear-gradient(120deg,rgba(224,27,36,.12),rgba(12,12,13,0) 60%)",
          }}
        >
          <div>
            <div className="text-red-bright mb-3 font-mono text-[11px] tracking-[.16em]">
              {CARLY.eyebrow}
            </div>
            <h3 className="font-display mt-0 mb-[14px] text-[clamp(24px,2.8vw,34px)] leading-[1.05] uppercase">
              {CARLY.heading}
            </h3>
            <p className="text-bone-72 m-0 text-[15.5px] leading-[1.68] text-pretty">
              {CARLY.bodyBefore}
              <strong className="text-bone font-semibold">{CARLY.bodyStrong}</strong>
              {CARLY.bodyAfter}
            </p>
          </div>
          <div className="phone:border-t-2 phone:border-l-0 phone:pt-[22px] phone:pl-0 border-l-2 border-red-50 pl-6">
            <p className="text-bone-68 mt-0 mb-3 text-[15.5px] leading-[1.7] text-pretty">
              {CARLY.quote}
            </p>
            <div className="font-display text-red-bright text-[15px] tracking-[.04em] uppercase">
              {CARLY.attribution}
            </div>
          </div>
        </div>
      </Container>

      {/* --- The legacy continues --- */}
      <Container className="phone:pb-[60px] pt-4 pb-[84px]">
        <div data-reveal>
          <div className="text-bone-42 mb-[18px] font-mono text-[11px] tracking-[.16em]">
            {LEGACY.eyebrow}
          </div>

          <ol className="phone:flex-col phone:items-stretch phone:gap-1.5 mb-[30px] flex list-none flex-wrap items-center gap-3 p-0">
            {LINEAGE.map((entry, index) => (
              <li
                key={entry.name}
                className="phone:flex-col phone:items-stretch phone:gap-1.5 flex items-center gap-3"
              >
                <span
                  className={`phone:text-center phone:whitespace-normal border px-4 py-3 text-[13.5px] font-semibold whitespace-nowrap ${
                    entry.current
                      ? "border-red bg-red text-ink"
                      : "border-line-14 bg-white-3 text-bone-70"
                  }`}
                >
                  {entry.name}
                </span>
                {index < LINEAGE.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="text-red phone:block phone:rotate-90 phone:text-center font-mono text-[15px] leading-none"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="border-line-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[26px] border-t pt-[26px]">
            {LEGACY.columns.map((column) => (
              <p
                key={column.slice(0, 24)}
                className="text-bone-64 m-0 text-[15px] leading-[1.68] text-pretty"
              >
                {column}
              </p>
            ))}
            <div>
              <div className="font-display text-[clamp(18px,2vw,24px)] leading-[1.25] uppercase">
                {LEGACY.closingLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < LEGACY.closingLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-[14px]">
                <Image
                  src="/mad-shield.png"
                  alt="MAD Custom"
                  width={49}
                  height={52}
                  loading="lazy"
                  className="block h-[52px] w-auto"
                />
                <div className="font-display text-red-bright text-[14px] tracking-[.06em] uppercase">
                  {LEGACY.shieldLines[0]}
                  <br />
                  {LEGACY.shieldLines[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
