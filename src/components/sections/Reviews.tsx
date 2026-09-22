import { REVIEWS } from "@/data/reviews";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";

/** "06 / Five stars, no asterisks". */
export function Reviews() {
  return (
    <section className="border-line-9 bg-surface border-t">
      <Container className="phone:pt-14 phone:pb-16 py-[76px]">
        <Eyebrow>06 / CUSTOMERS</Eyebrow>
        <h2 className="font-display mt-3 mb-[34px] text-[clamp(30px,4vw,52px)] leading-[.98] uppercase">
          Five stars, no asterisks
        </h2>

        <div className="tablet:grid-cols-1 grid grid-cols-3 gap-4">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              data-reveal
              className="border-line-10 bg-surface-card m-0 flex flex-col gap-[14px] border p-6"
            >
              <div
                role="img"
                aria-label="Rated 5 out of 5"
                className="text-red-bright text-[14px] tracking-[.22em]"
              >
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote className="text-bone-76 m-0 text-[14.5px] leading-[1.6] text-pretty">
                {review.quote}
              </blockquote>
              <figcaption className="border-line-8 text-bone-50 mt-auto border-t pt-3 text-[13px]">
                <strong className="text-bone font-semibold">{review.name}</strong> ·{" "}
                {review.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
