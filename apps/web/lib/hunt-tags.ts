export const HUNT_TAGS = [
  "Adventure",
  "Mystery",
  "Pirates",
  "Fantasy",
] as const;

export type HuntTagLabel = (typeof HUNT_TAGS)[number];

export const DISCOVER_TAG_FILTERS = ["All", ...HUNT_TAGS] as const;

export type HuntTagApi =
  | "ADVENTURE"
  | "MYSTERY"
  | "PIRATES"
  | "FANTASY";

export const HUNT_TAG_TO_API: Record<HuntTagLabel, HuntTagApi> = {
  Adventure: "ADVENTURE",
  Mystery: "MYSTERY",
  Pirates: "PIRATES",
  Fantasy: "FANTASY",
};

export const HUNT_TAG_FROM_API: Record<HuntTagApi, HuntTagLabel> = {
  ADVENTURE: "Adventure",
  MYSTERY: "Mystery",
  PIRATES: "Pirates",
  FANTASY: "Fantasy",
};

export const DEFAULT_HUNT_TAG: HuntTagLabel = "Adventure";

export function formatTagDisplay(tag: HuntTagLabel) {
  return tag.toLowerCase();
}
