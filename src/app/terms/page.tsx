import type { Metadata } from "next";
import {
  Callout,
  EmailLink,
  Keyword,
  LegalPage,
  LegalSection,
  MessagingPhone,
} from "@/components/legal/Legal";
import { PRIVACY_URL } from "@/data/links";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${SITE.name}'s text messages, enquiry and booking forms — automotive customization in Orlando, Florida and Barceloneta, Puerto Rico.`,
  path: "/terms",
});

const TOC = [
  { id: "s1", title: "Program Description" },
  { id: "s2", title: "Age Restriction" },
  { id: "s3", title: "Consent to Receive Messages" },
  { id: "s4", title: "Opt Out" },
  { id: "s5", title: "Opt In Again" },
  { id: "s6", title: "Help and Support" },
  { id: "s7", title: "Message Frequency and Rates" },
  { id: "s8", title: "Carrier Disclaimer" },
  { id: "s9", title: "Privacy" },
  { id: "s10", title: "Changes to These Terms" },
] as const;

export default function TermsPage() {
  const section = (i: number) => ({ id: TOC[i]!.id, num: i + 1, title: TOC[i]!.title });

  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms & Conditions"
      updated="18 September 2026"
      toc={TOC}
      intro={
        <>
          These terms apply to the text message programme operated by{" "}
          <strong className="text-bone">{SITE.legalEntity}</strong>, trading as MAD Custom
          (&ldquo;MAD Custom&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), and to the
          enquiry and booking forms on this site. By submitting a form or replying to one
          of our messages you agree to what is set out below.
        </>
      }
    >
      <LegalSection {...section(0)}>
        <p>
          MAD Custom uses text messages to respond to enquiries about automotive
          customization work, including wheels and tires, suspension, vinyl wrap, paint
          protection film, detailing, upholstery, window tint, exhaust and bespoke builds.
          Messages relate to quotes, appointment times, progress updates on a vehicle in
          our care, and occasional service reminders.
        </p>
        <p>
          We operate from Florida and Puerto Rico. Messages are sent by us or by a
          messaging provider acting on our behalf.
        </p>
      </LegalSection>

      <LegalSection {...section(1)}>
        <p>
          You must be 18 or older to give consent to receive text messages from us. By
          providing a mobile number you confirm that you are at least 18 and that the
          number belongs to you or that you are authorised to use it.
        </p>
      </LegalSection>

      <LegalSection {...section(2)}>
        <p>
          When you enter your mobile number on one of our forms and submit it, you are
          agreeing to receive text messages from MAD Custom about your enquiry or booking.
        </p>
        <Callout>
          <strong>Consent is not a condition of purchase.</strong> You do not have to
          agree to text messages in order to book work with us or buy anything from us.
          You can call us instead on <MessagingPhone />.
        </Callout>
        <p>
          We do not sell or rent your mobile number, and we do not share it with anyone
          for their own marketing.
        </p>
      </LegalSection>

      <LegalSection {...section(3)}>
        <p>
          You can stop the messages at any time. Reply <Keyword>STOP</Keyword> to any text
          you receive from us. We will send one confirmation message and then stop sending
          you texts.
        </p>
        <p>
          You can also ask us to remove your number by emailing <EmailLink /> or calling{" "}
          <MessagingPhone />.
        </p>
      </LegalSection>

      <LegalSection {...section(4)}>
        <p>
          If you change your mind after opting out, reply <Keyword>START</Keyword> to
          resume messages, or submit a form on this site again, or simply ask us next time
          you speak to us.
        </p>
      </LegalSection>

      <LegalSection {...section(5)}>
        <p>
          Reply <Keyword>HELP</Keyword> to any of our messages and you will receive our
          contact details. You can also reach a person directly:
        </p>
        <ul>
          <li>
            Phone: <MessagingPhone />
          </li>
          <li>
            Email: <EmailLink />
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...section(6)}>
        <p>
          Message frequency varies and depends on your enquiry. A quote conversation may
          involve several messages in a day, while a service reminder may arrive only
          occasionally.
        </p>
        <p>
          <strong>Message and data rates may apply.</strong> Any charges come from your
          mobile carrier under your own plan, not from us. Check with your carrier if you
          are unsure what your plan includes.
        </p>
      </LegalSection>

      <LegalSection {...section(7)}>
        <p>
          Mobile carriers are not liable for delayed or undelivered messages. Delivery
          depends on your carrier, your device and your signal, none of which we control.
          If you are expecting a message from us and it has not arrived, please call us.
        </p>
      </LegalSection>

      <LegalSection {...section(8)}>
        <p>
          Information you give us through a form or a text message is handled as described
          in our <a href={PRIVACY_URL}>Privacy Policy</a>. In short, we use it to answer
          your enquiry and carry out the work you ask for, and we do not sell it.
        </p>
      </LegalSection>

      <LegalSection {...section(9)}>
        <p>
          We may update these terms as our services or the messaging rules change. The
          date at the top of this page shows when it was last revised. Continuing to use
          our forms or messaging after a change means you accept the updated terms.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
