"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import ContactStep, { ContactInfo } from "./ContactStep";
import QuestionStep from "./QuestionStep";
import ResultsView from "./ResultsView";
import { SpeedwellLogo } from "@/components/SpeedwellLogo";
import {
  SCORED_QUESTIONS,
  PAIN_POINT_OPTIONS,
  PAIN_POINT_QUESTION,
  PainPoint,
  TEAM_SIZE_OPTIONS,
  TeamSize,
} from "@/lib/assessment/questions";
import type {
  Answers,
  DimensionScores,
  Recommendation,
  Tier,
} from "@/lib/assessment/scoring";

type Answer = 1 | 2 | 3 | 4;

type StepKind =
  | { kind: "scored"; index: number }
  | { kind: "pain" }
  | { kind: "contact" }
  | { kind: "loading" }
  | { kind: "results" };

interface ApiResult {
  email: string;
  scores: {
    overall: number;
    tier: Tier;
    tierDescription: string;
    dimensions: DimensionScores;
  };
  recommendations: Recommendation[];
}

// 7 scored + 1 pain-point + 1 contact = 9 steps in the progress bar
const TOTAL_STEPS = SCORED_QUESTIONS.length + 1 + 1;

export default function AssessmentFlow() {
  const router = useRouter();
  const [step, setStep] = useState<StepKind>({ kind: "scored", index: 0 });
  const [contact, setContact] = useState<ContactInfo>({
    name: "",
    email: "",
    company: "",
    teamSize: "",
  });
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [painPoint, setPainPoint] = useState<PainPoint | "">("");
  const [painPointOther, setPainPointOther] = useState("");
  const [error, setError] = useState<string>("");
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);

  const currentIndex = (() => {
    if (step.kind === "scored") return step.index;
    if (step.kind === "pain") return SCORED_QUESTIONS.length;
    if (step.kind === "contact") return SCORED_QUESTIONS.length + 1;
    return TOTAL_STEPS - 1;
  })();

  const stepKey =
    step.kind === "scored" ? `scored-${step.index}` : step.kind;

  function validateAndNext() {
    setError("");
    if (step.kind === "scored") {
      const q = SCORED_QUESTIONS[step.index];
      if (!answers[q.id as keyof Answers]) {
        return setError("Please select an option to continue.");
      }
      const next = step.index + 1;
      if (next >= SCORED_QUESTIONS.length) {
        setStep({ kind: "pain" });
      } else {
        setStep({ kind: "scored", index: next });
      }
      return;
    }
    if (step.kind === "pain") {
      if (!painPoint) return setError("Please choose an option.");
      if (painPoint === "Other" && !painPointOther.trim()) {
        return setError("Please describe your pain point.");
      }
      setStep({ kind: "contact" });
      return;
    }
    if (step.kind === "contact") {
      if (!contact.name.trim()) return setError("Please enter your name.");
      if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        return setError("Please enter a valid email.");
      }
      if (!contact.company.trim()) return setError("Please enter your company.");
      if (contact.teamSize && !TEAM_SIZE_OPTIONS.includes(contact.teamSize as TeamSize)) {
        return setError("Invalid team size.");
      }
      void submit();
      return;
    }
  }

  function goBack() {
    setError("");
    if (step.kind === "scored") {
      if (step.index > 0) {
        setStep({ kind: "scored", index: step.index - 1 });
      } else {
        router.push("/");
      }
    } else if (step.kind === "pain") {
      setStep({ kind: "scored", index: SCORED_QUESTIONS.length - 1 });
    } else if (step.kind === "contact") {
      setStep({ kind: "pain" });
    }
  }

  async function submit() {
    setStep({ kind: "loading" });
    setError("");
    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          company: contact.company.trim(),
          teamSize: contact.teamSize || undefined,
          answers,
          painPoint,
          painPointOther: painPoint === "Other" ? painPointOther.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }
      setApiResult(data as ApiResult);
      setStep({ kind: "results" });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStep({ kind: "contact" });
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-16 min-h-screen flex flex-col">
      {/* Top brand bar */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <SpeedwellLogo variant="dark" size="1.6rem" />
        </Link>
        {step.kind !== "results" && step.kind !== "loading" && (
          <div className="text-xs text-[#FAFAF8]/50">AI Readiness Scorecard</div>
        )}
      </div>

      {step.kind !== "results" && step.kind !== "loading" && (
        <div className="mb-10">
          <ProgressBar current={currentIndex} total={TOTAL_STEPS} />
        </div>
      )}

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepKey}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step.kind === "scored" &&
              (() => {
                const q = SCORED_QUESTIONS[step.index];
                const current = answers[q.id as keyof Answers];
                return (
                  <QuestionStep
                    eyebrow={`Question ${step.index + 1} of ${SCORED_QUESTIONS.length}`}
                    prompt={q.prompt}
                    options={q.options.map((o) => ({
                      label: o.label,
                      value: o.score,
                    }))}
                    selected={current ?? null}
                    onSelect={(v) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: v as Answer,
                      }))
                    }
                    error={error}
                  />
                );
              })()}

            {step.kind === "pain" && (
              <QuestionStep
                eyebrow="Almost there"
                prompt={PAIN_POINT_QUESTION}
                options={PAIN_POINT_OPTIONS.map((p) => ({
                  label: p,
                  value: p,
                }))}
                selected={painPoint || null}
                onSelect={(v) => setPainPoint(v as PainPoint)}
                showOther={painPoint === "Other"}
                otherValue={painPointOther}
                onOtherChange={setPainPointOther}
                error={error}
              />
            )}

            {step.kind === "contact" && (
              <div className="flex flex-col gap-1 mb-2">
                <p className="text-xs font-semibold text-[#00C9A7] uppercase tracking-widest mb-2">
                  Almost done
                </p>
                <p className="text-[#FAFAF8]/65 text-sm mb-4">
                  Enter your details to get your personalized report.
                </p>
                <ContactStep
                  value={contact}
                  onChange={setContact}
                  error={error}
                />
              </div>
            )}

            {step.kind === "loading" && (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
                <Loader2
                  size={36}
                  className="animate-spin text-[#00C9A7]"
                />
                <div className="text-lg font-semibold text-[#FAFAF8]">
                  Generating your personalized report…
                </div>
                <div className="text-sm text-[#FAFAF8]/60 max-w-sm">
                  Scoring your answers, building your PDF, and sending it to your
                  inbox. Takes about 10 seconds.
                </div>
              </div>
            )}

            {step.kind === "results" && apiResult && (
              <ResultsView
                email={apiResult.email}
                overall={apiResult.scores.overall}
                tier={apiResult.scores.tier}
                tierDescription={apiResult.scores.tierDescription}
                dimensions={apiResult.scores.dimensions}
                recommendations={apiResult.recommendations}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step.kind !== "loading" && step.kind !== "results" && (
        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-[#FAFAF8]/60 hover:text-[#FAFAF8] text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <button
            type="button"
            onClick={validateAndNext}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors shadow-lg shadow-[#00C9A7]/20"
          >
            {step.kind === "contact" ? "Get my report" : "Continue"}
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
