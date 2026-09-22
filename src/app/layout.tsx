import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollBehaviorGuard } from "@/components/ui/ScrollBehaviorGuard";
import { SITE, SITE_URL } from "@/data/site";
import { localBusinessSchema } from "@/lib/jsonld";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Built beyond the ordinary`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "custom wheels Orlando",
    "paint protection film Orlando",
    "vinyl wrap Orlando",
    "performance suspension",
    "car customization Puerto Rico",
    "MAD Custom",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Built beyond the ordinary`,
    description: SITE.description,
    url: SITE_URL,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Built beyond the ordinary`,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-ink text-bone overflow-x-hidden antialiased">
        <nav aria-label="Skip links">
          <a
            href="#top"
            className="bg-red text-ink sr-only px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200]"
          >
            Skip to content
          </a>
        </nav>

        {children}

        <Reveal />
        <ScrollBehaviorGuard />

        {/* One AutoRepair node per shop. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </body>
    </html>
  );
}
