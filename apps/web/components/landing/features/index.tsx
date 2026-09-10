import {
  Compass,
  Flag,
  Map,
  Trophy,
} from "lucide-react";

import SectionTitle from "~/components/ui/section-title";
import Container from "~/components/ui/container";

import FeatureCard from "./feature-card";

const FEATURES = [
  {
    icon: Map,
    title: "Create Hunts",
    description:
      "Design multi-level treasure hunts with clues, passwords, images and rewards.",
    href: "/learn/create-hunt-info",
  },
  {
    icon: Compass,
    title: "Explore Adventures",
    description:
      "Play community treasure hunts and solve challenging puzzles with friends.",
    href: "/learn/explore-hunt-info",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description:
      "Compete against explorers around the world and unlock exclusive achievements.",
    href: "/leaderboard",
  },
  {
    icon: Flag,
    title: "Track Progress",
    description:
      "Monitor hunt completion, player statistics and performance in real time.",
    href: "/learn/track-progress",
  },
];

export default function Features() {
  return (
    <section className="py-28">
      <Container>
        <SectionTitle
          badge="Features"
          title="Everything You Need"
          description="Powerful tools for creators and exciting adventures for explorers."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}