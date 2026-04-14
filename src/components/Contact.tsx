"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "submitted" | "error";

interface FormFields {
  email: string;
  timeSink: string;
  message: string;
}

// ─── Scroll-triggered fade-up wrapper ────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timeSinkOptions = [
  "Data entry & document processing",
  "Email & communication management",
  "Scheduling & calendar coordination",
  "Reporting & data compilation",
  "Client onboarding & follow-up",
  "Lead management & CRM updates",
  "Other",
];

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [formData, setFormData] = useState<FormFields>({
    email: "",
    timeSink: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "submitted") {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-[#00C9A7]/15 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#FAFAF8] mb-2">We got your message.</h3>
        <p className="text-[#FAFAF8]/60 text-sm mb-6">
          We&apos;ll send you a personalized automation recommendation within 1 business day.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors duration-200"
        >
          Or skip ahead — Book a Free Discovery Call
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {/* Work Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5">
          Work Email *
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="jane@company.com"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Biggest time sink */}
      <div>
        <label htmlFor="timeSink" className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5">
          What&apos;s your biggest time sink? *
        </label>
        <div className="relative">
          <select
            id="timeSink"
            required
            value={formData.timeSink}
            onChange={(e) => setFormData((prev) => ({ ...prev, timeSink: e.target.value }))}
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition appearance-none cursor-pointer ${formData.timeSink ? "text-[#FAFAF8]" : "text-[#FAFAF8]/30"}`}
          >
            <option value="" disabled className="bg-[#0F1B2D] text-[#FAFAF8]/50">
              Select the area eating most of your team&apos;s time…
            </option>
            {timeSinkOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0F1B2D] text-[#FAFAF8]">
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-[#FAFAF8]/40" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5">
          Tell us more *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Describe your biggest operational headache — we'll send a personalized recommendation."
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-bold text-base hover:bg-[#00a88c] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00C9A7]/20"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
            Get My Recommendation
          </>
        )}
      </button>

      {status === "error" && (
        <div className="mt-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">
            Something went wrong. Please try again or email us directly at{" "}
            <a href="mailto:hello@speedwellai.com" className="underline">hello@speedwellai.com</a>.
          </p>
        </div>
      )}

      <p className="text-xs text-[#FAFAF8]/40 mt-1">
        <span className="text-[#00C9A7]">✓</span> We respond to all inquiries within 1 business day.
      </p>
    </form>
  );
}

// ─── Contact / CTA Section ────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0F1B2D] py-20 px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight mb-4">
            Ready to find out what AI can do for your business?
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-[#FAFAF8]/60 text-base sm:text-lg max-w-xl mx-auto mb-10">
            Book a free 30-minute discovery call. We&apos;ll talk through your
            operations and decide together whether the $499 Deep-Dive Assessment is the
            right next step.
          </p>
        </FadeUp>

        {/* Primary CTA — Calendly */}
        <FadeUp delay={0.2}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-bold text-base hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
          >
            Book a Free Discovery Call
          </a>
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.3}>
          <div className="my-14">
            <div className="h-px bg-white/10 mb-10" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAF8] mb-2">
              Not ready for a call? Request a quick recommendation.
            </h3>
            <p className="text-[#FAFAF8]/50 text-sm sm:text-base max-w-md mx-auto">
              Tell us your biggest operational headache and we&apos;ll send a
              personalized automation recommendation within 24 hours —
              completely free.
            </p>
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.35}>
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  );
}
