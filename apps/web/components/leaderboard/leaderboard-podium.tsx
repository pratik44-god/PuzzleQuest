import type { HuntBadgeId } from "~/lib/hunt-badges";
import {
  formatLeaderboardName,
  getHuntBadgeMeta,
  getPlayerInitials,
} from "~/lib/hunt-badges";
import { formatNumber } from "~/lib/utils";

export type LeaderboardPlayer = {
  userId: string;
  rank: number;
  name: string;
  email: string;
  avatar: string | null;
  totalXp: number;
  huntsCompleted: number;
  badge: HuntBadgeId | null;
  badges: HuntBadgeId[];
};

const rankConfig = {
  1: {
    label: "CHAMPION",
    accent: "text-amber-300",
    border: "border-amber-400/30",
    background: "bg-amber-400/[0.045]",
    glow: "bg-amber-400/[0.08]",
  },
  2: {
    label: "RUNNER UP",
    accent: "text-zinc-200",
    border: "border-zinc-300/20",
    background: "bg-white/[0.025]",
    glow: "bg-white/[0.04]",
  },
  3: {
    label: "THIRD PLACE",
    accent: "text-orange-300",
    border: "border-orange-400/20",
    background: "bg-orange-400/[0.025]",
    glow: "bg-orange-400/[0.045]",
  },
} as const;

function PlayerAvatar({
  player,
  rank,
}: {
  player: LeaderboardPlayer;
  rank: number;
}) {
  const displayName = formatLeaderboardName(player.name, player.email);

  return (
    <div className="relative shrink-0">
      <div
        className={`absolute inset-0 rounded-full blur-2xl ${
          rank === 1 ? "bg-amber-400/20" : "bg-violet-500/10"
        }`}
      />

      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-full border-2 bg-[#111114] ${
          rank === 1
            ? "h-24 w-24 border-amber-300/50 sm:h-28 sm:w-28"
            : "h-18 w-18 border-white/10 sm:h-20 sm:w-20"
        }`}
      >
        {player.avatar ? (
          <img
            src={player.avatar}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={`font-black ${
              rank === 1
                ? "text-2xl text-amber-200"
                : "text-lg text-zinc-300"
            }`}
          >
            {getPlayerInitials(displayName)}
          </span>
        )}
      </div>

      <div
        className={`absolute -bottom-2 left-1/2 flex h-7 min-w-7 -translate-x-1/2 items-center justify-center rounded-full border px-2 text-[10px] font-black ${
          rank === 1
            ? "border-amber-400/40 bg-amber-400 text-black"
            : rank === 2
              ? "border-zinc-300/30 bg-zinc-200 text-black"
              : "border-orange-400/30 bg-orange-400 text-black"
        }`}
      >
        #{rank}
      </div>
    </div>
  );
}

function Badge({ badge }: { badge: HuntBadgeId }) {
  const meta = getHuntBadgeMeta(badge);

  return (
    <span
      title={meta.label}
      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${meta.ringClassName} ${meta.bgClassName}`}
    >
      {meta.icon}
    </span>
  );
}

function ChampionCard({
  player,
}: {
  player: LeaderboardPlayer;
}) {
  const displayName = formatLeaderboardName(player.name, player.email);
  const config =
    rankConfig[player.rank as keyof typeof rankConfig] ?? rankConfig[3];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${config.border} ${config.background} p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.045]`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${config.glow} blur-3xl`}
      />

      <div className="relative flex items-center gap-4">
        <PlayerAvatar player={player} rank={player.rank} />

        <div className="min-w-0 flex-1">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.22em] ${config.accent}`}
          >
            {config.label}
          </p>

          <h3 className="mt-1 truncate text-sm font-bold text-white sm:text-base">
            {displayName}
          </h3>

          <p className="mt-1 text-xs text-zinc-600">
            {player.huntsCompleted} hunt
            {player.huntsCompleted === 1 ? "" : "s"} completed
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-end justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            Total XP
          </p>

          <p
            className={`mt-1 text-2xl font-black ${
              player.rank === 1 ? "text-amber-300" : "text-white"
            }`}
          >
            {formatNumber(player.totalXp)}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {player.badges.slice(0, 3).map((badge) => (
            <Badge key={badge} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPodium({
  players,
}: {
  players: LeaderboardPlayer[];
}) {
  const topThree = players
    .filter((player) => player.rank <= 3)
    .sort((a, b) => a.rank - b.rank);

  if (!topThree.length) {
    return null;
  }

  const first = topThree.find((player) => player.rank === 1);
  const second = topThree.find((player) => player.rank === 2);
  const third = topThree.find((player) => player.rank === 3);

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-violet-400">
            Current leaders
          </p>

          <h2 className="mt-1 text-lg font-black text-white">
            The elite three
          </h2>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-600">
            Ranking metric
          </p>
          <p className="mt-1 text-xs font-semibold text-zinc-400">
            Total XP
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr_1fr]">
        {first ? <ChampionCard player={first} /> : null}
        {second ? <ChampionCard player={second} /> : null}
        {third ? <ChampionCard player={third} /> : null}
      </div>
    </div>
  );
}