"use client"

import {
  Trophy,
  Users,
  Map,
  Star,
} from "lucide-react";

import Container from "~/components/ui/container";
import SectionTitle from "~/components/ui/section-title";
import StatCard from "~/components/ui/stat-card";

const STATS = [
  {
    icon: Map,
    value: "120+",
    label: "Treasure Hunts",
  },
  {
    icon: Users,
    value: "25K+",
    label: "Players",
  },
  {
    icon: Trophy,
    value: "850+",
    label: "Rewards Earned",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
  },
];

export default function Stats() {
  return (
    <section className="py-28">
      <Container>
        <SectionTitle
          badge="Community"
          title="Trusted By Explorers"
          description="Join thousands of players creating and solving treasure hunts every day."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              index={index}
              {...stat}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}