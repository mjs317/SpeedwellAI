import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title:
    "How to Automate Invoicing for Your Small Business (Without Enterprise Software) — Speedwell AI",
  description:
    "A practical walkthrough of invoice automation for 10–50 person businesses — the tools, the workflow design, and what to watch out for. No enterprise software required.",
  openGraph: {
    title:
      "How to Automate Invoicing for Your Small Business (Without Enterprise Software)",
    description:
      "A practical guide to invoice automation for growing businesses — without the enterprise price tag.",
    type: "article",
    url: `${SITE_CONFIG.siteUrl}/blog/automate-invoicing-small-business`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Speedwell AI Blog" }],
  },
};

export default function AutomateInvoicingPost() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FAFAF8] pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0F1B2D] transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-[#0F1B2D] transition-colors">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#0F1B2D] truncate">Automate Invoicing</span>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
              February 2026
            </p>
            <span className="w-1 h-1 rounded-full bg-[#6B7280]/40" />
            <p className="text-[#6B7280] text-sm">8 min read</p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-6">
            How to Automate Invoicing for Your Small Business (Without Enterprise
            Software)
          </h1>

          {/* Intro */}
          <p className="text-[#6B7280] text-lg leading-relaxed mb-10 pb-10 border-b border-[#0F1B2D]/8">
            If your team is still manually entering invoice data, chasing
            approvals over email, or copy-pasting line items between systems,
            you&apos;re paying for it in hours every week. The good news: invoice
            automation isn&apos;t just for enterprises anymore. Here&apos;s what
            it actually looks like for a 10–50 person business.
          </p>

          {/* Body — placeholder */}
          <div className="space-y-6 text-[#6B7280] text-base leading-relaxed">
            <p>
              <strong className="text-[#0F1B2D]">[Full article coming soon.]</strong>{" "}
              This post is live and indexed while the complete content is being
              written. The full article will cover:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>What invoice automation actually does (and doesn&apos;t do)</li>
              <li>
                Tools that work for SMBs — Make, Zapier, QuickBooks integrations,
                and when to go custom
              </li>
              <li>A step-by-step workflow design for a 10–50 person business</li>
              <li>
                Common mistakes and what to watch out for when building this
                yourself
              </li>
              <li>
                When it makes sense to bring someone in vs. handling it in-house
              </li>
            </ul>
            <p>
              In the meantime, if you&apos;re dealing with manual invoicing or
              document processing right now, the fastest path forward is a
              30-minute discovery call — we can tell you exactly what&apos;s
              possible for your specific setup, at no cost.
            </p>
          </div>

          {/* CTA block */}
          <div className="mt-14 p-8 rounded-2xl bg-[#0F1B2D] text-center">
            <p className="text-[#FAFAF8] font-bold text-lg mb-2">
              Ready to automate your invoicing?
            </p>
            <p className="text-[#FAFAF8]/60 text-sm mb-6">
              Book a free 30-minute call and we&apos;ll walk through what an
              invoice automation would look like for your specific stack.
            </p>
            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors duration-200"
            >
              Book a Free Discovery Call
            </a>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm text-[#6B7280] hover:text-[#0F1B2D] transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
