import type { Metadata } from "next";
import Script from "next/script";
// Use the local geist npm package (no Google Fonts network request required)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Analytics from "@/components/Analytics";
import AssessmentPopup from "@/components/AssessmentPopup";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Speedwell AI — AI Automation for Small & Mid-Sized Businesses",
  description: SITE_CONFIG.siteDescription,
  keywords: [
    "AI automation",
    "business automation",
    "small business AI",
    "workflow automation",
    "CRM automation",
    "AI consultancy",
    "SMB AI solutions",
    "Make automation",
    "Zapier consultant",
    "OpenAI business",
  ],
  authors: [{ name: SITE_CONFIG.siteName }],
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
  openGraph: {
    title: "Speedwell AI — AI Built for the Businesses Big Consultancies Ignore",
    description:
      "Practical AI automations for small and mid-sized businesses. Fixed-price projects. Real ROI. No fluff.",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [
      {
        url: "/og-image.png", // TODO: Create a 1200×630 OG image and place at /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Speedwell AI — AI Automation for SMBs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedwell AI — AI Automation for SMBs",
    description:
      "Practical AI automations for small and mid-sized businesses. Fixed-price projects. Real ROI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }, // fallback for older browsers
    ],
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": SITE_CONFIG.siteUrl,
      name: SITE_CONFIG.siteName,
      description: SITE_CONFIG.siteDescription,
      url: SITE_CONFIG.siteUrl,
      founder: { "@type": "Person", name: SITE_CONFIG.founderName },
      serviceType: "AI Automation Consulting",
      areaServed: "United States",
      priceRange: "$499 – $20,000",
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE_CONFIG.email,
        contactType: "customer service",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What exactly does Speedwell AI do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We help small and mid-sized businesses identify the manual, repetitive tasks that are costing them time and money — then we build and deploy the AI automations to eliminate them.",
          },
        },
        {
          "@type": "Question",
          name: "Can't I just use ChatGPT, Zapier, or Make myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT is great for one-off tasks — writing emails, brainstorming ideas, answering questions. But it can't log into your CRM, auto-qualify your leads, trigger follow-up sequences, or push invoice data into QuickBooks. That requires custom system building: connectors, guardrails, and human-review steps that work in production. Zapier and Make are powerful tools — and we use them too. But knowing which workflows to build, how to connect them reliably, and how to handle edge cases is the hard part. That's exactly what we do.",
          },
        },
        {
          "@type": "Question",
          name: "What does the $499 assessment include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A thorough audit of your operations, workflows, and existing tools. You'll receive a prioritized roadmap of automation opportunities. The $499 is credited toward your project if you move forward.",
          },
        },
        {
          "@type": "Question",
          name: "How long does implementation typically take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most implementation projects take 4–8 weeks from kickoff to deployment, depending on scope.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel the optimization retainer anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our retainers are month-to-month with 30 days notice. No long-term lock-in, no cancellation fees.",
          },
        },
      ],
    },
  ],
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
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XD59XEWKVP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XD59XEWKVP');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <AssessmentPopup />
        <Analytics />
      </body>
    </html>
  );
}
