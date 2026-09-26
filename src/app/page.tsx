import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { Booking } from "@/components/sections/Booking";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Instagram } from "@/components/sections/Instagram";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { HOME_FAQ } from "@/data/faq";
import { faqSchema } from "@/lib/jsonld";

/**
 * The homepage, in the design's section order.
 *
 * The Instagram reels and grid revalidate every 15 minutes; everything else is
 * fully static.
 */
export const revalidate = 900;

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <Booking />
        <Services />
        <Work />
        <About />
        <Instagram />
        <Reviews />
        <Faq entries={HOME_FAQ} />
        <CtaBand />
      </main>

      <SiteFooter />
      <MobileActionBar />

      {/* FAQPage carries the questions that are actually rendered above. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQ)) }}
      />
    </>
  );
}
