import { Compass, Sparkles } from "lucide-react";

type VerifyAnswerProgressProps = {
  huntTitle: string;
  currentStep: number;
  totalQuestions: number;
  huntImage?: string;
  score?: number;
};

export default function VerifyAnswerProgress({
  huntTitle,
  currentStep,
  totalQuestions,
  huntImage,
  score = 100,
}: VerifyAnswerProgressProps) {
  // Q1 = 0%, Q2 = 20%, Q3 = 40%...
  // Last question = 100%
  const progress =
    totalQuestions <= 1
      ? 100
      : Math.round((currentStep / (totalQuestions - 1)) * 100);

  return (
    <div className="mb-5">
      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#0c0c12] to-[#09090b] px-4 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.3)] sm:px-5 sm:py-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {huntImage ? (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={huntImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                <Compass size={19} />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles size={11} className="shrink-0 text-violet-400" />

                <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-violet-300">
                  Live Hunt
                </p>
              </div>

              <h1 className="mt-0.5 truncate text-base font-black tracking-tight text-white">
                {huntTitle}
              </h1>

              <p className="mt-0.5 text-[11px] text-zinc-500">
                Challenge {currentStep + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">
              Question Score
            </p>

            <p className="text-lg font-black text-amber-300">
              {score} ⭐
            </p>
          </div>
        </div>

        <div className="relative mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9px] font-semibold text-zinc-600">
              Journey progress
            </span>

            <span className="text-[9px] font-bold text-violet-300">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}