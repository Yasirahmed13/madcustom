import { TEL_HREF } from "@/data/site";
import { APPOINTMENT_URL } from "@/data/links";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * The fixed bottom action bar: Call, WhatsApp, Book.
 *
 * NOTE: the design shows this at every width, not only on phones — there is no
 * media query on it, and the footer carries 96px of bottom padding to clear it.
 * That is reproduced here. To make it phone-only, add `tablet:hidden` to the
 * wrapper below and drop the footer's `pb-24`.
 *
 * Three links and no state, so this stays a server component.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="border-line-12 bg-ink-94 fixed inset-x-0 bottom-0 z-[70] flex gap-px border-t backdrop-blur-[12px]"
    >
      <a
        href={TEL_HREF}
        className="text-bone hover:bg-white-5 phone:px-1.5 phone:py-[15px] phone:text-[13px] flex-1 px-2.5 py-4 text-center text-[13.5px] font-semibold transition-colors duration-200"
      >
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener"
        className="border-line-12 text-bone hover:bg-white-5 phone:px-1.5 phone:py-[15px] phone:text-[13px] flex-1 border-l px-2.5 py-4 text-center text-[13.5px] font-semibold transition-colors duration-200"
      >
        WhatsApp
      </a>
      <a
        href={APPOINTMENT_URL}
        className="bg-red text-ink hover:bg-red-bright phone:px-1.5 phone:py-[15px] phone:text-[13px] flex-[1.4] px-2.5 py-4 text-center text-[13.5px] font-bold transition-colors duration-200"
      >
        Make Appointment
      </a>
    </nav>
  );
}
