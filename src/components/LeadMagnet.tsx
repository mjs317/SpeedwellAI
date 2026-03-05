"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

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

// ─── Lead Magnet / Email Capture Section ─────────────────────────────────────

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (ConvertKit, Mailchimp, etc.)
    console.log("Lead magnet email capture:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="lead-magnet"
      className="bg-[#0F1B2D] py-20 px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Free Resource
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAF8] leading-tight mb-4">
            Not ready for a call? Start here.
          </h2>
          <p className="text-[#FAFAF8]/60 text-base sm:text-lg leading-relaxed mb-8">
            Get our free guide:{" "}
            <span className="text-[#FAFAF8]/90 font-medium">
              5 Workflows Every SMB Should Automate First
            </span>{" "}
            — with real examples, tool recommendations, and estimated time
            savings.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-[#00C9A7]">
              <CheckCircle size={40} strokeWidth={1.5} />
              <p className="text-lg font-semibold text-[#FAFAF8]">Check your inbox!</p>
              <p className="text-[#FAFAF8]/50 text-sm">
                We&apos;ll send the guide within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full"
              noValidate
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center px-6 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
              >
                Send Me the Guide
              </button>
            </form>
          )}
          {!submitted && (
            <p className="mt-3 text-xs text-[#FAFAF8]/30">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
