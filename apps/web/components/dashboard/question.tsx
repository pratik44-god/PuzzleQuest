"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  Globe,
  HelpCircle,
  ImagePlus,
  Lightbulb,
  Plus,
  Save,
  Send,
  Sparkles,
  Trash2,
  AlertCircle,
  FileQuestion,
  CalendarDays,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Container from "~/components/ui/container";
import Button from "~/components/ui/buttton";
import Card from "~/components/ui/cardd";

import {
  useCreateTextHuntQuestion,
  useUploadImage,
  useGetHuntById,
  useGetHuntQuestionById,
} from "~/hooks/api/hunt";

type QuestionType = "TEXT" | "IMAGE";

type QuestionFormData = {
  type: QuestionType;
  question: string;
  image: FileList;
  answer: string;
};

type SavedQuestion = {
  number: number;
  type: QuestionType;
  question: string;
  answer: string;
  imageUrl?: string;
  hints: string[];
};

type QuestionDraft = {
  type: QuestionType;
  question: string;
  answer: string;
  imageFile?: File;
  imageUrl?: string;
  hints: string[];
};

type QuestionPageProps = {
  huntId: string;
};

type PreviewQuestion = {
  questionType?: "TEXT" | "IMAGE";
  type?: "TEXT" | "IMAGE";
  question?: string;
  answer?: string;
  hints?: string[] | null;
  createdAt?: Date | string | null;
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_HINTS = 3;

export default function CreateQuestion({
  huntId,
}: QuestionPageProps) {
  /*
   * ============================================================
   * STATE
   * ============================================================
   */

  const [hints, setHints] = useState<string[]>([]);

  const [savedQuestions, setSavedQuestions] = useState<
    SavedQuestion[]
  >([]);

  const [questionDrafts, setQuestionDrafts] = useState<
    Record<number, QuestionDraft>
  >({});

  const [questionNumber, setQuestionNumber] =
    useState(1);

  const [finished, setFinished] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [pageMessage, setPageMessage] =
    useState<string | null>(null);

  const [pageMessageType, setPageMessageType] =
    useState<"error" | "success">("error");

  const [imageSizeError, setImageSizeError] =
    useState<string | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  /*
   * Frontend-only deleted preview questions.
   *
   * This does NOT delete anything from DB.
   */
  const [deletedPreviewQuestions, setDeletedPreviewQuestions] =
    useState<Set<string>>(new Set());

  /*
   * ============================================================
   * API
   * ============================================================
   */

  const {
    createTextHuntQuestionAsync,
  } = useCreateTextHuntQuestion();

  const { uploadImage } =
    useUploadImage();

  const {
    data: huntData,
    refetch: refetchHunt,
  } = useGetHuntById(huntId);

  const {
    data: questionData,
    refetch: refetchQuestions,
  } = useGetHuntQuestionById(huntId);

  /*
   * ============================================================
   * FORM
   * ============================================================
   */

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<QuestionFormData>({
    defaultValues: {
      type: "TEXT",
      question: "",
      answer: "",
    },
  });

  const questionType = watch("type");
  const questionText = watch("question");
  const answerText = watch("answer");
  const selectedImage = watch("image");
  const imageFile = selectedImage?.[0];

  /*
   * ============================================================
   * IMAGE PREVIEW
   * ============================================================
   */

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    if (imageFile.size > MAX_IMAGE_SIZE) {
      setImagePreview(null);

      setImageSizeError(
        "Image file is above 10 MB. Please choose a smaller image.",
      );

      return;
    }

    setImageSizeError(null);

    const url =
      URL.createObjectURL(imageFile);

    setImagePreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  useEffect(() => {
    if (questionType === "TEXT") {
      setImagePreview(null);
    }
  }, [questionType]);

  /*
   * ============================================================
   * MESSAGE HELPERS
   * ============================================================
   */

  const showError = (
    message: string,
  ) => {
    setPageMessage(message);
    setPageMessageType("error");
  };

  const showSuccess = (
    message: string,
  ) => {
    setPageMessage(message);
    setPageMessageType("success");
  };

  const clearMessage = () => {
    setPageMessage(null);
  };

  /*
   * ============================================================
   * QUESTION IDENTIFIER
   * ============================================================
   *
   * Used only for frontend preview deletion.
   */

  const getQuestionKey = (
    question: PreviewQuestion,
  ) => {
    const type =
      question.questionType ??
      question.type ??
      "TEXT";

    const questionValue =
      question.question ?? "";

    const answer =
      question.answer ?? "";

    return `${type}-${questionValue}-${answer}`;
  };

  /*
   * ============================================================
   * CHECK WHETHER CURRENT QUESTION IS ALREADY SAVED
   * ============================================================
   */

  const isQuestionAlreadySaved = (
    number: number,
  ) => {
    return savedQuestions.some(
      (question) =>
        question.number === number,
    );
  };

  /*
   * ============================================================
   * SAVE CURRENT PAGE AS DRAFT
   * ============================================================
   */

  const saveCurrentDraft = () => {
    setQuestionDrafts(
      (previous) => ({
        ...previous,

        [questionNumber]: {
          type: questionType,

          question:
            questionText ?? "",

          answer:
            answerText ?? "",

          imageFile,

          imageUrl:
            previous[
              questionNumber
            ]?.imageUrl,

          hints: [...hints],
        },
      }),
    );
  };

  /*
   * ============================================================
   * RESTORE QUESTION
   * ============================================================
   */

  const restoreQuestion = (
    number: number,
  ) => {
    const draft =
      questionDrafts[number];

    if (!draft) {
      const savedQuestion =
        savedQuestions.find(
          (question) =>
            question.number === number,
        );

      if (savedQuestion) {
        reset({
          type:
            savedQuestion.type,

          question:
            savedQuestion.type ===
            "TEXT"
              ? savedQuestion.question
              : "",

          answer:
            savedQuestion.answer,

          image: undefined,
        });

        setHints([
          ...savedQuestion.hints,
        ]);

        if (
          savedQuestion.type ===
            "IMAGE" &&
          savedQuestion.imageUrl
        ) {
          setImagePreview(
            savedQuestion.imageUrl,
          );
        } else {
          setImagePreview(null);
        }
      } else {
        reset({
          type: "TEXT",
          question: "",
          answer: "",
          image: undefined,
        });

        setHints([]);
        setImagePreview(null);
      }

      setImageSizeError(null);
      setCopied(false);

      return;
    }

    reset({
      type: draft.type,

      question:
        draft.question,

      answer:
        draft.answer,

      image: undefined,
    });

    setHints([
      ...draft.hints,
    ]);

    if (
      draft.type === "IMAGE" &&
      draft.imageUrl
    ) {
      setImagePreview(
        draft.imageUrl,
      );
    } else {
      setImagePreview(null);
    }

    setImageSizeError(null);
    setCopied(false);
  };

  /*
   * ============================================================
   * SAVE QUESTION TO BACKEND
   * ============================================================
   */

  const handleSaveQuestion = async (
    data: QuestionFormData,
  ) => {
    clearMessage();

    const validHints =
      hints
        .map((hint) =>
          hint.trim(),
        )
        .filter(Boolean);

    /*
     * TEXT QUESTION
     */

    if (
      data.type === "TEXT"
    ) {
      if (
        !data.question.trim()
      ) {
        showError(
          "Question is required.",
        );

        return null;
      }

      if (
        !data.answer.trim()
      ) {
        showError(
          "Answer is required.",
        );

        return null;
      }

      const result =
        await createTextHuntQuestionAsync(
          {
            huntId,

            questionType:
              data.type,

            question:
              data.question.trim(),

            answer:
              data.answer.trim(),

            hints:
              validHints.length > 0
                ? validHints
                : undefined,
          },
        );

      return {
        imageUrl:
          undefined,

        result,
      };
    }

    /*
     * IMAGE QUESTION
     */

    const selectedFile =
      data.image?.[0];

    /*
     * Existing uploaded image.
     */

    if (!selectedFile) {
      const existingImage =
        questionDrafts[
          questionNumber
        ]?.imageUrl ??
        savedQuestions.find(
          (question) =>
            question.number ===
            questionNumber,
        )?.imageUrl;

      if (!existingImage) {
        showError(
          "Please select a question image.",
        );

        return null;
      }

      const result =
        await createTextHuntQuestionAsync(
          {
            huntId,

            questionType:
              data.type,

            question:
              existingImage,

            answer:
              data.answer.trim(),

            hints:
              validHints.length > 0
                ? validHints
                : undefined,
          },
        );

      return {
        imageUrl:
          existingImage,

        result,
      };
    }

    /*
     * Image size validation.
     */

    if (
      selectedFile.size >
      MAX_IMAGE_SIZE
    ) {
      showError(
        "Image file is above 10 MB. Please choose a smaller image.",
      );

      return null;
    }

    /*
     * Upload image.
     */

    const imageUrl =
      await uploadImage(
        selectedFile,
      );

    /*
     * Save image question.
     */

    const result =
      await createTextHuntQuestionAsync(
        {
          huntId,

          questionType:
            data.type,

          question:
            imageUrl,

          answer:
            data.answer.trim(),

          hints:
            validHints.length > 0
              ? validHints
              : undefined,
        },
      );

    return {
      imageUrl,

      result,
    };
  };

  /*
   * ============================================================
   * MOVE TO NEXT QUESTION
   * ============================================================
   */

  const moveToNextQuestion = () => {
    const nextQuestionNumber =
      questionNumber + 1;

    const nextDraft =
      questionDrafts[
        nextQuestionNumber
      ];

    const nextSavedQuestion =
      savedQuestions.find(
        (question) =>
          question.number ===
          nextQuestionNumber,
      );

    setQuestionNumber(
      nextQuestionNumber,
    );

    /*
     * Prefer local draft.
     */

    if (nextDraft) {
      reset({
        type:
          nextDraft.type,

        question:
          nextDraft.question,

        answer:
          nextDraft.answer,

        image: undefined,
      });

      setHints([
        ...nextDraft.hints,
      ]);

      if (
        nextDraft.type ===
          "IMAGE" &&
        nextDraft.imageUrl
      ) {
        setImagePreview(
          nextDraft.imageUrl,
        );
      } else {
        setImagePreview(null);
      }

      setCopied(false);
      setImageSizeError(null);

      return;
    }

    /*
     * Otherwise restore saved question.
     */

    if (nextSavedQuestion) {
      reset({
        type:
          nextSavedQuestion.type,

        question:
          nextSavedQuestion.type ===
          "TEXT"
            ? nextSavedQuestion.question
            : "",

        answer:
          nextSavedQuestion.answer,

        image: undefined,
      });

      setHints([
        ...nextSavedQuestion.hints,
      ]);

      if (
        nextSavedQuestion.type ===
          "IMAGE" &&
        nextSavedQuestion.imageUrl
      ) {
        setImagePreview(
          nextSavedQuestion.imageUrl,
        );
      } else {
        setImagePreview(null);
      }
    } else {
      /*
       * New question.
       */

      reset({
        type: "TEXT",
        question: "",
        answer: "",
        image: undefined,
      });

      setHints([]);
      setImagePreview(null);
    }

    setCopied(false);
    setImageSizeError(null);
  };

  /*
   * ============================================================
   * SAVE & NEXT
   * ============================================================
   */

  const handleSaveAndNext = async (
    data: QuestionFormData,
  ) => {
    clearMessage();

    try {
      /*
       * Basic validation.
       */

      if (
        data.type === "IMAGE" &&
        !data.image?.[0] &&
        !questionDrafts[
          questionNumber
        ]?.imageUrl &&
        !savedQuestions.find(
          (question) =>
            question.number ===
              questionNumber &&
            question.imageUrl,
        )
      ) {
        showError(
          "Please select a question image.",
        );

        return;
      }

      if (
        data.type === "TEXT" &&
        !data.question.trim()
      ) {
        showError(
          "Question is required.",
        );

        return;
      }

      if (
        !data.answer.trim()
      ) {
        showError(
          "Answer is required.",
        );

        return;
      }

      /*
       * --------------------------------------------------------
       * IF ALREADY SAVED
       * --------------------------------------------------------
       */

      if (
        isQuestionAlreadySaved(
          questionNumber,
        )
      ) {
        saveCurrentDraft();

        moveToNextQuestion();

        return;
      }

      /*
       * --------------------------------------------------------
       * NEW QUESTION
       * --------------------------------------------------------
       */

      const currentDraft:
        QuestionDraft = {
        type: data.type,

        question:
          data.question?.trim() ??
          "",

        answer:
          data.answer.trim(),

        imageFile:
          data.image?.[0],

        imageUrl:
          questionDrafts[
            questionNumber
          ]?.imageUrl,

        hints:
          hints
            .map((hint) =>
              hint.trim(),
            )
            .filter(Boolean),
      };

      /*
       * Save draft first.
       */

      setQuestionDrafts(
        (previous) => ({
          ...previous,

          [questionNumber]:
            currentDraft,
        }),
      );

      /*
       * Save NEW question to backend.
       */

      const saved =
        await handleSaveQuestion(
          data,
        );

      if (!saved) {
        return;
      }

      /*
       * Create local saved question.
       */

      const newQuestion:
        SavedQuestion = {
        number:
          questionNumber,

        type:
          data.type,

        question:
          data.type === "TEXT"
            ? data.question.trim()
            : "Image challenge",

        answer:
          data.answer.trim(),

        imageUrl:
          saved.imageUrl,

        hints:
          hints
            .map((hint) =>
              hint.trim(),
            )
            .filter(Boolean),
      };

      /*
       * Mark this question as saved.
       */

      setSavedQuestions(
        (previous) => {
          const exists =
            previous.some(
              (question) =>
                question.number ===
                questionNumber,
            );

          if (exists) {
            return previous.map(
              (question) =>
                question.number ===
                questionNumber
                  ? newQuestion
                  : question,
            );
          }

          return [
            ...previous,
            newQuestion,
          ];
        },
      );

      /*
       * Store Cloudinary URL in draft.
       */

      const updatedDraft:
        QuestionDraft = {
        ...currentDraft,

        imageUrl:
          saved.imageUrl ??
          currentDraft.imageUrl,
      };

      setQuestionDrafts(
        (previous) => ({
          ...previous,

          [questionNumber]:
            updatedDraft,
        }),
      );

      showSuccess(
        `Question ${questionNumber} saved successfully.`,
      );

      /*
       * Move next.
       */

      moveToNextQuestion();
    } catch (error) {
      console.error(
        "Failed to save question:",
        error,
      );

      showError(
        "Something went wrong while saving the question. Please try again.",
      );
    }
  };

  /*
   * ============================================================
   * PREVIOUS QUESTION
   * ============================================================
   */

  const handlePreviousQuestion =
    () => {
      clearMessage();

      if (
        questionNumber <= 1
      ) {
        showError(
          "You are already on the first question.",
        );

        return;
      }

      saveCurrentDraft();

      const previousNumber =
        questionNumber - 1;

      setQuestionNumber(
        previousNumber,
      );

      restoreQuestion(
        previousNumber,
      );

      setCopied(false);
      setImageSizeError(null);
    };

  /*
   * ============================================================
   * ADD HINT
   * ============================================================
   */

  const handleAddHint =
    () => {
      clearMessage();

      if (
        hints.length >=
        MAX_HINTS
      ) {
        showError(
          "You can add a maximum of 3 hints.",
        );

        return;
      }

      setHints(
        (previous) => [
          ...previous,
          "",
        ],
      );
    };

  /*
   * ============================================================
   * REMOVE HINT
   * ============================================================
   */

  const handleRemoveHint = (
    index: number,
  ) => {
    setHints(
      (previous) =>
        previous.filter(
          (_, hintIndex) =>
            hintIndex !== index,
        ),
    );
  };

  /*
   * ============================================================
   * UPDATE HINT
   * ============================================================
   */

  const handleHintChange = (
    index: number,
    value: string,
  ) => {
    setHints(
      (previous) =>
        previous.map(
          (
            hint,
            hintIndex,
          ) =>
            hintIndex ===
            index
              ? value
              : hint,
        ),
    );
  };

  /*
   * ============================================================
   * COPY QUESTION
   * ============================================================
   */

  const handleCopyQuestion =
    async () => {
      if (
        !questionText?.trim()
      ) {
        showError(
          "There is no question to copy yet.",
        );

        return;
      }

      try {
        await navigator.clipboard.writeText(
          questionText,
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1800);
      } catch {
        showError(
          "Unable to copy the question.",
        );
      }
    };

  /*
   * ============================================================
   * NORMALIZE BACKEND QUESTIONS
   * ============================================================
   */

  const getBackendQuestions =
    (
      data: unknown,
    ): PreviewQuestion[] => {
      if (
        Array.isArray(data)
      ) {
        return data as PreviewQuestion[];
      }

      const nested =
        (
          data as {
            questions?: unknown;
          }
        )?.questions;

      if (
        Array.isArray(nested)
      ) {
        return nested as PreviewQuestion[];
      }

      return [];
    };

  /*
   * ============================================================
   * PREVIEW QUESTIONS
   * ============================================================
   */

  const previewQuestions =
    useMemo<PreviewQuestion[]>(
      () => {
        const questions =
          getBackendQuestions(
            questionData,
          );

        /*
         * Remove accidental duplicate
         * backend records.
         */

        const uniqueQuestions =
          questions.filter(
            (
              question,
              index,
              array,
            ) => {
              const firstIndex =
                array.findIndex(
                  (item) =>
                    item.questionType ===
                      question.questionType &&
                    item.question ===
                      question.question &&
                    item.answer ===
                      question.answer,
                );

              return (
                firstIndex ===
                index
              );
            },
          );

        /*
         * Remove questions deleted from
         * frontend preview.
         */
        return uniqueQuestions.filter(
          (question) =>
            !deletedPreviewQuestions.has(
              getQuestionKey(
                question,
              ),
            ),
        );
      },
      [
        questionData,
        deletedPreviewQuestions,
      ],
    );

  /*
   * ============================================================
   * DELETE PREVIEW QUESTION
   * ============================================================
   *
   * FRONTEND ONLY.
   *
   * Nothing is deleted from DB.
   */

  const handleDeletePreviewQuestion =
    (
      questionIndex: number,
    ) => {
      const questionToDelete =
        previewQuestions[
          questionIndex
        ];

      if (!questionToDelete) {
        return;
      }

      const questionKey =
        getQuestionKey(
          questionToDelete,
        );

      /*
       * Mark as deleted from preview.
       */
      setDeletedPreviewQuestions(
        (previous) => {
          const next =
            new Set(previous);

          next.add(
            questionKey,
          );

          return next;
        },
      );

      /*
       * Also remove matching local
       * saved question.
       */
      setSavedQuestions(
        (previous) => {
          const type =
            questionToDelete.questionType ??
            questionToDelete.type ??
            "TEXT";

          const questionValue =
            questionToDelete.question ??
            "";

          const answer =
            questionToDelete.answer ??
            "";

          return previous
            .filter(
              (savedQuestion) => {
                const matchesType =
                  savedQuestion.type ===
                  type;

                const matchesAnswer =
                  savedQuestion.answer ===
                  answer;

                const matchesQuestion =
                  type === "IMAGE"
                    ? savedQuestion.imageUrl ===
                      questionValue
                    : savedQuestion.question ===
                      questionValue;

                return !(
                  matchesType &&
                  matchesAnswer &&
                  matchesQuestion
                );
              },
            )
            .map(
              (
                question,
                index,
              ) => ({
                ...question,
                number:
                  index + 1,
              }),
            );
        },
      );

      showSuccess(
        `Question ${questionIndex + 1} removed from preview.`,
      );
    };

  /*
   * ============================================================
   * SYNC BACKEND QUESTIONS INTO LOCAL SAVED QUESTIONS
   * ============================================================
   */

  const syncBackendQuestions = (
    questions: PreviewQuestion[],
  ) => {
    const uniqueQuestions =
      questions.filter(
        (
          question,
          index,
          array,
        ) => {
          const firstIndex =
            array.findIndex(
              (item) =>
                item.questionType ===
                  question.questionType &&
                item.question ===
                  question.question &&
                item.answer ===
                  question.answer,
            );

          return (
            firstIndex ===
            index
          );
        },
      );

    const normalized:
      SavedQuestion[] =
      uniqueQuestions
        .filter(
          (question) =>
            !deletedPreviewQuestions.has(
              getQuestionKey(
                question,
              ),
            ),
        )
        .map(
          (
            question,
            index,
          ) => {
            const type =
              question.questionType ??
              question.type ??
              "TEXT";

            const questionValue =
              question.question ??
              "";

            return {
              number:
                index + 1,

              type,

              question:
                type === "TEXT"
                  ? questionValue
                  : "Image challenge",

              answer:
                question.answer ??
                "",

              imageUrl:
                type === "IMAGE"
                  ? questionValue
                  : undefined,

              hints:
                Array.isArray(
                  question.hints,
                )
                  ? question.hints.filter(
                      Boolean,
                    ) as string[]
                  : [],
            };
          },
        );

    if (
      normalized.length ===
      0
    ) {
      return;
    }

    setSavedQuestions(
      (previous) => {
        const merged = [
          ...previous,
        ];

        for (const question of normalized) {
          const existingIndex =
            merged.findIndex(
              (item) =>
                item.number ===
                question.number,
            );

          if (
            existingIndex >=
            0
          ) {
            merged[
              existingIndex
            ] = question;
          } else {
            merged.push(
              question,
            );
          }
        }

        return merged.sort(
          (a, b) =>
            a.number -
            b.number,
        );
      },
    );
  };

  /*
   * ============================================================
   * SAVE CURRENT QUESTION IF NEW
   * ============================================================
   */

  const saveCurrentQuestionIfNeeded =
    async () => {
      /*
       * Already saved?
       */

      if (
        isQuestionAlreadySaved(
          questionNumber,
        )
      ) {
        return true;
      }

      /*
       * Get current form values.
       */

      const currentData:
        QuestionFormData =
        {
          type:
            questionType,

          question:
            questionText ??
            "",

          answer:
            answerText ??
            "",

          image:
            selectedImage,
        };

      /*
       * Validate text question.
       */

      if (
        currentData.type ===
        "TEXT"
      ) {
        if (
          !currentData.question.trim()
        ) {
          showError(
            "Question is required.",
          );

          return false;
        }
      }

      /*
       * Validate answer.
       */

      if (
        !currentData.answer.trim()
      ) {
        showError(
          "Answer is required.",
        );

        return false;
      }

      /*
       * Validate image question.
       */

      if (
        currentData.type ===
        "IMAGE"
      ) {
        const existingImage =
          questionDrafts[
            questionNumber
          ]?.imageUrl;

        if (
          !currentData.image?.[0] &&
          !existingImage
        ) {
          showError(
            "Please select a question image.",
          );

          return false;
        }

        if (
          currentData.image?.[0] &&
          currentData.image[0]
            .size >
            MAX_IMAGE_SIZE
        ) {
          showError(
            "Image file is above 10 MB. Please choose a smaller image.",
          );

          return false;
        }
      }

      /*
       * Save to DB.
       */

      const saved =
        await handleSaveQuestion(
          currentData,
        );

      if (!saved) {
        return false;
      }

      /*
       * Mark current question as saved.
       */

      const newQuestion:
        SavedQuestion = {
        number:
          questionNumber,

        type:
          currentData.type,

        question:
          currentData.type ===
          "TEXT"
            ? currentData.question.trim()
            : "Image challenge",

        answer:
          currentData.answer.trim(),

        imageUrl:
          saved.imageUrl,

        hints:
          hints
            .map((hint) =>
              hint.trim(),
            )
            .filter(Boolean),
      };

      setSavedQuestions(
        (previous) => {
          const exists =
            previous.some(
              (question) =>
                question.number ===
                questionNumber,
            );

          if (exists) {
            return previous.map(
              (question) =>
                question.number ===
                questionNumber
                  ? newQuestion
                  : question,
            );
          }

          return [
            ...previous,
            newQuestion,
          ];
        },
      );

      /*
       * Save draft including uploaded
       * image URL.
       */

      setQuestionDrafts(
        (previous) => ({
          ...previous,

          [questionNumber]: {
            type:
              currentData.type,

            question:
              currentData.question?.trim() ??
              "",

            answer:
              currentData.answer.trim(),

            imageFile:
              currentData.image?.[0],

            imageUrl:
              saved.imageUrl ??
              previous[
                questionNumber
              ]?.imageUrl,

            hints:
              hints
                .map((hint) =>
                  hint.trim(),
                )
                .filter(Boolean),
          },
        }),
      );

      showSuccess(
        `Question ${questionNumber} saved successfully.`,
      );

      return true;
    };

  /*
   * ============================================================
   * FINISH / PREVIEW
   * ============================================================
   */

  const handlePreview = async () => {
    clearMessage();

    try {
      /*
       * Save current frontend state as draft.
       */

      saveCurrentDraft();

      /*
       * Save current question if new.
       */

      const currentQuestionSaved =
        await saveCurrentQuestionIfNeeded();

      if (
        !currentQuestionSaved
      ) {
        return;
      }

      /*
       * Fetch fresh hunt + questions.
       */

      const [
        huntResult,
        questionResult,
      ] = await Promise.all([
        refetchHunt(),
        refetchQuestions(),
      ]);

      /*
       * Validate hunt.
       */

      if (
        !huntResult.data
      ) {
        showError(
          "Unable to load hunt details.",
        );

        return;
      }

      /*
       * Validate questions.
       */

      if (
        !questionResult.data
      ) {
        showError(
          "Unable to load hunt questions.",
        );

        return;
      }

      /*
       * Synchronize backend questions
       * into local saved state.
       */

      const backendQuestions =
        getBackendQuestions(
          questionResult.data,
        );

      syncBackendQuestions(
        backendQuestions,
      );

      /*
       * Open final preview.
       */

      setFinished(true);
    } catch (error) {
      console.error(
        "Failed to load hunt preview:",
        error,
      );

      showError(
        "Unable to load hunt preview. Please try again.",
      );
    }
  };

  /*
   * ============================================================
   * CONTINUE EDITING
   * ============================================================
   */

  const handleContinueEditing =
    () => {
      clearMessage();

      setFinished(false);

      /*
       * Restore current question.
       */

      restoreQuestion(
        questionNumber,
      );

      setCopied(false);
      setImageSizeError(null);
    };

  /*
   * ============================================================
   * SAVE DRAFT
   * ============================================================
   */

  const handleSaveDraft =
    () => {
      saveCurrentDraft();

      showSuccess(
        "Your hunt has been saved as a draft.",
      );
    };

  /*
   * ============================================================
   * PUBLISH
   * ============================================================
   */

  const handlePublish =
    () => {
      showSuccess(
        "Your hunt is ready to be published.",
      );
    };

  /*
   * ============================================================
   * PREVIEW CALCULATIONS
   * ============================================================
   */

  const totalHints =
    previewQuestions.reduce(
      (
        total,
        question,
      ) => {
        const questionHints =
          Array.isArray(
            question?.hints,
          )
            ? question.hints.filter(
                Boolean,
              )
            : [];

        return (
          total +
          questionHints.length
        );
      },
      0,
    );

  /*
   * ============================================================
   * FINAL PREVIEW
   * ============================================================
   */

  if (finished) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#03050f] py-8 pt-20 sm:py-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[15%] top-[-200px] h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[150px]" />

          <div className="absolute right-[-150px] top-[25%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.06] blur-[150px]" />

          <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/[0.05] blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize:
                "42px 42px",
            }}
          />
        </div>

        <Container>
          <div className="relative mx-auto max-w-[1480px]">

            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={
                handleContinueEditing
              }
              className="group mb-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b0d18]/80 px-5 py-3 text-sm font-medium text-zinc-300 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-violet-500/[0.05] hover:text-white"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />

              Back to Questions
            </button>

            {/* HEADER */}

            <div className="mb-8">
              <div className="flex items-center gap-3">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-500/50 bg-violet-500/[0.08] text-violet-300 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
                  <Sparkles
                    size={32}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-violet-400">
                    <Sparkles
                      size={15}
                    />

                    Final Preview

                    <Sparkles
                      size={15}
                    />
                  </div>

                  <h1 className="mt-1 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Hunt{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                      Preview
                    </span>
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
                Review your adventure
                before sending it into
                the wild.
              </p>
            </div>

            {/* MAIN GRID */}

            {/*
             * CHANGED:
             *
             * lg:grid-cols-2
             *
             * Both containers now have exactly
             * the same width.
             */}

            <div className="grid items-start gap-6 lg:grid-cols-2">

              {/* LEFT */}

              <Card
                className="
                  min-w-0
                  overflow-hidden
                  border-white/15
                  bg-[#090c17]/90
                  p-0
                  shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                  backdrop-blur-xl
                  lg:sticky
                  lg:top-6
                  lg:self-start
                "
              >

                <div className="relative h-[400px] overflow-hidden sm:h-[500px]">

                  {huntData?.image ? (
                    <>
                      <img
                        src={
                          huntData.image
                        }
                        alt={
                          huntData.title ??
                          "Hunt"
                        }
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/50 to-transparent" />

                      <div className="absolute inset-0 bg-gradient-to-r from-[#070a13]/50 to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-950/40 to-indigo-950/30">
                      <Sparkles
                        size={60}
                        className="text-violet-400/30"
                      />
                    </div>
                  )}

                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-md">
                    <Sparkles
                      size={14}
                    />

                    Adventure Preview
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/40 bg-violet-500/10 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
                      <span className="text-4xl">
                        🏆
                      </span>
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                      {huntData?.title ??
                        "Your Hunt"}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
                      {huntData?.description ??
                        "Your hunt description"}
                    </p>

                    {huntData?.difficulty && (
                      <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] px-3 py-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                          {
                            huntData.difficulty
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">

                  <div className="bg-[#0a0d18] px-3 py-5 text-center">
                    <FileQuestion
                      size={24}
                      className="mx-auto mb-2 text-violet-400"
                    />

                    <p className="text-2xl font-bold text-white">
                      {
                        previewQuestions.length
                      }
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Challenges
                    </p>
                  </div>

                  <div className="bg-[#0a0d18] px-3 py-5 text-center">
                    <Lightbulb
                      size={24}
                      className="mx-auto mb-2 text-yellow-400"
                    />

                    <p className="text-2xl font-bold text-white">
                      {totalHints}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Hints
                    </p>
                  </div>

                  <div className="bg-[#0a0d18] px-3 py-5 text-center">
                    <CalendarDays
                      size={24}
                      className="mx-auto mb-2 text-blue-400"
                    />

                    <p className="text-xs font-bold text-white sm:text-sm">
                      {huntData?.createdAt
                        ? new Date(
                            huntData.createdAt,
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "--"}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Created
                    </p>
                  </div>
                </div>
              </Card>

              {/* RIGHT */}

              <Card
                className="
                  min-w-0
                  overflow-hidden
                  border-white/15
                  bg-[#090c17]/90
                  p-5
                  shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                  backdrop-blur-xl
                  sm:p-6
                  lg:max-h-[calc(100vh-100px)]
                  lg:overflow-y-auto
                "
              >

                <div className="mb-6 flex items-center justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Challenges
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Review every challenge
                      in your hunt.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-xl border border-violet-500/30 bg-violet-500/[0.06] px-4 py-3">
                    <span className="text-lg font-bold text-violet-300">
                      {
                        previewQuestions.length
                      }
                    </span>

                    <span className="ml-1 text-sm text-zinc-300">
                      Challenges
                    </span>
                  </div>
                </div>

                <div className="space-y-3">

                  {previewQuestions.map(
                    (
                      question,
                      index,
                    ) => {

                      const type =
                        question?.questionType ??
                        question?.type ??
                        "TEXT";

                      const answer =
                        question?.answer ??
                        "";

                      const hintsForQuestion =
                        Array.isArray(
                          question?.hints,
                        )
                          ? question.hints.filter(
                              Boolean,
                            )
                          : [];

                      const questionValue =
                        question?.question ??
                        "";

                      const isImage =
                        type ===
                        "IMAGE";

                      const imageUrl =
                        isImage
                          ? questionValue
                          : undefined;

                      return (
                        <div
                          key={`${type}-${questionValue}-${answer}-${index}`}
                          className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-500/25 hover:bg-violet-500/[0.025]"
                        >

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
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                                  {imageUrl && (
                                    <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:w-28">
                                      <img
                                        src={
                                          imageUrl
                                        }
                                        alt="Question"
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  )}

                                  <p className="text-sm font-medium leading-5 text-zinc-200">
                                    Image
                                    challenge
                                  </p>
                                </div>
                              ) : (
                                <p className="text-sm font-medium leading-5 text-zinc-200">
                                  {
                                    questionValue
                                  }
                                </p>
                              )}
                            </div>

                            <div className="hidden min-w-[100px] border-l border-white/[0.07] pl-5 md:block">
                              <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                                Answer
                              </p>

                              <div className="mt-2 inline-flex max-w-[100px] rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5">
                                <span className="truncate text-xs font-semibold text-violet-300">
                                  {
                                    answer
                                  }
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
                                  {
                                    hintsForQuestion.length
                                  }
                                </span>
                              </div>
                            </div>

                            {/* QUESTION NUMBER + DELETE */}

                            <div className="flex shrink-0 items-center gap-2">

                              {/* NUMBER */}

                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition group-hover:border-violet-500/30 group-hover:bg-violet-500/10 group-hover:text-violet-300">
                                <span className="text-xs font-bold">
                                  {index + 1}
                                </span>
                              </div>

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeletePreviewQuestion(
                                    index,
                                  )
                                }
                                title={`Delete question ${index + 1}`}
                                aria-label={`Delete question ${index + 1}`}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/10 bg-red-500/[0.03] text-zinc-600 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>

                            </div>
                          </div>

                          <div className="mt-4 flex gap-3 border-t border-white/[0.06] pt-3 md:hidden">

                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                Answer
                              </p>

                              <span className="mt-1 inline-block max-w-[150px] truncate rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-xs font-semibold text-violet-300">
                                {
                                  answer
                                }
                              </span>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                Hints
                              </p>

                              <span className="mt-1 inline-flex items-center gap-1 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.08] px-2.5 py-1 text-xs font-semibold text-yellow-300">
                                <Lightbulb
                                  size={12}
                                />

                                {
                                  hintsForQuestion.length
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}

                  {previewQuestions.length ===
                    0 && (
                    <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
                      <FileQuestion
                        size={36}
                        className="mx-auto text-zinc-700"
                      />

                      <p className="mt-3 text-sm font-medium text-zinc-400">
                        No questions found
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        Add questions before
                        previewing the hunt.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* ACTION BAR */}

            <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-[#090c17]/90 p-4 backdrop-blur-xl sm:grid-cols-3 sm:p-5">

              <Button
                variant="secondary"
                size="lg"
                onClick={
                  handleContinueEditing
                }
                leftIcon={
                  <Eye size={19} />
                }
              >
                <div className="text-left">
                  <p className="font-bold">
                    Continue Editing
                  </p>

                  <p className="mt-0.5 text-xs font-normal text-zinc-500">
                    Go back to questions
                  </p>
                </div>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={
                  handleSaveDraft
                }
                leftIcon={
                  <Save size={19} />
                }
              >
                <div className="text-left">
                  <p className="font-bold">
                    Save Draft
                  </p>

                  <p className="mt-0.5 text-xs font-normal text-zinc-500">
                    Save your progress
                  </p>
                </div>
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={
                  handlePublish
                }
                leftIcon={
                  <Globe size={19} />
                }
              >
                <div className="text-left">
                  <p className="font-bold">
                    Publish Hunt
                  </p>

                  <p className="mt-0.5 text-xs font-normal text-white/60">
                    Make your hunt live
                  </p>
                </div>
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 text-sm text-zinc-500">
              <Sparkles
                size={15}
                className="text-violet-400"
              />

              Your adventure is
              almost ready

              <Sparkles
                size={15}
                className="text-violet-400"
              />
            </div>
          </div>
        </Container>
      </main>
    );
  }

  /*
   * ============================================================
   * MAIN QUESTION PAGE
   * ============================================================
   */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060608] py-8 pt-24 sm:py-10">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[130px]" />

        <div className="absolute bottom-[-250px] left-[-180px] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />

        <div className="absolute right-[-180px] top-[35%] h-[450px] w-[450px] rounded-full bg-purple-600/[0.035] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize:
              "70px 70px",
          }}
        />
      </div>

      <Container>
        <div className="relative mx-auto max-w-2xl">

          {/* BACK */}

          <Link
            href="/dashboard"
            className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 py-2 text-xs text-zinc-500 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to dashboard
          </Link>

          {/* HEADER */}

          <div className="mb-5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
              <Sparkles
                size={13}
              />

              Hunt Question
            </div>

            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Add a Challenge
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-600 sm:text-sm">
              Create a challenge
              explorers need to solve
              before continuing.
            </p>
          </div>

          {/* QUESTION NUMBER */}

          <div className="relative z-10 mb-[-17px] flex flex-col items-center">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/25 bg-[#101014] shadow-[0_8px_25px_rgba(139,92,246,0.15)]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/[0.08]">
                <span className="text-xs font-bold text-violet-300">
                  {
                    questionNumber
                  }
                </span>
              </div>
            </div>

            <span className="mt-1 rounded-full border border-white/[0.06] bg-[#09090b] px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-zinc-600">
              Question{" "}
              {questionNumber}
            </span>
          </div>

          {/* MESSAGE */}

          {pageMessage && (
            <div
              className={`relative z-20 mb-3 flex items-start gap-2 rounded-xl border p-3 text-xs ${
                pageMessageType ===
                "error"
                  ? "border-red-500/20 bg-red-500/[0.06] text-red-300"
                  : "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
              }`}
            >
              {pageMessageType ===
              "error" ? (
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0"
                />
              )}

              <p>
                {pageMessage}
              </p>
            </div>
          )}

          {/* MAIN CARD */}

          <Card className="relative overflow-hidden border-white/10 bg-[#0b0b0e]/95 p-4 pt-8 shadow-[0_20px_65px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6 sm:pt-9">

            <form
              onSubmit={handleSubmit(
                handleSaveAndNext,
              )}
              className="relative"
            >

              {/* QUESTION TYPE */}

              <div>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-white">
                    Challenge type
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Choose how explorers
                    receive your clue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">

                  {/* TEXT */}

                  <label className="group cursor-pointer">
                    <input
                      type="radio"
                      value="TEXT"
                      {...register(
                        "type",
                      )}
                      className="peer sr-only"
                    />

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all group-hover:border-white/20 peer-checked:border-violet-500/40 peer-checked:bg-violet-500/[0.06]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                        <HelpCircle
                          size={17}
                        />
                      </div>

                      <p className="mt-2 text-xs font-semibold text-white">
                        Text Challenge
                      </p>

                      <p className="mt-0.5 text-[10px] text-zinc-600">
                        Riddle or question
                      </p>
                    </div>
                  </label>

                  {/* IMAGE */}

                  <label className="group cursor-pointer">
                    <input
                      type="radio"
                      value="IMAGE"
                      {...register(
                        "type",
                      )}
                      className="peer sr-only"
                    />

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all group-hover:border-white/20 peer-checked:border-cyan-500/40 peer-checked:bg-cyan-500/[0.05]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                        <ImagePlus
                          size={17}
                        />
                      </div>

                      <p className="mt-2 text-xs font-semibold text-white">
                        Image Challenge
                      </p>

                      <p className="mt-0.5 text-[10px] text-zinc-600">
                        Investigate an image
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* TEXT QUESTION */}

              {questionType ===
                "TEXT" && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="question"
                      className="text-xs font-medium text-zinc-300"
                    >
                      Your question{" "}
                      <span className="text-red-400">
                        *
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={
                        handleCopyQuestion
                      }
                      disabled={
                        !questionText?.trim()
                      }
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-zinc-600 transition hover:bg-white/5 hover:text-violet-300 disabled:opacity-30"
                    >
                      {copied ? (
                        <>
                          <Check
                            size={12}
                          />

                          Copied
                        </>
                      ) : (
                        <>
                          <Copy
                            size={12}
                          />

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
                      {
                        required:
                          "Question is required",

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
                      <AlertCircle
                        size={12}
                      />

                      {
                        errors
                          .question
                          .message
                      }
                    </p>
                  )}
                </div>
              )}

              {/* IMAGE QUESTION */}

              {questionType ===
                "IMAGE" && (
                <div className="mt-5">

                  <label
                    htmlFor="image"
                    className="mb-2 block text-xs font-medium text-zinc-300"
                  >
                    Question image{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <label
                    htmlFor="image"
                    className="group block cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/[0.02] transition hover:border-violet-500/30"
                  >
                    {imagePreview ? (
                      <div className="relative h-[210px] overflow-hidden bg-[#08080a] sm:h-[230px]">

                        <img
                          src={
                            imagePreview
                          }
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-15 blur-2xl"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="relative flex h-full items-center justify-center p-3">
                          <img
                            src={
                              imagePreview
                            }
                            alt="Question preview"
                            className="max-h-full max-w-full object-contain drop-shadow-2xl"
                          />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-8">
                          <p className="truncate text-[11px] text-white">
                            {imageFile?.name ??
                              "Uploaded image"}
                          </p>

                          <p className="mt-0.5 text-[9px] text-zinc-500">
                            Click to
                            change
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-[170px] flex-col items-center justify-center p-5 text-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                          <ImagePlus
                            size={22}
                          />
                        </div>

                        <p className="mt-3 text-xs font-semibold text-white">
                          Add clue image
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-600">
                          PNG, JPG or
                          WEBP • Max
                          10 MB
                        </p>
                      </div>
                    )}
                  </label>

                  <input
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    {...register(
                      "image",
                    )}
                    className="hidden"
                  />

                  {imageSizeError && (
                    <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle
                        size={12}
                      />

                      {
                        imageSizeError
                      }
                    </p>
                  )}
                </div>
              )}

              {/* ANSWER */}

              <div className="mt-5">

                <label
                  htmlFor="answer"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Correct answer{" "}
                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <div className="relative">
                  <input
                    id="answer"
                    type="text"
                    maxLength={100}
                    placeholder="Map"
                    {...register(
                      "answer",
                      {
                        required:
                          "Correct answer is required",

                        validate:
                          (
                            value,
                          ) =>
                            value
                              .trim()
                              .length >
                              0 ||
                            "Answer cannot be empty.",
                      },
                    )}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 pr-10 text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/[0.04]"
                  />

                  <CheckCircle2
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/70"
                  />
                </div>

                {errors.answer && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
                    <AlertCircle
                      size={12}
                    />

                    {
                      errors
                        .answer
                        .message
                    }
                  </p>
                )}
              </div>

              {/* HINTS */}

              <div className="mt-5 border-t border-white/[0.06] pt-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/10">
                      <Lightbulb
                        size={14}
                        className="text-yellow-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white">
                        Helpful hints
                      </p>

                      <p className="text-[9px] text-zinc-600">
                        Optional • up
                        to 3
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleAddHint
                    }
                    disabled={
                      hints.length >=
                      MAX_HINTS
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5 text-[10px] font-semibold text-violet-300 transition hover:bg-violet-500/[0.1] disabled:opacity-30"
                  >
                    <Plus
                      size={13}
                    />

                    Add hint
                  </button>
                </div>

                {hints.length >
                  0 && (
                  <div className="mt-3 space-y-2">

                    {hints.map(
                      (
                        hint,
                        index,
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-3"
                        >

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">

                              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-yellow-400/10 text-[9px] font-bold text-yellow-400">
                                {
                                  index +
                                  1
                                }
                              </span>

                              <span className="text-[10px] font-semibold text-zinc-400">
                                Hint{" "}
                                {index +
                                  1}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveHint(
                                  index,
                                )
                              }
                              className="rounded-md p-1.5 text-zinc-700 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2
                                size={
                                  13
                                }
                              />
                            </button>
                          </div>

                          <textarea
                            value={
                              hint
                            }
                            onChange={(
                              event,
                            ) =>
                              handleHintChange(
                                index,
                                event
                                  .target
                                  .value,
                              )
                            }
                            rows={2}
                            placeholder="Give explorers a gentle clue..."
                            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/30"
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}

                {hints.length ===
                  0 && (
                  <div className="mt-3 rounded-xl border border-dashed border-white/[0.06] px-4 py-4 text-center">
                    <Lightbulb
                      size={16}
                      className="mx-auto text-zinc-700"
                    />

                    <p className="mt-1.5 text-[10px] text-zinc-700">
                      No hints
                      added.
                    </p>
                  </div>
                )}
              </div>

              {/* ACTIONS */}

              <div className="mt-6 border-t border-white/[0.06] pt-5">

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

                  <button
                    type="button"
                    onClick={
                      handlePreviousQuestion
                    }
                    disabled={
                      questionNumber <=
                        1 ||
                      isSubmitting
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-xs font-semibold text-zinc-500 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    <ArrowLeft
                      size={14}
                    />

                    Previous
                  </button>

                  <div className="flex gap-2">

                    <Button
                      variant="secondary"
                      size="md"
                      type="submit"
                      loading={
                        isSubmitting
                      }
                      leftIcon={
                        <Plus
                          size={16}
                        />
                      }
                    >
                      {isQuestionAlreadySaved(
                        questionNumber,
                      ) ? (
                        "Next"
                      ) : (
                        "Save & Next"
                      )}
                    </Button>

                    <Button
                      variant="primary"
                      size="md"
                      type="button"
                      onClick={
                        handlePreview
                      }
                      leftIcon={
                        <Send size={15} />
                      }
                    >
                      Finish
                    </Button>
                  </div>
                </div>

                <div className="mt-3 text-center text-[9px] text-zinc-700">
                  {
                    savedQuestions.length
                  }
                  /2 minimum
                  questions
                  saved
                </div>
              </div>

            </form>
          </Card>

          {/* FOOTER */}

          <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-zinc-800">
            <div className="h-px w-6 bg-zinc-800" />

            Build a clever hunt

            <div className="h-px w-6 bg-zinc-800" />
          </div>
        </div>
      </Container>
    </main>
  );
}