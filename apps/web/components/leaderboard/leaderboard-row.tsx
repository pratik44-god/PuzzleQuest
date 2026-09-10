import {
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";

import type { HuntBadgeId } from "~/lib/hunt-badges";
import {
  formatLeaderboardName,
  getHuntBadgeMeta,
  getPlayerInitials,
} from "~/lib/hunt-badges";
import { formatNumber } from "~/lib/utils";

import type { LeaderboardPlayer } from "./leaderboard-podium";

function BadgeIcons({ badges }: { badges: HuntBadgeId[] }) {
  if (!badges?.length) {
    return <span className="text-xs text-zinc-700">No badges</span>;
  }

  return (
    <div className="flex items-center">
      {badges.slice(0, 4).map((badge, index) => {
        const meta = getHuntBadgeMeta(badge);

        return (
          <span
            key={badge}
            title={meta.label}
            className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
              index > 0 ? "-ml-1" : ""
            } ${meta.ringClassName} ${meta.bgClassName}`}
          >
            {meta.icon}
          </span>
        );
      })}

      {badges.length > 4 ? (
        <span className="ml-2 text-[10px] font-bold text-zinc-600">
          +{badges.length - 4}
        </span>
      ) : null}
    </div>
  );
}

function RankMovement({
  rank,
}: {
  rank: number;
}) {
  /*
   * Placeholder for future rank movement data.
   *
   * When your backend provides rankChange:
   *
   * positive -> ArrowUp
   * negative -> ArrowDown
   * zero     -> Minus
   */

  void rank;

  return (
    <span className="flex h-5 w-5 items-center justify-center text-zinc-700">
      <Minus size={12} />
    </span>
  );
}

export default function LeaderboardRow({
  player,
  isCurrentPlayer = false,
}: {
  player: LeaderboardPlayer;
  isCurrentPlayer?: boolean;
}) {
  const displayName = formatLeaderboardName(player.name, player.email);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-200 ${
        isCurrentPlayer
          ? "border-violet-500/40 bg-violet-500/[0.07]"
          : "border-white/[0.055] bg-[#0D0D10] hover:border-white/[0.12] hover:bg-[#111114]"
      }`}
    >
      {isCurrentPlayer ? (
        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-violet-400" />
      ) : null}

      <div className="grid min-h-[72px] grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 px-3 sm:grid-cols-[72px_minmax(0,1fr)_150px_120px] sm:gap-5 sm:px-5">
        {/* RANK */}
        <div className="flex items-center justify-center gap-1">
          <span
            className={`text-sm font-black tabular-nums ${
              player.rank <= 10 ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            {String(player.rank).padStart(2, "0")}
          </span>

          <div className="hidden sm:block">
            <RankMovement rank={player.rank} />
          </div>
        </div>

        {/* PLAYER */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
            {player.avatar ? (
              <img
                src={player.avatar}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-black text-violet-300">
                {getPlayerInitials(displayName)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-bold text-white">
                {displayName}
              </p>

              {isCurrentPlayer ? (
                <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-violet-300">
                  You
                </span>
              ) : null}
            </div>

            <p className="mt-1 text-[10px] text-zinc-600">
              {player.huntsCompleted} hunt
              {player.huntsCompleted === 1 ? "" : "s"} completed
            </p>
          </div>
        </div>

        {/* BADGES */}
        <div className="hidden sm:block">
          <BadgeIcons badges={player.badges} />
        </div>

        {/* XP */}
        <div className="text-right">
          <p className="text-sm font-black tabular-nums text-white">
            {formatNumber(player.totalXp)}
          </p>

          <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            XP
          </p>
        </div>
      </div>

      {/* hover line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-violet-400/50 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}