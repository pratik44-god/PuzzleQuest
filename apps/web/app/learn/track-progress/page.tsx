import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  Flag,
  History,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import Button from "~/components/ui/buttton";

const PROGRESS_CARDS = [
  {
    icon: Trophy,
    title: "Completed Hunts",
    description:
      "Every adventure you finish becomes part of your explorer journey.",
    stat: "Hunts",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-400/15",
  },
  {
    icon: Zap,
    title: "Earn XP",
    description:
      "Solve challenges and keep building your experience as you explore.",
    stat: "Experience",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-400/15",
  },
  {
    icon: Star,
    title: "Improve Your Score",
    description:
      "Solve efficiently, use fewer hints, and push your score higher.",
    stat: "Performance",
    accent: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-400/15",
  },
  {
    icon: Flag,
    title: "Keep Exploring",
    description:
      "Your progress grows every time you discover and complete a new hunt.",
    stat: "Journey",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/15",
  },
];

const PROGRESS_STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Discover",
    description:
      "Choose an adventure that catches your attention and enter the hunt.",
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Solve",
    description:
      "Work through clues, challenges, images, and optional hints.",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Complete",
    description:
      "Finish the final challenge and earn your result.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Progress",
    description:
      "Build your XP, completed hunts, scores, and explorer history.",
  },
];

export default function TrackProgressPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* =========================================================
          HERO
         ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.20),_transparent_48%)]" />

        <div className="absolute left-1/2 top-20 h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[140px]" />

        <Container>
          <div className="relative py-10 sm:py-14">
            <Link
              href="/"
              className="
                inline-flex items-center gap-2
                rounded-full border border-white/10
                bg-white/[0.03] px-4 py-2
                text-sm text-zinc-400
                transition-all duration-300
                hover:border-violet-500/30
                hover:bg-violet-500/[0.07]
                hover:text-white
              "
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mx-auto max-w-5xl pt-16 text-center sm:pt-20">
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-violet-400/20
                  bg-violet-500/10
                  text-violet-400
                  shadow-[0_0_45px_rgba(139,92,246,0.15)]
                "
              >
                <BarChart3 size={30} />
              </div>

              <div
                className="
                  mt-7 inline-flex items-center gap-2
                  rounded-full
                  border border-violet-400/20
                  bg-violet-500/10
                  px-4 py-2
                  text-xs font-semibold uppercase
                  tracking-[0.2em]
                  text-violet-300
                "
              >
                <Sparkles size={14} />
                Explorer Progress
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Every hunt leaves
                <span className="block text-violet-400">
                  a mark.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Your journey is more than finishing a hunt. Track
                the adventures you complete, the XP you earn, the
                scores you achieve, and how far you have explored.
              </p>

              <Link
                href="/leaderboard"
                className="mt-9 inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  View My Progress
                </Button>
              </Link>
            </div>

            {/* =====================================================
                PROGRESS PREVIEW
               ===================================================== */}
            <div className="mx-auto mt-20 max-w-5xl">
              <Card className="relative overflow-hidden border-white/[0.08] bg-[#0b0b10] p-6 sm:p-8">
                <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[80px]" />

                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
                        Explorer dashboard
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        Your journey at a glance
                      </h2>
                    </div>

                    <span className="text-xs text-zinc-600">
                      Keep exploring
                    </span>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        Hunts
                      </p>

                      <p className="mt-2 text-3xl font-black text-white">
                        12
                      </p>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <div className="h-full w-[72%] rounded-full bg-violet-400" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        XP
                      </p>

                      <p className="mt-2 text-3xl font-black text-violet-300">
                        2,480
                      </p>

                      <p className="mt-2 text-xs text-zinc-600">
                        Experience earned
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        Best score
                      </p>

                      <p className="mt-2 text-3xl font-black text-amber-300">
                        940
                      </p>

                      <p className="mt-2 text-xs text-zinc-600">
                        Keep pushing higher
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          WHAT YOU TRACK
         ========================================================= */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              What you can track
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your adventure, all in one place
            </h2>

            <p className="mt-4 text-zinc-500">
              Every completed hunt adds another chapter to your
              explorer journey.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROGRESS_CARDS.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className={`
                    group relative overflow-hidden
                    border-white/[0.08]
                    bg-[#0b0b10]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    ${item.border}
                  `}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.accent}`}
                  >
                    <Icon size={24} />
                  </div>

                  <p
                    className={`mt-6 text-[10px] font-bold uppercase tracking-[0.2em] ${item.accent}`}
                  >
                    {item.stat}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================
          JOURNEY FLOW
         ========================================================= */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              The explorer loop
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Progress starts with one adventure
            </h2>

            <p className="mt-4 text-zinc-500">
              Discover something interesting, solve it, complete it,
              and let the journey build from there.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {PROGRESS_STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative"
                  >
                    <Card className="h-full border-white/[0.08] bg-[#0b0b10] p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                          <Icon size={21} />
                        </div>

                        <span className="text-xs font-black tracking-[0.2em] text-zinc-700">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {step.description}
                      </p>
                    </Card>

                    {index < PROGRESS_STEPS.length - 1 ? (
                      <ArrowRight
                        size={17}
                        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-zinc-700 xl:block"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          HISTORY
         ========================================================= */}
      <section className="py-20">
        <Container>
          <Card className="relative mx-auto max-w-5xl overflow-hidden border-white/[0.08] bg-[#0b0b10] p-7 sm:p-10">
            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-violet-500/[0.05] blur-[100px]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
                  <History size={27} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
                  Adventure history
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Remember every trail.
                </h2>

                <p className="mt-4 leading-7 text-zinc-500">
                  Your progress is a record of the adventures you
                  have completed and the challenges you have
                  overcome.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      The Lost Observatory
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Hunt completed
                    </p>
                  </div>

                  <span className="text-sm font-bold text-violet-300">
                    +220 XP
                  </span>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Trophy size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      Captain Vane&apos;s Last Map
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Hunt completed
                    </p>
                  </div>

                  <span className="text-sm font-bold text-amber-300">
                    940
                  </span>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Zap size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      The Hidden Library
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Hunt completed
                    </p>
                  </div>

                  <span className="text-sm font-bold text-violet-300">
                    +180 XP
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* =========================================================
          FINAL CTA
         ========================================================= */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-violet-500/15 bg-violet-500/[0.05] px-6 py-12 text-center sm:px-10">
            <Sparkles
              size={28}
              className="mx-auto text-violet-400"
            />

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Your next adventure is waiting.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-500">
              Explore a new hunt, solve another challenge, and keep
              building your explorer journey.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/hunts"
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<Compass size={18} />}
                >
                  Explore Hunts
                </Button>
              </Link>

              <Link
                href="/dashboard"
                className="inline-block"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}