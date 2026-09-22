import Image from "next/image";
import Link from "next/link";
import { LOCATIONS, SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import { APPOINTMENT_URL, PRODUCTS_URL, SERVICES_URL } from "@/data/links";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/lib/whatsapp";

const COLUMN_TITLE = "mb-[14px] text-[11px] tracking-[.14em] uppercase text-bone-40";

export function SiteFooter() {
  const socials = SITE.socials.map((social) => ({
    label: social.label,
    url: social.url ?? whatsappHref(),
  }));

  return (
    <footer className="border-line-9 bg-ink-deep border-t">
      <Container className="phone:gap-[30px] phone:pt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10 pt-[60px] pb-7">
        <div>
          <div className="mb-4 flex items-center gap-[14px]">
            <Image
              src="/mad-shield.png"
              alt="MAD Custom"
              width={55}
              height={58}
              loading="lazy"
              className="block h-[58px] w-auto"
            />
            <Image
              src="/mad-wordmark.png"
              alt=""
              width={104}
              height={34}
              loading="lazy"
              className="block h-[34px] w-auto"
            />
          </div>
          <p className="text-bone-50 m-0 max-w-[34ch] text-[13.5px] leading-[1.6]">
            {SITE.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener"
                className="border-line-14 text-bone-75 hover:border-red hover:text-bone border px-[13px] py-[9px] text-[12.5px] font-semibold transition-colors duration-200"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className={COLUMN_TITLE}>Services</div>
          <div className="flex flex-col gap-[9px]">
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={SERVICES_URL}
                target="_blank"
                rel="noopener"
                className="text-bone-68 hover:text-red-bright text-[13.5px] transition-colors duration-200"
              >
                {service.title}
              </a>
            ))}
          </div>

          <a
            href={PRODUCTS_URL}
            target="_blank"
            rel="noopener"
            className={`${COLUMN_TITLE} hover:text-red-bright mt-[26px] block transition-colors duration-200`}
          >
            Products
          </a>
          <div className="flex flex-col gap-[9px]">
            {PRODUCTS.map((product) => (
              <a
                key={product.name}
                href={PRODUCTS_URL}
                target="_blank"
                rel="noopener"
                className="text-bone-68 hover:text-red-bright text-[13.5px] transition-colors duration-200"
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          {LOCATIONS.map((location, index) => (
            <div key={location.id}>
              <div className={index === 0 ? COLUMN_TITLE : `${COLUMN_TITLE} mt-[26px]`}>
                {location.label}
              </div>
              <p className="text-bone-62 mt-0 mb-2.5 text-[13.5px] leading-[1.6]">
                {location.addressLines[0]}
                <br />
                {location.addressLines[1]}
              </p>
              <a href={`tel:${location.phoneE164}`} className="font-mono text-[13px]">
                {location.phoneDisplay}
              </a>
            </div>
          ))}
        </div>

        <div>
          <div className={COLUMN_TITLE}>Shop hours</div>
          <p className="text-bone-62 mt-0 mb-[18px] text-[13.5px] leading-[1.6]">
            {SITE.hours.daysLabel}
            <br />
            {SITE.hours.timeLabel}
          </p>
          <a href={`mailto:${SITE.email}`} className="text-[13.5px]">
            {SITE.email}
          </a>
          <a
            href={APPOINTMENT_URL}
            target="_blank"
            rel="noopener"
            className="bg-red text-ink hover:bg-red-bright mt-[22px] block p-[14px] text-center text-[14px] font-bold transition-colors duration-200"
          >
            Make Appointment
          </a>
        </div>
      </Container>

      <Container className="border-line-8 text-bone-38 flex flex-wrap gap-[14px] border-t pt-[18px] pb-24 text-[12px]">
        <span>© {new Date().getFullYear()} MAD Custom</span>
        <Link href="/terms" className="text-bone-50 hover:text-bone">
          Terms &amp; Conditions
        </Link>
        <Link href="/privacy" className="text-bone-50 hover:text-bone">
          Privacy Policy
        </Link>
      </Container>
    </footer>
  );
}
