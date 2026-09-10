"use client";

import {
  ArrowRight,
  Compass,
  Flame,
  Gem,
  Map,
  Play,
  Plus,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const recentHunt = {
  title: "The Pirate's Last Map",
  description:
    "Continue solving the clues and find the hidden treasure.",
  progress: 35,
};

const publishedHunts = [
  {
    title: "Fooltan Ka Chashma",
    category: "Comedy",
    players: "124",
    image: "/hunts/fooltan.jpg",
  },
  {
    title: "The Lost Temple",
    category: "Mystery",
    players: "86",
    image: "/hunts/temple.jpg",
  },
  {
    title: "Secrets of the Island",
    category: "Adventure",
    players: "64",
    image: "/hunts/island.jpg",
  },
];

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0D] p-5 transition-all duration-300 hover:border-violet-400/20">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-600/[0.06] blur-2xl transition-all group-hover:bg-violet-600/[0.12]" />

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-400/[0.06] text-violet-300">
          {icon}
        </div>

        <p className="mt-5 text-2xl font-black tracking-tight text-white">
          {value}
        </p>

        <p className="mt-1 text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600">
          {label}
        </p>
      </div>
    </div>
  );
}

function HuntCard({
  title,
  description,
  progress,
}: {
  title: string;
  description: string;
  progress: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#0A0A0D] p-5">
      {/* atmospheric glow */}

      <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[250px] w-[250px] rounded-full bg-violet-600/[0.07] blur-[80px]" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* Hunt icon / image */}

        <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#3b1808] via-[#1d1012] to-[#170b24] sm:h-[120px] sm:w-[180px]">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.18),transparent_45%)]" />

          <div className="relative flex h-full items-center justify-center">
            <Map
              size={42}
              strokeWidth={1.2}
              className="text-amber-300/70"
            />
          </div>

          <div className="absolute bottom-3 left-3 rounded-full border border-amber-400/20 bg-black/40 px-2 py-1 backdrop-blur">
            <span className="text-[7px] font-black uppercase tracking-[0.18em] text-amber-300">
              In progress
            </span>
          </div>

        </div>

        {/* Information */}

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <Sparkles
              size={11}
              className="text-violet-400"
            />

            <span className="text-[7px] font-black uppercase tracking-[0.25em] text-violet-400">
              Pick up where you left off
            </span>

          </div>

          <h2 className="mt-2 truncate text-lg font-black tracking-tight text-white">
            {title}
          </h2>

          <p className="mt-1 max-w-xl text-[10px] leading-5 text-zinc-600">
            {description}
          </p>

          {/* progress */}

          <div className="mt-5 max-w-[430px]">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[7px] font-black uppercase tracking-[0.18em] text-zinc-700">
                Progress
              </span>

              <span className="text-[8px] font-bold text-zinc-500">
                {progress}% complete
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        </div>

        {/* Continue */}

        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-xs font-bold text-zinc-300 transition-all hover:border-violet-400/30 hover:bg-violet-500/[0.08] hover:text-white">

          Continue

          <ArrowRight size={13} />

        </button>

      </div>
    </div>
  );
}

