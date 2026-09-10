// "use client";

// import { useState } from "react";
// import {
//   FileQuestion,
//   ImagePlus,
//   Lightbulb,
//   Trash2,
//   Pencil,
//   Check,
//   X,
// } from "lucide-react";
// import type { PreviewQuestion } from "../constants";
// import { useUpdateHuntQuestionByIdAndIndex } from "~/hooks/api/hunt";
// import QuestionTimerSelector from "../QuestionTimerSelector";
// import type { QuestionTimeLimitSeconds } from "~/lib/question-timers";

// export default function PreviewQuestionItem({
//   question,
//   index,
//   huntId,
//   onDelete,
// }: {
//   question: PreviewQuestion;
//   index: number;
//   huntId: string;
//   onDelete: (index: number) => void;
// }) {
//   const type = question.questionType ?? question.type ?? "TEXT";
//   const answer = question.answer ?? "";
//   const hints = Array.isArray(question.hints)
//     ? question.hints.filter(Boolean)
//     : [];
//   const questionValue = question.question ?? "";
//   const isImage = type === "IMAGE";
//   const imageUrl = isImage ? questionValue : undefined;
//   const promptText = isImage
//     ? question.questionText ?? ""
//     : questionValue;

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedQuestion, setEditedQuestion] = useState(questionValue);
//   const [editedAnswer, setEditedAnswer] = useState(answer);
//   const [editedHints, setEditedHints] = useState(hints.join("\n"));

//   const {
//     updateHuntQuestionByIdAndIndexAsync,
//     isPending,
//   } = useUpdateHuntQuestionByIdAndIndex();

//   const currentTimeLimit =
//     (question.timeLimitSeconds as QuestionTimeLimitSeconds | undefined) ?? null;

//   const handleTimeLimitChange = async (timeLimitSeconds: QuestionTimeLimitSeconds) => {
//     await updateHuntQuestionByIdAndIndexAsync({
//       huntId,
//       questionIndex: question.questionIndex,
//       questionType: type,
//       question: questionValue,
//       answer,
//       hints,
//       timeLimitSeconds,
//     });
//   };

//   const handleChange = () => {
//     setEditedQuestion(questionValue);
//     setEditedAnswer(answer);
//     setEditedHints(hints.join("\n"));
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setEditedQuestion(questionValue);
//     setEditedAnswer(answer);
//     setEditedHints(hints.join("\n"));
//     setIsEditing(false);
//   };

//   const handleSaveChanges = async () => {
//     await updateHuntQuestionByIdAndIndexAsync({
//       huntId,
//       questionIndex: question.questionIndex,
//       questionType: type,
//       question: editedQuestion.trim(),
//       answer: editedAnswer.trim(),
//       hints: editedHints
//         .split("\n")
//         .map((hint) => hint.trim())
//         .filter(Boolean),
//     });

//     setIsEditing(false);
//   };

//   return (
//     <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-500/25 hover:bg-violet-500/[0.025]">
//       {isEditing ? (
//         <div className="space-y-4">
//           <div>
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-400">
//               {isImage ? "Image URL" : "Question"}
//             </label>

//             <input
//               value={editedQuestion}
//               onChange={(e) => setEditedQuestion(e.target.value)}
//               className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-400">
//               Answer
//             </label>

//             <input
//               value={editedAnswer}
//               onChange={(e) => setEditedAnswer(e.target.value)}
//               className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-yellow-400">
//               Hints
//             </label>

//             <textarea
//               value={editedHints}
//               onChange={(e) => setEditedHints(e.target.value)}
//               placeholder="One hint per line"
//               rows={3}
//               className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
//             />
//           </div>

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={isPending}
//               className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
//             >
//               <X size={15} />
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={handleSaveChanges}
//               disabled={isPending}
//               className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20 disabled:opacity-50"
//             >
//               <Check size={15} />
//               {isPending ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-start gap-3 sm:items-center sm:gap-4">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08]">
//               <span className="text-lg font-bold text-violet-300">
//                 {index + 1}
//               </span>
//             </div>

//             <div className="min-w-0 flex-1">
//               <div className="mb-2 flex items-center gap-2">
//                 {isImage ? (
//                   <ImagePlus size={16} className="text-violet-400" />
//                 ) : (
//                   <FileQuestion size={16} className="text-violet-400" />
//                 )}

//                 <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
//                   {type}
//                 </span>
//               </div>

//               {isImage ? (
//                 <div className="flex flex-col gap-3">
//                   {imageUrl ? (
//                     <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:w-28">
//                       <img
//                         src={imageUrl}
//                         alt="Question"
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                   ) : null}

//                   {promptText ? (
//                     <p className="max-h-[60px] max-w-full overflow-y-auto break-words text-sm font-medium leading-5 text-zinc-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//                       {promptText}
//                     </p>
//                   ) : null}
//                 </div>
//               ) : (
//                 // <p className="text-sm font-medium leading-5 text-zinc-200">
//                 //   {questionValue}
//                 // </p>
//                 <p className="max-h-[60px] max-w-full overflow-y-auto break-words text-sm font-medium leading-5 text-zinc-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//   {questionValue}
// </p>
//               )}
//             </div>

