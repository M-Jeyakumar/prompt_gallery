import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
    {
      source: "/sitemap.xml",
      headers: [
        {
          key: "Content-Type",
          value: "application/xml",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=3600, must-revalidate",
        },
      ],
    },
    {
      source: "/robots.txt",
      headers: [
        {
          key: "Content-Type",
          value: "text/plain",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=86400",
        },
      ],
    },
  ],
};

export default nextConfig;
