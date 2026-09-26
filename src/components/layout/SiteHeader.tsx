import Image from "next/image";
import Link from "next/link";
import { SITE, TEL_HREF } from "@/data/site";
import { APPOINTMENT_URL, isExternalHref, linkTarget } from "@/data/links";
import { MobileMenu } from "./MobileMenu";
import { MobileNav } from "./MobileNav";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

/**
 * Sticky header: wordmark, nav, phone and the appointment CTA.
 *
 * Nav hrefs are absolute ("/", "/#about") or off-site, so the same markup works
 * on the homepage and on a service page. "Services" renders the mega menu; the
 * bar is `relative` so that panel can span its full width. The mobile sheet
 * sits outside the bar, so it resolves against the sticky header instead and
 * hangs below the strip rather than below the bar.
 *
 * Three widths:
 *   above 1180px — wordmark, five nav items, phone chip, CTA
 *   900–1180px   — the phone chip drops and the nav tightens, so five items fit
 *   below 900px  — the nav moves to `MobileNav`, a scrolling strip of chips in
 *                  a second row, with the drawer still available beside the CTA
 */
export function SiteHeader({
  /** Service pages link home rather than to the "#top" anchor. */
  homeHref = "#top",
}: {
  homeHref?: string;
}) {
  const isRoute = homeHref.startsWith("/");

  const logo = (
    <Image
      src="/mad-wordmark.png"
      alt="MAD Custom"
      width={116}
      height={38}
      priority
      className="phone:h-[28px] tablet:h-[32px] block h-[38px] w-auto"
    />
  );

  return (
    <header className="border-line-9 bg-ink-82 sticky top-0 z-[60] border-b backdrop-blur-[14px]">
      <div className="phone:gap-2.5 phone:py-2.5 laptop:gap-4 relative mx-auto flex max-w-[1324px] items-center gap-6 px-[22px] py-[14px]">
        {isRoute ? (
          <Link
            href={homeHref}
            className="text-bone flex flex-none items-center gap-[11px]"
          >
            {logo}
          </Link>
        ) : (
          <a href={homeHref} className="text-bone flex flex-none items-center gap-[11px]">
            {logo}
          </a>
        )}

        <nav
          aria-label="Main"
          className="tablet:hidden laptop:gap-[15px] laptop:text-[12.5px] ml-auto flex items-center gap-[22px] text-[13.5px] font-medium tracking-[.02em]"
        >
          {SITE.nav.map((item) => {
            if (item.mega) {
              return <ServicesMegaMenu key={item.label} label={item.label} />;
            }

            const className =
              "text-bone-72 hover:text-bone whitespace-nowrap transition-colors duration-200";

            return isExternalHref(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                {...linkTarget(item.href)}
                className={className}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="tablet:ml-auto phone:gap-2 flex flex-none items-center gap-3">
          {/* Five nav items and the phone chip stop fitting together at 1180px;
              the number stays in the drawer, the footer and the bottom bar. */}
          <a
            href={TEL_HREF}
            className="border-line-14 text-bone-80 hover:border-red hover:text-bone laptop:hidden flex-none border px-[13px] py-[9px] font-mono text-[12.5px] whitespace-nowrap transition-colors duration-200"
          >
            {SITE.primaryPhoneDisplay}
          </a>
          <a
            href={APPOINTMENT_URL}
            className="bg-red text-ink hover:bg-red-bright phone:px-3 phone:py-2.5 phone:text-[12px] flex-none px-[18px] py-[11px] text-[13.5px] font-bold tracking-[.03em] whitespace-nowrap transition-colors duration-200"
          >
            Make Appointment
          </a>
          <MobileMenu />
        </div>
      </div>

      <MobileNav />
    </header>
  );
}
