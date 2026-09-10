import { CalendarDays, FileQuestion, Lightbulb, Sparkles } from "lucide-react";
import Card from "~/components/ui/cardd";
import { formatHuntCreatedDate } from "~/lib/hunt-display";
import {
  DEFAULT_HUNT_TAG,
  formatTagDisplay,
  type HuntTagLabel,
} from "~/lib/hunt-tags";

export default function HuntPreview({
  huntData,
  questionCount,
  totalHints,
  selectedTag = DEFAULT_HUNT_TAG,
}: {
  huntData: any;
  questionCount: number;
  totalHints: number;
  selectedTag?: HuntTagLabel;
}) {
  return (
    <Card className="min-w-0 w-full overflow-hidden border-white/15 bg-[#090c17]/90 p-0 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:sticky lg:top-6 lg:self-start">
      <div className="relative h-[400px] overflow-hidden sm:h-[500px]">
        {huntData?.image ? (
          <>
            <img
              src={huntData.image}
              alt={huntData.title ?? "Hunt"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070a13]/50 to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-950/40 to-indigo-950/30">
            <Sparkles size={60} className="text-violet-400/30" />
          </div>
        )}

        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold capitalize tracking-wider text-violet-300 backdrop-blur-md">
          <Sparkles size={14} />
          {formatTagDisplay(selectedTag)}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/40 bg-violet-500/10 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
            <span className="text-4xl">🏆</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {huntData?.title ?? "Your Hunt"}
          </h2>
{/* ///////////////////////////////////////////////////////////////////// */}
          {/* <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
            {huntData?.description ?? "Your hunt description"}
          </p> */}

          {huntData?.difficulty && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] px-3 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {huntData.difficulty}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
        <div className="bg-[#0a0d18] px-3 py-5 text-center">
          <FileQuestion size={24} className="mx-auto mb-2 text-violet-400" />
          <p className="text-2xl font-bold text-white">{questionCount}</p>
          <p className="mt-1 text-xs text-zinc-500">Challenges</p>
        </div>

        <div className="bg-[#0a0d18] px-3 py-5 text-center">
          <Lightbulb size={24} className="mx-auto mb-2 text-yellow-400" />
          <p className="text-2xl font-bold text-white">{totalHints}</p>
          <p className="mt-1 text-xs text-zinc-500">Hints</p>
        </div>

        <div className="bg-[#0a0d18] px-3 py-5 text-center">
          <CalendarDays size={24} className="mx-auto mb-2 text-blue-400" />
          <p className="text-xs font-bold text-white sm:text-sm">
            {formatHuntCreatedDate(huntData?.createdAt)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Created</p>
        </div>
      </div>
    </Card>
  );
}