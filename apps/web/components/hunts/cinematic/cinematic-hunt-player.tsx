// "use client";

// import {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import HuntComplete from "~/components/hunts/hunt-complete";
// import type { HuntBadgeId } from "~/lib/hunt-badges";

// import {
//   playHuntCompleteSound,
// } from "~/lib/hunt-sounds";

// import {
//   useGetHuntById,
//   useGetHuntQuestionById,
//   useRecordHuntCompletion,
//   useRecordHuntPlay,
// } from "~/hooks/api/hunt";

// import type {
//   HuntPlayQuestion,
// } from "~/components/VerifyAnswer/types";

// import CinematicPuzzleScene from "./cinematic-puzzle-scene";
// import CinematicVideoPlayer from "./cinematic-video-player";

// import {
//   getTransitionVideo,
//   PIRATES_LAST_MAP_VIDEOS,
// } from "./cinematic-config";

// type CinematicHuntPlayerProps = {
//   huntId: string;
// };

// type CompletionResult = {
//   score: number;
//   xpEarned: number;
//   badge: HuntBadgeId;
//   totalXp: number;
//   huntsCompleted: number;
// };

// type Scene =
//   | "start"
//   | "intro"
//   | "transitioning"
//   | "puzzle"
//   | "transition"
//   | "final"
//   | "complete";

// function toPlayQuestion(question: {
//   questionType: "TEXT" | "IMAGE";
//   question: string;
//   questionText?: string | null;
//   hints: string[] | null;
//   questionIndex: number;
//   timeLimitSeconds?: number | null;
// }): HuntPlayQuestion {
//   return {
//     questionType: question.questionType,
//     question: question.question,
//     questionText: question.questionText,
//     hints: question.hints,
//     questionIndex: question.questionIndex,
//     timeLimitSeconds: question.timeLimitSeconds,
//   };
// }

// function LoadingScreen({
//   text = "PREPARING THE JOURNEY",
// }: {
//   text?: string;
// }) {
//   return (
//     <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] text-white">
//       <div className="text-center">
//         <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />

//         <p className="mt-5 text-[10px] font-bold tracking-[0.3em] text-white/40">
//           {text}
//         </p>
//       </div>
//     </main>
//   );
// }

// export default function CinematicHuntPlayer({
//   huntId,
// }: CinematicHuntPlayerProps) {
//   const {
//     recordHuntPlayAsync,
//   } = useRecordHuntPlay();

//   const {
//     recordHuntCompletionAsync,
//   } = useRecordHuntCompletion();

//   const hasRecordedPlay = useRef(false);
//   const hasFinishedHunt = useRef(false);

//   const totalScoreRef = useRef(0);

//   const {
//     data: huntData,
//     isLoading: isHuntLoading,
//     isError: isHuntError,
//   } = useGetHuntById(huntId);

//   const {
//     data: huntQuestions,
//     isLoading: isQuestionsLoading,
//     isError: isQuestionsError,
//   } = useGetHuntQuestionById(huntId);

//   const storageKey = `hunt-progress-${huntId}`;

//   const [scene, setScene] =
//     useState<Scene>("start");

//   const [currentStep, setCurrentStep] =
//     useState(() => {
//       if (typeof window === "undefined") {
//         return 0;
//       }

//       const saved =
//         sessionStorage.getItem(storageKey);

//       const parsed = Number(saved);

//       return Number.isInteger(parsed) &&
//         parsed >= 0
//         ? parsed
//         : 0;
//     });

//   const [totalScore, setTotalScore] =
//     useState(0);

//   const [questionScore, setQuestionScore] =
//     useState(100);

//   const [
//     completionResult,
//     setCompletionResult,
//   ] = useState<CompletionResult | null>(
//     null,
//   );

//   const [
//     isSavingCompletion,
//     setIsSavingCompletion,
//   ] = useState(false);

//   const sortedQuestions = useMemo(() => {
//     if (!huntQuestions?.length) {
//       return [];
//     }

//     return [...huntQuestions]
//       .sort(
//         (left, right) =>
//           left.questionIndex -
//           right.questionIndex,
//       )
//       .map(toPlayQuestion);
//   }, [huntQuestions]);

