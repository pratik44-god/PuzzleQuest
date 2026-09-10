"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { DISCOVER_TAG_FILTERS } from "~/lib/hunt-tags";

type DiscoverFiltersProps = {
  category: string;
  difficulty: string;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
};

const difficulties = [
  "All",
  "Easy",
  "Medium",
  "Hard",
];

export default function DiscoverFilters({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}: DiscoverFiltersProps) {
  return (
    <section className="mt-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal
            size={16}
            className="mr-1 shrink-0 text-zinc-600"
          />

          {DISCOVER_TAG_FILTERS.map((item) => {
            const active = category === item;
            const label = item === "All" ? item : item.toLowerCase();

            return (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(item)}
                className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold capitalize transition duration-300 ${
                  active
                    ? "border-violet-500/30 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/10"
                    : "border-zinc-800 bg-[#0D0D14] text-zinc-500 hover:-translate-y-0.5 hover:border-violet-500/30 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0">
          <select
            value={difficulty}
            onChange={(event) =>
              onDifficultyChange(event.target.value)
            }
            className="h-10 w-full appearance-none rounded-xl border border-zinc-800 bg-[#0D0D14] px-4 pr-10 text-xs font-semibold text-zinc-400 outline-none transition hover:border-zinc-700 focus:border-violet-500/40 sm:w-40"
          >
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All difficulties"
                  : item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
          />
        </div>
      </div>
    </section>
  );
}