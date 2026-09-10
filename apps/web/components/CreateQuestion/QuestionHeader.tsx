import { Sparkles } from "lucide-react";

export default function QuestionHeader() {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
        <Sparkles size={13} />
        Hunt Question
      </div>

      <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Add a Challenge
      </h1>

      <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-600 sm:text-sm">
        Create a challenge explorers need to solve before continuing.
      </p>
    </div>
  );
}