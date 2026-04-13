"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, ((current + 1) / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-xs text-[#FAFAF8]/60 font-medium">
        <span>
          Step {Math.min(current + 1, total)} of {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-[#00C9A7] transition-[width] duration-400 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
