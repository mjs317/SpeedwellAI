"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User } from "lucide-react";

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

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <FadeUp className="text-center mb-14">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
            About
          </p>
        </FadeUp>

        {/* Two-column layout: photo + text */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Headshot placeholder */}
          <FadeUp delay={0.05} className="flex-shrink-0">
            {/*
             * TODO: Replace this placeholder with an <Image> tag pointing to
             * the founder's actual headshot.
             * Recommended size: 400×400px, square crop.
             *
             * Example:
             * <Image
             *   src="/founder.jpg"
             *   alt="[Founder Name], Founder of Speedwell AI"
             *   width={280}
             *   height={280}
             *   className="rounded-2xl object-cover w-56 h-56 lg:w-64 lg:h-64"
             * />
             */}
            <div className="w-52 h-52 lg:w-64 lg:h-64 rounded-2xl bg-[#0F1B2D]/6 border border-[#0F1B2D]/10 flex flex-col items-center justify-center gap-3 text-[#6B7280]">
              <User size={40} strokeWidth={1.2} />
              <span className="text-xs font-medium tracking-wide uppercase">
                {/* TODO: Replace with founder name */}
                Founder Photo
              </span>
            </div>
          </FadeUp>

          {/* Bio */}
          <div className="flex-1">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-6">
                Built by someone who&apos;s been in the trenches.
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-5">
                {/*
                 * TODO: Replace [Name] and [background] with actual founder info.
                 * Example: "Speedwell AI was founded by Sarah Chen, a former operations
                 * director and software engineer who saw firsthand..."
                 */}
                Speedwell AI was founded by{" "}
                <span className="font-semibold text-[#0F1B2D]">
                  [Founder Name]
                </span>
                , a{" "}
                <span className="font-semibold text-[#0F1B2D]">
                  [background — e.g., former operations director]
                </span>{" "}
                who saw firsthand how much time and money small businesses lose
                to manual, repetitive work.
              </p>
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed">
                We exist to close that gap — with practical tools, real
                implementations, and zero fluff. No enterprise jargon, no
                six-figure retainers, no consultants who disappear after the
                slide deck.
              </p>
            </FadeUp>

            {/* Credentials / trust signals row */}
            <FadeUp delay={0.3} className="mt-8 flex flex-wrap gap-4">
              {[
                "Fixed-price projects",
                "No long-term lock-in",
                "Real implementations",
                "Human support",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-semibold"
                >
                  <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                  {tag}
                </span>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
