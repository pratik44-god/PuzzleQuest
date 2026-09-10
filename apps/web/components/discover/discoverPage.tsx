"use client";

import { Compass, User } from "lucide-react";
import { useMemo, useState } from "react";

import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import TreasureIntro from "~/components/dashboard/TreasureIntro";
import { BackLink } from "~/components/ui/back-link";
import { mapApiHuntToDisplay } from "~/lib/hunt-display";
import { useGetPublishedHunts } from "~/hooks/api/hunt";

import DiscoverSearch from "./discover-search";
import DiscoverFilters from "./discover-filters";
import DiscoverHunts from "./discover-hunts";

const THEME_COLOR = "#8B5CF6";

type ThemeStyle = React.CSSProperties & {
  "--theme": string;
  "--theme-soft": string;
  "--theme-border": string;
};

const themeStyle: ThemeStyle = {
  "--theme": THEME_COLOR,
  "--theme-soft": `color-mix(in srgb, ${THEME_COLOR} 12%, transparent)`,
  "--theme-border": `color-mix(in srgb, ${THEME_COLOR} 28%, transparent)`,
};

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const { data: publishedHunts, isLoading } = useGetPublishedHunts();

  const hunts = useMemo(
    () => (publishedHunts ?? []).map(mapApiHuntToDisplay),
    [publishedHunts],
  );

  const filteredHunts = useMemo(() => {
    return hunts.filter((hunt) => {
      const matchesSearch =
        hunt.title.toLowerCase().includes(search.toLowerCase()) ||
        hunt.description.toLowerCase().includes(search.toLowerCase()) ||
        hunt.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || hunt.category === category;

      const matchesDifficulty =
        difficulty === "All" ||
        hunt.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty
      );
    });
  }, [hunts, search, category, difficulty]);

  return (
    <main
      style={themeStyle}
      className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100"
    >
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          {/* Mobile Header */}
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800/70 bg-[#09090B]/90 px-5 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Compass size={18} />
              </div>

              <span className="font-bold">
                PuzzleQuest
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700">
              <User size={15} />
            </div>
          </div>

          <div className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
            <BackLink
              href="/dashboard"
              label="Back to dashboard"
              className="mb-6"
            />

            {/* HERO */}
            <section className="group relative overflow-hidden rounded-[30px] border border-zinc-800/80 bg-gradient-to-br from-violet-950/50 via-[#0D0D16] to-[#09090B] p-7 sm:p-10">
              <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl transition duration-1000 group-hover:bg-violet-600/20" />

              <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

              <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-[120px] opacity-[0.07] transition duration-700 group-hover:rotate-12 group-hover:scale-110 lg:block">
                🧭
              </div>

              <div className="relative max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                  THE HUNT BEGINS
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Explore the
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    unknown.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Enter dangerous ruins, decode ancient clues,
                  uncover forgotten treasures, and become the
                  explorer everyone remembers.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="rounded-xl border border-zinc-800 bg-black/20 px-4 py-2.5">
                    <p className="text-lg font-bold text-white">
                      {isLoading ? "—" : hunts.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                      Hunts
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-black/20 px-4 py-2.5">
                    <p className="text-lg font-bold text-white">
                      12.8k
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                      Explorers
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-black/20 px-4 py-2.5">
                    <p className="text-lg font-bold text-white">
                      4.9
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                      Average rating
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEARCH */}
            <DiscoverSearch
              value={search}
              onChange={setSearch}
            />

            {/* FILTERS */}
            <DiscoverFilters
              category={category}
              difficulty={difficulty}
              onCategoryChange={setCategory}
              onDifficultyChange={setDifficulty}
            />

            {/* HUNTS */}
            {isLoading ? (
              <section className="mt-10">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-72 animate-pulse rounded-2xl border border-zinc-800 bg-[#0D0D14]"
                    />
                  ))}
                </div>
              </section>
            ) : (
              <DiscoverHunts hunts={filteredHunts} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
