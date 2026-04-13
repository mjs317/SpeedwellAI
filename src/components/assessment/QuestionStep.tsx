"use client";

import { Check } from "lucide-react";

export interface QuestionStepOption {
  label: string;
  value: string | number;
}

interface QuestionStepProps {
  prompt: string;
  eyebrow?: string;
  options: QuestionStepOption[];
  selected: string | number | null;
  onSelect: (v: string | number) => void;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
  error?: string;
}

export default function QuestionStep({
  prompt,
  eyebrow,
  options,
  selected,
  onSelect,
  showOther,
  otherValue,
  onOtherChange,
  error,
}: QuestionStepProps) {
  return (
    <div className="flex flex-col gap-4">
      {eyebrow && (
        <span className="text-xs font-semibold tracking-wide uppercase text-[#00C9A7]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAF8] leading-snug mb-2">
        {prompt}
      </h2>

      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={[
                "text-left px-4 py-3.5 rounded-lg border transition-colors flex items-center gap-3",
                active
                  ? "bg-[#00C9A7]/10 border-[#00C9A7] text-[#FAFAF8]"
                  : "bg-white/5 border-white/10 text-[#FAFAF8]/85 hover:border-white/25 hover:bg-white/10",
              ].join(" ")}
              aria-pressed={active}
            >
              <span
                className={[
                  "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                  active
                    ? "border-[#00C9A7] bg-[#00C9A7]"
                    : "border-white/30",
                ].join(" ")}
              >
                {active && <Check size={12} strokeWidth={3} className="text-[#0F1B2D]" />}
              </span>
              <span className="text-sm sm:text-[0.95rem] leading-snug">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {showOther && (
        <div className="mt-2">
          <label className="block text-xs font-medium text-[#FAFAF8]/70 mb-1.5">
            Tell us more <span className="text-[#00C9A7]">*</span>
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition min-h-[80px]"
            value={otherValue || ""}
            onChange={(e) => onOtherChange?.(e.target.value)}
            placeholder="What's eating your team's time?"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