//   const totalQuestions =
//     sortedQuestions.length;

//   const currentQuestion =
//     sortedQuestions[currentStep];

//   const isLastQuestion =
//     totalQuestions > 0 &&
//     currentStep === totalQuestions - 1;

//   const transitionVideo =
//     scene === "transition"
//       ? getTransitionVideo(currentStep)
//       : undefined;

//   useEffect(() => {
//     if (
//       totalQuestions > 0 &&
//       currentStep >= totalQuestions
//     ) {
//       setCurrentStep(0);
//     }
//   }, [currentStep, totalQuestions]);

//   useEffect(() => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     sessionStorage.setItem(
//       storageKey,
//       String(currentStep),
//     );
//   }, [currentStep, storageKey]);

//   useEffect(() => {
//     if (hasRecordedPlay.current) {
//       return;
//     }

//     hasRecordedPlay.current = true;

//     recordHuntPlayAsync({
//       id: huntId,
//     }).catch((error) => {
//       console.error(
//         "Failed to record hunt play:",
//         error,
//       );
//     });
//   }, [huntId, recordHuntPlayAsync]);

//   useEffect(() => {
//     setQuestionScore(100);
//   }, [currentStep]);

//   /*
//    * If there is no configured transition video,
//    * move directly to the next puzzle.
//    */
//   useEffect(() => {
//     if (
//       scene === "transition" &&
//       !transitionVideo
//     ) {
//       const timeout = window.setTimeout(() => {
//         setCurrentStep(
//           (current) => current + 1,
//         );

//         setScene("transitioning");
//       }, 500);

//       return () => {
//         window.clearTimeout(timeout);
//       };
//     }
//   }, [scene, transitionVideo]);

//   const handleHintUsed = (
//     deduction: number,
//   ) => {
//     setQuestionScore((current) =>
//       Math.max(0, current - deduction),
//     );
//   };

//   /*
//    * Smooth cinematic transition:
//    *
//    * Video ends
//    * ↓
//    * Brief black fade
//    * ↓
//    * Puzzle scene appears
//    */
//   const enterPuzzle = () => {
//     setScene("transitioning");

//     window.setTimeout(() => {
//       setScene("puzzle");
//     }, 650);
//   };

//   const startHunt = () => {
//     setScene("intro");
//   };

//   const handleIntroFinished = () => {
//     enterPuzzle();
//   };

//   const handlePuzzleSolved = () => {
//     const newTotal =
//       totalScoreRef.current + questionScore;

//     totalScoreRef.current = newTotal;

//     setTotalScore(newTotal);

//     if (isLastQuestion) {
//       setScene("final");
//       return;
//     }

//     setScene("transition");
//   };

//   const handleTransitionFinished = () => {
//     setCurrentStep(
//       (current) => current + 1,
//     );

//     enterPuzzle();
//   };

//   const finishHunt = async () => {
//     if (
//       hasFinishedHunt.current ||
//       isSavingCompletion
//     ) {
//       return;
//     }

//     hasFinishedHunt.current = true;

//     setIsSavingCompletion(true);

//     try {
//       const result =
//         await recordHuntCompletionAsync({
//           huntId,
//           questionCount: totalQuestions,
//         });

//       playHuntCompleteSound();

//       setCompletionResult({
//         score: totalScoreRef.current,
//         xpEarned: result.xpEarned,
//         badge: result.badge,
//         totalXp: result.totalXp,
//         huntsCompleted:
//           result.huntsCompleted,
//       });

//       sessionStorage.removeItem(storageKey);

//       setScene("complete");
//     } catch (error) {
//       console.error(
//         "Failed to complete hunt:",
//         error,
//       );

//       hasFinishedHunt.current = false;
//       setIsSavingCompletion(false);
//     }
//   };

//   if (
//     isHuntLoading ||
//     isQuestionsLoading
//   ) {
//     return <LoadingScreen />;
//   }

//   if (
//     isHuntError ||
//     isQuestionsError ||
//     !huntData
//   ) {
//     return (
//       <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] p-6 text-center text-white">
//         <div>
//           <p className="text-xl font-bold">
//             The journey could not begin.
//           </p>

