"use client";

import { useRouter } from "next/navigation";
import { Clock3, Star, Users } from "lucide-react";

import Card from "~/components/ui/cardd";

type HuntCardProps = {
  id?: string;
  title: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: string;
  players: string;
  time: string;
  onClick?: () => void | Promise<void>;
};

export default function HuntCard({
  id,
  title,
  image,
  difficulty,
  rating,
  players,
  time,
  onClick,
}: HuntCardProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (onClick) {
      await onClick();
      return;
    }

    if (id) {
      router.push(`/hunts/${id}`);
    }
  };

  return (
    <Card
      className="
        group overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-500/30
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
      "
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={!id && !onClick}
        className="block w-full text-left"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <span
            className="
              absolute left-4 top-4 rounded-full
              border border-white/10
              bg-violet-600/90
              px-3 py-1
              text-xs font-semibold text-white
              backdrop-blur
            "
          >
            {difficulty}
          </span>

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-violet-100">
              {title}
            </h3>

            {id ? (
              <p className="mt-1 text-xs text-zinc-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore hunt →
              </p>
            ) : null}
          </div>
        </div>
      </button>

      <div className="grid grid-cols-3 border-t border-white/10">
        <div className="flex flex-col items-center py-5">
          <Star
            className="mb-2 fill-yellow-400 text-yellow-400"
            size={20}
          />

          <span className="font-semibold text-white">
            {rating}
          </span>

          <span className="text-xs text-zinc-500">
            Rating
          </span>
        </div>

        <div className="flex flex-col items-center border-x border-white/10 py-5">
          <Users
            className="mb-2 text-cyan-400"
            size={20}
          />

          <span className="font-semibold text-white">
            {players}
          </span>

          <span className="text-xs text-zinc-500">
            Players
          </span>
        </div>

        <div className="flex flex-col items-center py-5">
          <Clock3
            className="mb-2 text-emerald-400"
            size={20}
          />

          <span className="font-semibold text-white">
            {time}
          </span>

          <span className="text-xs text-zinc-500">
            Avg Time
          </span>
        </div>
      </div>
    </Card>
  );
}