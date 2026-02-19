"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/speedwellai/discovery";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  company: string;
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

// ─── Contact / CTA Section ────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    try {
      // TODO: Replace with your actual form handling endpoint or a service
      // like Resend, Formspree, etc. The /api/contact route is a placeholder.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      setState("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setState("error");
      setErrorMsg(
        "Something went wrong. Please email us directly or try again."
      );
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition";

  return (
    <section
      id="contact"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
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
            Book a free 30-minute discovery call. No pitch, no pressure — just a
            real conversation about where automation can help.
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
            Book Your Free Call
          </a>
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.3}>
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[#FAFAF8]/30 text-xs font-medium tracking-widest uppercase">
              Or send us a message
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </FadeUp>

        {/* Fallback email form */}
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

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-[#FAFAF8]/50 mb-1.5"
                >
                  How can we help? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business and the repetitive tasks eating your team's time..."
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

              {/* Submit — full-width on mobile, matches primary CTA style */}
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
