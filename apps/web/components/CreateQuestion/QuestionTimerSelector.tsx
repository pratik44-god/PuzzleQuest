"use client";

import { Clock } from "lucide-react";

import {
  QUESTION_TIMER_OPTIONS,
  type QuestionTimeLimitSeconds,
} from "~/lib/question-timers";

type QuestionTimerSelectorProps = {
  value: QuestionTimeLimitSeconds;
  onChange: (value: QuestionTimeLimitSeconds) => void;
  disabled?: boolean;
};

export default function QuestionTimerSelector({
  value,
  onChange,
  disabled = false,
}: QuestionTimerSelectorProps) {
  return (
    <div className="mt-4 border-t border-white/[0.06] pt-4">
      <div className="mb-2 flex items-center gap-2">
        <Clock size={14} className="text-amber-400" />
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Answer Timer
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUESTION_TIMER_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.label}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                isSelected
                  ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
