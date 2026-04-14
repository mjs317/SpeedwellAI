"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "What exactly does Speedwell AI do?",
    answer:
      "We help small and mid-sized businesses identify the manual, repetitive tasks that are costing them time and money — then we build and deploy the AI automations to eliminate them. Think automated invoicing, smart follow-up sequences, document processing, scheduling, and more.",
  },
  {
    question: "Can't I just use ChatGPT, Zapier, or Make myself?",
    answer:
      "ChatGPT is great for one-off tasks — writing emails, brainstorming ideas, answering questions. But it can't log into your CRM, auto-qualify your leads, trigger follow-up sequences, or push invoice data into QuickBooks. That requires custom system building: connectors, guardrails, and human-review steps that work in production. Zapier and Make are powerful tools — and we use them too. But knowing which workflows to build, how to connect them reliably, and how to handle edge cases is the hard part. Most businesses don't have the time or in-house expertise to get this right. That's exactly what we do.",
  },
  {
    question: "What does the $499 assessment include?",
    answer:
      "A thorough audit of your operations, workflows, and existing tools. You'll receive a prioritized roadmap of automation opportunities with estimated time savings and effort to implement. If you move forward with implementation, the $499 is credited toward your project.",
  },
  {
    question: "Do I need to be technical to work with you?",
    answer:
      "Not at all. Our job is to handle the technical complexity so you don't have to. We explain everything in plain language and make sure your team is confident using whatever we build before we hand it over.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Most implementation projects take 4–8 weeks from kickoff to deployment, depending on scope. We'll give you a clear timeline as part of your fixed-price proposal after the assessment.",
  },
  {
    question: "What if the automations break or need to change?",
    answer:
      "That's exactly what the optimization retainer is for. We monitor, maintain, and improve your automations as your business evolves. For one-off fixes outside the retainer, we offer transparent hourly support.",
  },
  {
    question: "Do you build custom applications, or just configure existing tools?",
    answer:
      "Both. Most clients start with workflow automation on platforms like Make, Zapier, or HubSpot — and that's often all they need. But when off-the-shelf tools genuinely can't do the job, we build custom: AI agents, internal dashboards, bespoke integrations, purpose-built applications. The process is the same either way — everything is scoped upfront and delivered at a fixed price. You'll never be handed an open-ended invoice because we chose to write custom code.",
  },
];

// ─── Individual accordion item ────────────────────────────────────────────────

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <FadeUp delay={0.05 + index * 0.07}>
      <div className="border-b border-black/8 last:border-b-0">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        >
          <span className="text-base sm:text-lg font-semibold text-[#0F1B2D] group-hover:text-[#00C9A7] transition-colors duration-200">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-shrink-0 text-[#00C9A7]"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-[#6B7280] text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

export default function FAQ() {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section
      id="faq"
      className="bg-[#FAFAF8] py-20 px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight">
            Questions we hear all the time.
          </h2>
        </FadeUp>

        {/* Accordion */}
        <div className="divide-y divide-black/0 border-t border-black/8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
