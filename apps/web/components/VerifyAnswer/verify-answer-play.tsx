"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Card from "~/components/ui/cardd";
import HuntComplete from "~/components/hunts/hunt-complete";
import type { HuntBadgeId } from "~/lib/hunt-badges";
import { playHuntCompleteSound } from "~/lib/hunt-sounds";

import {
  useGetHuntById,
  useGetHuntQuestionById,
  useRecordHuntCompletion,
  useRecordHuntPlay,
} from "~/hooks/api/hunt";

import VerifyAnswerForm from "./verify-answer-form";
import VerifyAnswerProgress from "./verify-answer-progress";
import VerifyAnswerQuestion from "./verify-answer-question";
import type { HuntPlayQuestion } from "./types";

type VerifyAnswerPlayProps = {
  huntId: string;
};

type CompletionResult = {
  score: number;
  xpEarned: number;
  badge: HuntBadgeId;
  totalXp: number;
  huntsCompleted: number;
};

function toPlayQuestion(question: {
  questionType: "TEXT" | "IMAGE";
  question: string;
  questionText?: string | null;
  hints: string[] | null;
  questionIndex: number;
  timeLimitSeconds?: number | null;
}): HuntPlayQuestion {
  return {
    questionType: question.questionType,
    question: question.question,
    questionText: question.questionText,
    hints: question.hints,
    questionIndex: question.questionIndex,
    timeLimitSeconds: question.timeLimitSeconds,
  };
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="h-5 w-48 rounded bg-white/10" />
            <div className="h-2 w-28 rounded bg-white/10" />
          </div>
        </div>

        <div className="mt-4 h-1.5 rounded-full bg-white/10" />
      </div>

      <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
        <div className="h-9 w-9 rounded-xl bg-white/10" />
        <div className="mt-5 h-[280px] rounded-2xl bg-white/[0.05]" />
        <div className="mt-5 h-32 rounded-2xl bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function VerifyAnswerPlay({
  huntId,
}: VerifyAnswerPlayProps) {
  const { recordHuntPlayAsync } = useRecordHuntPlay();
  const { recordHuntCompletionAsync } = useRecordHuntCompletion();

  const hasRecordedPlay = useRef(false);

  const {
    data: huntData,
    isLoading: isHuntLoading,
    isError: isHuntError,
  } = useGetHuntById(huntId);

  const {
    data: huntQuestions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetHuntQuestionById(huntId);

  /*
   * Keep the current question after browser reload.
   */
  const storageKey = `hunt-progress-${huntId}`;

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const saved = sessionStorage.getItem(storageKey);
    const parsed = Number(saved);

    return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
  });

  /*
   * Total score across completed questions.
   *
   * Example:
   * Q1 = 70
   * Q2 = 90
   * Q3 = 100
   *
   * Total = 260
   */
  const [totalScore, setTotalScore] = useState(0);

  /*
   * Score of CURRENT question.
   * Every new question starts at 100.
   */
  const [questionScore, setQuestionScore] = useState(100);

  const [huntCompleted, setHuntCompleted] = useState(false);
  const [isSavingCompletion, setIsSavingCompletion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [completionResult, setCompletionResult] =
    useState<CompletionResult | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sortedQuestions = useMemo(() => {
    if (!huntQuestions?.length) {
      return [];
    }

    return [...huntQuestions]
      .sort((left, right) => left.questionIndex - right.questionIndex)
      .map(toPlayQuestion);
  }, [huntQuestions]);

  const totalQuestions = sortedQuestions.length;

  /*
   * Protect against a deleted/reduced question list.
   */
  useEffect(() => {
    if (
      totalQuestions > 0 &&
      currentStep >= totalQuestions
    ) {
      setCurrentStep(0);
      sessionStorage.removeItem(storageKey);
    }
  }, [currentStep, totalQuestions, storageKey]);

  /*
   * Save current question.
   */
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    sessionStorage.setItem(
      storageKey,
      String(currentStep),
    );
  }, [currentStep, isMounted, storageKey]);

  /*
   * Every question starts with 100.
   */
  useEffect(() => {
    setQuestionScore(100);
  }, [currentStep]);

  const currentQuestion = sortedQuestions[currentStep];

  const isLastQuestion =
    totalQuestions > 0 &&
    currentStep >= totalQuestions - 1;

  useEffect(() => {
    if (hasRecordedPlay.current) {
      return;
    }

    hasRecordedPlay.current = true;

    recordHuntPlayAsync({ id: huntId }).catch((error) => {
      console.error("Failed to record hunt play:", error);
    });
  }, [huntId, recordHuntPlayAsync]);

  const handleHintUsed = (deduction: number) => {
    setQuestionScore((currentScore) =>
      Math.max(0, currentScore - deduction),
    );
  };

  const handleCorrectAnswer = async () => {
    /*
     * Add THIS question's final score to the running score.
     */
    const finalQuestionScore = questionScore;

    const newTotalScore =
      totalScore + finalQuestionScore;

    if (!isLastQuestion) {
      setTotalScore(newTotalScore);

      setCurrentStep((step) => step + 1);

      // Next question starts at 100.
      setQuestionScore(100);

      return;
    }

    setIsSavingCompletion(true);

    try {
      /*
       * The backend completion system remains unchanged.
       * We only use the locally calculated total score for UI.
       */
      const result = await recordHuntCompletionAsync({
        huntId,
        questionCount: totalQuestions,
      });

      playHuntCompleteSound();

      setCompletionResult({
        score: newTotalScore,
        xpEarned: result.xpEarned,
        badge: result.badge,
        totalXp: result.totalXp,
        huntsCompleted: result.huntsCompleted,
      });

      sessionStorage.removeItem(storageKey);

      setHuntCompleted(true);
    } catch (error) {
      console.error(
        "Failed to record hunt completion:",
        error,
      );
    } finally {
      setIsSavingCompletion(false);
    }
  };

  if (
    !isMounted ||
    isHuntLoading ||
    isQuestionsLoading
  ) {
    return <LoadingSkeleton />;
  }

  if (
    isHuntError ||
    isQuestionsError ||
    !huntData
  ) {
    return (
      <Card className="p-7 text-center">
        <p className="text-base font-semibold text-white">
          Unable to load this hunt.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Please try again or pick another hunt from
          Discover.
        </p>
      </Card>
    );
  }

  if (
    huntCompleted &&
    completionResult
  ) {
    return (
      <HuntComplete
        huntId={huntId}
        huntTitle={huntData.title}
        score={completionResult.score}
        xpEarned={completionResult.xpEarned}
        badge={completionResult.badge}
        totalXp={completionResult.totalXp}
        huntsCompleted={
          completionResult.huntsCompleted
        }
      />
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="p-7 text-center">
        <p className="text-base font-semibold text-white">
          No challenges found for this hunt.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          The creator has not added any challenges yet.
        </p>
      </Card>
    );
  }

  return (
    <div
      key={currentQuestion.questionIndex}
      className="animate-[huntReveal_0.55s_ease-out_both]"
    >
      <VerifyAnswerProgress
        huntTitle={huntData.title}
        huntImage={huntData.image}
        currentStep={currentStep}
        totalQuestions={totalQuestions}
        score={questionScore}
      />

      <Card className="relative overflow-visible border-white/10 bg-gradient-to-b from-zinc-900/90 to-[#0a0a0f]/95 p-4 shadow-[0_16px_45px_rgba(0,0,0,0.4)] sm:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative">
          <VerifyAnswerQuestion
            question={currentQuestion}
            challengeNumber={currentStep + 1}
            onHintUsed={handleHintUsed}
          />

          <VerifyAnswerForm
            key={currentQuestion.questionIndex}
            huntId={huntId}
            question={currentQuestion}
            onCorrect={handleCorrectAnswer}
            isLastQuestion={isLastQuestion}
            isSubmittingCompletion={
              isSavingCompletion
            }
          />
        </div>
      </Card>
    </div>
  );
}

