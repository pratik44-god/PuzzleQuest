"use client";

import HuntCard from "./PublishedHuntCard";
import type { Hunt } from "~/components/discover/discover-hunts";

type PublishedHuntCardProps = {
  hunt: Hunt;
  index?: number;
  showActions?: boolean;
};

export default function PublishedHuntCard({
  hunt,
  index = 0,
  showActions = true,
}: PublishedHuntCardProps) {
  return (
    <HuntCard
      hunt={hunt}
      variant="published"
      index={index}
      showActions={showActions}
    />
  );
}
