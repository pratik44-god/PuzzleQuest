import { FileQuestion } from "lucide-react";
import Card from "~/components/ui/cardd";
import type { PreviewQuestion } from "../constants";
import PreviewQuestionItem from "./PreviewQuestionItem";

export default function PreviewQuestions({
  questions,
  huntId,
  onDelete,
}: {
  questions: PreviewQuestion[];
  huntId: string;
  onDelete: (questionIndex: number) => void;
}) {
  return (
    <Card className="min-w-0 w-full overflow-hidden border-white/15 bg-[#090c17]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6 lg:h-[628px]">
      <div className="mb-6 flex shrink-0 items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Challenges</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Review every challenge in your hunt.
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-violet-500/30 bg-violet-500/[0.06] px-4 py-3">
          <span className="text-lg font-bold text-violet-300">
            {questions.length}
          </span>

          <span className="ml-1 text-sm text-zinc-300">Challenges</span>
        </div>
      </div>

      <div className="h-[calc(100%-100px)] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="space-y-3">
          {questions.map((question, index) => (
            <PreviewQuestionItem
              key={`${question.questionIndex}-${question.questionType ?? question.type}`}
              question={question}
              index={index}
              huntId={huntId}
              onDelete={() => onDelete(question.questionIndex)}
            />
          ))}

          {questions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
              <FileQuestion size={36} className="mx-auto text-zinc-700" />

              <p className="mt-3 text-sm font-medium text-zinc-400">
                No questions found
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Add questions before previewing the hunt.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}