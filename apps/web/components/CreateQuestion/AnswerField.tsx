import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { QuestionFormData } from "./constants";

export default function AnswerField({
  register,
  errors,
}: {
  register: UseFormRegister<QuestionFormData>;
  errors: FieldErrors<QuestionFormData>;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor="answer"
        className="mb-2 block text-xs font-medium text-zinc-300"
      >
        Correct answer <span className="text-red-400">*</span>
      </label>

      <div className="relative">
        <input
          id="answer"
          type="text"
          maxLength={100}
          placeholder="Map"
          {...register("answer", {
            required: "Correct answer is required",
            validate: (value) =>
              value.trim().length > 0 || "Answer cannot be empty.",
          })}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 pr-10 text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/[0.04]"
        />
        <CheckCircle2
          size={16}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/70"
        />
      </div>

      {errors.answer && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle size={12} />
          {errors.answer.message}
        </p>
      )}
    </div>
  );
}