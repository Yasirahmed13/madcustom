import Image from "next/image";
import { SITE, TEL_HREF } from "@/data/site";
import { APPOINTMENT_URL } from "@/data/links";
import { Container } from "@/components/ui/Container";

/** The closing call to action: "Bring the vision. We'll handle the rest." */
export function CtaBand() {
  return (
    <section className="border-line-9 relative overflow-hidden border-t">
      <Image
        src="/cta/backdrop.jpg"
        alt=""
        fill
        loading="lazy"
        quality={65}
        sizes="100vw"
        aria-hidden="true"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg,rgba(12,12,13,.82),rgba(12,12,13,.94))",
        }}
      />

      <Container className="phone:pt-14 phone:pb-16 relative py-[90px] text-center">
        <div className="text-red-bright font-mono text-[11.5px] tracking-[.16em]">
          1:1 WITH MAD CUSTOM
        </div>
        <h2 className="font-display mx-auto mt-4 mb-5 max-w-[20ch] text-[clamp(34px,6vw,86px)] leading-[.92] uppercase">
          Bring the vision. We&rsquo;ll handle the rest.
        </h2>
        <p className="text-bone-72 mx-auto my-0 max-w-[58ch] text-[16px] leading-[1.6]">
          A personalized consultation: technical evaluation, design direction, and a
          tailored customization plan — precise, cohesive, unmistakably yours.
        </p>
        <div className="phone:flex-col phone:items-stretch mt-[34px] flex flex-wrap justify-center gap-3">
          <a
            href={APPOINTMENT_URL}
            className="bg-red text-ink hover:bg-red-bright px-[30px] py-[18px] text-[15.5px] font-bold transition-colors duration-200"
          >
            Make Appointment
          </a>
          <a
            href={TEL_HREF}
            className="border-line-22 text-bone hover:border-red border px-7 py-[18px] text-[15.5px] font-semibold transition-colors duration-200"
          >
            Call {SITE.primaryPhoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
