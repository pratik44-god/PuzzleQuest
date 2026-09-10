import { Sparkles } from "lucide-react";

export default function PreviewHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-500/50 bg-violet-500/[0.08] text-violet-300 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
          <Sparkles size={32} />
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-violet-400">
            <Sparkles size={15} />
            Final Preview
            <Sparkles size={15} />
          </div>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Hunt{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Preview
            </span>
          </h1>
        </div>
      </div>
      <p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
        Review your adventure before sending it into the wild.
      </p>
    </div>
  );
}