"use client";

import { useMemo } from "react";

const CONFETTI_COLORS = [
  "#fbbf24",
  "#a78bfa",
  "#34d399",
  "#f472b6",
  "#60a5fa",
  "#f97316",
];

type Particle = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: string;
  rotation: string;
};

export default function CelebrationConfetti({
  count = 48,
}: {
  count?: number;
}) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      left: `${(index * 97) % 100}%`,
      delay: `${(index % 12) * 0.08}s`,
      duration: `${2.4 + (index % 5) * 0.35}s`,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length]!,
      size:
        index % 3 === 0
          ? "10px"
          : index % 3 === 1
            ? "8px"
            : "6px",
      rotation: `${(index * 47) % 360}deg`,
    }));
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute top-[-12px] animate-[confettiFall_linear_both]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            transform: `rotate(${particle.rotation})`,
            borderRadius: particle.id % 2 === 0 ? "9999px" : "2px",
          }}
        />
      ))}
    </div>
  );
}
