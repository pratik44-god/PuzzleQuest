"use client";

import HuntGrid from "./hunt-grid";

export type Hunt = {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  image?: string;
  status?: "DRAFT" | "PUBLISHED";
  questionCount: number;
  hintCount: number;
  playCount: number;
  creatorName: string;
  creatorHandle: string;
  creatorId?: string | null;
  creatorAvatar?: string | null;
  createdAt?: Date | string | null;
  players: string;
  time: string;
  category: "Adventure" | "Mystery" | "Pirates" | "Fantasy";
  rating: string;
  icon?: string;
  accent: string;
  featured?: boolean;
};

export const hunts: Hunt[] = [];

type DiscoverHuntsProps = {
  hunts: Hunt[];
};

export default function DiscoverHunts({
  hunts,
}: DiscoverHuntsProps) {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            Available hunts
          </div>

          <h2 className="mt-1 text-2xl font-bold">
            Choose your adventure
          </h2>

          <p className="mt-1 text-sm text-zinc-600">
            Every clue takes you closer to the treasure.
          </p>
        </div>

        <p className="hidden text-xs text-zinc-600 sm:block">
          {hunts.length} adventures found
        </p>
      </div>

      <HuntGrid hunts={hunts} />
    </section>
  );
}