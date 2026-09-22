import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/data/services";
import { SITE, TEL_HREF } from "@/data/site";

/** 404, in the site's own language. */
export default function NotFound() {
  return (
    <>
      <SiteHeader homeHref="/" />

      <main>
        <section className="border-line-9 bg-surface relative flex min-h-[70vh] items-center border-b">
          <Container className="phone:py-14 py-20">
            <div className="text-red font-mono text-[11.5px] tracking-[.16em]">
              ERROR / 404
            </div>

            <h1 className="font-display mt-3 mb-0 max-w-[18ch] text-[clamp(40px,7vw,104px)] leading-[.9] tracking-[-.02em] uppercase">
              This one never
              <br />
              <span className="text-red">left the shop</span>
            </h1>

            <p className="text-bone-74 mt-[22px] mb-0 max-w-[48ch] text-[clamp(15px,1.5vw,18px)] leading-[1.55]">
              The page you were after is not here. It may have moved, or the link may be
              wrong. Everything we build is one click away below.
            </p>

            <div className="phone:flex-col phone:items-stretch mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-red text-ink hover:bg-red-bright phone:text-center px-7 py-[17px] text-[15px] font-bold tracking-[.02em] transition-colors duration-200"
              >
                Back to the shop floor
              </Link>
              <a
                href={TEL_HREF}
                className="border-line-20 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[26px] py-[17px] text-[15px] font-semibold transition-colors duration-200"
              >
                Call {SITE.primaryPhoneDisplay}
              </a>
            </div>

            <div className="border-line-10 mt-12 border-t pt-7">
              <div className="text-bone-42 mb-[18px] font-mono text-[11px] tracking-[.16em]">
                NINE WAYS IN
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="border-line-14 bg-white-3 text-bone-86 hover:border-red hover:text-bone border px-[14px] py-2.5 text-[13.5px] font-semibold transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Image
              src="/mad-shield.png"
              alt=""
              width={49}
              height={52}
              aria-hidden="true"
              className="mt-12 block h-[52px] w-auto opacity-40"
            />
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
