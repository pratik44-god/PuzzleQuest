"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Check,
  ChevronRight,
  Eye,
  KeyRound,
  Lightbulb,
  Lock,
  Send,
  Skull,
  X,
} from "lucide-react";

import {
  useVerifyAnswer,
} from "~/hooks/api/hunt";

import {
  formatCountdown,
} from "~/lib/question-timers";

import type {
  HuntPlayQuestion,
} from "~/components/VerifyAnswer/types";

type CinematicPuzzleProps = {
  huntId: string;
  question: HuntPlayQuestion;
  chapterNumber: number;
  totalQuestions: number;
  onSolved: () => void | Promise<void>;
  onHintUsed?: (deduction: number) => void;
  isLastQuestion?: boolean;
  isSubmittingCompletion?: boolean;
};

const HINT_DEDUCTIONS = [10, 20, 30];

export default function CinematicPuzzleScene({
  huntId,
  question,
  chapterNumber,
  totalQuestions,
  onSolved,
  onHintUsed,
  isLastQuestion = false,
  isSubmittingCompletion = false,
}: CinematicPuzzleProps) {
  const {
    verifyAnswerAsync,
    isPending,
  } = useVerifyAnswer();

  const [answer, setAnswer] =
    useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [solved, setSolved] =
    useState(false);

  const [showHints, setShowHints] =
    useState(false);

  const [
    revealedHints,
    setRevealedHints,
  ] = useState(0);

  const [remaining, setRemaining] =
    useState<number | null>(
      question.timeLimitSeconds ?? null,
    );

  const [timedOut, setTimedOut] =
    useState(false);

  const isImageQuestion =
    question.questionType === "IMAGE";

  const hints =
    question.hints?.filter(Boolean) ?? [];

  /*
   * Reset when the player enters a new question.
   */
  useEffect(() => {
    setAnswer("");
    setErrorMessage("");
    setSolved(false);
    setShowHints(false);
    setRevealedHints(0);
    setTimedOut(false);

    setRemaining(
      question.timeLimitSeconds ?? null,
    );
  }, [
    question.questionIndex,
    question.timeLimitSeconds,
  ]);

  /*
   * Question timer.
   */
  useEffect(() => {
    if (
      remaining === null ||
      remaining <= 0 ||
      solved ||
      timedOut
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current === null) {
          return null;
        }

        if (current <= 1) {
          setTimedOut(true);

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    remaining,
    solved,
    timedOut,
  ]);

  const handleSubmit = async (
    event?: FormEvent<HTMLFormElement>,
  ) => {
    event?.preventDefault();

    const trimmedAnswer =
      answer.trim();

    if (
      !trimmedAnswer ||
      isPending ||
      solved ||
      timedOut ||
      isSubmittingCompletion
    ) {
      return;
    }

    setErrorMessage("");

    try {
      await verifyAnswerAsync({
        huntId,
        questionIndex:
          question.questionIndex,
        answer: trimmedAnswer,
      });

      setSolved(true);
    } catch {
      setErrorMessage(
        "The path remains hidden. Look closer and try again.",
      );
    }
  };

  const revealHint = (
    index: number,
  ) => {
    if (index !== revealedHints) {
      return;
    }

    const deduction =
      HINT_DEDUCTIONS[index] ??
      HINT_DEDUCTIONS[
        HINT_DEDUCTIONS.length - 1
      ]!;

    setRevealedHints(
      (current) => current + 1,
    );

    onHintUsed?.(deduction);
  };

  const handleContinue = async () => {
    if (
      !solved ||
      isSubmittingCompletion
    ) {
      return;
    }

    await onSolved();
  };

  /*
   * Prevent an unused callback problem and keep
   * timer logic stable.
   */
  useCallback(() => {
    return remaining;
  }, [remaining]);

  return (
    <section className="fixed inset-0 z-[500] h-[100dvh] w-screen overflow-hidden bg-black text-white">
      {/* ================================
          FULL SCREEN IMAGE ENVIRONMENT
         ================================ */}

      {isImageQuestion ? (
        <>
          <img
            src={question.question}
            alt=""
            className="absolute inset-0 h-full w-full animate-[sceneReveal_1.8s_ease-out_both] object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />

          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#070706]" />

          <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[180px]" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        </>
      )}

      {/* ================================
          QUESTION SCENE
         ================================ */}

      <div className="relative z-10 flex h-[100dvh] w-full animate-[questionReveal_0.9s_0.35s_ease-out_both] flex-col overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        {/* HEADER */}

        <header className="flex shrink-0 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/20 bg-black/35 backdrop-blur-md">
              <Skull
                size={18}
                className="text-amber-300"
              />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-amber-300/70">
                Captain Vane&apos;s Last Map
              </p>

              <p className="mt-1 text-xs font-semibold text-white/90">
                Chapter{" "}
                {String(
                  chapterNumber ?? 1,
                ).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {remaining !== null ? (
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                <p className="text-[9px] font-bold tracking-[0.15em] text-white/70">
                  {formatCountdown(remaining)}
                </p>
              </div>
            ) : null}

            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/40">
                Journey
              </p>

              <p className="mt-1 text-xs font-semibold text-white/80">
                {chapterNumber} / {totalQuestions}
              </p>
            </div>
          </div>
        </header>

        {/* ================================
            CENTER CLUE AREA
           ================================ */}

        <main className="flex min-h-0 flex-1 items-center justify-center py-4">
          <div className="w-full max-w-4xl text-center">
            {!solved ? (
              <>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-md">
                  {isImageQuestion ? (
                    <Eye
                      size={13}
                      className="text-amber-400"
                    />
                  ) : (
                    <KeyRound
                      size={13}
                      className="text-amber-400"
                    />
                  )}

                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
                    {isImageQuestion
                      ? "Examine the scene"
                      : "The next clue"}
                  </span>
                </div>

                {isImageQuestion ? (
                  question.questionText ? (
                    <p className="mx-auto max-w-2xl text-base font-medium leading-7 text-white drop-shadow-lg sm:text-xl sm:leading-8">
                      {question.questionText}
                    </p>
                  ) : (
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">
                      Study the evidence carefully
                    </p>
                  )
                ) : (
                  <p className="mx-auto max-w-4xl text-xl font-medium leading-[1.45] text-white sm:text-3xl lg:text-5xl">
                    {question.question}
                  </p>
                )}
              </>
            ) : (
              <div className="animate-[solvedReveal_0.7s_ease-out_both]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-md">
                  <Check
                    size={36}
                    className="text-emerald-300"
                  />
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-300">
                  The mystery is solved
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
                  The path is revealed.
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/60">
                  The journey continues deeper into
                  the unknown.
                </p>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmittingCompletion}
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-amber-400 px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-black transition hover:scale-105 hover:bg-amber-300 disabled:opacity-50"
                >
                  {isLastQuestion
                    ? "Claim the treasure"
                    : "Continue the journey"}

                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        </main>

        {/* ================================
            BOTTOM INTERACTION AREA
           ================================ */}

        {!solved ? (
          <div className="mx-auto w-full max-w-3xl shrink-0">
            {/* HINTS */}

            {hints.length > 0 ? (
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowHints(
                      (current) => !current,
                    )
                  }
                  className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur-md transition hover:border-amber-400/30 hover:text-amber-200"
                >
                  <Lightbulb
                    size={14}
                    className="text-amber-400"
                  />

                  Seek a clue

                  <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[9px] text-amber-300">
                    {hints.length -
                      revealedHints}
                  </span>
                </button>

                {showHints ? (
                  <div className="mx-auto mt-3 max-h-[24dvh] max-w-xl space-y-2 overflow-y-auto pr-1">
                    {hints.map(
                      (hint, index) => {
                        const isRevealed =
                          index <
                          revealedHints;

                        const isAvailable =
                          index ===
                          revealedHints;

                        const deduction =
                          HINT_DEDUCTIONS[
                            index
                          ] ??
                          HINT_DEDUCTIONS[
                            HINT_DEDUCTIONS.length -
                              1
                          ]!;

                        if (isRevealed) {
                          return (
                            <div
                              key={`${question.questionIndex}-hint-${index}`}
                              className="rounded-xl border border-amber-400/20 bg-black/55 px-4 py-3 text-left backdrop-blur-xl"
                            >
                              <div className="flex gap-3">
                                <Lightbulb
                                  size={15}
                                  className="mt-0.5 shrink-0 text-amber-400"
                                />

                                <div>
                                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300/70">
                                    Captain&apos;s clue
                                  </p>

                                  <p className="mt-1.5 text-xs leading-5 text-white/75">
                                    {hint}
                                  </p>

                                  <p className="mt-1 text-[9px] text-amber-400/60">
                                    −{deduction} score
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
                            disabled={
                              !isAvailable
                            }
                            onClick={() =>
                              revealHint(index)
                            }
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left backdrop-blur-md transition ${
                              isAvailable
                                ? "border-white/10 bg-black/45 hover:border-amber-400/30"
                                : "cursor-not-allowed border-white/5 bg-black/20 opacity-40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isAvailable ? (
                                <Lightbulb
                                  size={15}
                                  className="text-amber-400"
                                />
                              ) : (
                                <Lock
                                  size={15}
                                  className="text-white/30"
                                />
                              )}

                              <div>
                                <p className="text-xs font-semibold text-white/80">
                                  {isAvailable
                                    ? "Reveal the clue"
                                    : "Clue locked"}
                                </p>

                                <p className="mt-0.5 text-[9px] text-white/40">
                                  {isAvailable
                                    ? `Costs ${deduction} score`
                                    : "Reveal the previous clue first"}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* ANSWER BAR */}

            {!timedOut ? (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-black/55 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                    <KeyRound
                      size={16}
                      className="shrink-0 text-amber-400"
                    />

                    <input
                      value={answer}
                      onChange={(event) => {
                        setAnswer(
                          event.target.value,
                        );

                        if (errorMessage) {
                          setErrorMessage("");
                        }
                      }}
                      placeholder="What is your answer?"
                      autoComplete="off"
                      spellCheck={false}
                      disabled={
                        isPending ||
                        isSubmittingCompletion
                      }
                      className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !answer.trim() ||
                      isPending ||
                      isSubmittingCompletion
                    }
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={15} />

                    {isPending
                      ? "Searching"
                      : "Unlock"}
                  </button>
                </div>

                {errorMessage ? (
                  <div className="mt-2 flex items-center gap-2 px-2">
                    <X
                      size={13}
                      className="text-red-400"
                    />

                    <p className="text-[10px] text-red-300">
                      {errorMessage}
                    </p>
                  </div>
                ) : null}
              </form>
            ) : (
              <div className="rounded-2xl border border-red-500/20 bg-black/60 px-5 py-4 text-center backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                  Time has run out
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes sceneReveal {
          0% {
            opacity: 0;
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes questionReveal {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes solvedReveal {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}