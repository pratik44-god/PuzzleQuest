import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  Image,
  Lightbulb,
  Map,
  Sparkles,
  Tags,
  Trophy,
  WandSparkles,
} from "lucide-react";

import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import Button from "~/components/ui/buttton";

const STEPS = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Start with an idea",
    description:
      "Choose a story, mystery, adventure, or challenge that you want players to experience.",
  },
  {
    number: "02",
    icon: Map,
    title: "Build the journey",
    description:
      "Create questions one by one and connect them into a journey where every answer unlocks the next clue.",
  },
  {
    number: "03",
    icon: Image,
    title: "Make it visual",
    description:
      "Add image-based challenges when you want players to inspect a scene and discover hidden details.",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Add clever hints",
    description:
      "Give players optional clues for difficult challenges while keeping the hunt competitive with score deductions.",
  },
  {
    number: "05",
    icon: Tags,
    title: "Choose the style",
    description:
      "Tag your hunt as Adventure, Mystery, Pirates, Fantasy, or another available category.",
  },
  {
    number: "06",
    icon: Trophy,
    title: "Preview and publish",
    description:
      "Review the complete hunt, make your final changes, and publish it for explorers to discover.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Story-driven clues",
    description:
      "Connect challenges so the player feels like every answer moves the story forward.",
  },
  {
    title: "Image challenges",
    description:
      "Use visual clues when a picture tells the story better than words.",
  },
  {
    title: "Hints with a cost",
    description:
      "Let players get unstuck while making every hint a meaningful decision.",
  },
  {
    title: "Themed experiences",
    description:
      "Use tags to give your hunt a recognizable identity and theme.",
  },
];

export default function CreateHuntsLearnPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* =========================================================
          HERO
         ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.20),_transparent_50%)]" />

        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[140px]" />

        <Container>
          <div className="relative py-10 sm:py-14">
            {/* Back */}
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

            {/* Hero content */}
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
                Create Hunts
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Create something
                <span className="block text-violet-400">
                  worth exploring.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Turn your ideas into interactive treasure hunts
                where every clue, challenge, and discovery becomes
                part of the story.
              </p>

              <Link
                href="/login"
                className="mt-9 inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Start Creating
                </Button>
              </Link>
            </div>

            {/* =====================================================
                ADVENTURE FLOW
               ===================================================== */}
            <div className="mx-auto mt-20 max-w-6xl">
              <div className="relative">
                <div
                  className="
                    absolute left-[16.66%] right-[16.66%]
                    top-1/2 hidden h-px
                    -translate-y-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-violet-400/30
                    to-emerald-400/20
                    lg:block
                  "
                />

                <div className="relative grid gap-5 lg:grid-cols-3">
                  {/* Create */}
                  <Card
                    className="
                      group relative overflow-hidden
                      border-white/[0.08]
                      bg-[#0b0b10]
                      p-7
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-violet-500/30
                    "
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/[0.06] blur-3xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">
                          Create
                        </span>

                        <span className="text-4xl font-black tracking-tight text-white/[0.04]">
                          01
                        </span>
                      </div>

                      <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                          <Map size={25} />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Build the mystery
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            Questions, clues, images and hints.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-violet-400" />

                          <div className="h-2 w-24 rounded-full bg-white/10" />

                          <div className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                            Question
                          </div>
                        </div>

                        <div className="mt-3 h-2 w-3/4 rounded-full bg-white/[0.05]" />

                        <div className="mt-2 h-2 w-1/2 rounded-full bg-white/[0.04]" />
                      </div>
                    </div>
                  </Card>

                  {/* Discover */}
                  <Card
                    className="
                      group relative overflow-hidden
                      border-violet-400/15
                      bg-gradient-to-b
                      from-violet-500/[0.07]
                      to-[#0b0b10]
                      p-7
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-violet-400/30
                    "
                  >
                    <div className="absolute left-1/2 top-[-80px] h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-3xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-300">
                          Discover
                        </span>

                        <span className="text-4xl font-black tracking-tight text-white/[0.05]">
                          02
                        </span>
                      </div>

                      <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
                          <Compass size={25} />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Follow the trail
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            Solve one challenge to unlock the next.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center justify-center rounded-xl border border-white/[0.06] bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300">
                            1
                          </div>

                          <ArrowRight
                            size={15}
                            className="text-zinc-700"
                          />

                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300">
                            2
                          </div>

                          <ArrowRight
                            size={15}
                            className="text-zinc-700"
                          />

                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                            3
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Complete */}
                  <Card
                    className="
                      group relative overflow-hidden
                      border-white/[0.08]
                      bg-[#0b0b10]
                      p-7
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-emerald-500/25
                    "
                  >
                    <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-emerald-500/[0.05] blur-3xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
                          Complete
                        </span>

                        <span className="text-4xl font-black tracking-tight text-white/[0.04]">
                          03
                        </span>
                      </div>

                      <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-400">
                          <Trophy size={25} />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Claim the treasure
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            Finish the hunt, earn XP and climb higher.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                            Score
                          </p>

                          <p className="mt-1 text-lg font-black text-white">
                            940
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                            XP
                          </p>

                          <p className="mt-1 text-lg font-black text-amber-400">
                            +250
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          HOW IT WORKS
         ========================================================= */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Build an adventure in six steps
            </h2>

            <p className="mt-4 text-zinc-500">
              You control the questions, clues, visuals, and style.
              PuzzleQuest turns them into a playable experience.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  className="
                    group relative overflow-hidden
                    border-white/[0.08]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-violet-500/25
                    hover:bg-white/[0.04]
                  "
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/15">
                      <Icon size={24} />
                    </div>

                    <span className="text-xs font-black tracking-[0.2em] text-zinc-700">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-500">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================
          HIGHLIGHTS
         ========================================================= */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Make it yours
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Build more than a list of questions
              </h2>

              <p className="mt-4 text-zinc-500">
                The strongest hunts feel like journeys, not forms.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <Card
                  key={item.title}
                  className="border-white/10 bg-black/20 p-6"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          SPECIAL THEMED HUNTS
         ========================================================= */}
      <section className="py-20">
        <Container>
          <Card className="relative mx-auto max-w-5xl overflow-hidden border-amber-400/10 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.10),transparent_35%)] p-7 sm:p-10">
            <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-amber-400/[0.04] blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-xs font-semibold text-amber-300">
                <Tags size={14} />
                Special themed hunts
              </div>

              <h2 className="mt-5 max-w-2xl text-2xl font-bold sm:text-3xl">
                Give your hunt its own personality
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
                Your selected tag can define more than just a
                category. For example, the Pirates experience can
                use its own cinematic adventure flow with story
                scenes between challenges.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "Adventure",
                  "Mystery",
                  "Pirates",
                  "Fantasy",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
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
              Ready to create your first hunt?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-500">
              Your next adventure can start with one question.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-block"
            >
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                Create a Hunt
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}