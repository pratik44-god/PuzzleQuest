"use client";

import ProtectedLink from "~/components/auth/ProtectedLink";
import { ArrowRight, Flame } from "lucide-react";

import HuntCard from "./HuntCard";
import type { Hunt } from "~/components/discover/discover-hunts";

type FeaturedHuntsProps = {
  hunts: Hunt[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  showExploreLink?: boolean;
  showPublishedActions?: boolean;
};

export default function FeaturedHunts({
  hunts,
  title = "Hunts explorers love",
  subtitle = "Popular adventures waiting to be discovered.",
  emptyMessage = "No published hunts yet. Create one and publish it to see it here.",
  showExploreLink = true,
  showPublishedActions = false,
}: FeaturedHuntsProps) {
  return (
    <section className="mt-11">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
            <Flame size={14} />
            Trending now
          </div>

          <h2 className="mt-1 text-2xl font-bold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-zinc-600">
            {subtitle}
          </p>
        </div>

        {showExploreLink && (
          <ProtectedLink
            href="/discover"
            className="hidden items-center gap-1 text-sm font-semibold text-violet-400 hover:text-violet-300 sm:flex"
          >
            Explore all
            <ArrowRight size={15} />
          </ProtectedLink>
        )}
      </div>

      {hunts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#0D0D14] px-6 py-12 text-center">
          <p className="text-sm text-zinc-500">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {hunts.map((hunt, index) => (
            <HuntCard
              key={hunt.id}
              hunt={hunt}
              index={index}
              showActions={showPublishedActions}
            />
          ))}
        </div>
      )}
    </section>
  );
}
