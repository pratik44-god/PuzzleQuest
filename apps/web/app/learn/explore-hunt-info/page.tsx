import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Lightbulb,
  Play,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import Button from "~/components/ui/buttton";

export default function ExploreAdventuresLearnPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%)]" />

        <Container>
          <div className="relative py-16 sm:py-24">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mx-auto mt-16 max-w-4xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Compass size={32} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Explore Adventures
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                Discover. Solve. Complete.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Explore published hunts, follow the clues, use your
                logic, and uncover the final secret.
              </p>

              <Link
                href="/discover"
                className="mt-8 inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Explore Hunts
                </Button>
              </Link>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <Card className="p-6 sm:p-8">
                <Play
                  size={28}
                  className="text-violet-400"
                />

                <h2 className="mt-5 text-xl font-semibold">
                  Choose a hunt
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  Browse published adventures and choose the one
                  that looks interesting to you.
                </p>
              </Card>

              <Card className="p-6 sm:p-8">
                <Lightbulb
                  size={28}
                  className="text-yellow-400"
                />

                <h2 className="mt-5 text-xl font-semibold">
                  Solve the clues
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  Read the clues carefully, inspect images, and use
                  hints when you need help.
                </p>
              </Card>

              <Card className="p-6 sm:p-8">
                <Trophy
                  size={28}
                  className="text-amber-400"
                />

                <h2 className="mt-5 text-xl font-semibold">
                  Earn rewards
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  Complete hunts, earn XP, unlock achievements, and
                  compete on the leaderboard.
                </p>
              </Card>
            </div>

            <Card className="mt-6 p-6 sm:p-8">
              <Users
                size={28}
                className="text-emerald-400"
              />

              <h2 className="mt-5 text-2xl font-semibold">
                Every hunt tells a different story
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
                Some adventures are simple puzzle journeys. Others
                can become deeper story-driven experiences with
                images, clues, scoring, and themed gameplay.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Adventure",
                  "Mystery",
                  "Pirates",
                  "Fantasy",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
                <Star
                  size={16}
                  className="text-yellow-400"
                />
                Find an adventure and start solving.
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}