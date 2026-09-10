import { ArrowLeft, Pencil, Plus, Send } from "lucide-react";
import Button from "~/components/ui/buttton";

export default function QuestionActions({
  questionNumber,
  isSubmitting,
  alreadySaved,
  savedCount,
  isUpdatingQuestion,
  onPrevious,
  onChange,
  onPreview,
}: {
  questionNumber: number;
  isSubmitting: boolean;
  alreadySaved: boolean;
  savedCount: number;
  isUpdatingQuestion: boolean;
  onPrevious: () => void;
  onChange: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="mt-6 border-t border-white/[0.06] pt-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={questionNumber <= 0 || isSubmitting || isUpdatingQuestion}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-xs font-semibold text-zinc-500 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ArrowLeft size={14} />
            Previous
          </button>

          {alreadySaved && (
            <button
              type="button"
              onClick={onChange}
              disabled={isUpdatingQuestion}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-xs font-semibold text-zinc-500 transition hover:border-violet-500/30 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil size={14} />
              {isUpdatingQuestion ? "Updating..." : "Change"}
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            type="submit"
            loading={isSubmitting}
            leftIcon={<Plus size={16} />}
          >
            {alreadySaved ? "Next" : "Save & Next"}
          </Button>

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={onPreview}
            leftIcon={<Send size={15} />}
          >
            Finish
          </Button>
        </div>
      </div>

      <div className="mt-3 text-center text-[9px] text-zinc-700">
        {savedCount}/2 minimum questions saved
      </div>
    </div>
  );
}