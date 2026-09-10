"use client";

import { useState } from "react";
import {
  FileQuestion,
  ImagePlus,
  Lightbulb,
  Lock,
  Map,
  X,
} from "lucide-react";

import type { HuntPlayQuestion } from "./types";

type VerifyAnswerQuestionProps = {
  question: HuntPlayQuestion;
  challengeNumber: number;
  onHintUsed?: (deduction: number) => void;
};

const HINT_DEDUCTIONS = [10, 20, 30];

export default function VerifyAnswerQuestion({
  question,
  challengeNumber,
  onHintUsed,
}: VerifyAnswerQuestionProps) {
  const isImage = question.questionType === "IMAGE";
  const hints = question.hints?.filter(Boolean) ?? [];

  const [revealedHints, setRevealedHints] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const currentScore = Math.max(
    0,
    100 -
      HINT_DEDUCTIONS.slice(0, revealedHints).reduce(
        (total, deduction) => total + deduction,
        0,
      ),
  );

  const revealHint = (index: number) => {
    if (index !== revealedHints) {
      return;
    }

    const deduction = HINT_DEDUCTIONS[index] ?? 30;

    setRevealedHints((current) => current + 1);
    onHintUsed?.(deduction);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
            {isImage ? <ImagePlus size={18} /> : <Map size={18} />}
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
              {isImage ? "Visual Challenge" : "Mystery Challenge"}
            </p>

            <p className="text-sm font-bold text-white">
              Challenge #{challengeNumber}
            </p>
          </div>
        </div>

        {/* ALWAYS SHOW HINT BUTTON */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHints((current) => !current)}
            aria-label="Open hints"
            className={`group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
              showHints
                ? "border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                : "border-white/10 bg-white/[0.04] text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/10"
            }`}
          >
            <Lightbulb
              size={18}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {hints.length > 0 && revealedHints < hints.length ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[8px] font-black text-black">
                {hints.length - revealedHints}
              </span>
            ) : null}
          </button>

          {showHints ? (
            <div className="absolute right-0 top-12 z-30 w-[280px] overflow-hidden rounded-2xl border border-amber-500/20 bg-[#111116]/95 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl animate-[huntReveal_0.25s_ease-out_both]">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Lightbulb size={15} className="text-amber-400" />

                  <span className="text-xs font-bold text-amber-200">
                    Hidden Clues
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHints(false)}
                  className="text-zinc-600 transition hover:text-zinc-300"
                >
                  <X size={15} />
                </button>
              </div>

              {hints.length === 0 ? (
                <div className="px-4 py-7 text-center">
                  <Lightbulb
                    size={22}
                    className="mx-auto text-zinc-600"
                  />

                  <p className="mt-3 text-xs font-semibold text-zinc-400">
                    No hints available
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Solve this challenge on your own.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 p-3">
                  {hints.map((hint, index) => {
                    const isRevealed = index < revealedHints;
                    const isAvailable = index === revealedHints;
                    const isLocked = index > revealedHints;

                    const deduction =
                      HINT_DEDUCTIONS[index] ??
                      HINT_DEDUCTIONS[HINT_DEDUCTIONS.length - 1];

                    if (isRevealed) {
                      return (
                        <div
                          key={`${question.questionIndex}-hint-${index}`}
                          className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-3 animate-[huntReveal_0.35s_ease-out_both]"
                        >
                          <div className="flex gap-2.5">
                            <Lightbulb
                              size={14}
                              className="mt-0.5 shrink-0 text-amber-400"
                            />

                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400/70">
                                Hint {index + 1}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-zinc-300">
                                {hint}
                              </p>

                              <p className="mt-1 text-[9px] font-bold text-amber-500/60">
                                −{deduction} ⭐
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={`${question.questionIndex}-hint-${index}`}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => revealHint(index)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                          isAvailable
                            ? "border-amber-500/20 bg-amber-500/[0.05] hover:bg-amber-500/[0.1]"
                            : "cursor-not-allowed border-white/[0.05] bg-white/[0.02] opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isLocked ? (
                            <Lock size={14} className="text-zinc-600" />
                          ) : (
                            <Lightbulb
                              size={14}
                              className="text-amber-400"
                            />
                          )}

                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                isAvailable
                                  ? "text-amber-200"
                                  : "text-zinc-500"
                              }`}
                            >
                              Hint {index + 1}
                            </p>

                            <p className="mt-0.5 text-[9px] text-zinc-600">
                              {isAvailable
                                ? "Reveal this clue"
                                : "Unlock previous hint first"}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-bold ${
                            isAvailable
                              ? "text-amber-400"
                              : "text-zinc-700"
                          }`}
                        >
                          {isAvailable
                            ? `−${deduction} ⭐`
                            : "LOCKED"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 min-h-[280px]">
        {isImage ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-[#09090e] p-4">
            <div className="w-full max-w-[620px]">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-lg">
                <img
                  src={question.question}
                  alt={`Challenge ${challengeNumber}`}
                  className="mx-auto max-h-[250px] w-full object-contain"
                />
              </div>

              {question.questionText ? (
                <p className="mt-3 text-center text-sm font-medium leading-6 text-zinc-300">
                  {question.questionText}
                </p>
              ) : (
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-600">
                  <FileQuestion size={14} className="text-violet-400" />
                  Study the image carefully.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/[0.05] via-white/[0.02] to-transparent px-6 py-7 text-center">
            <div className="max-w-3xl">
              <p className="text-xl font-semibold leading-[1.5] tracking-tight text-zinc-100 sm:text-2xl">
                {question.question}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Current question score is available to parent through deductions */}
      <div className="sr-only" aria-hidden="true">
        Current question score: {currentScore}
      </div>
    </div>
  );
}