//           <p className="mt-3 text-sm text-white/40">
//             Unable to load this hunt.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   if (!currentQuestion) {
//     return (
//       <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] p-6 text-center text-white">
//         <div>
//           <p className="text-xl font-bold">
//             No clues were found.
//           </p>

//           <p className="mt-3 text-sm text-white/40">
//             This hunt does not contain any
//             challenges yet.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /*
//    * START SCREEN
//    */
//   if (scene === "start") {
//     return (
//       <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] px-5 text-white">
//         {huntData.image ? (
//           <img
//             src={huntData.image}
//             alt=""
//             className="absolute inset-0 h-full w-full object-cover opacity-25"
//           />
//         ) : null}

//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#050607]/80 to-[#050607]" />

//         <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" />

//         <div className="relative z-10 mx-auto max-w-2xl text-center">
//           <p className="text-[10px] font-bold tracking-[0.45em] text-amber-400">
//             AN INTERACTIVE CINEMATIC HUNT
//           </p>

//           <h1 className="mt-6 text-4xl font-black tracking-[0.08em] sm:text-7xl">
//             {huntData.title}
//           </h1>

//           <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

//           <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/50">
//             The sea has kept its secrets for
//             centuries. Tonight, the map has
//             chosen you.
//           </p>

//           <button
//             type="button"
//             onClick={startHunt}
//             className="group mt-10 rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-8 py-4 text-xs font-black tracking-[0.22em] text-amber-300 transition hover:scale-105 hover:bg-amber-400/15"
//           >
//             BEGIN THE HUNT
//           </button>

//           <p className="mt-5 text-[9px] tracking-[0.18em] text-white/20">
//             SOUND RECOMMENDED
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /*
//    * INTRO VIDEO
//    */
//   if (scene === "intro") {
//     return (
//       <CinematicVideoPlayer
//         src={PIRATES_LAST_MAP_VIDEOS.intro}
//         onEnded={handleIntroFinished}
//         onSkip={handleIntroFinished}
//       />
//     );
//   }

//   /*
//    * CINEMATIC BLACK FADE
//    */
//   if (scene === "transitioning") {
//     return (
//       <main className="fixed inset-0 z-[9999] h-[100dvh] w-screen animate-[cinematicFade_0.65s_ease-in-out_forwards] overflow-hidden bg-black">
//         <style>{`
//           @keyframes cinematicFade {
//             0% {
//               opacity: 0;
//             }

//             45% {
//               opacity: 1;
//             }

//             100% {
//               opacity: 1;
//             }
//           }
//         `}</style>
//       </main>
//     );
//   }

//   /*
//    * TRANSITION VIDEO
//    */
//   if (
//     scene === "transition" &&
//     transitionVideo
//   ) {
//     return (
//       <CinematicVideoPlayer
//         src={transitionVideo}
//         onEnded={handleTransitionFinished}
//         onSkip={handleTransitionFinished}
//       />
//     );
//   }

//   if (scene === "transition") {
//     return (
//       <LoadingScreen text="THE JOURNEY CONTINUES" />
//     );
//   }

//   /*
//    * FINAL VIDEO
//    */
//   if (scene === "final") {
//     return (
//       <CinematicVideoPlayer
//         src={PIRATES_LAST_MAP_VIDEOS.final}
//         onEnded={finishHunt}
//         onSkip={finishHunt}
//         allowSkip={!isSavingCompletion}
//       />
//     );
//   }

//   /*
//    * HUNT COMPLETE
//    */
//   if (
//     scene === "complete" &&
//     completionResult
//   ) {
//     return (
//       <HuntComplete
//         huntId={huntId}
//         huntTitle={huntData.title}
//         score={completionResult.score}
//         xpEarned={
//           completionResult.xpEarned
//         }
//         badge={completionResult.badge}
//         totalXp={
//           completionResult.totalXp
//         }
//         huntsCompleted={
//           completionResult.huntsCompleted
//         }
//       />
//     );
//   }

