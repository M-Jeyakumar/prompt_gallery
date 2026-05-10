import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Gallery - AI Image Generation Prompts",
  description: "Discover and share amazing AI image generation prompts for ChatGPT, Gemini, and more. Browse, copy, and use high-quality prompts for your creative AI projects.",
  keywords: ["AI prompts", "image generation", "ChatGPT", "Gemini", "prompt engineering"],
  authors: [{ name: "Prompt Gallery" }],
  creator: "Prompt Gallery",
  publisher: "Prompt Gallery",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptgalleryia.vercel.app",
    siteName: "Prompt Gallery",
  },
  alternates: {
    canonical: "https://promptgalleryia.vercel.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="google-site-verification" content="chCwwRgKZGtFdGybLCTEfQ8RFmPf4cPndbowFfZtyh8" />
        <link rel="canonical" href="https://promptgalleryia.vercel.app/" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
