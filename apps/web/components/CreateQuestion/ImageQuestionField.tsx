import { AlertCircle, ImagePlus } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { QuestionFormData } from "./constants";

export default function ImageQuestion({
  register,
  imagePreview,
  imageFile,
  imageSizeError,
}: {
  register: UseFormRegister<QuestionFormData>;
  imagePreview: string | null;
  imageFile?: File;
  imageSizeError: string | null;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor="image"
        className="mb-2 block text-xs font-medium text-zinc-300"
      >
        Question image <span className="text-red-400">*</span>
      </label>

      <label
        htmlFor="image"
        className="group block cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/[0.02] transition hover:border-violet-500/30"
      >
        {imagePreview ? (
          <div className="relative h-[210px] overflow-hidden bg-[#08080a] sm:h-[230px]">
            <img
              src={imagePreview}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-15 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex h-full items-center justify-center p-3">
              <img
                src={imagePreview}
                alt="Question preview"
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-8">
              <p className="truncate text-[11px] text-white">
                {imageFile?.name ?? "Uploaded image"}
              </p>
              <p className="mt-0.5 text-[9px] text-zinc-500">Click to change</p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[170px] flex-col items-center justify-center p-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <ImagePlus size={22} />
            </div>
            <p className="mt-3 text-xs font-semibold text-white">Add clue image</p>
            <p className="mt-1 text-[10px] text-zinc-600">
              PNG, JPG or WEBP • Max 10 MB
            </p>
          </div>
        )}
      </label>

      <input
        id="image"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        {...register("image")}
        className="hidden"
      />

      {imageSizeError && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle size={12} />
          {imageSizeError}
        </p>
      )}
    </div>
  );
}