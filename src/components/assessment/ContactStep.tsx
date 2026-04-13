"use client";

import { TEAM_SIZE_OPTIONS, TeamSize } from "@/lib/assessment/questions";

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  teamSize: TeamSize | "";
}

interface ContactStepProps {
  value: ContactInfo;
  onChange: (v: ContactInfo) => void;
  error?: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition";

const selectClass =
  "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition appearance-none cursor-pointer";

export default function ContactStep({ value, onChange, error }: ContactStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAF8] mb-1">
        Let&apos;s start with the basics
      </h2>
      <p className="text-[#FAFAF8]/65 text-sm mb-4">
        We&apos;ll email your personalized report in about a minute.
      </p>

      <div>
        <label className="block text-xs font-medium text-[#FAFAF8]/70 mb-1.5">
          Your name <span className="text-[#00C9A7]">*</span>
        </label>
        <input
          type="text"
          autoComplete="name"
          className={inputClass}
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#FAFAF8]/70 mb-1.5">
          Work email <span className="text-[#00C9A7]">*</span>
        </label>
        <input
          type="email"
          autoComplete="email"
          className={inputClass}
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          placeholder="jane@company.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#FAFAF8]/70 mb-1.5">
          Company <span className="text-[#00C9A7]">*</span>
        </label>
        <input
          type="text"
          autoComplete="organization"
          className={inputClass}
          value={value.company}
          onChange={(e) => onChange({ ...value, company: e.target.value })}
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#FAFAF8]/70 mb-1.5">
          Team size
        </label>
        <select
          className={selectClass}
          value={value.teamSize}
          onChange={(e) =>
            onChange({
              ...value,
              teamSize: e.target.value as TeamSize | "",
            })
          }
        >
          <option value="" className="bg-[#0F1B2D]">
            Select team size
          </option>
          {TEAM_SIZE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0F1B2D]">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
