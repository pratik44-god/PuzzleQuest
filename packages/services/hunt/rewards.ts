export const HUNT_BADGES = [
  "EXPLORER",
  "PATHFINDER",
  "TREASURE_HUNTER",
  "LEGEND",
] as const;

export type HuntBadge = (typeof HUNT_BADGES)[number];

const DIFFICULTY_MULTIPLIER = {
  EASY: 1,
  MEDIUM: 1.5,
  HARD: 2,
} as const;

export function calculateHuntReward(
  difficulty: "EASY" | "MEDIUM" | "HARD",
  questionCount: number,
) {
  const safeQuestionCount = Math.max(questionCount, 1);
  const score = safeQuestionCount * 100;
  const xpEarned = Math.round(
    safeQuestionCount * 100 * DIFFICULTY_MULTIPLIER[difficulty],
  );

  let badge: HuntBadge = "EXPLORER";

  if (difficulty === "HARD" && safeQuestionCount >= 3) {
    badge = "LEGEND";
  } else if (
    difficulty === "HARD" ||
    (difficulty === "MEDIUM" && safeQuestionCount >= 4)
  ) {
    badge = "TREASURE_HUNTER";
  } else if (difficulty === "MEDIUM" || safeQuestionCount >= 3) {
    badge = "PATHFINDER";
  }

  return {
    score,
    xpEarned,
    badge,
  };
}

const BADGE_RANK: Record<HuntBadge, number> = {
  EXPLORER: 1,
  PATHFINDER: 2,
  TREASURE_HUNTER: 3,
  LEGEND: 4,
};

export function getHighestBadge(badges: HuntBadge[]) {
  if (badges.length === 0) {
    return null;
  }

  return badges.reduce((highest, badge) =>
    BADGE_RANK[badge] > BADGE_RANK[highest] ? badge : highest,
  );
}

export function getUniqueBadges(badges: HuntBadge[]) {
  return HUNT_BADGES.filter((badge) => badges.includes(badge));
}
