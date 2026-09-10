"use client";

import ProtectedButton from "~/components/auth/ProtectedButton";
import Button from "~/components/ui/buttton";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <ProtectedButton
        href="/login"
        variant="primary"
        size="lg"
        className="
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_12px_35px_rgba(139,92,246,0.25)]
        "
      >
        Create a Hunt
      </ProtectedButton>

      <Button
        variant="secondary"
        size="lg"
        href="/discover"
        className="
          transition-all duration-300
          hover:-translate-y-1
          hover:border-violet-400/30
        "
      >
        Explore Hunts
      </Button>
    </div>
  );
}