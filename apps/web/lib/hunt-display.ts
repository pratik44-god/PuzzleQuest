import type { Hunt } from "~/components/discover/discover-hunts";
import {
  DEFAULT_HUNT_TAG,
  HUNT_TAG_FROM_API,
  type HuntTagApi,
} from "~/lib/hunt-tags";

export type ApiHunt = {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: "DRAFT" | "PUBLISHED";
  tag?: "ADVENTURE" | "MYSTERY" | "PIRATES" | "FANTASY";
  playCount?: number;
  createdAt: Date | string | null;
  creatorId?: string | null;
  creatorName?: string | null;
  creatorEmail?: string | null;
  creatorAvatar?: string | null;
  questionCount?: number;
  hintCount?: number;
};

const difficultyLabels: Record<
  ApiHunt["difficulty"],
  Hunt["difficulty"]
> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const difficultyAccents: Record<
  ApiHunt["difficulty"],
  string
> = {
  EASY: "from-emerald-600/80 to-green-950",
  MEDIUM: "from-violet-600/80 to-indigo-950",
  HARD: "from-rose-600/80 to-red-950",
};

function formatCreatedDate(createdAt: Date | string | null) {
  if (!createdAt) {
    return "New";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "New";
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()] ?? "Jan";
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function formatHuntCreatedDate(
  createdAt: Date | string | null | undefined,
) {
  if (!createdAt) {
    return "--";
  }

  return formatCreatedDate(createdAt);
}

export function formatCreatorHandle(
  email?: string | null,
  fullName?: string | null,
) {
  if (email) {
    const localPart = email.split("@")[0] ?? "creator";

    return localPart.replace(/\./g, "_").toLowerCase();
  }

  if (fullName) {
    return fullName.toLowerCase().replace(/\s+/g, "_");
  }

  return "creator";
}

export function mapApiHuntToDisplay(hunt: ApiHunt): Hunt {
  const createdLabel = formatCreatedDate(hunt.createdAt);
  const tagLabel = hunt.tag
    ? HUNT_TAG_FROM_API[hunt.tag as HuntTagApi]
    : DEFAULT_HUNT_TAG;
  const creatorName = hunt.creatorName ?? "Creator";
  const creatorHandle = formatCreatorHandle(
    hunt.creatorEmail,
    hunt.creatorName,
  );

  return {
    id: hunt.id,
    title: hunt.title,
    description: hunt.description,
    image: hunt.image,
    difficulty: difficultyLabels[hunt.difficulty],
    status: hunt.status,
    accent: difficultyAccents[hunt.difficulty],
    questionCount: hunt.questionCount ?? 0,
    hintCount: hunt.hintCount ?? 0,
    playCount: hunt.playCount ?? 0,
    creatorName,
    creatorHandle,
    creatorId: hunt.creatorId ?? null,
    creatorAvatar: hunt.creatorAvatar ?? null,
    createdAt: hunt.createdAt,
    time: createdLabel,
    players: String(hunt.playCount ?? 0),
    category: tagLabel,
    rating: "—",
  };
}
