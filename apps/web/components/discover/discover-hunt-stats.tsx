import type { ReactNode } from "react";
import {
  HelpCircle,
  Shield,
  Users,
} from "lucide-react";

import type { Hunt } from "./discover-hunts";

const difficultyStyles = {
  Easy: {
    icon: "text-emerald-400",
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
  Medium: {
    icon: "text-amber-400",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  },
  Hard: {
    icon: "text-rose-400",
    badge: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  },
} as const;

type DiscoverHuntStatsProps = {
  hunt: Hunt;
  size?: "sm" | "md";
};

export default function DiscoverHuntStats({
  hunt,
  size = "sm",
}: DiscoverHuntStatsProps) {
  const difficulty = difficultyStyles[hunt.difficulty];
  const questionValue =
    hunt.questionCount === 1 ? "1" : String(hunt.questionCount);
  const playValue =
    hunt.playCount === 1 ? "1" : String(hunt.playCount);

  const isMd = size === "md";

  return (
    <div
      className={`grid grid-cols-3 gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 ${
        isMd ? "p-3" : "p-2"
      }`}
    >
      <StatItem
        icon={
          <Shield
            size={isMd ? 16 : 13}
            className={difficulty.icon}
          />
        }
        label="Difficulty"
        value={hunt.difficulty}
        valueClassName={difficulty.badge}
        isMd={isMd}
      />

      <StatItem
        icon={
          <HelpCircle
            size={isMd ? 16 : 13}
            className="text-violet-400"
          />
        }
        label="Questions"
        value={questionValue}
        isMd={isMd}
      />

      <StatItem
        icon={
          <Users
            size={isMd ? 16 : 13}
            className="text-cyan-400"
          />
        }
        label="Players"
        value={playValue}
        isMd={isMd}
      />
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
  valueClassName = "",
  isMd,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
  isMd: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-xl border border-zinc-800/60 bg-[#0D0D14]/80 px-1.5 py-2 text-center">
      <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80">
        {icon}
      </div>

      <span
        className={`max-w-full truncate font-bold text-zinc-100 ${
          isMd ? "text-sm" : "text-[11px]"
        } ${valueClassName ? `rounded-md border px-1.5 py-0.5 ${valueClassName}` : ""}`}
      >
        {value}
      </span>

      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
        {label}
      </span>
    </div>
  );
}
