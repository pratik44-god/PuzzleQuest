"use client";

import { FormEvent, useCallback, useState } from "react";
import { Check, ChevronRight, KeyRound, Send } from "lucide-react";

import Button from "~/components/ui/buttton";
import { useVerifyAnswer } from "~/hooks/api/hunt";

import AnswerTimer from "./answer-timer";
import type { HuntPlayQuestion } from "./types";

type VerifyAnswerFormProps = {
  huntId: string;
  question: HuntPlayQuestion;
  onCorrect: () => void | Promise<void>;
  isLastQuestion: boolean;
  isSubmittingCompletion?: boolean;
};

export default function VerifyAnswerForm({
  huntId,
  question,
  onCorrect,
  isLastQuestion,
  isSubmittingCompletion = false,
}: VerifyAnswerFormProps) {
  const { verifyAnswerAsync, isPending } = useVerifyAnswer();

  const [answer, setAnswer] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timedOut, setTimedOut] = useState(false);

  const handleTimerExpire = useCallback(() => {
    setTimedOut(true);
    setErrorMessage("Time's up! Reload the hunt to try again.");
  }, []);

  const handleSubmitAnswer = async (
    event?: FormEvent<HTMLFormElement>,
  ) => {
    event?.preventDefault();

    const trimmedAnswer = answer.trim();

    if (
      !trimmedAnswer ||
      isPending ||
      timedOut ||
      completed ||
      isSubmittingCompletion
    ) {
      return;
    }

    setErrorMessage("");

    try {
      await verifyAnswerAsync({
        huntId,
        questionIndex: question.questionIndex,
        answer: trimmedAnswer,
      });

      // Stay on this question.
      // The player manually continues using the button below.
      setCompleted(true);
    } catch {
      setErrorMessage(
        "Not quite. Study the challenge and try again.",
      );
    }
  };

  const handleContinue = async () => {
    if (!completed || isSubmittingCompletion) {
      return;
    }

    await onCorrect();
  };

  return (
    <div className="mt-6 border-t border-white/[0.06] pt-5">
      {/* Answer header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
            <KeyRound size={15} />
          </div>

          <div>
            <p className="text-xs font-bold text-white">
              Your Answer
            </p>

            <p className="text-[10px] text-zinc-600">
              {completed
                ? isLastQuestion
                  ? "Challenge solved"
                  : "Ready for the next challenge"
                : "Solve the challenge to continue"}
            </p>
          </div>
        </div>

        {question.timeLimitSeconds ? (
          <AnswerTimer
            timeLimitSeconds={question.timeLimitSeconds}
            onExpire={handleTimerExpire}
            paused={completed || timedOut}
          />
        ) : null}
      </div>

      {/* Answer area */}
      <form onSubmit={handleSubmitAnswer}>
        <div
          className={`rounded-2xl border p-3.5 transition-all sm:p-4 ${
            timedOut
              ? "border-rose-500/25 bg-rose-500/[0.04]"
              : completed
                ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                : "border-white/[0.08] bg-white/[0.02]"
          }`}
        >
          <input
            id={`answer-${question.questionIndex}`}
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);

              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder="Enter your answer..."
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={
              completed ||
              isPending ||
              timedOut ||
              isSubmittingCompletion
            }
            className="h-11 w-full rounded-xl border border-white/10 bg-[#09090e] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-violet-500/40 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          {/* Timeout */}
          {timedOut ? (
            <p className="mt-2 text-xs text-amber-400">
              Time ran out. Restart the hunt to try again.
            </p>
          ) : null}

          {/* Wrong answer */}
          {errorMessage && !timedOut ? (
            <p className="mt-2 text-xs text-rose-400">
              {errorMessage}
            </p>
          ) : null}

          {/* Success */}
          {completed ? (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2.5 animate-[celebrationPop_0.4s_ease-out_both]">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check size={16} className="text-emerald-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-emerald-300">
                    Challenge Solved!
                  </p>

                  <p className="truncate text-[9px] text-emerald-200/60">
                    {isLastQuestion
                      ? "Ready to complete the hunt"
                      : "Continue when you're ready"}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                disabled={isSubmittingCompletion}
                loading={isSubmittingCompletion}
                onClick={handleContinue}
                rightIcon={<ChevronRight size={16} />}
                className="shrink-0"
              >
                {isLastQuestion ? "Complete Hunt" : "Next"}
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={
                !answer.trim() ||
                isPending ||
                timedOut ||
                isSubmittingCompletion
              }
              loading={isPending}
              leftIcon={<Send size={17} />}
              className="mt-3"
            >
              Submit Answer
            </Button>
          )}
        </div>

        {/* Enter hint */}
        {!completed && !timedOut ? (
          <p className="mt-2 text-center text-[9px] text-zinc-600">
            Press <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">Enter</kbd>{" "}
            to submit
          </p>
        ) : null}
      </form>
    </div>
  );
}