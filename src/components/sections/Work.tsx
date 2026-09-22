import { PHOTOS, VIDEOS } from "@/data/work";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/work/Marquee";
import { WorkGallery } from "@/components/work/WorkGallery";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/**
 * "03 / Recent metal" — the marquee and the filterable gallery.
 */
export function Work() {
  const intro = `${plural(PHOTOS.length, "photo")} and ${plural(
    VIDEOS.length,
    "video",
  )} straight off the shop floor. Pick a service, then tap any shot to see it full size.`;

  return (
    <section
      id="work"
      className="border-line-9 phone:pt-14 overflow-hidden border-t pt-[70px]"
    >
      <Container className="pb-[34px]">
        <Eyebrow>03 / OUT OF THE SHOP</Eyebrow>
        <h2 className="font-display mt-3 mb-0 text-[clamp(32px,4.6vw,58px)] leading-[.95] uppercase">
          Recent metal
        </h2>
      </Container>

      <Marquee />

      <Container className="phone:pb-[60px] pb-[90px]">
        <div
          data-reveal
          className="mb-6 flex flex-wrap items-end gap-x-[18px] gap-y-[14px]"
        >
          <h3 className="font-display m-0 text-[clamp(24px,2.8vw,34px)] leading-none uppercase">
            The work, by service
          </h3>
          <p className="text-bone-60 tablet:ml-0 mt-0 mr-0 mb-0.5 ml-auto max-w-[44ch] text-[14.5px] leading-[1.5]">
            {intro}
          </p>
        </div>

        <WorkGallery />
      </Container>
    </section>
  );
}
