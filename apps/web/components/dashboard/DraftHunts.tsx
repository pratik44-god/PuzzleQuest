"use client";

import { FileEdit } from "lucide-react";

import DraftHuntCard from "./DraftHuntCard";
import type { Hunt } from "~/components/discover/discover-hunts";

type DraftHuntsProps = {
  hunts: Hunt[];
};

export default function DraftHunts({ hunts }: DraftHuntsProps) {
  if (hunts.length === 0) {
    return null;
  }

  return (
    <section className="mt-11">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          <FileEdit size={14} />
          Unpublished
        </div>

        <h2 className="mt-1 text-2xl font-bold text-zinc-100">
          Your draft hunts
        </h2>

        <p className="mt-1 text-sm text-zinc-600">
          Hunts saved as drafts are only visible to you until published.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {hunts.map((hunt, index) => (
          <DraftHuntCard
            key={hunt.id}
            hunt={hunt}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
