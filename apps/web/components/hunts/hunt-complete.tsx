"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, Star, Trophy } from "lucide-react";

import Container from "~/components/ui/container";
import Button from "~/components/ui/buttton";
import Card from "~/components/ui/cardd";
import HuntBadge from "~/components/hunts/hunt-badges";
import CelebrationConfetti from "~/components/hunts/celebration-confetti";
import type { HuntBadgeId } from "~/lib/hunt-badges";
import { formatNumber } from "~/lib/utils";

type HuntCompleteProps = {
  huntId: string;
  huntTitle: string;
  score: number;
  xpEarned: number;
  badge: HuntBadgeId;
  totalXp: number;
  huntsCompleted: number;
};

export default function HuntComplete({
  huntId,
  huntTitle,
  score,
  xpEarned,
  badge,
  totalXp,
  huntsCompleted,
}: HuntCompleteProps) {
  const router = useRouter();

  const handlePlayAgain = () => {
    router.push(`/hunts/${huntId}`);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden py-8 sm:py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />

        <div className="absolute right-[10%] top-[20%] h-56 w-56 rounded-full bg-violet-600/15 blur-[90px]" />
      </div>

      <Container>
        <div className="mx-auto w-full max-w-2xl">

          {/* Back to Dashboard */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="group mb-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-zinc-500 transition-all duration-300 hover:-translate-x-1 hover:border-violet-500/30 hover:bg-violet-500/[0.07] hover:text-violet-300"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />

            <span>Back to dashboard</span>
          </button>

          {/* Main Card */}
          <Card className="relative overflow-hidden border-white/[0.08] bg-[#0D0D14] p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-8 animate-[celebrationPop_0.7s_ease-out_both]">

            <CelebrationConfetti count={36} />

            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-400/10 blur-[70px]" />

            {/* Trophy */}
            <div
              className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.08] animate-[trophyVictory_0.9s_cubic-bezier(0.34,1.56,0.64,1)_both]"
            >
              <Trophy
                size={36}
                className="text-amber-400"
              />
            </div>

            {/* Heading */}
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
              Hunt Complete
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Treasure Found!
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
              You completed{" "}
              <span className="font-semibold text-zinc-300">
                {huntTitle}
              </span>
              .
            </p>

            {/* Badge */}
            <div className="mt-6 flex justify-center">
              <HuntBadge
                badge={badge}
                size="md"
                showDescription
              />
            </div>

            {/* Score */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
                <Star
                  size={19}
                  className="mx-auto text-amber-400"
                />

                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  Final Score
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  {formatNumber(score)}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
                <Trophy
                  size={19}
                  className="mx-auto text-violet-400"
                />

                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  XP Earned
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  +{formatNumber(xpEarned)}
                </p>
              </div>
            </div>

            {/* Account stats */}
            <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] text-zinc-600">
                Your Progress
              </p>

              <div className="mt-1 flex items-center justify-center gap-2 text-xs">
                <span className="font-semibold text-white">
                  {formatNumber(totalXp)} XP
                </span>

                <span className="text-zinc-700">•</span>

                <span className="text-zinc-400">
                  {huntsCompleted}{" "}
                  {huntsCompleted === 1 ? "hunt" : "hunts"} completed
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handlePlayAgain}
                leftIcon={<RotateCcw size={17} />}
              >
                Play Again
              </Button>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                href="/leaderboard"
              >
                View Leaderboard
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}