import { Star } from "lucide-react";

export default function HeroTrust() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

        <span className="font-semibold text-white">
          4.9 Rating
        </span>
      </div>

      <div>
        <span className="text-xl font-bold text-white">
          25K+
        </span>

        <span className="ml-2 text-zinc-400">
          Players
        </span>
      </div>

      <div>
        <span className="text-xl font-bold text-white">
          120+
        </span>

        <span className="ml-2 text-zinc-400">
          Hunts
        </span>
      </div>
    </div>
  );
}
