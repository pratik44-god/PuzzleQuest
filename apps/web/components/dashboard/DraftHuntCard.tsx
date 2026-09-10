"use client";

import HuntCard from "./PublishedHuntCard";
import type { Hunt } from "~/components/discover/discover-hunts";

type DraftHuntCardProps = {
  hunt: Hunt;
  index?: number;
};

export default function DraftHuntCard({
  hunt,
  index = 0,
}: DraftHuntCardProps) {
  return (
    <HuntCard
      hunt={hunt}
      variant="draft"
      index={index}
      showActions
    />
  );
}
