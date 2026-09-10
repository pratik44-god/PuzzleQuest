"use client";

import { SearchX } from "lucide-react";

import HuntDetails from "./hunt-details";
import type { Hunt } from "./discover-hunts";

type HuntGridProps = {
  hunts: Hunt[];
};

export default function HuntGrid({
  hunts,
}: HuntGridProps) {
  if (hunts.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-[#0D0D14] px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-600">
          <SearchX size={24} />
        </div>

        <h3 className="mt-5 text-lg font-bold">
          No hunts found
        </h3>

        <p className="mt-2 max-w-md text-sm text-zinc-600">
          Try another search or change your filters to discover
          more adventures.
        </p>
      </div>
    );
  }

  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {hunts.map((hunt, index) => (
        <HuntDetails
          key={hunt.id}
          hunt={hunt}
          index={index}
        />
      ))}
    </div>
  );
}