//   /*
//    * FULL SCREEN PUZZLE
//    */
//   return (
//     <CinematicPuzzleScene
//       huntId={huntId}
//       question={currentQuestion}
//       chapterNumber={currentStep + 1}
//       totalQuestions={totalQuestions}
//       isLastQuestion={isLastQuestion}
//       isSubmittingCompletion={
//         isSavingCompletion
//       }
//       onSolved={handlePuzzleSolved}
//       onHintUsed={handleHintUsed}
//     />
//   );
// }

"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import HuntComplete from "~/components/hunts/hunt-complete";
import type { HuntBadgeId } from "~/lib/hunt-badges";

import {
  playHuntCompleteSound,
} from "~/lib/hunt-sounds";

import {
  useGetHuntById,
  useGetHuntQuestionById,
  useRecordHuntCompletion,
  useRecordHuntPlay,
} from "~/hooks/api/hunt";

import type {
  HuntPlayQuestion,
} from "~/components/VerifyAnswer/types";

import CinematicPuzzleScene from "./cinematic-puzzle-scene";
import CinematicVideoPlayer from "./cinematic-video-player";

import {
  getTransitionVideo,
  PIRATES_LAST_MAP_VIDEOS,
} from "./cinematic-config";

type CinematicHuntPlayerProps = {
  huntId: string;
};

type CompletionResult = {
  score: number;
  xpEarned: number;
  badge: HuntBadgeId;
  totalXp: number;
  huntsCompleted: number;
};

type Scene =
  | "start"
  | "intro"
  | "transitioning"
  | "puzzle"
  | "transition"
  | "final"
  | "complete";

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

function LoadingScreen({
  text = "PREPARING THE JOURNEY",
}: {
  text?: string;
}) {
  return (
    <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />

        <p className="mt-5 text-[10px] font-bold tracking-[0.3em] text-white/40">
          {text}
        </p>
      </div>
    </main>
  );
}

