import Image from "next/image";
import { SITE } from "@/data/site";
import { whatsappHref } from "@/lib/whatsapp";
import { HeroVideo } from "./HeroVideo";

/**
 * The hero: reel over a poster, the location line, the headline, the two CTAs
 * and the stat strip. Holds the page's only <h1>.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="border-line-9 relative box-content flex min-h-[88vh] items-end border-b"
    >
      <div className="bg-ink absolute inset-0 overflow-hidden">
        {/* The LCP element. Painted before anything else on the page. */}
        <Image
          src="/hero/poster.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          aria-hidden="true"
          className="object-cover object-[center_62%] brightness-[.55] saturate-[.8]"
        />
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%,rgba(12,12,13,0) 30%,rgba(12,12,13,.55) 100%)",
          }}
        />
      </div>

      {/* "FROM THE SHOP FLOOR" — hidden below 900px, as designed. */}
      <div className="tablet:hidden absolute right-[22px] bottom-[26px] z-[3] flex items-center gap-2.5">
        <span aria-hidden="true" className="bg-red h-[7px] w-[7px] rounded-full" />
        <span className="text-bone-55 font-mono text-[10.5px] tracking-[.16em]">
          FROM THE SHOP FLOOR
        </span>
      </div>

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

      <div className="phone:px-4 phone:pt-[72px] phone:pb-10 relative mx-auto w-full max-w-[1280px] px-[22px] pt-[120px] pb-14">
        <div className="mb-[26px] flex animate-[madup_.6s_ease_both] items-center gap-2.5">
          <span
            aria-hidden="true"
            className="bg-green h-[7px] w-[7px] animate-[madpulse_1.8s_ease-in-out_infinite] rounded-full"
          />
          <span className="text-bone-68 phone:text-[10px] phone:leading-[1.5] phone:tracking-[.08em] font-mono text-[11.5px] tracking-[.14em]">
            ORLANDO, FL&nbsp;&nbsp;·&nbsp;&nbsp;BARCELONETA,
            PR&nbsp;&nbsp;·&nbsp;&nbsp;BOOKING NOW
          </span>
        </div>

        <h1 className="font-display m-0 max-w-[16ch] animate-[madup_.7s_ease_both] text-[clamp(46px,8.2vw,124px)] leading-[.88] tracking-[-.02em] uppercase">
          Built beyond
          <br />
          <span className="text-red">the ordinary</span>
        </h1>

        <p className="text-bone-74 mt-[26px] mb-0 max-w-[52ch] text-[clamp(15px,1.5vw,19px)] leading-[1.55] text-pretty">
          Wheel fitment, suspension, wraps, PPF and one-of-one builds — engineered by MAD
          Custom. Tell us what you drive and pick a slot. No phone tag, no forms that go
          nowhere.
        </p>

        <div className="phone:flex-col phone:items-stretch mt-[34px] flex flex-wrap gap-3">
          <a
            href="#book"
            className="bg-red text-ink hover:bg-red-bright phone:justify-center phone:text-center flex items-center gap-2.5 px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200"
          >
            Start my build sheet <span className="font-mono">→</span>
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
            className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
          >
            WhatsApp the shop
          </a>
        </div>

        <dl className="border-line-10 phone:mt-9 phone:grid phone:grid-cols-2 phone:gap-x-4 phone:gap-y-[22px] mt-[52px] flex flex-wrap gap-[34px] border-t pt-[26px]">
          {SITE.stats.map((stat) => (
            <div key={stat.label} className="phone:min-w-0 min-w-[130px]">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="m-0">
                <span className="font-display text-bone block text-[30px] leading-none">
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
      </div>
    </section>
  );
}
