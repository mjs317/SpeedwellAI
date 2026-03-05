"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  company: string;
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

// ─── Contact / CTA Section ────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    company: "",
    timeSink: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    try {
      // TODO: Replace with your actual form handling endpoint (Resend, Formspree, etc.)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      setState("success");
      setForm({ name: "", email: "", company: "", timeSink: "", message: "" });
    } catch {
      setState("error");
      setErrorMsg(
        "Something went wrong. Please email us directly or try again."
      );
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition";

  const selectClass =
    "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition appearance-none cursor-pointer";

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
            operations and decide together whether the $499 Assessment is the
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
          {state === "success" ? (
            <div className="flex flex-col items-center gap-3 py-12 text-[#00C9A7]">
              <CheckCircle size={40} strokeWidth={1.5} />
              <p className="text-lg font-semibold">Message received!</p>
              <p className="text-[#FAFAF8]/50 text-sm">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-left"
              noValidate
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                  >
                    Work Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </div>

              {/* Biggest time sink dropdown */}
              <div>
                <label
                  htmlFor="timeSink"
                  className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                >
                  What&apos;s your biggest time sink? *
                </label>
                <div className="relative">
                  <select
                    id="timeSink"
                    name="timeSink"
                    required
                    value={form.timeSink}
                    onChange={handleChange}
                    className={`${selectClass} ${
                      form.timeSink ? "text-[#FAFAF8]" : "text-[#FAFAF8]/30"
                    }`}
                  >
                    <option value="" disabled className="bg-[#0F1B2D] text-[#FAFAF8]/50">
                      Select the area eating most of your team&apos;s time…
                    </option>
                    {timeSinkOptions.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-[#0F1B2D] text-[#FAFAF8]"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-[#FAFAF8]/40" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                >
                  Tell us more *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your biggest operational headache — we'll send a personalized recommendation."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error message */}
              {state === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-bold text-base hover:bg-[#00a88c] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00C9A7]/20"
              >
                {state === "submitting" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#0F1B2D]/30 border-t-[#0F1B2D] animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-xs text-[#FAFAF8]/40 mt-1">
                <span className="text-[#00C9A7]">✓</span> We respond to all inquiries within 1 business day.
              </p>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
