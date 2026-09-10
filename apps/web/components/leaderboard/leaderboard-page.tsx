"use client";

import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import TreasureIntro from "~/components/dashboard/TreasureIntro";
import Leaderboard from "~/components/leaderboard/leaderboard";
import { BackLink } from "~/components/ui/back-link";

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

export default function LeaderboardPage() {
  return (
    <main
      style={themeStyle}
      className="min-h-screen overflow-x-hidden bg-[#08080A] text-zinc-100"
    >
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          <div className="px-5 py-5 sm:px-7 lg:px-10">
            <BackLink
              href="/dashboard"
              label="Back to dashboard"
              className="mb-6"
            />

            <Leaderboard />
          </div>
        </section>
      </div>
    </main>
  );
}