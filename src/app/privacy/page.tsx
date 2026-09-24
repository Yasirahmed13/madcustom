import type { Metadata } from "next";
import {
  Callout,
  EmailLink,
  Keyword,
  LegalPage,
  LegalSection,
  MessagingPhone,
} from "@/components/legal/Legal";
import { TERMS_URL } from "@/data/links";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your information across our website, forms, text messages and booking calendars.`,
  path: "/privacy",
});

const TOC = [
  { id: "p1", title: "Information We Collect" },
  { id: "p2", title: "How We Use Your Information" },
  { id: "p3", title: "Cookies and Tracking" },
  { id: "p4", title: "How We Share Your Information" },
  { id: "p5", title: "Your Choices" },
  { id: "p6", title: "Data Security" },
  { id: "p7", title: "Children’s Privacy" },
  { id: "p8", title: "Updates to This Policy" },
] as const;

export default function PrivacyPage() {
  const section = (i: number) => ({ id: TOC[i]!.id, num: i + 1, title: TOC[i]!.title });

  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy"
      updated="18 September 2026"
      toc={TOC}
      intro={
        <>
          <strong className="text-bone">{SITE.legalEntity}</strong>, trading as MAD Custom
          (&ldquo;MAD Custom&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), builds and
          services vehicles in Florida and Puerto Rico. This policy explains what we
          collect when you contact us or use this site, why we collect it, and what
          control you have over it. We have kept it in plain language on purpose.
        </>
      }
    >
      <LegalSection {...section(0)}>
        <p>You give us most of this yourself, through a form, a call or a text:</p>
        <ul>
          <li>
            <strong>Contact details:</strong> your name, mobile number and email address.
          </li>
          <li>
            <strong>Vehicle details:</strong> year, make and model, plus the service you
            are interested in and anything you tell us about the work you want.
          </li>
          <li>
            <strong>Messages:</strong> what you write in an enquiry, and our conversation
            with you afterwards.
          </li>
        </ul>
        <p>Some is collected automatically when you browse:</p>
        <ul>
          <li>
            <strong>Device and usage data:</strong> IP address, browser type, pages viewed
            and how you arrived at the site.
          </li>
        </ul>
        <p>
          We do not ask for and do not want your payment card numbers, government
          identification numbers or any health information through this website.
        </p>
      </LegalSection>

      <LegalSection {...section(1)}>
        <p>We use what you give us to:</p>
        <ul>
          <li>Reply to your enquiry and quote the work.</li>
          <li>Book, confirm and remind you about appointments.</li>
          <li>Update you on a vehicle that is with us.</li>
          <li>
            Keep a record of work carried out, so future service has history behind it.
          </li>
          <li>Improve the site and understand which services people are looking for.</li>
        </ul>
        <Callout>
          <strong>We do not sell your information.</strong> We do not rent it, and we do
          not hand your phone number or email to anyone else for their own marketing.
        </Callout>
      </LegalSection>

      <LegalSection {...section(2)}>
        <p>
          This site uses cookies and similar technologies to keep the site working,
          remember your preferences and measure how pages perform. Some are set by the
          services we use to host the site and run our forms.
        </p>
        <p>
          You can clear or block cookies in your browser settings. Blocking them may stop
          parts of the site, including the booking forms, from working properly.
        </p>
      </LegalSection>

      <LegalSection {...section(3)}>
        <p>We share information only where it is needed to run the business:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who host our site, deliver our forms, send
            our emails and texts, and keep our customer records. They may only use it to
            provide that service to us.
          </li>
          <li>
            <strong>Suppliers and installers</strong> where a specific job requires it,
            for example ordering the correct wheel or component for your vehicle.
          </li>
          <li>
            <strong>Legal requirements,</strong> if we are required to disclose something
            by law, or to protect our rights, safety or property.
          </li>
        </ul>
        <p>
          No mobile information will be shared with third parties or affiliates for
          marketing or promotional purposes. Text messaging originator opt-in data and
          consent are never shared with any third parties.
        </p>
        <p>
          If the business is ever sold or restructured, customer records may transfer as
          part of it. Any new owner would remain bound by this policy.
        </p>
      </LegalSection>

      <LegalSection {...section(4)}>
        <p>You are in control of how we contact you:</p>
        <ul>
          <li>
            <strong>Text messages:</strong> reply <Keyword>STOP</Keyword> to any message
            to end them, or <Keyword>START</Keyword> to begin again. Full detail is in our{" "}
            <a href={TERMS_URL}>Terms &amp; Conditions</a>.
          </li>
          <li>
            <strong>Email:</strong> use the unsubscribe link, or just ask us.
          </li>
          <li>
            <strong>Access or deletion:</strong> ask us what we hold about you, or ask us
            to correct or delete it.
          </li>
        </ul>
        <p>
          To make any of these requests, contact us on <MessagingPhone /> or <EmailLink />
          . We may need to keep certain records of completed work where we are required
          to.
        </p>
      </LegalSection>

      <LegalSection {...section(5)}>
        <p>
          We take reasonable steps to protect the information we hold, including limiting
          who on our team can see customer records and relying on established providers
          for our site and messaging.
        </p>
        <p>
          No website or system is completely secure, so we cannot promise absolute
          security. If you believe your information has been exposed, tell us straight
          away so we can act on it.
        </p>
      </LegalSection>

      <LegalSection {...section(6)}>
        <p>
          Our services are aimed at adults. We do not knowingly collect information from
          anyone under 18. If you believe a child has given us their details, contact us
          and we will remove it.
        </p>
      </LegalSection>

      <LegalSection {...section(7)}>
        <p>
          We may revise this policy as the business or the rules around it change. The
          date at the top of the page shows the current version. Where a change is
          significant we will make it clear on the site rather than quietly swapping the
          text.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
