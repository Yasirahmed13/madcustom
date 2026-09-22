import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description: `How ${SITE.name} handles the information you share through the booking form and the shop.`,
    path: "/privacy",
  }),
  // A placeholder page should not be indexed. Remove this once the real text is in.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL / PRIVACY" title="Privacy Policy">
      <LegalSection heading="1. Placeholder — Who we are">
        <p>
          [PLACEHOLDER] Name the legal entity behind {SITE.name}, its registered address,
          and who to contact about data.
        </p>
      </LegalSection>

      <LegalSection heading="2. What the build sheet collects">
        <p>
          This part is factual rather than placeholder, because it describes what the site
          actually does today. The booking form collects the services you select, your
          vehicle&rsquo;s year, make, model and condition, your preferred day, time window
          and location, your name, and your phone number and/or email, plus anything you
          type into the notes field.
        </p>
        <p>
          That information is emailed to {SITE.email} so the shop can confirm your slot.
          It is not sold, and it is not shared with anyone outside the business.
        </p>
      </LegalSection>

      <LegalSection heading="3. Placeholder — How long it is kept">
        <p>[PLACEHOLDER] State a retention period and how to ask for deletion.</p>
      </LegalSection>

      <LegalSection heading="4. Placeholder — Cookies and analytics">
        <p>
          [PLACEHOLDER] The site ships with no analytics and no advertising cookies today.
          If any are added, list them here along with how to opt out.
        </p>
      </LegalSection>

      <LegalSection heading="5. Placeholder — Third parties">
        <p>
          [PLACEHOLDER] List the processors in use — the email provider that delivers
          booking notifications, the hosting provider, and the Instagram feed embedded on
          the homepage.
        </p>
      </LegalSection>

      <LegalSection heading="6. Placeholder — Your rights">
        <p>[PLACEHOLDER] Access, correction and deletion, and how to make a request.</p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>
          Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
          <a href={`tel:${SITE.primaryPhoneE164}`}>{SITE.primaryPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
