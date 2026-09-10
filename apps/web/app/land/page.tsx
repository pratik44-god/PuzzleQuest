"use client";

import Link from "next/link";
import {
  Compass,
  Map,
  Trophy,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";

import Button from "~/components/ui/buttton";
import Card from "~/components/ui/cardd";
import Container from "~/components/ui/container";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_45%)]" /> */}
<div
  className="pointer-events-none absolute inset-0 opacity-[0.025]"
  style={{
    backgroundImage:
      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
    backgroundSize: "32px 32px",
  }}
/>
        <Container>
          <div className="relative py-20 sm:py-28">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                <Compass size={16} />
                Your adventure starts here
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Discover Hidden
                <span className="block text-violet-400">
                  Treasures
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Create exciting treasure hunts, explore adventures
                created by others, and compete with friends to become
                the ultimate explorer.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/hunts/create">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Plus size={18} />}
                  >
                    Create a Hunt
                  </Button>
                </Link>

                <Link href="/hunts">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Explore Hunts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Treasure visual */}
            <div className="mx-auto mt-16 max-w-4xl">
              <Card className="relative overflow-hidden border-white/10 bg-white/[0.03] p-6 sm:p-10">
                <div className="grid gap-6 sm:grid-cols-3">
                  {/* Create */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                      <Map
                        size={28}
                        className="text-violet-400"
                      />
                    </div>

                    <h3 className="mt-4 font-semibold">
                      Create
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Build your own interactive treasure hunt.
                    </p>
                  </div>

                  {/* Play */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <Compass
                        size={28}
                        className="text-emerald-400"
                      />
                    </div>

                    <h3 className="mt-4 font-semibold">
                      Explore
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Follow clues and discover hidden treasures.
                    </p>
                  </div>

                  {/* Compete */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                      <Trophy
                        size={28}
                        className="text-yellow-400"
                      />
                    </div>

                    <h3 className="mt-4 font-semibold">
                      Compete
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Earn XP, climb the leaderboard, and win. 
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Explore the world
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need for your adventure
            </h2>

            <p className="mt-4 text-zinc-500">
              Create hunts, play with friends, and track your
              progress in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <Map
                size={28}
                className="text-violet-400"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Interactive Hunts
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Solve clues, discover locations, and complete
                exciting challenges.
              </p>
            </Card>

            <Card className="p-6">
              <Users
                size={28}
                className="text-emerald-400"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Play With Friends
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Challenge your friends and compete against other
                explorers.
              </p>
            </Card>

            <Card className="p-6">
              <Trophy
                size={28}
                className="text-yellow-400"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Earn XP
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Complete hunts, earn experience, and climb the
                leaderboard.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
