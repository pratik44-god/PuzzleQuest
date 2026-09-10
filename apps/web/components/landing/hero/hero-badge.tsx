import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">
      <Sparkles className="h-4 w-4 text-violet-400" />

      <span className="text-sm font-medium text-violet-300">
        Interactive Treasure Hunt Platform
      </span>
    </div>
  );
}