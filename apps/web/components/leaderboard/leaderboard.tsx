"use client";

import {
  Crown,
  Gem,
  Medal,
  RefreshCw,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useGetLeaderboard } from "~/hooks/api/hunt";
import type { HuntBadgeId } from "~/lib/hunt-badges";
import {
  formatLeaderboardName,
  getHuntBadgeMeta,
  getPlayerInitials,
} from "~/lib/hunt-badges";
import { formatNumber } from "~/lib/utils";

type LeaderboardPlayer = {
  rank: number;
  userId: string;
  name: string;
  email: string;
  avatar: string | null;
  totalXp: number;
  huntsCompleted: number;
  badge: HuntBadgeId | null;
  badges: HuntBadgeId[];
};

type PodiumTheme = {
  card: string;
  border: string;
  glow: string;
  accent: string;
  rankBg: string;
  rankBorder: string;
  avatarRing: string;
  label: string;
};

const podiumThemes: Record<1 | 2 | 3, PodiumTheme> = {
  1: {
    card: "from-[#3B2A08] via-[#1C1308] to-[#160B22]",
    border: "border-amber-400/45",
    glow: "bg-amber-400/[0.12]",
    accent: "text-amber-300",
    rankBg: "bg-[#241906]",
    rankBorder: "border-amber-300/60",
    avatarRing: "from-amber-200 via-yellow-400 to-orange-500",
    label: "Champion",
  },

  2: {
    card: "from-[#08202C] via-[#0B1620] to-[#1B0B2C]",
    border: "border-cyan-400/35",
    glow: "bg-cyan-400/[0.10]",
    accent: "text-cyan-300",
    rankBg: "bg-[#071B25]",
    rankBorder: "border-cyan-300/55",
    avatarRing: "from-cyan-200 via-sky-400 to-violet-500",
    label: "Runner Up",
  },

  3: {
    card: "from-[#291608] via-[#17100C] to-[#1B0A20]",
    border: "border-orange-400/35",
    glow: "bg-orange-400/[0.10]",
    accent: "text-orange-300",
    rankBg: "bg-[#211107]",
    rankBorder: "border-orange-300/55",
    avatarRing: "from-orange-200 via-orange-400 to-violet-500",
    label: "Third Place",
  },
};

