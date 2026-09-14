import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Explicit allow-list — required from Next.js 16 onward.
    qualities: [70, 82, 90],
    // DEMO IMAGERY ONLY.
    // Phase 1 uses free-licence architectural photography served from Unsplash.
    // Replace with Lion Yard's own licensed photography (local /public or a CDN)
    // and remove this remotePatterns entry before production launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560],
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
