"use client";

import Link from "next/link";
import {
  Check,
  ImagePlus,
  Map,
  Plus,
  Sparkles,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Container from "~/components/ui/container";
import Button from "~/components/ui/buttton";
import Card from "~/components/ui/cardd";
import { BackLink } from "~/components/ui/back-link";

import {
  useCreateHunt,
  useUploadImage,
} from "~/hooks/api/hunt";

type Difficulty = "EASY" | "MEDIUM" | "HARD";

type CreateHuntFormData = {
  title: string;
  description: string;
  image: FileList;
  difficulty: Difficulty;
};

const difficulties: {
  value: Difficulty;
  label: string;
  description: string;
}[] = [
  {
    value: "EASY",
    label: "Easy",
    description: "Beginner friendly",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    description: "Balanced challenge",
  },
  {
    value: "HARD",
    label: "Hard",
    description: "For experts",
  },
];

export default function CreateHunt() {
  const router = useRouter();

  const { uploadImage } = useUploadImage();
  const { createHuntAsync } = useCreateHunt();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateHuntFormData>({
    defaultValues: {
      difficulty: "EASY",
    },
  });

  const selectedImage = watch("image");
  const selectedDifficulty = watch("difficulty");

  const imageFile = selectedImage?.[0];

  /*
   * ============================================================
   * CREATE IMAGE PREVIEW
   * ============================================================
   *
   * This preview is ONLY for the current page.
   *
   * It is NOT what gets saved in the database.
   *
   * The real image is uploaded to Cloudinary inside onSubmit().
   */

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);

    setImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  /*
   * ============================================================
   * SUBMIT
   * ============================================================
   */

  const onSubmit = async (data: CreateHuntFormData) => {
    const file = data.image?.[0];

    if (!file) {
      return;
    }

    try {
      setIsUploading(true);

      /*
       * STEP 1
       *
       * Upload the actual File.
       *
       * Your useUploadImage hook should return:
       *
       * Cloudinary URL
       *
       * Example:
       *
       * https://res.cloudinary.com/....../image/upload/....
       */

      const imageUrl = await uploadImage(file);

      /*
       * Do NOT save:
       *
       * URL.createObjectURL(file)
       *
       * That URL is temporary.
       *
       * Save the Cloudinary URL instead.
       */

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      /*
       * STEP 2
       *
       * Create the hunt using the permanent image URL.
       */

      const { id } = await createHuntAsync({
        title: data.title,
        description: data.description,
        image: imageUrl,
        difficulty: data.difficulty,
      });

      /*
       * STEP 3
       *
       * The hunt now exists in the database.
       *
       * The next page only needs the hunt ID.
       *
       * It can fetch:
       *
       * title
       * description
       * image
       * difficulty
       *
       * from the database.
       */

      router.push(`/dashboard/create/${id}/question`);
    } catch (error) {
      console.error("Failed to create hunt:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const loading = isSubmitting || isUploading;

  return (
    <section className="relative min-h-screen overflow-hidden py-8 sm:py-10">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[#09090b]" />

      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-[130px]" />

      <div className="pointer-events-none absolute -left-[250px] top-[35%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -right-[250px] bottom-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/[0.035] blur-[120px]" />

      {/* Treasure map grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a78bfa 1px, transparent 1px),
            linear-gradient(to bottom, #a78bfa 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Treasure route */}

      <div className="pointer-events-none absolute left-[2%] top-[18%] hidden h-[420px] w-[250px] rotate-[-18deg] opacity-[0.07] lg:block">
        <svg
          viewBox="0 0 250 420"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M20 20 C180 70 40 150 180 210 C250 240 100 300 210 400"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 10"
            className="text-violet-300"
          />

          <circle
            cx="20"
            cy="20"
            r="5"
            className="fill-violet-400"
          />

          <circle
            cx="180"
            cy="210"
            r="5"
            className="fill-violet-400"
          />

          <circle
            cx="210"
            cy="400"
            r="7"
            className="fill-violet-400"
          />
        </svg>
      </div>

      {/* Compass */}

      <div className="pointer-events-none absolute right-[4%] top-[12%] hidden opacity-[0.055] lg:block">
        <div className="flex h-44 w-44 items-center justify-center rounded-full border border-violet-300">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-violet-300">
            <div className="text-5xl text-violet-300">
              ✦
            </div>
          </div>
        </div>
      </div>

      {/* Stars */}

      <div className="pointer-events-none absolute left-[20%] top-[12%] h-1 w-1 animate-pulse rounded-full bg-violet-300/40" />

      <div
        className="pointer-events-none absolute right-[22%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-violet-300/30"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="pointer-events-none absolute bottom-[18%] left-[18%] h-1 w-1 animate-pulse rounded-full bg-violet-300/30"
        style={{ animationDelay: "2s" }}
      />

      <div
        className="pointer-events-none absolute bottom-[25%] right-[12%] h-1 w-1 animate-pulse rounded-full bg-violet-300/30"
        style={{ animationDelay: "1.5s" }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container>
        <div className="relative mx-auto max-w-5xl">

          {/* Back */}

          <div className="mb-7">
            <BackLink href="/dashboard" label="Back to dashboard" />
          </div>

          {/* Header */}

          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-violet-500/40" />

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
                New Adventure
              </p>

              <div className="h-px w-8 bg-violet-500/40" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-lg shadow-violet-500/[0.05]">
                <Map size={21} />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Create Your{" "}
                <span className="text-violet-400">
                  Hunt
                </span>
              </h1>
            </div>

            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-600">
              Every great adventure starts with a mystery.
              Create yours and send explorers on the hunt.
            </p>
          </div>

          {/* =====================================================
              MAIN CARD
          ====================================================== */}

          <Card
            className="
              relative
              overflow-hidden
              border border-white/[0.08]
              bg-[#0c0c0f]
              shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_20px_45px_-20px_rgba(124,58,237,0.22)]
              backdrop-blur-xl
            "
          >
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

                {/* =================================================
                    IMAGE
                ================================================== */}

                <div className="border-b border-white/[0.06] p-5 sm:p-6 lg:border-b-0 lg:border-r">

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-white">
                      Hunt Cover
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Choose the image explorers will see.
                    </p>
                  </div>

                  <label
                    htmlFor="image"
                    className={`group relative block cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                      imagePreview
                        ? "border-violet-500/30"
                        : "border-dashed border-white/[0.1] hover:border-violet-500/40"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative h-[300px] overflow-hidden bg-[#08080a] sm:h-[340px]">

                        {/* Background */}

                        <img
                          src={imagePreview}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        {/* Main image */}

                        <div className="relative flex h-full w-full items-center justify-center p-4">
                          <img
                            src={imagePreview}
                            alt="Hunt preview"
                            className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>

                        {/* Gradient */}

                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />

                        {/* Information */}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-white">
                              {imageFile?.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-zinc-400">
                              Click to change
                            </p>
                          </div>

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/80 text-white shadow-lg shadow-violet-500/20 backdrop-blur">
                            <Check size={15} />
                          </div>

                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] flex-col items-center justify-center bg-white/[0.015] px-6 text-center transition-colors duration-300 group-hover:bg-violet-500/[0.025]">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition duration-300 group-hover:scale-105 group-hover:bg-violet-500/15">
                          <ImagePlus size={24} />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-zinc-300">
                          Drop your cover here
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          PNG, JPG or WEBP
                        </p>

                      </div>
                    )}
                  </label>

                  <input
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    {...register("image", {
                      required: "Hunt image is required",
                    })}
                    className="hidden"
                  />

                  {errors.image && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.image.message}
                    </p>
                  )}

                  {/* Upload information */}

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">

                    <Upload
                      size={14}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />

                    <p className="text-[11px] leading-5 text-zinc-600">
                      Your image will be uploaded and permanently
                      stored with this hunt. You can use it on
                      the following pages.
                    </p>

                  </div>

                  {/* Tip */}

                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">

                    <Sparkles
                      size={14}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />

                    <p className="text-[11px] leading-5 text-zinc-600">
                      A mysterious image can make your hunt
                      much more tempting to explore.
                    </p>

                  </div>
                </div>

                {/* =================================================
                    DETAILS
                ================================================== */}

                <div className="p-5 sm:p-6">

                  {/* Title */}

                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-xs font-semibold text-zinc-400"
                    >
                      Hunt Title{" "}
                      <span className="text-violet-400">*</span>
                    </label>

                    <input
                      id="title"
                      type="text"
                      placeholder="Mystery of the Lost Temple"
                      {...register("title", {
                        required: "Hunt title is required",
                      })}
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.14] focus:border-violet-500/50 focus:bg-violet-500/[0.025] focus:ring-2 focus:ring-violet-500/[0.06]"
                    />

                    {errors.title && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}

                  <div className="mt-5">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-xs font-semibold text-zinc-400"
                    >
                      Description{" "}
                      <span className="text-violet-400">*</span>
                    </label>

                    <textarea
                      id="description"
                      rows={4}
                      placeholder="Describe the mystery waiting to be discovered..."
                      {...register("description", {
                        required: "Description is required",
                        maxLength: {
                          value: 6000,
                          message:
                            "Description must be 6000 characters or less",
                        },
                      })}
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.14] focus:border-violet-500/50 focus:bg-violet-500/[0.025] focus:ring-2 focus:ring-violet-500/[0.06]"
                    />

                    {errors.description && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Difficulty */}

                  <div className="mt-5">

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-zinc-400">
                        Difficulty{" "}
                        <span className="text-violet-400">*</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">

                      {difficulties.map((item) => {
                        const active =
                          selectedDifficulty === item.value;

                        return (
                          <label
                            key={item.value}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={item.value}
                              {...register("difficulty", {
                                required:
                                  "Difficulty is required",
                              })}
                              className="sr-only"
                            />

                            <div
                              className={`relative rounded-xl border px-3 py-3 transition-all duration-300 ${
                                active
                                  ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/[0.04]"
                                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.035]"
                              }`}
                            >
                              {active && (
                                <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-white">
                                  <Check size={10} />
                                </div>
                              )}

                              <p
                                className={`text-xs font-semibold ${
                                  active
                                    ? "text-violet-300"
                                    : "text-zinc-300"
                                }`}
                              >
                                {item.label}
                              </p>

                              <p className="mt-1 text-[10px] text-zinc-600">
                                {item.description}
                              </p>
                            </div>
                          </label>
                        );
                      })}

                    </div>

                    {errors.difficulty && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.difficulty.message}
                      </p>
                    )}
                  </div>

                  {/* Create */}

                  <div className="mt-7 border-t border-white/[0.06] pt-5">

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      leftIcon={<Plus size={18} />}
                    >
                      {isUploading
                        ? "Uploading Image..."
                        : "Create Hunt"}
                    </Button>

                    <p className="mt-3 text-center text-[10px] text-zinc-700">
                      Your hunt information and cover image
                      will be saved before continuing.
                    </p>

                  </div>
                </div>
              </div>
            </form>
          </Card>

          {/* Bottom */}

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-700">
            <div className="h-px w-8 bg-zinc-800" />

            <span>THE HUNT BEGINS HERE</span>

            <div className="h-px w-8 bg-zinc-800" />
          </div>
        </div>
      </Container>
    </section>
  );
}