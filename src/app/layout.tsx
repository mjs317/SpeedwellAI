import type { Metadata } from "next";
// Use the local geist npm package (no Google Fonts network request required)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Speedwell AI — AI Automation for Small & Mid-Sized Businesses",
  description:
    "Speedwell AI helps small and mid-sized businesses identify, implement, and optimize AI automations — without the enterprise price tag. Book a free 30-minute discovery call.",
  keywords: [
    "AI automation",
    "business automation",
    "small business AI",
    "workflow automation",
    "CRM automation",
    "AI consultancy",
    "SMB AI solutions",
  ],
  authors: [{ name: "Speedwell AI" }],
  openGraph: {
    title: "Speedwell AI — AI Built for the Businesses Big Consultancies Ignore",
    description:
      "Practical AI automations for small and mid-sized businesses. Fixed-price projects. Real ROI. No fluff.",
    url: "https://speedwellai.com", // TODO: update with actual domain
    siteName: "Speedwell AI",
    type: "website",
    // TODO: add og:image once brand assets are finalized
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedwell AI — AI Automation for SMBs",
    description:
      "Practical AI automations for small and mid-sized businesses. Fixed-price projects. Real ROI.",
    // TODO: add twitter:image once brand assets are finalized
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    // SVG favicon (velocity chevron mark) — see /public/favicon.svg
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }, // fallback for older browsers
    ],
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
