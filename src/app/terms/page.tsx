import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Terms & Conditions",
    description: `Terms and conditions for ${SITE.name} — automotive customization in Orlando, Florida and Barceloneta, Puerto Rico.`,
    path: "/terms",
  }),
  // A placeholder page should not be indexed. Remove this once the real text is in.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL / TERMS" title="Terms & Conditions">
      <LegalSection heading="1. Placeholder — About these terms">
        <p>
          [PLACEHOLDER] Describe who these terms are between, what counts as accepting
          them, and how customers are told when they change.
        </p>
      </LegalSection>

      <LegalSection heading="2. Placeholder — Quotes and bookings">
        <p>
          [PLACEHOLDER] Set out how long a written quote stands for, what a consultation
          booking commits either side to, and how to reschedule or cancel. The site
          currently tells customers that consultations are free and that no deposit is
          taken to hold a slot — this section should match that.
        </p>
      </LegalSection>

      <LegalSection heading="3. Placeholder — Payment">
        <p>
          [PLACEHOLDER] Deposits, payment stages, accepted methods, and what happens with
          parts ordered specifically for a vehicle.
        </p>
      </LegalSection>

      <LegalSection heading="4. Placeholder — Vehicles in our care">
        <p>
          [PLACEHOLDER] Collection and storage, insurance while a vehicle is at the shop,
          and how long a completed vehicle can be left before storage charges apply.
        </p>
      </LegalSection>

      <LegalSection heading="5. Placeholder — Workmanship guarantee">
        <p>
          [PLACEHOLDER] The site states that every installation is backed by a workmanship
          guarantee plus the manufacturer warranty on films, coatings and wheels. Set out
          what that covers, for how long, and what voids it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Placeholder — Liability">
        <p>[PLACEHOLDER] Limits of liability, and anything excluded from them by law.</p>
      </LegalSection>

      <LegalSection heading="7. Placeholder — Governing law">
        <p>
          [PLACEHOLDER] Which jurisdiction governs, noting that {SITE.name} operates in
          both Florida and Puerto Rico.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact">
        <p>
          Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
          or <a href={`tel:${SITE.primaryPhoneE164}`}>{SITE.primaryPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
