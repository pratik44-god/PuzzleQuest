// import { AlertCircle, Check, Copy } from "lucide-react";
// import type { UseFormRegister, FieldErrors } from "react-hook-form";
// import type { QuestionFormData } from "./constants";

// export default function TextQuestion({
//   register,
//   errors,
//   questionText,
//   copied,
//   onCopy,
//   optional = false,
// }: {
//   register: UseFormRegister<QuestionFormData>;
//   errors: FieldErrors<QuestionFormData>;
//   questionText?: string;
//   copied: boolean;
//   onCopy: () => void;
//   optional?: boolean;
// }) {
//   return (
//     <div className="mt-5">
//       <div className="mb-2 flex items-center justify-between">
//         <label htmlFor="question" className="text-xs font-medium text-zinc-300">
//           Your question{" "}
//           {optional ? (
//             <span className="text-zinc-600">(optional)</span>
//           ) : (
//             <span className="text-red-400">*</span>
//           )}
//         </label>

//         <button
//           type="button"
//           onClick={onCopy}
//           disabled={!questionText?.trim()}
//           className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-zinc-600 transition hover:bg-white/5 hover:text-violet-300 disabled:opacity-30"
//         >
//           {copied ? (
//             <>
//               <Check size={12} />
//               Copied
//             </>
//           ) : (
//             <>
//               <Copy size={12} />
//               Copy
//             </>
//           )}
//         </button>
//       </div>

//       <textarea
//         id="question"
//         rows={3}
//         maxLength={500}
//         placeholder="Write a clever riddle or clue..."
//         {...register("question", optional
//           ? {
//               validate: (value) =>
//                 !value.trim() ||
//                 value.trim().length >= 5 ||
//                 "Question must be at least 5 characters.",
//             }
//           : {
//               required: "Question is required",
//               minLength: {
//                 value: 5,
//                 message: "Question must be at least 5 characters.",
//               },
//             })}
//         className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition-all placeholder:text-zinc-700 focus:border-violet-500/40 focus:bg-violet-500/[0.035] focus:ring-2 focus:ring-violet-500/[0.04]"
//       />

//       {errors.question && (
//         <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
//           <AlertCircle size={12} />
//           {errors.question.message}
//         </p>
//       )}
//     </div>
//   );
// }

import { AlertCircle, Check, Copy } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import type { QuestionFormData } from "./constants";

export default function TextQuestion({
  register,
  errors,
  questionText,
  copied,
  onCopy,
  optional = false,
}: {
  register: UseFormRegister<QuestionFormData>;
  errors: FieldErrors<QuestionFormData>;
  questionText?: string;
  copied: boolean;
  onCopy: () => void;
  optional?: boolean;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="question"
          className="text-xs font-medium text-zinc-300"
        >
          Your question{" "}
          {optional ? (
            <span className="text-zinc-600">
              (optional)
            </span>
          ) : (
            <span className="text-red-400">*</span>
          )}
        </label>

        <button
          type="button"
          onClick={onCopy}
          disabled={!questionText?.trim()}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-zinc-600 transition hover:bg-white/5 hover:text-violet-300 disabled:opacity-30"
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      <textarea
        id="question"
        rows={3}
        maxLength={500}
        placeholder="Write a clever riddle or clue..."
        {...register(
          "question",
          optional
            ? {
                validate: (value) => {
                  const trimmed =
                    value?.trim() ?? "";

                  return (
                    trimmed === "" ||
                    trimmed.length >= 5 ||
                    "Question must be at least 5 characters."
                  );
                },
              }
            : {
                required: "Question is required",
                minLength: {
                  value: 5,
                  message:
                    "Question must be at least 5 characters.",
                },
              },
        )}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition-all placeholder:text-zinc-700 focus:border-violet-500/40 focus:bg-violet-500/[0.035] focus:ring-2 focus:ring-violet-500/[0.04]"
      />

      {errors.question && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle size={12} />
          {errors.question.message}
        </p>
      )}
    </div>
  );
}