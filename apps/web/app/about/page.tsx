import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Flag,
  Lightbulb,
  Map,
  Sparkles,
  Target,
  Trophy,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import Button from "~/components/ui/buttton";

const CREATOR_POINTS = [
  {
    icon: Map,
    title: "Build your own story",
    description:
      "Create connected questions and challenges that guide players through an adventure.",
  },
  {
    icon: Lightbulb,
    title: "Add clever challenges",
    description:
      "Use questions, image-based challenges and optional hints to make every step meaningful.",
  },
  {
    icon: Flag,
    title: "Choose your theme",
    description:
      "Give your hunt an identity with categories such as Adventure, Mystery, Pirates, and Fantasy.",
  },
];

const EXPLORER_POINTS = [
  {
    icon: Compass,
    title: "Discover adventures",
    description:
      "Explore published hunts and choose an adventure that catches your attention.",
  },
  {
    icon: Target,
    title: "Solve the trail",
    description:
      "Follow the sequence, solve each challenge, and use hints when you need a little help.",
  },
  {
    icon: Trophy,
    title: "Earn and compete",
    description:
      "Complete hunts, earn XP, improve your scores, and climb the leaderboard.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* =========================================================
          HERO
         ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.20),_transparent_50%)]" />

        <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[150px]" />

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

            <div className="mx-auto max-w-5xl pt-20 text-center sm:pt-24">
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
                <WandSparkles size={30} />
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
                About PuzzleQuest
              </div>

              <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Exploration should
                <span className="block text-violet-400">
                  feel like an adventure.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                PuzzleQuest turns ideas, clues, and challenges into
                interactive adventures that people can create,
                discover, and solve.
              </p>
            </div>

            {/* =====================================================
                CORE IDEA
               ===================================================== */}
            <div className="mx-auto mt-20 max-w-5xl">
              <Card className="relative overflow-hidden border-white/[0.08] bg-[#0b0b10] p-7 sm:p-10">
                <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]" />

                <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                      What is PuzzleQuest?
                    </p>

                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                      A place where questions become journeys.
                    </h2>

                    <p className="mt-5 leading-7 text-zinc-500">
                      PuzzleQuest is built around a simple idea:
                      solving a question should feel like discovering
                      something, not just filling out a form.
                    </p>

                    <p className="mt-4 leading-7 text-zinc-500">
                      Creators build the path. Explorers follow it.
                      Every answer reveals another step until the
                      final challenge is complete.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.05] p-5">
                      <Map
                        size={22}
                        className="text-violet-400"
                      />

                      <p className="mt-3 text-sm font-semibold">
                        Create
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Build the adventure.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.04] p-5">
                      <Compass
                        size={22}
                        className="text-emerald-400"
                      />

                      <p className="mt-3 text-sm font-semibold">
                        Explore
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Follow the trail.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.04] p-5">
                      <Trophy
                        size={22}
                        className="text-amber-400"
                      />

                      <p className="mt-3 text-sm font-semibold">
                        Complete
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Claim the achievement.
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
          PHILOSOPHY
         ========================================================= */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Our philosophy
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              A hunt should feel like a journey,
              <span className="text-violet-400">
                {" "}not a questionnaire.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-zinc-500">
              Every challenge should create curiosity. Every answer
              should move the player forward. The goal is not simply
              to get the correct answer — it is to make the player
              want to know what comes next.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6">
                <Sparkles
                  size={24}
                  className="text-violet-400"
                />

                <h3 className="mt-5 text-lg font-semibold">
                  Curiosity
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Give players a reason to keep asking, exploring,
                  and discovering.
                </p>
              </Card>

              <Card className="p-6">
                <Zap
                  size={24}
                  className="text-amber-400"
                />

                <h3 className="mt-5 text-lg font-semibold">
                  Progress
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Make every solved challenge feel like meaningful
                  progress through the adventure.
                </p>
              </Card>

              <Card className="p-6">
                <Users
                  size={24}
                  className="text-emerald-400"
                />

                <h3 className="mt-5 text-lg font-semibold">
                  Participation
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Give creators and explorers an experience they
                  actively shape together.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          TWO SIDES
         ========================================================= */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Built for both sides
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              One platform. Two ways to experience it.
            </h2>

            <p className="mt-4 text-zinc-500">
              Create the adventure or become the explorer.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
            {/* Creator */}
            <Card className="relative overflow-hidden border-violet-500/15 bg-violet-500/[0.035] p-7 sm:p-9">
              <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-violet-500/[0.06] blur-[80px]" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                  <Map size={27} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                  For creators
                </p>

                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Build the world.
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  Create a hunt around your own story, idea, place,
                  mystery, or challenge.
                </p>

                <div className="mt-8 space-y-4">
                  {CREATOR_POINTS.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4"
                      >
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-violet-400">
                          <Icon size={17} />
                        </div>

                        <div>
                          <h4 className="font-semibold">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-zinc-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Explorer */}
            <Card className="relative overflow-hidden border-emerald-500/15 bg-emerald-500/[0.025] p-7 sm:p-9">
              <div className="absolute bottom-[-80px] left-[-80px] h-56 w-56 rounded-full bg-emerald-500/[0.05] blur-[80px]" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Compass size={27} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                  For explorers
                </p>

                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Follow the trail.
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  Discover hunts, solve challenges, track your
                  progress, and compete with other explorers.
                </p>

                <div className="mt-8 space-y-4">
                  {EXPLORER_POINTS.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4"
                      >
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-400">
                          <Icon size={17} />
                        </div>

                        <div>
                          <h4 className="font-semibold">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-zinc-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CINEMATIC EXPERIENCE
         ========================================================= */}
      <section className="py-20">
        <Container>
          <Card className="relative mx-auto max-w-6xl overflow-hidden border-amber-400/10 bg-[radial-gradient(circle_at_75%_20%,rgba(251,191,36,0.09),transparent_35%)] p-7 sm:p-10">
            <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-amber-400/[0.05] blur-[110px]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-xs font-semibold text-amber-300">
                  <Sparkles size={14} />
                  Beyond ordinary puzzles
                </div>

                <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Make the hunt feel alive.
                </h2>

                <p className="mt-4 leading-7 text-zinc-500">
                  Some adventures can go beyond questions and
                  answers. A themed hunt can use storytelling,
                  cinematic scenes, and carefully connected
                  challenges to create a deeper experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1.5 text-xs text-violet-300">
                    Question
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-zinc-700"
                  />

                  <span className="rounded-full border border-amber-400/15 bg-amber-500/[0.06] px-3 py-1.5 text-xs text-amber-300">
                    Cinematic
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-zinc-700"
                  />

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-3 py-1.5 text-xs text-emerald-300">
                    Discovery
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-zinc-700"
                  />

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
                    Next clue
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                      Story
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Connected
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                      Challenge
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Interactive
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                      Reward
                    </p>

                    <p className="mt-1 text-sm font-semibold text-amber-400">
                      XP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* =========================================================
          VISION
         ========================================================= */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <Flag size={27} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              Our vision
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Make exploration feel
              <span className="text-violet-400">
                {" "}personal.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-zinc-500">
              We want PuzzleQuest to be a place where anyone can
              turn an idea into an experience — and where every
              explorer can find a challenge worth solving.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FINAL CTA
         ========================================================= */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-violet-500/15 bg-violet-500/[0.05] px-6 py-12 text-center sm:px-10">
            <Sparkles
              size={28}
              className="mx-auto text-violet-400"
            />

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Ready to enter the adventure?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-500">
              Create something worth exploring or discover your
              next challenge.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Create a Hunt
                </Button>
              </Link>

              <Link
                href="/hunts"
                className="inline-block"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<Compass size={18} />}
                >
                  Explore Hunts
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}