export default function CinematicHuntPlayer({
  huntId,
}: CinematicHuntPlayerProps) {
  const {
    recordHuntPlayAsync,
  } = useRecordHuntPlay();

  const {
    recordHuntCompletionAsync,
  } = useRecordHuntCompletion();

  const hasRecordedPlay = useRef(false);
  const hasFinishedHunt = useRef(false);

  const totalScoreRef = useRef(0);

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

  const storageKey = `hunt-progress-${huntId}`;

  const [scene, setScene] =
    useState<Scene>("start");

  const [currentStep, setCurrentStep] =
    useState(() => {
      if (typeof window === "undefined") {
        return 0;
      }

      const saved =
        sessionStorage.getItem(storageKey);

      const parsed = Number(saved);

      return (
        Number.isInteger(parsed) &&
        parsed >= 0
      )
        ? parsed
        : 0;
    });

  const [totalScore, setTotalScore] =
    useState(0);

  const [questionScore, setQuestionScore] =
    useState(100);

  const [
    completionResult,
    setCompletionResult,
  ] = useState<CompletionResult | null>(
    null,
  );

  const [
    isSavingCompletion,
    setIsSavingCompletion,
  ] = useState(false);

  const sortedQuestions = useMemo(() => {
    if (!huntQuestions?.length) {
      return [];
    }

    /*
     * Pirate hunts are designed for a maximum
     * of 5 questions.
     *
     * The creator-side editor already prevents
     * creating questions beyond this limit.
     *
     * This also protects the cinematic player
     * from an unexpected extra question.
     */
    return [...huntQuestions]
      .sort(
        (left, right) =>
          left.questionIndex -
          right.questionIndex,
      )
      .slice(0, 5)
      .map(toPlayQuestion);
  }, [huntQuestions]);

  const totalQuestions =
    sortedQuestions.length;

  const currentQuestion =
    sortedQuestions[currentStep];

  const isLastQuestion =
    totalQuestions > 0 &&
    currentStep ===
      totalQuestions - 1;

  /*
   * Transition videos are selected using
   * the question that has just been solved.
   *
   * Q1 → transition1
   * Q2 → transition2
   * Q3 → midCinematic
   * Q4 → midCinematic2
   *
   * Q5 has no transition here because after Q5
   * is solved, the separate final scene plays.
   */
  const transitionVideo =
    scene === "transition"
      ? getTransitionVideo(currentStep)
      : undefined;

  /*
   * Recover safely if sessionStorage contains
   * an invalid question index.
   */
  useEffect(() => {
    if (totalQuestions <= 0) {
      return;
    }

    if (
      currentStep >= totalQuestions
    ) {
      setCurrentStep(0);
      setScene("start");
    }
  }, [currentStep, totalQuestions]);

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    sessionStorage.setItem(
      storageKey,
      String(currentStep),
    );
  }, [
    currentStep,
    storageKey,
  ]);

  useEffect(() => {
    if (hasRecordedPlay.current) {
      return;
    }

    hasRecordedPlay.current = true;

    recordHuntPlayAsync({
      id: huntId,
    }).catch((error) => {
      console.error(
        "Failed to record hunt play:",
        error,
      );
    });
  }, [
    huntId,
    recordHuntPlayAsync,
  ]);

  /*
   * Every new question starts with 100 points.
   */
  useEffect(() => {
    setQuestionScore(100);
  }, [currentStep]);

  /*
   * If there is no configured transition
   * for the current question, move directly
   * to the next puzzle.
   */
  useEffect(() => {
    if (
      scene === "transition" &&
      !transitionVideo
    ) {
      const timeout =
        window.setTimeout(() => {
          setCurrentStep(
            (current) =>
              current + 1,
          );

          setScene("transitioning");
        }, 500);

      return () =>
        window.clearTimeout(
          timeout,
        );
    }
  }, [
    scene,
    transitionVideo,
  ]);

  const handleHintUsed = (
    deduction: number,
  ) => {
    setQuestionScore(
      (current) =>
        Math.max(
          0,
          current - deduction,
        ),
    );
  };

  /*
   * Video ends
   * ↓
   * Brief black fade
   * ↓
   * Next puzzle appears
   */
  const enterPuzzle = () => {
    setScene("transitioning");

    window.setTimeout(() => {
      setScene("puzzle");
    }, 650);
  };

  const startHunt = () => {
    setScene("intro");
  };

  const handleIntroFinished = () => {
    setCurrentStep(0);
    enterPuzzle();
  };

  /*
   * Called after the current question
   * is answered correctly.
   */
  const handlePuzzleSolved = () => {
    const newTotal =
      totalScoreRef.current +
      questionScore;

    totalScoreRef.current =
      newTotal;

    setTotalScore(
      newTotal,
    );

    /*
     * Question 5 is the final question.
     *
     * Do NOT increment currentStep.
     * Go directly to the final cinematic.
     */
    if (isLastQuestion) {
      setScene("final");
      return;
    }

    /*
     * For Q1-Q4, play the corresponding
     * transition cinematic.
     */
    setScene("transition");
  };

  /*
   * Called when transition1,
   * transition2, midCinematic,
   * or midCinematic2 finishes.
   */
  const handleTransitionFinished =
    () => {
      setCurrentStep(
        (current) =>
          current + 1,
      );

      enterPuzzle();
    };

  const finishHunt = async () => {
    if (
      hasFinishedHunt.current ||
      isSavingCompletion
    ) {
      return;
    }

    hasFinishedHunt.current =
      true;

    setIsSavingCompletion(true);

    try {
      const result =
        await recordHuntCompletionAsync(
          {
            huntId,
            questionCount:
              totalQuestions,
          },
        );

      playHuntCompleteSound();

      setCompletionResult({
        score:
          totalScoreRef.current,
        xpEarned:
          result.xpEarned,
        badge:
          result.badge,
        totalXp:
          result.totalXp,
        huntsCompleted:
          result.huntsCompleted,
      });

      sessionStorage.removeItem(
        storageKey,
      );

      setScene("complete");
    } catch (error) {
      console.error(
        "Failed to complete hunt:",
        error,
      );

      hasFinishedHunt.current =
        false;

      setIsSavingCompletion(false);
    }
  };

  if (
    isHuntLoading ||
    isQuestionsLoading
  ) {
    return <LoadingScreen />;
  }

  if (
    isHuntError ||
    isQuestionsError ||
    !huntData
  ) {
    return (
      <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] p-6 text-center text-white">
        <div>
          <p className="text-xl font-bold">
            The journey could not begin.
          </p>

          <p className="mt-3 text-sm text-white/40">
            Unable to load this hunt.
          </p>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] p-6 text-center text-white">
        <div>
          <p className="text-xl font-bold">
            No clues were found.
          </p>

          <p className="mt-3 text-sm text-white/40">
            This hunt does not contain any
            challenges yet.
          </p>
        </div>
      </main>
    );
  }

  /*
   * START SCREEN
   */
  if (scene === "start") {
    return (
      <main className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#050607] px-5 text-white">
        {huntData.image ? (
          <img
            src={huntData.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#050607]/80 to-[#050607]" />

        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold tracking-[0.45em] text-amber-400">
            AN INTERACTIVE CINEMATIC HUNT
          </p>

          <h1 className="mt-6 text-4xl font-black tracking-[0.08em] sm:text-7xl">
            {huntData.title}
          </h1>

          <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/50">
            The sea has kept its secrets for
            centuries. Tonight, the map has
            chosen you.
          </p>

          <button
            type="button"
            onClick={startHunt}
            className="group mt-10 rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-8 py-4 text-xs font-black tracking-[0.22em] text-amber-300 transition hover:scale-105 hover:bg-amber-400/15"
          >
            BEGIN THE HUNT
          </button>

          <p className="mt-5 text-[9px] tracking-[0.18em] text-white/20">
            SOUND RECOMMENDED
          </p>
        </div>
      </main>
    );
  }

  /*
   * INTRO VIDEO
   */
  if (scene === "intro") {
    return (
      <CinematicVideoPlayer
        src={
          PIRATES_LAST_MAP_VIDEOS.intro
        }
        onEnded={
          handleIntroFinished
        }
        onSkip={
          handleIntroFinished
        }
      />
    );
  }

  /*
   * CINEMATIC BLACK FADE
   */
  if (scene === "transitioning") {
    return (
      <main className="fixed inset-0 z-[9999] h-[100dvh] w-screen animate-[cinematicFade_0.65s_ease-in-out_forwards] overflow-hidden bg-black">
        <style>{`
          @keyframes cinematicFade {
            0% {
              opacity: 0;
            }

            45% {
              opacity: 1;
            }

            100% {
              opacity: 1;
            }
          }
        `}</style>
      </main>
    );
  }

  /*
   * TRANSITION VIDEO
   *
   * Q1 → transition1
   * Q2 → transition2
   * Q3 → midCinematic
   * Q4 → midCinematic2
   */
  if (
    scene === "transition" &&
    transitionVideo
  ) {
    return (
      <CinematicVideoPlayer
        src={transitionVideo}
        onEnded={
          handleTransitionFinished
        }
        onSkip={
          handleTransitionFinished
        }
      />
    );
  }

  if (scene === "transition") {
    return (
      <LoadingScreen
        text="THE JOURNEY CONTINUES"
      />
    );
  }

  /*
   * FINAL VIDEO
   *
   * This is reached only after Q5
   * has been solved.
   */
  if (scene === "final") {
    return (
      <CinematicVideoPlayer
        src={
          PIRATES_LAST_MAP_VIDEOS.final
        }
        onEnded={finishHunt}
        onSkip={finishHunt}
        allowSkip={
          !isSavingCompletion
        }
      />
    );
  }

  /*
   * HUNT COMPLETE
   */
  if (
    scene === "complete" &&
    completionResult
  ) {
    return (
      <HuntComplete
        huntId={huntId}
        huntTitle={huntData.title}
        score={
          completionResult.score
        }
        xpEarned={
          completionResult.xpEarned
        }
        badge={
          completionResult.badge
        }
        totalXp={
          completionResult.totalXp
        }
        huntsCompleted={
          completionResult.huntsCompleted
        }
      />
    );
  }

  /*
   * FULL SCREEN PUZZLE
   */
  return (
    <CinematicPuzzleScene
      huntId={huntId}
      question={currentQuestion}
      chapterNumber={
        currentStep + 1
      }
      totalQuestions={
        totalQuestions
      }
      isLastQuestion={
        isLastQuestion
      }
      isSubmittingCompletion={
        isSavingCompletion
      }
      onSolved={
        handlePuzzleSolved
      }
      onHintUsed={
        handleHintUsed
      }
    />
  );
}