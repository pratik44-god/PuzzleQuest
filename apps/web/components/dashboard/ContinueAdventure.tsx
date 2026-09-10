"use client";

import ProtectedButton from "~/components/auth/ProtectedButton";
import { ArrowRight } from "lucide-react";

export default function ContinueAdventure() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
            Pick up where you left off
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Continue your adventure
          </h2>
        </div>

        <ProtectedButton
          href="/discover"
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
          rightIcon={<ArrowRight size={15} />}
        >
          View all
        </ProtectedButton>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0D0D14] p-5 transition duration-500 hover:-translate-y-1 hover:border-violet-500/30">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-950 text-5xl sm:h-28 sm:w-44">
            🏴‍☠️
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-400">
                In Progress
              </span>

              <span className="text-xs text-zinc-600">
                35% complete
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold">
              The Pirate&apos;s Last Map
            </h3>

            <p className="mt-1 max-w-xl text-sm text-zinc-500">
              Your last adventure is waiting for you.
              Continue solving the clues and find the hidden
              treasure.
            </p>

            <div className="mt-4 h-1.5 max-w-md overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" />
            </div>
          </div>

          <ProtectedButton
            href="/discover"
            variant="secondary"
            size="md"
            rightIcon={<ArrowRight size={17} />}
          >
            Continue
          </ProtectedButton>
        </div>
      </div>
    </section>
  );
}
