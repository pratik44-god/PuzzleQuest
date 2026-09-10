import { Lightbulb, Plus, Trash2 } from "lucide-react";
import { MAX_HINTS } from "./constants";

export default function HintsSection({
  hints,
  onAdd,
  onRemove,
  onChange,
}: {
  hints: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="mt-5 border-t border-white/[0.06] pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/10">
            <Lightbulb size={14} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Helpful hints</p>
            <p className="text-[9px] text-zinc-600">Optional • up to 3</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={hints.length >= MAX_HINTS}
          className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5 text-[10px] font-semibold text-violet-300 transition hover:bg-violet-500/[0.1] disabled:opacity-30"
        >
          <Plus size={13} />
          Add hint
        </button>
      </div>

      {hints.length > 0 ? (
        <div className="mt-3 space-y-2">
          {hints.map((hint, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-yellow-400/10 text-[9px] font-bold text-yellow-400">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Hint {index + 1}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="rounded-md p-1.5 text-zinc-700 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <textarea
                value={hint}
                onChange={(event) => onChange(index, event.target.value)}
                rows={2}
                placeholder="Give explorers a gentle clue..."
                className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/30"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-white/[0.06] px-4 py-4 text-center">
          <Lightbulb size={16} className="mx-auto text-zinc-700" />
          <p className="mt-1.5 text-[10px] text-zinc-700">No hints added.</p>
        </div>
      )}
    </div>
  );
}