//             <div className="hidden min-w-[100px] border-l border-white/[0.07] pl-5 md:block">
//               <p className="text-[11px] uppercase tracking-wider text-zinc-500">
//                 Answer
//               </p>

//               <div className="mt-2 inline-flex max-w-[100px] max-h-[40px] overflow-y-auto rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//                 <span className="text-xs font-semibold text-violet-300 break-words">
//                   {answer}
//                 </span>
//               </div>
//             </div>

//             <div className="hidden min-w-[80px] border-l border-white/[0.07] pl-5 sm:block">
//               <p className="text-[11px] uppercase tracking-wider text-zinc-500">
//                 Hints
//               </p>

//               <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.08] px-3 py-1.5">
//                 <Lightbulb size={14} className="text-yellow-400" />

//                 <span className="text-xs font-semibold text-yellow-300">
//                   {hints.length}
//                 </span>
//               </div>
//             </div>

//             <div className="flex shrink-0 items-center gap-2">
//               {/* <button
//                 type="button"
//                 onClick={handleChange}
//                 title={`Change question ${index + 1}`}
//                 aria-label={`Change question ${index + 1}`}
//                 className="flex h-10 items-center justify-center gap-2 rounded-full border border-violet-500/10 bg-violet-500/[0.03] px-4 text-violet-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
//               >
//                 {/* <Pencil size={15} /> */}
//                 {/* <span className="hidden sm:inline">Change</span> */}
//               {/* </button> */} 

//               <button
//                 type="button"
//                 onClick={() => onDelete(index)}
//                 title={`Delete question ${index + 1}`}
//                 aria-label={`Delete question ${index + 1}`}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/10 bg-red-500/[0.03] text-zinc-600 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
//               >
//                 <Trash2 size={15} />
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 flex gap-3 border-t border-white/[0.06] pt-3 md:hidden">
//             <div>
//               <p className="text-[10px] uppercase tracking-wider text-zinc-600">
//                 Answer
//               </p>

//               <span className="mt-1 inline-block max-w-[150px] truncate rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-xs font-semibold text-violet-300">
//                 {answer}
//               </span>
//             </div>

//             <div>
//               <p className="text-[10px] uppercase tracking-wider text-zinc-600">
//                 Hints
//               </p>

//               <span className="mt-1 inline-flex items-center gap-1 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.08] px-2.5 py-1 text-xs font-semibold text-yellow-300">
//                 <Lightbulb size={12} />
//                 {hints.length}
//               </span>
//             </div>
//           </div>

//           <QuestionTimerSelector
//             value={currentTimeLimit}
//             onChange={handleTimeLimitChange}
//             disabled={isPending}
//           />
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  FileQuestion,
  ImagePlus,
  Lightbulb,
  Trash2,
  Check,
  X,
} from "lucide-react";
import type { PreviewQuestion } from "../constants";
import { useUpdateHuntQuestionByIdAndIndex } from "~/hooks/api/hunt";
import QuestionTimerSelector from "../QuestionTimerSelector";
import type { QuestionTimeLimitSeconds } from "~/lib/question-timers";

