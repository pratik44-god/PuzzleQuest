"use client";

import HuntCard from "./PublishedHuntCard";
import type { Hunt } from "~/components/discover/discover-hunts";

type DashboardHuntCardProps = {
  hunt: Hunt;
  variant: "draft" | "published";
  index?: number;
  showActions?: boolean;
};

export default function DashboardHuntCard({
  hunt,
  variant,
  index = 0,
  showActions = true,
}: DashboardHuntCardProps) {
  return (
    <HuntCard
      hunt={hunt}
      variant={variant}
      index={index}
      showActions={showActions}
    />
  );
}
