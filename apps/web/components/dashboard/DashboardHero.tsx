
"use client";

import ProtectedButton from "~/components/auth/ProtectedButton";
import {
  ArrowRight,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import FadeUp from "../animation/fade-up";

export default function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-zinc-800/80 bg-gradient-to-br from-violet-950/50 via-[#0D0D16] to-[#09090B] p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
          <Sparkles size={13} />
          Your adventure starts here
        </div>

        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Ready for your
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            next adventure?
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          Explore mysterious places, solve clever clues,
          compete with other explorers, and uncover hidden
          treasures.
        </p>

         
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ProtectedButton
            href="/discover"
            variant="primary"
            size="lg"
            leftIcon={<Play size={18} />}
          >
            Start Exploring
          </ProtectedButton>
          <ProtectedButton
            href="/dashboard/create"
            variant="secondary"
            size="lg"
            leftIcon={<Plus size={18} />}
            rightIcon={<ArrowRight size={17} />}
          >
            Create New Hunt
          </ProtectedButton>
        </div>
          
      </div>

      <div className="absolute bottom-6 right-8 hidden select-none text-7xl opacity-70 transition duration-500 hover:scale-110 xl:block">
        🗺️
      </div>
    </section>
  );
}