function PlayerAvatar({
  player,
  place,
}: {
  player: LeaderboardPlayer;
  place: 1 | 2 | 3;
}) {
  const displayName = formatLeaderboardName(
    player.name,
    player.email,
  );

  const theme = podiumThemes[place];

  return (
    <div className="relative">
      <div
        className={`absolute inset-[-10px] rounded-full ${theme.glow} blur-xl`}
      />

      <div
        className={`relative rounded-full bg-gradient-to-br p-[3px] ${theme.avatarRing}`}
      >
        <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#667781]">
          {player.avatar ? (
            <img
              src={player.avatar}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-medium text-white">
              {getPlayerInitials(displayName)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function RankMedallion({
  place,
}: {
  place: 1 | 2 | 3;
}) {
  const theme = podiumThemes[place];

  return (
    <div
      className={`absolute -bottom-4 left-1/2 z-30 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border ${theme.rankBorder} ${theme.rankBg} ${theme.accent}`}
    >
      <span className="text-xs font-black">
        {place}
      </span>
    </div>
  );
}

function BadgeIcons({
  badges,
}: {
  badges: HuntBadgeId[];
}) {
  if (!badges?.length) {
    return (
      <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-zinc-700">
        No badges
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {badges.slice(0, 4).map((badge) => {
        const meta = getHuntBadgeMeta(badge);

        return (
          <div
            key={badge}
            title={meta.label}
            className={`flex h-6 w-6 items-center justify-center rounded-full border ${meta.ringClassName} ${meta.bgClassName}`}
          >
            {meta.icon}
          </div>
        );
      })}

      {badges.length > 4 ? (
        <span className="ml-1 text-[8px] font-black text-zinc-500">
          +{badges.length - 4}
        </span>
      ) : null}
    </div>
  );
}

function PodiumLighting({
  place,
}: {
  place: 1 | 2 | 3;
}) {
  const theme = podiumThemes[place];

  return (
    <>
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full ${theme.glow} blur-[65px]`}
      />

      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-[90%] -translate-x-1/2 rounded-full bg-violet-600/[0.13] blur-[55px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-violet-500/[0.07] blur-[40px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-fuchsia-500/[0.05] blur-[40px]" />
    </>
  );
}

function PodiumTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      <div className="absolute left-[-20%] top-[35%] h-px w-[140%] rotate-[-18deg] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent" />

      <div className="absolute left-[-20%] top-[62%] h-px w-[140%] rotate-[15deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />

      <div className="absolute left-[25%] top-[-20%] h-[140%] w-px rotate-[28deg] bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />

      <div className="absolute left-[17%] top-[25%] h-1 w-1 rounded-full bg-white/20" />

      <div className="absolute right-[21%] top-[38%] h-1 w-1 rounded-full bg-white/15" />

      <div className="absolute left-[36%] bottom-[25%] h-1 w-1 rounded-full bg-white/10" />

      <div className="absolute right-[33%] bottom-[32%] h-1 w-1 rounded-full bg-white/15" />
    </div>
  );
}

function PodiumCard({
  player,
  place,
}: {
  player: LeaderboardPlayer;
  place: 1 | 2 | 3;
}) {
  const theme = podiumThemes[place];

  const displayName = formatLeaderboardName(
    player.name,
    player.email,
  );

  return (
    <div
      className={`group relative h-[330px] w-full overflow-visible rounded-[22px] border bg-gradient-to-b ${theme.card} ${theme.border} shadow-[0_0_55px_rgba(124,58,237,0.07)]`}
    >
      <PodiumLighting place={place} />

      <PodiumTexture />

      <div className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/[0.025]" />

      <div className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {place === 1 ? (
        <div className="absolute -top-[46px] left-1/2 z-40 -translate-x-1/2">
          <div className="absolute inset-[-15px] rounded-full bg-amber-400/[0.10] blur-xl" />

          <Crown
            size={30}
            strokeWidth={1.5}
            className="relative text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"
            fill="currentColor"
          />
        </div>
      ) : null}

      <div className="absolute -top-[39px] left-1/2 z-30 -translate-x-1/2">
        <PlayerAvatar
          player={player}
          place={place}
        />

        <RankMedallion place={place} />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-4 pt-[51px] text-center">
        <div className="flex items-center gap-1.5">
          {place === 1 ? (
            <Crown
              size={10}
              className={theme.accent}
            />
          ) : (
            <Medal
              size={10}
              className={theme.accent}
            />
          )}

          <span
            className={`text-[7px] font-black uppercase tracking-[0.28em] ${theme.accent}`}
          >
            {theme.label}
          </span>
        </div>

        <p className="mt-3 max-w-[220px] truncate text-[15px] font-black tracking-tight text-white">
          {displayName}
        </p>

        <p className="mt-0.5 max-w-[220px] truncate text-[8px] text-zinc-600">
          {player.email}
        </p>

        <div className="mt-4">
          <div
            className={`font-black tabular-nums ${theme.accent} ${
              place === 1
                ? "text-[25px]"
                : "text-[23px]"
            }`}
          >
            {formatNumber(player.totalXp)}

            <span className="ml-1.5 text-[8px] font-bold uppercase tracking-wider text-zinc-600">
              XP
            </span>
          </div>

          <p className="mt-1 text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600">
            {formatNumber(
              player.huntsCompleted,
            )}{" "}
            hunt
            {player.huntsCompleted === 1
              ? ""
              : "s"}{" "}
            completed
          </p>
        </div>

        <div className="mt-4 h-px w-[58%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="mt-3">
          <BadgeIcons badges={player.badges} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-[22px]">
          <div className="h-12 bg-gradient-to-t from-violet-600/[0.13] to-transparent" />

          <div className="absolute bottom-0 left-1/2 h-px w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
      />
    </div>
  );
}

function HuntPodium({
  players,
}: {
  players: LeaderboardPlayer[];
}) {
  const first =
    players.find((player) => player.rank === 1) ??
    null;

  const second =
    players.find((player) => player.rank === 2) ??
    null;

  const third =
    players.find((player) => player.rank === 3) ??
    null;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.055] bg-[#07070A] px-5 pb-7 pt-16 sm:px-7 lg:px-9">
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.045] blur-[110px]" />

      <div className="pointer-events-none absolute bottom-[-150px] left-1/2 h-[300px] w-[750px] -translate-x-1/2 rounded-full bg-purple-700/[0.035] blur-[100px]" />

      <div className="pointer-events-none absolute left-[3%] top-[30%] h-28 w-28 rounded-full border border-violet-400/[0.03]" />

      <div className="pointer-events-none absolute right-[4%] top-[40%] h-36 w-36 rounded-full border border-violet-400/[0.025]" />

      <div className="relative z-10 mx-auto hidden max-w-[980px] lg:block">
        <div className="grid grid-cols-3 items-end gap-7 xl:gap-9">
          <div className="translate-y-7">
            {second ? (
              <PodiumCard
                player={second}
                place={2}
              />
            ) : (
              <EmptyPodiumCard place={2} />
            )}
          </div>

          <div className="relative z-20">
            {first ? (
              <PodiumCard
                player={first}
                place={1}
              />
            ) : (
              <EmptyPodiumCard place={1} />
            )}
          </div>

          <div className="translate-y-11">
            {third ? (
              <PodiumCard
                player={third}
                place={3}
              />
            ) : (
              <EmptyPodiumCard place={3} />
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-14 lg:hidden">
        {first ? (
          <PodiumCard
            player={first}
            place={1}
          />
        ) : null}

        {second ? (
          <PodiumCard
            player={second}
            place={2}
          />
        ) : null}

        {third ? (
          <PodiumCard
            player={third}
            place={3}
          />
        ) : null}
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />

        <div className="flex items-center gap-1.5">
          <Sparkles
            size={8}
            className="text-violet-400/50"
          />

          <span className="text-[6px] font-black uppercase tracking-[0.28em] text-zinc-700">
            Every hunt changes the map
          </span>

          <Sparkles
            size={8}
            className="text-violet-400/50"
          />
        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY PODIUM
========================================================= */

function EmptyPodiumCard({
  place,
}: {
  place: 1 | 2 | 3;
}) {
  const theme = podiumThemes[place];

  return (
    <div
      className={`relative h-[330px] w-full overflow-hidden rounded-[22px] border bg-gradient-to-b ${theme.card} ${theme.border} opacity-60`}
    >
      <div
        className={`absolute left-1/2 top-[70px] h-20 w-20 -translate-x-1/2 rounded-full ${theme.glow} blur-2xl`}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full border ${theme.rankBorder} ${theme.rankBg}`}
        >
          <span
            className={`text-xl font-black ${theme.accent}`}
          >
            ?
          </span>
        </div>

        <span
          className={`mt-5 text-[7px] font-black uppercase tracking-[0.28em] ${theme.accent}`}
        >
          {theme.label}
        </span>

        <span className="mt-2 text-[8px] text-zinc-700">
          Awaiting adventurer
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   LOWER RANK CARD
========================================================= */

type LowerRank = 4 | 5 | 6 | 7 | 8 | 9 | 10;

function LowerRankCard({
  rank,
  player,
  currentPlayer,
}: {
  rank: LowerRank;
  player: LeaderboardPlayer | null;
  currentPlayer: LeaderboardPlayer | null;
}) {
  const isCurrent =
    !!player &&
    currentPlayer?.userId === player.userId;

  /*
   * Each lower rank gets a subtle hunt-theme accent.
   * No fake player data is created.
   */
  const rankThemes: Record<
    LowerRank,
    {
      border: string;
      glow: string;
      text: string;
    }
  > = {
    4: {
      border: "border-cyan-400/20",
      glow: "bg-cyan-400/[0.025]",
      text: "text-cyan-300",
    },
    5: {
      border: "border-violet-400/20",
      glow: "bg-violet-400/[0.025]",
      text: "text-violet-300",
    },
    6: {
      border: "border-orange-400/20",
      glow: "bg-orange-400/[0.025]",
      text: "text-orange-300",
    },
    7: {
      border: "border-emerald-400/20",
      glow: "bg-emerald-400/[0.025]",
      text: "text-emerald-300",
    },
    8: {
      border: "border-fuchsia-400/20",
      glow: "bg-fuchsia-400/[0.025]",
      text: "text-fuchsia-300",
    },
    9: {
      border: "border-sky-400/20",
      glow: "bg-sky-400/[0.025]",
      text: "text-sky-300",
    },
    10: {
      border: "border-amber-400/20",
      glow: "bg-amber-400/[0.025]",
      text: "text-amber-300",
    },
  };
  const theme = rankThemes[rank];

  /* =========================
     REAL PLAYER
  ========================= */

  if (player) {
    const displayName =
      formatLeaderboardName(
        player.name,
        player.email,
      );

    return (
      <div
        className={`group relative overflow-hidden border-b border-white/[0.045] last:border-0 ${
          isCurrent
            ? "bg-violet-500/[0.055]"
            : theme.glow
        }`}
      >
        {isCurrent ? (
          <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-violet-400" />
        ) : null}

        <div className="flex min-h-[68px] items-center gap-4 px-4 sm:px-6">
          {/* rank */}

          <div className="flex w-9 shrink-0 justify-center">
            <span
              className={`text-sm font-black tabular-nums ${
                isCurrent
                  ? "text-violet-300"
                  : theme.text
              }`}
            >
              {String(rank).padStart(2, "0")}
            </span>
          </div>

          {/* player */}

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#687981]">
              {player.avatar ? (
                <img
                  src={player.avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[11px] font-medium text-white">
                  {getPlayerInitials(
                    displayName,
                  )}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-xs font-bold text-white sm:text-sm">
                  {displayName}
                </p>

                {isCurrent ? (
                  <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-400/10 px-1.5 py-0.5 text-[6px] font-black uppercase tracking-wider text-violet-300">
                    You
                  </span>
                ) : null}
              </div>

              <p className="mt-0.5 truncate text-[8px] text-zinc-600">
                {player.email}
              </p>
            </div>
          </div>

          {/* badges */}

          <div className="hidden w-[130px] justify-center md:flex">
            <BadgeIcons
              badges={player.badges}
            />
          </div>

          {/* hunts */}

          <div className="hidden w-[65px] text-right sm:block">
            <p className="text-xs font-bold text-zinc-300">
              {formatNumber(
                player.huntsCompleted,
              )}
            </p>

            <p className="mt-0.5 text-[6px] font-black uppercase tracking-wider text-zinc-700">
              Hunts
            </p>
          </div>

          {/* XP */}

          <div className="w-[75px] text-right">
            <p className="text-sm font-black tabular-nums text-white">
              {formatNumber(
                player.totalXp,
              )}
            </p>

            <p className="mt-0.5 text-[6px] font-bold uppercase tracking-[0.18em] text-zinc-600">
              XP
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-transparent transition-all duration-300 group-hover:w-full" />
      </div>
    );
  }

  /* =========================
     EMPTY RANK
     
     This is NOT fake data.
     It simply reserves the ranking
     position until a real player
     reaches it.
  ========================= */

  return (
    <div
      className={`relative min-h-[68px] border-b border-white/[0.045] last:border-0 ${theme.glow}`}
    >
      <div className="flex min-h-[68px] items-center gap-4 px-4 opacity-70 sm:px-6">
        <div className="flex w-9 shrink-0 justify-center">
          <span
            className={`text-sm font-black tabular-nums ${theme.text}`}
          >
            {String(rank).padStart(2, "0")}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${theme.border} bg-white/[0.015]`}
          >
            <span className="text-[11px] text-zinc-700">
              ?
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-700">
              Awaiting adventurer
            </p>

            <p className="mt-0.5 text-[7px] uppercase tracking-[0.18em] text-zinc-800">
              Complete a hunt to climb here
            </p>
          </div>
        </div>

        <div className="hidden w-[130px] justify-center md:flex">
          <div className="flex items-center gap-1">
            <span className="h-5 w-5 rounded-full border border-white/[0.04]" />
            <span className="h-5 w-5 rounded-full border border-white/[0.04]" />
          </div>
        </div>

        <div className="hidden w-[65px] text-right sm:block">
          <span className="text-xs font-bold text-zinc-800">
            —
          </span>
        </div>

        <div className="w-[75px] text-right">
          <span className="text-sm font-black text-zinc-800">
            —
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RANKS 4 → 10
========================================================= */

function LowerLeaderboard({
  players,
  currentPlayer,
}: {
  players: LeaderboardPlayer[];
  currentPlayer: LeaderboardPlayer | null;
}) {
  /*
   * IMPORTANT:
   *
   * We ALWAYS render 4 through 10.
   *
   * If the backend has a real player at that rank,
   * we show the real player.
   *
   * If not, we show an empty "Awaiting adventurer"
   * position instead of inventing fake users.
   */

  const playerByRank = new Map(
    players.map((player) => [
      player.rank,
      player,
    ]),
  );

  const ranks = [4, 5, 6, 7, 8, 9, 10] as const;

  return (
    <div className="mt-8">
      {/* heading */}

      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <Trophy
              size={13}
              className="text-violet-300"
            />

            <h2 className="text-sm font-black text-zinc-200">
              All Adventurers
            </h2>
          </div>

          <p className="mt-1 text-[8px] text-zinc-700">
            The next explorers on the hunt
          </p>
        </div>

        {currentPlayer ? (
          <div className="text-right">
            <p className="text-[6px] font-black uppercase tracking-[0.2em] text-zinc-700">
              Your position
            </p>

            <p className="mt-0.5 text-sm font-black text-violet-300">
              #{currentPlayer.rank}
            </p>
          </div>
        ) : null}
      </div>

      {/* leaderboard */}

      <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0A0A0D] shadow-[0_15px_60px_rgba(0,0,0,0.25)]">
        {/* top header */}

        <div className="hidden h-10 items-center border-b border-white/[0.06] bg-white/[0.012] px-4 sm:flex sm:px-6">
          <div className="w-9 text-center">
            <span className="text-[6px] font-black uppercase tracking-[0.25em] text-zinc-700">
              Rank
            </span>
          </div>

          <div className="ml-4 flex-1">
            <span className="text-[6px] font-black uppercase tracking-[0.25em] text-zinc-700">
              Adventurer
            </span>
          </div>

          <div className="hidden w-[130px] text-center md:block">
            <span className="text-[6px] font-black uppercase tracking-[0.25em] text-zinc-700">
              Badges
            </span>
          </div>

          <div className="hidden w-[65px] text-right sm:block">
            <span className="text-[6px] font-black uppercase tracking-[0.25em] text-zinc-700">
              Hunts
            </span>
          </div>

          <div className="w-[75px] text-right">
            <span className="text-[6px] font-black uppercase tracking-[0.25em] text-zinc-700">
              XP
            </span>
          </div>
        </div>

        {/* 4 → 10 */}

        {ranks.map((rank) => (
          <LowerRankCard
            key={rank}
            rank={rank}
            player={
              playerByRank.get(rank) ??
              null
            }
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-white/[0.04]" />

      <div className="mx-auto h-3 w-80 max-w-full animate-pulse rounded bg-white/[0.025]" />

      <div className="h-[500px] animate-pulse rounded-[28px] border border-white/[0.04] bg-white/[0.015]" />

      <div className="h-[500px] animate-pulse rounded-[20px] border border-white/[0.04] bg-white/[0.015]" />
    </div>
  );
}

/* =========================================================
   MAIN LEADERBOARD
========================================================= */

export default function Leaderboard() {
  const {
    data,
    error,
    isLoading,
    refetch,
  } = useGetLeaderboard();

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void refetch();
    }, 15_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [refetch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] px-6 py-16 text-center">
        <Trophy
          size={26}
          className="mx-auto text-red-400/60"
        />

        <p className="mt-4 text-sm font-black text-zinc-300">
          Unable to load leaderboard
        </p>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-violet-400/20 hover:text-white disabled:opacity-50"
        >
          <RefreshCw
            size={12}
            className={
              isRefreshing
                ? "animate-spin"
                : ""
            }
          />

          Try again
        </button>
      </div>
    );
  }

  const players = data?.players ?? [];

  const currentPlayer =
    data?.currentPlayer ?? null;

  return (
    <section className="relative">
      {/* background atmosphere */}

      <div className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.03] blur-[110px]" />

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="relative mb-7 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.04] px-3.5 py-1">
          <Gem
            size={10}
            className="text-violet-300"
          />

          <span className="text-[7px] font-black uppercase tracking-[0.3em] text-violet-300">
            Hall of Adventurers
          </span>
        </div>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Top{" "}
          <span className="text-violet-400">
            Adventurers
          </span>
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-[11px] text-zinc-600 sm:text-xs">
          Complete hunts, earn XP, collect
          badges, and climb your way to the top.
        </p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
            <Users
              size={9}
              className="text-zinc-600"
            />

            <span className="text-[7px] font-bold text-zinc-500">
              {players.length} player
              {players.length === 1
                ? ""
                : "s"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[7px] font-bold text-zinc-500 transition hover:border-violet-400/20 hover:text-violet-300 disabled:opacity-50"
          >
            <RefreshCw
              size={9}
              className={
                isRefreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </header>

      {/* ===================================================
          1 / 2 / 3 PODIUM
      =================================================== */}

      <HuntPodium players={players} />

      {/* ===================================================
          4 / 5 / 6 / 7 / 8 / 9 / 10
      =================================================== */}

      <LowerLeaderboard
        players={players}
        currentPlayer={currentPlayer}
      />
    </section>
  );
}