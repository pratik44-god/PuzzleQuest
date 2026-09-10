
"use client";

import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import DashboardHero from "~/components/dashboard/DashboardHero";
import ContinueAdventure from "~/components/dashboard/ContinueAdventure";
import DashboardHunts from "~/components/dashboard/DashboardHunts";
import TreasureIntro from "~/components/dashboard/TreasureIntro";

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

export default function DashboardPage() {
  return (
    <main
      style={themeStyle}
      className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100"
    >
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          <div className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
            <DashboardHero />

            <ContinueAdventure />

            <DashboardHunts />
          </div>
        </section>
      </div>
    </main>
  );
}