function PublishedHuntCard({
  title,
  category,
  players,
  image,
}: {
  title: string;
  category: string;
  players: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0D] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/20">

      {/* Image */}

      <div className="relative aspect-[1.65/1] overflow-hidden bg-[#15131d]">

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        {/* fallback */}

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#281444] via-[#110d1d] to-[#07070a]">

          <Compass
            size={34}
            strokeWidth={1}
            className="text-violet-400/50"
          />

        </div>

        {/* gradient */}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0D] to-transparent" />

        {/* category */}

        <div className="absolute left-3 top-3 rounded-full border border-white/[0.08] bg-black/50 px-2.5 py-1 backdrop-blur">

          <span className="text-[7px] font-black uppercase tracking-[0.18em] text-violet-300">
            {category}
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-4">

        <h3 className="truncate text-sm font-black text-white">
          {title}
        </h3>

        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-1.5">

            <Users
              size={11}
              className="text-zinc-600"
            />

            <span className="text-[8px] font-bold text-zinc-600">
              {players} adventurers
            </span>

          </div>

          <ArrowRight
            size={12}
            className="text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-violet-400"
          />

        </div>

      </div>

    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070A] px-5 py-7 sm:px-7 lg:px-9">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-violet-600/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute right-[-150px] top-[35%] h-[350px] w-[350px] rounded-full bg-purple-700/[0.025] blur-[100px]" />


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-[1250px]">


        {/* ===================================================
            WELCOME HEADER
        =================================================== */}

        <header className="mb-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              {/* small label */}

              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.04] px-3 py-1">

                <Sparkles
                  size={10}
                  className="text-violet-300"
                />

                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-violet-300">
                  Your adventure starts here
                </span>

              </div>


              <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">

                Ready for your

                <span className="block text-violet-400">
                  next adventure?
                </span>

              </h1>


              <p className="mt-4 max-w-[620px] text-[11px] leading-5 text-zinc-600 sm:text-xs">
                Explore mysterious places, solve clever clues,
                compete with other explorers, and uncover hidden
                treasures.
              </p>

            </div>


            {/* actions */}

            <div className="flex shrink-0 items-center gap-2">

              <button className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-black text-white shadow-[0_8px_30px_rgba(124,58,237,0.2)] transition hover:bg-violet-500">

                <Play
                  size={13}
                  fill="currentColor"
                />

                Start Exploring

              </button>


              <button className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-xs font-bold text-zinc-400 transition hover:border-violet-400/20 hover:text-white">

                <Plus size={14} />

                Create Hunt

                <ArrowRight size={12} />

              </button>

            </div>

          </div>

        </header>


        {/* ===================================================
            STATS
        =================================================== */}

        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={<Compass size={18} />}
            value="12"
            label="Hunts Completed"
          />

          <StatCard
            icon={<Gem size={18} />}
            value="1,240"
            label="Total XP"
          />

          <StatCard
            icon={<Flame size={18} />}
            value="3"
            label="Day Streak"
          />

          <StatCard
            icon={<Trophy size={18} />}
            value="#08"
            label="Leaderboard Rank"
          />

        </section>


        {/* ===================================================
            CONTINUE ADVENTURE
        =================================================== */}

        <section className="mb-8">

          <div className="mb-3 flex items-end justify-between px-1">

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={11}
                  className="text-violet-400"
                />

                <h2 className="text-sm font-black text-zinc-200">
                  Continue your adventure
                </h2>

              </div>

              <p className="mt-1 text-[8px] text-zinc-700">
                Pick up where you left off
              </p>

            </div>


            <button className="flex items-center gap-1 text-[8px] font-black uppercase tracking-[0.15em] text-zinc-600 transition hover:text-violet-300">

              View all

              <ArrowRight size={10} />

            </button>

          </div>


          <HuntCard
            title={recentHunt.title}
            description={recentHunt.description}
            progress={recentHunt.progress}
          />

        </section>


        {/* ===================================================
            PUBLISHED HUNTS
        =================================================== */}

        <section>

          <div className="mb-4 flex items-end justify-between px-1">

            <div>

              <div className="flex items-center gap-2">

                <Flame
                  size={12}
                  className="text-violet-400"
                />

                <h2 className="text-sm font-black text-zinc-200">
                  Your published hunts
                </h2>

              </div>

              <p className="mt-1 text-[8px] text-zinc-700">
                Live adventures visible to other explorers
              </p>

            </div>


            <button className="flex items-center gap-1 text-[8px] font-black uppercase tracking-[0.15em] text-zinc-600 transition hover:text-violet-300">

              View all

              <ArrowRight size={10} />

            </button>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {publishedHunts.map((hunt) => (
              <PublishedHuntCard
                key={hunt.title}
                title={hunt.title}
                category={hunt.category}
                players={hunt.players}
                image={hunt.image}
              />
            ))}

          </div>

        </section>


        {/* ===================================================
            BOTTOM CREATE CARD
        =================================================== */}

        <section className="mt-5">

          <div className="relative overflow-hidden rounded-[22px] border border-violet-400/10 bg-gradient-to-r from-violet-600/[0.08] via-purple-600/[0.035] to-transparent px-6 py-5">

            <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[250px] w-[250px] rounded-full bg-violet-600/[0.08] blur-[80px]" />

            <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.06] text-violet-300">

                  <Compass size={20} />

                </div>

                <div>

                  <h3 className="text-sm font-black text-white">
                    Create your own adventure
                  </h3>

                  <p className="mt-1 text-[9px] text-zinc-600">
                    Build a hunt and challenge other explorers.
                  </p>

                </div>

              </div>


              <button className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-violet-300 transition hover:bg-violet-500/[0.15]">

                Create Hunt

                <ArrowRight size={11} />

              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}