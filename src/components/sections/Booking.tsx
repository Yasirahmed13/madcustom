import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * "01 / Book — Your build sheet".
 *
 * The heading is server-rendered; only the wizard itself is a client component.
 */
export function Booking() {
  return (
    <Container
      as="section"
      id="book"
      className="phone:pt-14 phone:pb-16 pt-[78px] pb-[90px]"
    >
      <SectionHeader
        eyebrow="01 / BOOK"
        title="Your build sheet"
        lede="Four short steps. You'll leave with a confirmed consultation slot and a spec summary our techs actually read."
        className="mb-[34px]"
      />
      <BookingForm />
    </Container>
  );
}
