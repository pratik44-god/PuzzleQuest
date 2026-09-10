export const HUNT_BADGE_IDS = [
  "EXPLORER",
  "PATHFINDER",
  "TREASURE_HUNTER",
  "LEGEND",
] as const;

export type HuntBadgeId = (typeof HUNT_BADGE_IDS)[number];

export type HuntBadgeMeta = {
  label: string;
  description: string;
  ringClassName: string;
  bgClassName: string;
  textClassName: string;
  icon: string;
};

export const HUNT_BADGE_META: Record<HuntBadgeId, HuntBadgeMeta> = {
  EXPLORER: {
    label: "Explorer",
    description: "Completed your first treasure hunt.",
    ringClassName: "border-cyan-500/30",
    bgClassName: "bg-cyan-500/10",
    textClassName: "text-cyan-300",
    icon: "🧭",
  },
  PATHFINDER: {
    label: "Pathfinder",
    description: "Solved a hunt with multiple clues.",
    ringClassName: "border-emerald-500/30",
    bgClassName: "bg-emerald-500/10",
    textClassName: "text-emerald-300",
    icon: "🗺️",
  },
  TREASURE_HUNTER: {
    label: "Treasure Hunter",
    description: "Conquered a challenging hunt.",
    ringClassName: "border-amber-500/30",
    bgClassName: "bg-amber-500/10",
    textClassName: "text-amber-300",
    icon: "🏆",
  },
  LEGEND: {
    label: "Legend",
    description: "Mastered a hard hunt like a true adventurer.",
    ringClassName: "border-violet-500/30",
    bgClassName: "bg-violet-500/10",
    textClassName: "text-violet-300",
    icon: "👑",
  },
};

export function getHuntBadgeMeta(badge: HuntBadgeId) {
  return HUNT_BADGE_META[badge];
}

export function formatLeaderboardName(
  name: string,
  email: string,
) {
  if (name.trim()) {
    return name.trim();
  }

  const localPart = email.split("@")[0] ?? "Adventurer";
  return localPart.replace(/\./g, "_");
}

export function getPlayerInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return `${parts[0]!.charAt(0)}${parts[1]!.charAt(0)}`.toUpperCase();
}
