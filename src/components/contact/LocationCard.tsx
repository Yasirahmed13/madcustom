import { LOCATION_LABELS } from "@/data/contact";
import { SITE, directionsHref, type Location } from "@/data/site";
import { APPOINTMENT_URL } from "@/data/links";

/** One labelled row inside the card: caption on the left, value on the right. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-line-8 phone:grid-cols-[minmax(0,1fr)] phone:gap-1 grid grid-cols-[92px_minmax(0,1fr)] items-baseline gap-4 border-t py-[15px]">
      <span className="text-bone-40 font-mono text-[10.5px] tracking-[.14em] uppercase">
        {label}
      </span>
      <span className="text-[14.5px] leading-[1.6]">{children}</span>
    </div>
  );
}

/**
 * A shop, with everything needed to reach it or drive to it.
 *
 * The three row captions — Location, Call Us, Email Us — are the ones the live
 * contact page uses, and the address is printed exactly as it appears there.
 */
export function LocationCard({
  location,
  index,
}: {
  location: Location;
  /** Zero-based, for the "01 / 02" corner marker. */
  index: number;
}) {
  return (
    <article
      data-reveal=""
      style={{ transitionDelay: `${index * 70}ms` }}
      className="bg-surface-card border-line-10 hover:border-line-18 flex flex-col border p-[clamp(20px,2.6vw,32px)] transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-red font-mono text-[11.5px] tracking-[.16em]">
            {location.regionName.toUpperCase()}
          </div>
          <h3 className="font-display mt-2.5 mb-0 text-[clamp(26px,3vw,38px)] leading-[.98] uppercase">
            {location.city}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="text-bone-32 font-mono text-[11.5px] tracking-[.14em]"
        >
          0{index + 1}
        </span>
      </div>

      <div className="mt-[22px]">
        <Row label={LOCATION_LABELS.address}>
          <span className="text-bone-74">{location.addressFull}</span>
        </Row>

        <Row label={LOCATION_LABELS.phone}>
          <a
            href={`tel:${location.phoneE164}`}
            className="hover:text-red-soft font-mono text-[14px] transition-colors duration-200"
          >
            {location.phoneDisplay}
          </a>
        </Row>

        <Row label={LOCATION_LABELS.email}>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-red-soft break-all transition-colors duration-200"
          >
            {SITE.email}
          </a>
        </Row>

        <Row label="Hours">
          <span className="text-bone-74">
            {SITE.hours.daysLabel} {SITE.hours.timeLabel}
          </span>
        </Row>
      </div>

      <div className="phone:flex-col phone:items-stretch mt-auto flex flex-wrap gap-2.5 pt-[26px]">
        <a
          href={APPOINTMENT_URL}
          target="_blank"
          rel="noopener"
          className="bg-red text-ink hover:bg-red-bright phone:text-center px-[22px] py-[14px] text-[14px] font-bold transition-colors duration-200"
        >
          Make Appointment
        </a>
        <a
          href={directionsHref(location)}
          target="_blank"
          rel="noopener"
          className="border-line-16 text-bone hover:border-red hover:bg-red-10 phone:text-center border px-[20px] py-[14px] text-[14px] font-semibold transition-colors duration-200"
        >
          Get directions <span className="font-mono">&#8599;</span>
        </a>
      </div>
    </article>
  );
}
