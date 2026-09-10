import {
  Compass,
  Gem,
  Map,
  Trophy,
} from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative hidden items-center justify-center lg:flex">
      {/* Main Glass Card */}
      <div className="relative w-[430px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        {/* Top Icons */}
        <div className="mb-8 flex items-center justify-between">
          <Compass className="h-10 w-10 text-violet-400" />

          <Trophy className="h-10 w-10 text-yellow-400" />
        </div>

        {/* Center */}
        <div className="rounded-2xl border border-dashed border-violet-500/30 bg-zinc-900/50 py-16">
          <Map className="mx-auto h-32 w-32 text-violet-300" />

          <p className="mt-6 text-center text-xl font-semibold text-white">
            Treasure Map
          </p>

          <p className="mt-2 text-center text-sm text-zinc-400">
            Build interactive adventures.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-center gap-10">
          <Gem className="h-9 w-9 text-cyan-400" />

          <Compass className="h-9 w-9 text-green-400" />

          <Trophy className="h-9 w-9 text-orange-400" />
        </div>
      </div>

      {/* Floating Card */}
      <div className="absolute -left-10 top-12 rounded-2xl border border-violet-500/20 bg-zinc-900/80 px-5 py-4 backdrop-blur-xl shadow-xl">
        <p className="text-sm text-zinc-400">
          Active Hunts
        </p>

        <h3 className="mt-1 text-2xl font-bold text-white">
          120+
        </h3>
      </div>

      {/* Floating Card */}
      <div className="absolute -right-8 bottom-12 rounded-2xl border border-violet-500/20 bg-zinc-900/80 px-5 py-4 backdrop-blur-xl shadow-xl">
        <p className="text-sm text-zinc-400">
          Players
        </p>

        <h3 className="mt-1 text-2xl font-bold text-white">
          25K+
        </h3>
      </div>
    </div>
  );
}