export default function PreviewQuestionItem({
  question,
  index,
  huntId,
  onDelete,
}: {
  question: PreviewQuestion;
  index: number;
  huntId: string;
  onDelete: (index: number) => void;
}) {
  const type = question.questionType ?? question.type ?? "TEXT";
  const answer = question.answer ?? "";

  const hints = Array.isArray(question.hints)
    ? question.hints.filter(Boolean)
    : [];

  const questionValue = question.question ?? "";

  const isImage = type === "IMAGE";

  // For IMAGE questions:
  // question = image URL
  // questionText = optional text/prompt
  const imageUrl = isImage ? questionValue : undefined;

  const promptText = isImage
    ? question.questionText ?? ""
    : questionValue;

  const [isEditing, setIsEditing] = useState(false);

  const [editedQuestion, setEditedQuestion] = useState(questionValue);

  // Optional question text for IMAGE questions
  const [editedQuestionText, setEditedQuestionText] = useState(
    question.questionText ?? "",
  );

  const [editedAnswer, setEditedAnswer] = useState(answer);

  const [editedHints, setEditedHints] = useState(
    hints.join("\n"),
  );

  const {
    updateHuntQuestionByIdAndIndexAsync,
    isPending,
  } = useUpdateHuntQuestionByIdAndIndex();

  const currentTimeLimit =
    (question.timeLimitSeconds as
      | QuestionTimeLimitSeconds
      | undefined) ?? null;

  const handleTimeLimitChange = async (
    timeLimitSeconds: QuestionTimeLimitSeconds,
  ) => {
    await updateHuntQuestionByIdAndIndexAsync({
      huntId,
      questionIndex: question.questionIndex,
      questionType: type,
      question: questionValue,

      // Keep IMAGE question text optional
      questionText: isImage
        ? question.questionText?.trim() || undefined
        : undefined,

      answer,
      hints,
      timeLimitSeconds,
    });
  };

  const handleChange = () => {
    setEditedQuestion(questionValue);

    setEditedQuestionText(
      question.questionText ?? "",
    );

    setEditedAnswer(answer);

    setEditedHints(
      hints.join("\n"),
    );

    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedQuestion(questionValue);

    setEditedQuestionText(
      question.questionText ?? "",
    );

    setEditedAnswer(answer);

    setEditedHints(
      hints.join("\n"),
    );

    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    await updateHuntQuestionByIdAndIndexAsync({
      huntId,
      questionIndex: question.questionIndex,
      questionType: type,

      // For IMAGE: this is the image URL
      // For TEXT: this is the question
      question: editedQuestion.trim(),

      // Optional only for IMAGE questions
      questionText: isImage
        ? editedQuestionText.trim() || undefined
        : undefined,

      answer: editedAnswer.trim(),

      hints: editedHints
        .split("\n")
        .map((hint) => hint.trim())
        .filter(Boolean),
    });

    setIsEditing(false);
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-500/25 hover:bg-violet-500/[0.025]">
      {isEditing ? (
        <div className="space-y-4">
          {/* Main question/image URL */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-400">
              {isImage ? "Image URL" : "Question"}
            </label>

            <input
              value={editedQuestion}
              onChange={(e) =>
                setEditedQuestion(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
            />
          </div>

          {/* OPTIONAL question text for IMAGE questions */}
          {isImage && (
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-400">
                Question Text
                <span className="ml-2 normal-case tracking-normal text-zinc-500">
                  Optional
                </span>
              </label>

              <textarea
                value={editedQuestionText}
                onChange={(e) =>
                  setEditedQuestionText(e.target.value)
                }
                placeholder="Add an optional question or instruction for this image..."
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
              />
            </div>
          )}

          {/* Answer */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-400">
              Answer
            </label>

            <input
              value={editedAnswer}
              onChange={(e) =>
                setEditedAnswer(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
            />
          </div>

          {/* Hints */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-yellow-400">
              Hints
            </label>

            <textarea
              value={editedHints}
              onChange={(e) =>
                setEditedHints(e.target.value)
              }
              placeholder="One hint per line"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-500/40"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
            >
              <X size={15} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isPending}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20 disabled:opacity-50"
            >
              <Check size={15} />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08]">
              <span className="text-lg font-bold text-violet-300">
                {index + 1}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                {isImage ? (
                  <ImagePlus
                    size={16}
                    className="text-violet-400"
                  />
                ) : (
                  <FileQuestion
                    size={16}
                    className="text-violet-400"
                  />
                )}

                <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                  {type}
                </span>
              </div>

              {isImage ? (
                <div className="flex flex-col gap-3">
                  {imageUrl && (
                    <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:w-28">
                      <img
                        src={imageUrl}
                        alt="Question"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Only show question text if it exists */}
                  {promptText && (
                    <p className="max-h-[60px] max-w-full overflow-y-auto break-words text-sm font-medium leading-5 text-zinc-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {promptText}
                    </p>
                  )}
                </div>
              ) : (
                <p className="max-h-[60px] max-w-full overflow-y-auto break-words text-sm font-medium leading-5 text-zinc-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {questionValue}
                </p>
              )}
            </div>

            <div className="hidden min-w-[100px] border-l border-white/[0.07] pl-5 md:block">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                Answer
              </p>

              <div className="mt-2 inline-flex max-h-[40px] max-w-[100px] overflow-y-auto rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <span className="break-words text-xs font-semibold text-violet-300">
                  {answer}
                </span>
              </div>
            </div>

            <div className="hidden min-w-[80px] border-l border-white/[0.07] pl-5 sm:block">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                Hints
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.08] px-3 py-1.5">
                <Lightbulb
                  size={14}
                  className="text-yellow-400"
                />

                <span className="text-xs font-semibold text-yellow-300">
                  {hints.length}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onDelete(question.questionIndex)}
                title={`Delete question ${index + 1}`}
                aria-label={`Delete question ${index + 1}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/10 bg-red-500/[0.03] text-zinc-600 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-3 border-t border-white/[0.06] pt-3 md:hidden">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                Answer
              </p>

              <span className="mt-1 inline-block max-w-[150px] truncate rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-xs font-semibold text-violet-300">
                {answer}
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                Hints
              </p>

              <span className="mt-1 inline-flex items-center gap-1 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.08] px-2.5 py-1 text-xs font-semibold text-yellow-300">
                <Lightbulb size={12} />
                {hints.length}
              </span>
            </div>
          </div>

          <QuestionTimerSelector
            value={currentTimeLimit}
            onChange={handleTimeLimitChange}
            disabled={isPending}
          />
        </>
      )}
    </div>
  );
}