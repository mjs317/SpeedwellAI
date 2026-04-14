import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Speedwell AI",
  description: "How Speedwell AI collects, uses, and protects your information.",
  alternates: {
    canonical: "https://speedwellai.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FAFAF8] pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0F1B2D] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#6B7280] mb-12">Last updated: April 14, 2026</p>

          <p className="text-[#6B7280] text-base leading-relaxed mb-10">
            Speedwell AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what information we collect and how we use it.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              What We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-base leading-relaxed pl-2">
              <li>Name, work email, and company name when you fill out our contact form or complete our AI Readiness Scorecard.</li>
              <li>Responses to scorecard questions to generate your personalized report.</li>
              <li>Calculator inputs (team size, hourly cost, hours/week) if you use our ROI calculator and request an emailed estimate.</li>
              <li>Basic usage data through analytics tools (pages visited, time on site, referral source). We do not track you across other websites.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              How We Use It
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-base leading-relaxed pl-2">
              <li>To respond to your inquiry or send your scorecard results.</li>
              <li>To send you a personalized automation recommendation if you request one.</li>
              <li>To improve our website and services.</li>
              <li>We will never sell, rent, or share your personal information with third parties for marketing purposes.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              Cookies
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              We use minimal, functional cookies required for the site to operate and basic analytics. We do not use advertising or tracking cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              Email Communication
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              If you submit a form, we may follow up by email. You can opt out of any further communication by replying &ldquo;unsubscribe&rdquo; to any email.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              Data Retention & Deletion
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              We retain your information only as long as needed to provide our services. You can request deletion of your data at any time by emailing{" "}
              <a href="mailto:hello@speedwellai.com" className="text-[#00C9A7] hover:underline underline-offset-2">
                hello@speedwellai.com
              </a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              Third-Party Services
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-base leading-relaxed pl-2">
              <li>We use Calendly for scheduling (their privacy policy applies when you book a call).</li>
              <li>We use Google Analytics to understand how visitors use our site.</li>
              <li>We use Vercel for hosting and Cloudflare for security.</li>
              <li>We use Resend for transactional email delivery.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0F1B2D] mb-4 uppercase tracking-wide text-sm">
              Contact
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Questions about this policy? Email us at{" "}
              <a href="mailto:hello@speedwellai.com" className="text-[#00C9A7] hover:underline underline-offset-2">
                hello@speedwellai.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
