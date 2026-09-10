"use client";

import { truncateText } from "~/lib/utils";

import DiscoverHuntStats from "./discover-hunt-stats";
import DiscoverStartButton from "./discover-start-button";
import type { Hunt } from "./discover-hunts";

type HuntDetailsProps = {
  hunt: Hunt;
  index: number;
};

export default function HuntDetails({
  hunt,
  index,
}: HuntDetailsProps) {
  return (
    <article
      style={{ animationDelay: `${index * 80}ms` }}
      className="group animate-[huntReveal_0.6s_ease-out_both] relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0D0D14] transition duration-500 hover:-translate-y-2 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-950/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-transparent">
        {hunt.image ? (
          <>
            <img
              src={hunt.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-125 object-cover opacity-20 blur-2xl brightness-125"
            />
            <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center p-3">
              <img
                src={hunt.image}
                alt={hunt.title}
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-lg transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </>
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${hunt.accent} opacity-40`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13),transparent_55%)] transition duration-700 group-hover:scale-150" />
            <span className="relative z-10 text-7xl drop-shadow-2xl transition duration-500 group-hover:scale-125 group-hover:rotate-6">
              {hunt.icon ?? "🗺️"}
            </span>
          </>
        )}

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md">
          {hunt.category}
        </div>

        {hunt.featured && (
          <div className="absolute bottom-4 left-4 rounded-full bg-violet-500/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-zinc-100 transition duration-300 group-hover:text-violet-300">
          {hunt.title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-zinc-600">
          {truncateText(
            hunt.description,
            100,
            "No description yet.",
          )}
        </p>

        <div className="mt-5">
          <DiscoverHuntStats hunt={hunt} />
        </div>

        <div className="mt-4 flex justify-end">
          <DiscoverStartButton huntId={hunt.id} />
        </div>
      </div>
    </article>
  );
}
