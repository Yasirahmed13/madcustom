import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first, WebP second — both are much smaller than the source JPEGs.
    formats: ["image/avif", "image/webp"],
    // Next 16 rejects any quality outside this list with a 400, so every value
    // used in a `quality` prop has to be declared here.
    qualities: [65, 70, 72, 75, 82],
    // The Instagram Graph API serves media from these CDNs. Only reached when
    // INSTAGRAM_ACCESS_TOKEN is set; without it the local fallback images are used.
    remotePatterns: [
      { protocol: "https", hostname: "*.cdninstagram.com" },
      { protocol: "https", hostname: "*.fbcdn.net" },
    ],
  },
  async redirects() {
    return [
      // The old GHL page names, in case they were shared or bookmarked.
      { source: "/services-page", destination: "/services", permanent: true },
      { source: "/appointment-mad-page", destination: "/book", permanent: true },
      { source: "/appointment", destination: "/book", permanent: true },
      {
        source: "/home-1-on-1-consultation",
        destination: "/consultation",
        permanent: true,
      },
      { source: "/terms-condition-page", destination: "/terms", permanent: true },
      { source: "/terms-and-condition", destination: "/terms", permanent: true },
      { source: "/privacy-policy-page", destination: "/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // The work media is content-addressed by filename and never mutated in place.
        source: "/work/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
