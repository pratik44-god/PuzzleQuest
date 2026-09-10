import { HelpCircle, ImagePlus } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { QuestionFormData } from "./constants";

export default function QuestionType({
  register,
}: {
  register: UseFormRegister<QuestionFormData>;
}) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-xs font-semibold text-white">Challenge type</p>
        <p className="mt-1 text-[10px] text-zinc-600">
          Choose how explorers receive your clue.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="group cursor-pointer">
          <input
            type="radio"
            value="TEXT"
            {...register("type")}
            className="peer sr-only"
          />
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all group-hover:border-white/20 peer-checked:border-violet-500/40 peer-checked:bg-violet-500/[0.06]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <HelpCircle size={17} />
            </div>
            <p className="mt-2 text-xs font-semibold text-white">Text Challenge</p>
            <p className="mt-0.5 text-[10px] text-zinc-600">Riddle or question</p>
          </div>
        </label>

        <label className="group cursor-pointer">
          <input
            type="radio"
            value="IMAGE"
            {...register("type")}
            className="peer sr-only"
          />
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all group-hover:border-white/20 peer-checked:border-cyan-500/40 peer-checked:bg-cyan-500/[0.05]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <ImagePlus size={17} />
            </div>
            <p className="mt-2 text-xs font-semibold text-white">Image Challenge</p>
            <p className="mt-0.5 text-[10px] text-zinc-600">Investigate an image</p>
          </div>
        </label>
      </div>
    </div>
  );
}