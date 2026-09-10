import {
  Award,
  MapPinned,
  Star,
  Users,
} from "lucide-react";

import Card from "~/components/ui/cardd";

export default function HeroPreviewCard() {

  const handlePlayPreview = () => {
  console.log("Play Preview Hunt");
};

  return (
    <Card className="relative w-full max-w-md overflow-hidden p-6">
      {/* Header */}
      <div className="relative">
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          Featured Hunt
        </span>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Mystery of the Lost Temple
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Ancient Temple • Jungle Region
        </p>
      </div>

      {/* Difficulty */}
      <div className="relative mt-8 flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          Difficulty
        </span>

        <div className="flex gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 text-zinc-600" />
        </div>
      </div>

      {/* Progress */}
      <div className="relative mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            Progress
          </span>

          <span className="text-sm font-medium text-white">
            70%
          </span>
        </div>

        <div className="h-2 rounded-full bg-zinc-800">
          <div className="h-2 w-[70%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        </div>
      </div>

      {/* Reward */}
      <div className="relative mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
        <div className="flex items-center gap-3">
          <Award className="h-10 w-10 text-yellow-400" />

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Reward
            </p>

            <p className="font-semibold text-white">
              Golden Explorer Badge
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="relative mt-8 grid grid-cols-3 divide-x divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900/80">
        <div className="flex flex-col items-center py-4">
          <MapPinned className="mb-2 h-5 w-5 text-violet-400" />

          <span className="text-lg font-bold text-white">
            120+
          </span>

          <span className="text-xs text-zinc-500">
            Hunts
          </span>
        </div>

        <div className="flex flex-col items-center py-4">
          <Users className="mb-2 h-5 w-5 text-cyan-400" />

          <span className="text-lg font-bold text-white">
            25K+
          </span>

          <span className="text-xs text-zinc-500">
            Players
          </span>
        </div>

        <div className="flex flex-col items-center py-4">
          <Star className="mb-2 h-5 w-5 fill-yellow-400 text-yellow-400" />

          <span className="text-lg font-bold text-white">
            4.9
          </span>

          <span className="text-xs text-zinc-500">
            Rating
          </span>
        </div>
      </div>
    </Card>
  );
}
