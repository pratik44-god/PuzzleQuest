// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

// import Container from "~/components/ui/container";
// import Card from "~/components/ui/cardd";
// import { BackLink } from "~/components/ui/back-link";

// import {
//   useCreateTextHuntQuestion,
//   useUploadImage,
//   useGetHuntById,
//   useGetHuntQuestionById,
//   useDeleteHuntQuestionsById,
//   useUpdateHuntQuestionByIdAndIndex,
//   useUpdateHuntStatus,
//   useUpdateHuntTag,
// } from "~/hooks/api/hunt";

// import {
//   DEFAULT_HUNT_TAG,
//   HUNT_TAG_FROM_API,
//   HUNT_TAG_TO_API,
//   type HuntTagApi,
//   type HuntTagLabel,
// } from "~/lib/hunt-tags";

// import AnswerField from "./AnswerField";
// import HintsSection from "./HintsSection";
// import ImageQuestion from "./ImageQuestionField";
// import QuestionActions from "./QuestionActions";
// import QuestionHeader from "./QuestionHeader";
// import QuestionMessage from "./QuestionMessage";
// import QuestionNumber from "./QuestionNumber";
// import QuestionType from "./QuestionTypeSelector";
// import TextQuestion from "./TextQuestionField";

// import FinalPreview from "./preview/FinalPreview";

// import {
//   getQuestionStorageKey,
//   MAX_HINTS,
//   MAX_IMAGE_SIZE,
//   type PersistedQuestionState,
//   type PreviewQuestion,
//   type QuestionDraft,
//   type QuestionFormData,
//   type QuestionPageProps,
//   type SavedQuestion,
// } from "./constants";

// export default function CreateQuestion({
//   huntId,
// }: QuestionPageProps) {
//   const router = useRouter();
//   const storageKey = getQuestionStorageKey(huntId);

//   const [hydrated, setHydrated] = useState(false);
//   const [hints, setHints] = useState<string[]>([]);
//   const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
//   const [questionDrafts, setQuestionDrafts] = useState<
//     Record<number, QuestionDraft>
//   >({});
//   const [questionNumber, setQuestionNumber] = useState(0);
//   const [finished, setFinished] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [pageMessage, setPageMessage] = useState<string | null>(null);
//   const [pageMessageType, setPageMessageType] = useState<
//     "error" | "success"
//   >("error");
//   const [imageSizeError, setImageSizeError] = useState<string | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedTag, setSelectedTag] = useState<HuntTagLabel>(
//     DEFAULT_HUNT_TAG,
//   );

//   const { createTextHuntQuestionAsync } = useCreateTextHuntQuestion();

//   const { uploadImage } = useUploadImage();

//   const {
//     data: huntData,
//     refetch: refetchHunt,
//   } = useGetHuntById(huntId);

//   const {
//     data: questionData,
//     refetch: refetchQuestions,
//   } = useGetHuntQuestionById(huntId);

//   const { deleteHuntQuestionsByIdAsync } =
//     useDeleteHuntQuestionsById();

//   const {
//     updateHuntQuestionByIdAndIndexAsync,
//     isPending: isUpdatingQuestion,
//   } = useUpdateHuntQuestionByIdAndIndex();

//   const {
//     updateHuntStatusAsync,
//     isPending: isUpdatingStatus,
//   } = useUpdateHuntStatus();

//   const {
//     updateHuntTagAsync,
//     isPending: isUpdatingTag,
//   } = useUpdateHuntTag();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     clearErrors,
//     formState: { errors, isSubmitting },
//   } = useForm<QuestionFormData>({
//     defaultValues: {
//       type: "TEXT",
//       question: "",
//       answer: "",
//       image: undefined,
//     },
//     shouldUnregister: true,
//   });

//   const questionType = watch("type");
//   const questionText = watch("question");
//   const answerText = watch("answer");
//   const selectedImage = watch("image");
//   const imageFile = selectedImage?.[0];

//   // IMPORTANT:
//   // Clear old validation errors when switching questions or challenge type.
//   // This prevents "Question is required" from remaining when IMAGE
//   // questions use the optional question text field.
//   useEffect(() => {
//     clearErrors("question");
//   }, [questionNumber, questionType, clearErrors]);

//   const showError = (message: string) => {
//     setPageMessage(message);
//     setPageMessageType("error");
//   };

//   const showSuccess = (message: string) => {
//     setPageMessage(message);
//     setPageMessageType("success");
//   };

//   const clearMessage = () => {
//     setPageMessage(null);
//   };

//   const isQuestionAlreadySaved = (number: number) =>
//     savedQuestions.some(
//       (question) => question.number === number,
//     );

//   const getBackendQuestions = (
//     data: unknown,
//   ): PreviewQuestion[] => {
//     if (Array.isArray(data)) {
//       return data as PreviewQuestion[];
//     }

//     const nested = (data as {
//       questions?: unknown;
//     })?.questions;

//     return Array.isArray(nested)
//       ? (nested as PreviewQuestion[])
//       : [];
//   };

//   const previewQuestions = useMemo<PreviewQuestion[]>(() => {
//     return [...getBackendQuestions(questionData)].sort(
//       (a, b) =>
//         (a.questionIndex ?? 0) -
//         (b.questionIndex ?? 0),
//     );
//   }, [questionData]);

//   const displayQuestionNumber = questionNumber + 1;

//   const savedQuestionsRef = useRef(savedQuestions);
//   const questionDraftsRef = useRef(questionDrafts);

//   savedQuestionsRef.current = savedQuestions;
//   questionDraftsRef.current = questionDrafts;

//   useEffect(() => {
//     try {
//       const raw = window.localStorage.getItem(storageKey);

//       if (raw) {
//         const saved = JSON.parse(raw) as PersistedQuestionState;

//         const restoredQuestionNumber = Math.max(
//           0,
//           saved.questionNumber ?? 0,
//         );

//         const restoredDrafts = Object.fromEntries(
//           Object.entries(saved.questionDrafts ?? {}).map(
//             ([key, draft]) => [
//               key,
//               { ...draft },
//             ],
//           ),
//         );

//         const restoredSavedQuestions =
//           saved.savedQuestions ?? [];

//         setQuestionNumber(restoredQuestionNumber);
//         setFinished(Boolean(saved.finished));
//         setSavedQuestions(restoredSavedQuestions);
//         setQuestionDrafts(restoredDrafts);

//         if (saved.selectedTag) {
//           setSelectedTag(saved.selectedTag);
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Unable to restore hunt editor state:",
//         error,
//       );
//     } finally {
//       setHydrated(true);
//     }
//   }, [storageKey]);

//   useEffect(() => {
//     if (!huntData?.tag) {
//       return;
//     }

//     setSelectedTag(
//       HUNT_TAG_FROM_API[huntData.tag as HuntTagApi] ??
//         DEFAULT_HUNT_TAG,
//     );
//   }, [huntData?.tag]);

//   useEffect(() => {
//     if (!hydrated) return;

//     const timer = window.setTimeout(() => {
//       setQuestionDrafts((previous) => ({
//         ...previous,
//         [questionNumber]: {
//           type: questionType,
//           question: questionText ?? "",
//           answer: answerText ?? "",
//           imageFile,
//           imageUrl: previous[questionNumber]?.imageUrl,
//           hints: [...hints],
//         },
//       }));
//     }, 250);

//     return () => window.clearTimeout(timer);
//   }, [
//     hydrated,
//     questionNumber,
//     questionType,
//     questionText,
//     answerText,
//     imageFile,
//     hints,
//   ]);

//   useEffect(() => {
//     if (!hydrated) return;

//     const serializableDrafts = Object.fromEntries(
//       Object.entries(questionDrafts).map(
//         ([number, draft]) => [
//           number,
//           {
//             type: draft.type,
//             question: draft.question,
//             answer: draft.answer,
//             imageUrl: draft.imageUrl,
//             hints: draft.hints,
//           },
//         ],
//       ),
//     );

//     const payload: PersistedQuestionState = {
//       questionNumber,
//       finished,
//       selectedTag,
//       savedQuestions,
//       questionDrafts: serializableDrafts,
//       deletedPreviewQuestions: [],
//     };

//     try {
//       window.localStorage.setItem(
//         storageKey,
//         JSON.stringify(payload),
//       );
//     } catch (error) {
//       console.error(
//         "Unable to persist hunt editor state:",
//         error,
//       );
//     }
//   }, [
//     hydrated,
//     storageKey,
//     questionNumber,
//     finished,
//     selectedTag,
//     savedQuestions,
//     questionDrafts,
//   ]);

//   useEffect(() => {
//     if (!imageFile) return;

//     if (imageFile.size > MAX_IMAGE_SIZE) {
//       setImagePreview(null);

//       setImageSizeError(
//         "Image file is above 10 MB. Please choose a smaller image.",
//       );

//       return;
//     }

//     setImageSizeError(null);

//     const url = URL.createObjectURL(imageFile);

//     setImagePreview(url);

//     return () => URL.revokeObjectURL(url);
//   }, [imageFile]);

//   useEffect(() => {
//     if (questionType === "TEXT") {
//       setImagePreview(null);
//     }
//   }, [questionType]);

//   const syncBackendQuestions = (
//     questions: PreviewQuestion[],
//   ) => {
//     const normalized: SavedQuestion[] = [...questions]
//       .filter(
//         (question) =>
//           question.questionIndex !== undefined &&
//           question.questionIndex !== null,
//       )
//       .sort(
//         (a, b) =>
//           (a.questionIndex ?? 0) -
//           (b.questionIndex ?? 0),
//       )
//       .map((question) => {
//         const type =
//           question.questionType ??
//           question.type ??
//           "TEXT";

//         const questionValue =
//           question.question ?? "";

//         return {
//           number: question.questionIndex!,
//           type,
//           question:
//             type === "TEXT"
//               ? questionValue
//               : question.questionText ?? "",
//           answer: question.answer ?? "",
//           imageUrl:
//             type === "IMAGE"
//               ? questionValue
//               : undefined,
//           hints: Array.isArray(question.hints)
//             ? (question.hints.filter(Boolean) as string[])
//             : [],
//         };
//       });

//     setSavedQuestions((previous) => {
//       if (
//         JSON.stringify(previous) ===
//         JSON.stringify(normalized)
//       ) {
//         return previous;
//       }

//       savedQuestionsRef.current = normalized;

//       return normalized;
//     });

//     const existingQuestionIndexes = new Set(
//       normalized.map(
//         (question) => question.number,
//       ),
//     );

//     setQuestionDrafts((previous) => {
//       const next: Record<number, QuestionDraft> = {};

//       for (const [key, draft] of Object.entries(previous)) {
//         const index = Number(key);

//         if (existingQuestionIndexes.has(index)) {
//           next[index] = draft;
//         }
//       }

//       if (
//         JSON.stringify(previous) ===
//         JSON.stringify(next)
//       ) {
//         return previous;
//       }

//       return next;
//     });
//   };

//   useEffect(() => {
//     if (
//       !hydrated ||
//       questionData === undefined
//     ) {
//       return;
//     }

//     const backendQuestions =
//       getBackendQuestions(questionData);

//     syncBackendQuestions(backendQuestions);
//   }, [hydrated, questionData]);

//   const restoreQuestion = (
//     number: number,
//   ) => {
//     clearErrors();

//     const draft =
//       questionDraftsRef.current[number];

//     if (draft) {
//       reset({
//         type: draft.type,
//         question: draft.question,
//         answer: draft.answer,
//         image: undefined,
//       });

//       setHints([
//         ...(draft.hints ?? []),
//       ]);

//       setImagePreview(
//         draft.imageUrl ?? null,
//       );

//       setImageSizeError(null);
//       setCopied(false);

//       return;
//     }

//     const savedQuestion =
//       savedQuestionsRef.current.find(
//         (question) =>
//           question.number === number,
//       );

//     if (savedQuestion) {
//       reset({
//         type: savedQuestion.type,
//         question: savedQuestion.question,
//         answer: savedQuestion.answer,
//         image: undefined,
//       });

//       setHints([
//         ...(savedQuestion.hints ?? []),
//       ]);

//       setImagePreview(
//         savedQuestion.imageUrl ?? null,
//       );
//     } else {
//       reset({
//         type: "TEXT",
//         question: "",
//         answer: "",
//         image: undefined,
//       });

//       setHints([]);
//       setImagePreview(null);
//     }

//     setImageSizeError(null);
//     setCopied(false);
//   };

//   useEffect(() => {
//     if (!hydrated) return;

//     restoreQuestion(questionNumber);
//   }, [hydrated, questionNumber]);

//   const saveCurrentDraft = () => {
//     setQuestionDrafts((previous) => ({
//       ...previous,
//       [questionNumber]: {
//         type: questionType,
//         question: questionText ?? "",
//         answer: answerText ?? "",
//         imageFile,
//         imageUrl:
//           previous[questionNumber]?.imageUrl,
//         hints: [...hints],
//       },
//     }));
//   };

//   const handleSaveQuestion = async (
//     data: QuestionFormData,
//   ) => {
//     clearMessage();

//     const validHints = hints
//       .map((hint) => hint.trim())
//       .filter(Boolean);

//     if (data.type === "TEXT") {
//       if (!data.question.trim()) {
//         showError("Question is required.");
//         return null;
//       }

//       if (!data.answer.trim()) {
//         showError("Answer is required.");
//         return null;
//       }

//       const result =
//         await createTextHuntQuestionAsync({
//           huntId,
//           questionType: data.type,
//           question: data.question.trim(),
//           answer: data.answer.trim(),
//           hints:
//             validHints.length
//               ? validHints
//               : undefined,
//         });

//       return {
//         imageUrl: undefined,
//         result,
//       };
//     }

//     const selectedFile =
//       data.image?.[0];

//     if (!selectedFile) {
//       const existingImage =
//         questionDrafts[questionNumber]?.imageUrl ??
//         savedQuestions.find(
//           (question) =>
//             question.number === questionNumber,
//         )?.imageUrl;

//       if (!existingImage) {
//         showError(
//           "Please select a question image.",
//         );

//         return null;
//       }

//       const result =
//         await createTextHuntQuestionAsync({
//           huntId,
//           questionType: data.type,
//           question: existingImage,
//           questionText:
//             data.question.trim() || undefined,
//           answer: data.answer.trim(),
//           hints:
//             validHints.length
//               ? validHints
//               : undefined,
//         });

//       return {
//         imageUrl: existingImage,
//         result,
//       };
//     }

//     if (
//       selectedFile.size >
//       MAX_IMAGE_SIZE
//     ) {
//       showError(
//         "Image file is above 10 MB. Please choose a smaller image.",
//       );

//       return null;
//     }

//     const imageUrl =
//       await uploadImage(selectedFile);

//     const result =
//       await createTextHuntQuestionAsync({
//         huntId,
//         questionType: data.type,
//         question: imageUrl,
//         questionText:
//           data.question.trim() || undefined,
//         answer: data.answer.trim(),
//         hints:
//           validHints.length
//             ? validHints
//             : undefined,
//       });

//     return {
//       imageUrl,
//       result,
//     };
//   };

//   const handleUpdateQuestion = async (
//     data: QuestionFormData,
//   ) => {
//     clearMessage();

//     const validHints = hints
//       .map((hint) => hint.trim())
//       .filter(Boolean);

//     if (
//       data.type === "TEXT" &&
//       !data.question.trim()
//     ) {
//       showError("Question is required.");
//       return;
//     }

//     if (!data.answer.trim()) {
//       showError("Answer is required.");
//       return;
//     }

//     try {
//       let questionValue =
//         data.question.trim();

//       if (data.type === "IMAGE") {
//         const selectedFile =
//           data.image?.[0];

//         if (selectedFile) {
//           if (
//             selectedFile.size >
//             MAX_IMAGE_SIZE
//           ) {
//             showError(
//               "Image file is above 10 MB. Please choose a smaller image.",
//             );

//             return;
//           }

//           questionValue =
//             await uploadImage(
//               selectedFile,
//             );
//         } else {
//           questionValue =
//             questionDrafts[
//               questionNumber
//             ]?.imageUrl ??
//             savedQuestions.find(
//               (question) =>
//                 question.number ===
//                 questionNumber,
//             )?.imageUrl ??
//             "";
//         }

//         if (!questionValue) {
//           showError(
//             "Please select a question image.",
//           );

//           return;
//         }
//       }

//       await updateHuntQuestionByIdAndIndexAsync({
//         huntId,
//         questionIndex: questionNumber,
//         questionType: data.type,
//         question: questionValue,
//         questionText:
//           data.type === "IMAGE"
//             ? data.question.trim() || undefined
//             : undefined,
//         answer: data.answer.trim(),
//         hints: validHints,
//       });

//       setSavedQuestions((previous) =>
//         previous.map((question) =>
//           question.number === questionNumber
//             ? {
//                 ...question,
//                 type: data.type,
//                 question: data.question.trim(),
//                 answer: data.answer.trim(),
//                 imageUrl:
//                   data.type === "IMAGE"
//                     ? questionValue
//                     : question.imageUrl,
//                 hints: validHints,
//               }
//             : question,
//         ),
//       );

//       setQuestionDrafts((previous) => ({
//         ...previous,
//         [questionNumber]: {
//           ...previous[questionNumber],
//           type: data.type,
//           question: data.question.trim(),
//           answer: data.answer.trim(),
//           imageFile: data.image?.[0],
//           imageUrl:
//             data.type === "IMAGE"
//               ? questionValue
//               : previous[questionNumber]?.imageUrl,
//           hints: validHints,
//         },
//       }));

//       if (data.type === "IMAGE") {
//         setImagePreview(questionValue);
//       }

//       showSuccess(
//         `Question ${displayQuestionNumber} updated successfully.`,
//       );
//     } catch (error) {
//       console.error(
//         "Failed to update question:",
//         error,
//       );

//       showError(
//         "Unable to update the question. Please try again.",
//       );
//     }
//   };

//   const getNextQuestionNumber = (
//     currentNumber: number,
//   ) => {
//     const numbers = savedQuestions
//       .map(
//         (question) =>
//           question.number,
//       )
//       .filter(
//         (number) =>
//           number > currentNumber,
//       )
//       .sort((a, b) => a - b);

//     return numbers[0] ?? null;
//   };

//   const getPreviousQuestionNumber = (
//     currentNumber: number,
//   ) => {
//     const numbers = savedQuestions
//       .map(
//         (question) =>
//           question.number,
//       )
//       .filter(
//         (number) =>
//           number < currentNumber,
//       )
//       .sort((a, b) => b - a);

//     return numbers[0] ?? null;
//   };

//   const moveToNextQuestion = () => {
//     setQuestionNumber((currentNumber) => {
//       const numbers =
//         savedQuestionsRef.current
//           .map(
//             (question) =>
//               question.number,
//           )
//           .filter(
//             (number) =>
//               number > currentNumber,
//           )
//           .sort(
//             (left, right) =>
//               left - right,
//           );

//       return (
//         numbers[0] ??
//         currentNumber + 1
//       );
//     });
//   };

//   const handleSaveAndNext = async (
//     data: QuestionFormData,
//   ) => {
//     clearMessage();

//     if (
//       data.type === "IMAGE" &&
//       !data.image?.[0] &&
//       !questionDrafts[
//         questionNumber
//       ]?.imageUrl &&
//       !savedQuestions.find(
//         (question) =>
//           question.number ===
//           questionNumber,
//       )?.imageUrl
//     ) {
//       showError(
//         "Please select a question image.",
//       );

//       return;
//     }

//     if (
//       data.type === "TEXT" &&
//       !data.question.trim()
//     ) {
//       showError(
//         "Question is required.",
//       );

//       return;
//     }

//     if (!data.answer.trim()) {
//       showError(
//         "Answer is required.",
//       );

//       return;
//     }

//     if (
//       isQuestionAlreadySaved(
//         questionNumber,
//       )
//     ) {
//       saveCurrentDraft();
//       moveToNextQuestion();
//       return;
//     }

//     try {
//       const currentDraft: QuestionDraft = {
//         type: data.type,
//         question:
//           data.question?.trim() ??
//           "",
//         answer: data.answer.trim(),
//         imageFile: data.image?.[0],
//         imageUrl:
//           questionDrafts[
//             questionNumber
//           ]?.imageUrl,
//         hints: hints
//           .map((hint) => hint.trim())
//           .filter(Boolean),
//       };

//       setQuestionDrafts(
//         (previous) => ({
//           ...previous,
//           [questionNumber]:
//             currentDraft,
//         }),
//       );

//       const saved =
//         await handleSaveQuestion(data);

//       if (!saved) return;

//       const newQuestion: SavedQuestion = {
//         number: questionNumber,
//         type: data.type,
//         question: data.question.trim(),
//         answer: data.answer.trim(),
//         imageUrl: saved.imageUrl,
//         hints: hints
//           .map((hint) => hint.trim())
//           .filter(Boolean),
//       };

//       setSavedQuestions(
//         (previous) => {
//           const exists =
//             previous.some(
//               (question) =>
//                 question.number ===
//                 questionNumber,
//             );

//           const next = exists
//             ? previous.map(
//                 (question) =>
//                   question.number ===
//                   questionNumber
//                     ? newQuestion
//                     : question,
//               )
//             : [
//                 ...previous,
//                 newQuestion,
//               ].sort(
//                 (a, b) =>
//                   a.number -
//                   b.number,
//               );

//           savedQuestionsRef.current = next;

//           return next;
//         },
//       );

//       setQuestionDrafts(
//         (previous) => ({
//           ...previous,
//           [questionNumber]: {
//             ...currentDraft,
//             imageUrl:
//               saved.imageUrl ??
//               currentDraft.imageUrl,
//           },
//         }),
//       );

//       showSuccess(
//         `Question ${displayQuestionNumber} saved successfully.`,
//       );

//       moveToNextQuestion();
//     } catch (error) {
//       console.error(
//         "Failed to save question:",
//         error,
//       );

//       const message =
//         error instanceof Error
//           ? error.message
//           : "Something went wrong while saving the question. Please try again.";

//       showError(message);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     clearMessage();

//     const previousNumber =
//       getPreviousQuestionNumber(
//         questionNumber,
//       );

//     if (
//       previousNumber === null
//     ) {
//       showError(
//         "You are already on the first question.",
//       );

//       return;
//     }

//     saveCurrentDraft();

//     setQuestionNumber(
//       previousNumber,
//     );

//     setCopied(false);
//     setImageSizeError(null);
//   };

//   const handleAddHint = () => {
//     clearMessage();

//     if (hints.length >= MAX_HINTS) {
//       showError(
//         "You can add a maximum of 3 hints.",
//       );

//       return;
//     }

//     setHints((previous) => [
//       ...previous,
//       "",
//     ]);
//   };

//   const handleRemoveHint = (
//     index: number,
//   ) => {
//     setHints((previous) =>
//       previous.filter(
//         (_, hintIndex) =>
//           hintIndex !== index,
//       ),
//     );
//   };

//   const handleHintChange = (
//     index: number,
//     value: string,
//   ) => {
//     setHints((previous) =>
//       previous.map(
//         (hint, hintIndex) =>
//           hintIndex === index
//             ? value
//             : hint,
//       ),
//     );
//   };

//   const handleCopyQuestion =
//     async () => {
//       if (!questionText?.trim()) {
//         showError(
//           "There is no question to copy yet.",
//         );

//         return;
//       }

//       try {
//         await navigator.clipboard.writeText(
//           questionText,
//         );

//         setCopied(true);

//         window.setTimeout(
//           () => setCopied(false),
//           1800,
//         );
//       } catch {
//         showError(
//           "Unable to copy the question.",
//         );
//       }
//     };

//   const handleDeletePreviewQuestion =
//     async (
//       questionIndex: number,
//     ) => {
//       try {
//         clearMessage();

//         const question =
//           previewQuestions.find(
//             (item) =>
//               item.questionIndex ===
//               questionIndex,
//           ) ??
//           previewQuestions[
//             questionIndex
//           ];

//         const actualQuestionIndex =
//           question?.questionIndex ??
//           questionIndex;

//         if (
//           actualQuestionIndex ===
//             undefined ||
//           actualQuestionIndex === null
//         ) {
//           showError(
//             "Unable to identify the question.",
//           );

//           return;
//         }

//         await deleteHuntQuestionsByIdAsync({
//           huntId,
//           questionIndex:
//             actualQuestionIndex,
//         });

//         const remainingSaved =
//           savedQuestions
//             .filter(
//               (question) =>
//                 question.number !==
//                 actualQuestionIndex,
//             )
//             .sort(
//               (left, right) =>
//                 left.number -
//                 right.number,
//             );

//         setSavedQuestions(
//           remainingSaved,
//         );

//         savedQuestionsRef.current =
//           remainingSaved;

//         setQuestionDrafts(
//           (previous) => {
//             const next = {
//               ...previous,
//             };

//             delete next[
//               actualQuestionIndex
//             ];

//             return next;
//           },
//         );

//         if (
//           questionNumber ===
//           actualQuestionIndex
//         ) {
//           const nextSaved =
//             remainingSaved[0];

//           if (nextSaved) {
//             setQuestionNumber(
//               nextSaved.number,
//             );

//             reset({
//               type: nextSaved.type,
//               question:
//                 nextSaved.question,
//               answer:
//                 nextSaved.answer,
//               image: undefined,
//             });

//             setHints(
//               nextSaved.hints ?? [],
//             );

//             setImagePreview(
//               nextSaved.imageUrl ??
//                 null,
//             );
//           } else {
//             setQuestionNumber(0);

//             reset({
//               type: "TEXT",
//               question: "",
//               answer: "",
//               image: undefined,
//             });

//             setHints([]);
//             setImagePreview(null);
//           }
//         }

//         showSuccess(
//           `Question ${actualQuestionIndex + 1} deleted successfully.`,
//         );
//       } catch (error) {
//         console.error(
//           "Failed to delete question:",
//           error,
//         );

//         showError(
//           "Unable to delete the question. Please try again.",
//         );
//       }
//     };

//   const saveCurrentQuestionIfNeeded =
//     async () => {
//       if (
//         isQuestionAlreadySaved(
//           questionNumber,
//         )
//       ) {
//         return true;
//       }

//       const currentData: QuestionFormData = {
//         type: questionType,
//         question:
//           questionText ?? "",
//         answer:
//           answerText ?? "",
//         image: selectedImage,
//       };

//       if (
//         currentData.type ===
//           "TEXT" &&
//         !currentData.question.trim()
//       ) {
//         showError(
//           "Question is required.",
//         );

//         return false;
//       }

//       if (
//         !currentData.answer.trim()
//       ) {
//         showError(
//           "Answer is required.",
//         );

//         return false;
//       }

//       if (
//         currentData.type ===
//         "IMAGE"
//       ) {
//         const existingImage =
//           questionDrafts[
//             questionNumber
//           ]?.imageUrl;

//         if (
//           !currentData.image?.[0] &&
//           !existingImage
//         ) {
//           showError(
//             "Please select a question image.",
//           );

//           return false;
//         }

//         if (
//           currentData.image?.[0] &&
//           currentData.image[0].size >
//             MAX_IMAGE_SIZE
//         ) {
//           showError(
//             "Image file is above 10 MB. Please choose a smaller image.",
//           );

//           return false;
//         }
//       }

//       const saved =
//         await handleSaveQuestion(
//           currentData,
//         );

//       if (!saved) return false;

//       const newQuestion: SavedQuestion = {
//         number: questionNumber,
//         type: currentData.type,
//         question:
//           currentData.type ===
//           "TEXT"
//             ? currentData.question.trim()
//             : "",
//         answer:
//           currentData.answer.trim(),
//         imageUrl:
//           saved.imageUrl,
//         hints: hints
//           .map((hint) => hint.trim())
//           .filter(Boolean),
//       };

//       setSavedQuestions(
//         (previous) => {
//           const exists =
//             previous.some(
//               (question) =>
//                 question.number ===
//                 questionNumber,
//             );

//           return exists
//             ? previous.map(
//                 (question) =>
//                   question.number ===
//                   questionNumber
//                     ? newQuestion
//                     : question,
//               )
//             : [
//                 ...previous,
//                 newQuestion,
//               ].sort(
//                 (a, b) =>
//                   a.number -
//                   b.number,
//               );
//         },
//       );

//       setQuestionDrafts(
//         (previous) => ({
//           ...previous,
//           [questionNumber]: {
//             type: currentData.type,
//             question:
//               currentData.question?.trim() ??
//               "",
//             answer:
//               currentData.answer.trim(),
//             imageFile:
//               currentData.image?.[0],
//             imageUrl:
//               saved.imageUrl ??
//               previous[
//                 questionNumber
//               ]?.imageUrl,
//             hints: hints
//               .map((hint) =>
//                 hint.trim(),
//               )
//               .filter(Boolean),
//           },
//         }),
//       );

//       showSuccess(
//         `Question ${displayQuestionNumber} saved successfully.`,
//       );

//       return true;
//     };

//   const handlePreview = async () => {
//     clearMessage();

//     try {
//       if (savedQuestions.length < 2) {
//         showError(
//           "Please save at least 2 questions before finishing.",
//         );

//         return;
//       }


//       saveCurrentDraft();

//       const currentData: QuestionFormData = {
//         type: questionType,
//         question:
//           questionText ?? "",
//         answer:
//           answerText ?? "",
//         image: selectedImage,
//       };

//       const hasContent =
//         currentData.type ===
//         "TEXT"
//           ? Boolean(
//               currentData.question.trim() ||
//                 currentData.answer.trim(),
//             )
//           : Boolean(
//               currentData.answer.trim() ||
//                 currentData.image?.[0] ||
//                 questionDrafts[
//                   questionNumber
//                 ]?.imageUrl ||
//                 savedQuestions.find(
//                   (q) =>
//                     q.number ===
//                     questionNumber,
//                 )?.imageUrl,
//             );

//       if (
//         !isQuestionAlreadySaved(
//           questionNumber,
//         ) &&
//         hasContent
//       ) {
//         const currentQuestionSaved =
//           await saveCurrentQuestionIfNeeded();

//         if (!currentQuestionSaved) {
//           return;
//         }
//       }

//       const [
//         huntResult,
//         questionResult,
//       ] = await Promise.all([
//         refetchHunt(),
//         refetchQuestions(),
//       ]);

//       if (!huntResult.data) {
//         showError(
//           "Unable to load hunt details.",
//         );

//         return;
//       }

//       if (!questionResult.data) {
//         showError(
//           "Unable to load hunt questions.",
//         );

//         return;
//       }

//       syncBackendQuestions(
//         getBackendQuestions(
//           questionResult.data,
//         ),
//       );

//       setFinished(true);
//     } catch (error) {
//       console.error(
//         "Failed to load hunt preview:",
//         error,
//       );

//       showError(
//         "Unable to load hunt preview. Please try again.",
//       );
//     }
//   };

//   const handleContinueEditing =
//     () => {
//       clearMessage();
//       clearErrors();
//       setFinished(false);

//       const currentQuestionStillExists =
//         savedQuestions.some(
//           (question) =>
//             question.number ===
//             questionNumber,
//         );

//       if (
//         !currentQuestionStillExists
//       ) {
//         const firstRemainingQuestion =
//           [...savedQuestions].sort(
//             (a, b) =>
//               a.number -
//               b.number,
//           )[0];

//         if (firstRemainingQuestion) {
//           setQuestionNumber(
//             firstRemainingQuestion.number,
//           );

//           restoreQuestion(
//             firstRemainingQuestion.number,
//           );
//         } else {
//           setQuestionNumber(0);

//           reset({
//             type: "TEXT",
//             question: "",
//             answer: "",
//             image: undefined,
//           });

//           setHints([]);
//           setImagePreview(null);
//         }
//       } else {
//         restoreQuestion(
//           questionNumber,
//         );
//       }

//       setCopied(false);
//       setImageSizeError(null);
//     };

//   const handleSaveDraft = async () => {
//     saveCurrentDraft();

//     try {
//       await updateHuntTagAsync({
//         id: huntId,
//         tag: HUNT_TAG_TO_API[selectedTag],
//       });

//       await updateHuntStatusAsync({
//         id: huntId,
//         status: "DRAFT",
//       });

//       window.localStorage.removeItem(
//         storageKey,
//       );

//       showSuccess(
//         "Your hunt has been saved as a draft.",
//       );

//       router.push("/dashboard");
//     } catch (error) {
//       console.error(
//         "Failed to save draft:",
//         error,
//       );

//       showError(
//         "Unable to save draft. Please try again.",
//       );
//     }
//   };

//   const handlePublish = async () => {
//     if (
//       previewQuestions.length === 0
//     ) {
//       showError(
//         "Add at least one question before publishing.",
//       );

//       return;
//     }

//     try {
//       await updateHuntTagAsync({
//         id: huntId,
//         tag: HUNT_TAG_TO_API[selectedTag],
//       });

//       await updateHuntStatusAsync({
//         id: huntId,
//         status: "PUBLISHED",
//       });

//       window.localStorage.removeItem(
//         storageKey,
//       );

//       showSuccess(
//         "Your hunt has been published successfully.",
//       );

//       router.push("/dashboard");
//     } catch (error) {
//       console.error(
//         "Failed to publish hunt:",
//         error,
//       );

//       showError(
//         "Unable to publish hunt. Please try again.",
//       );
//     }
//   };

//   const totalHints =
//     previewQuestions.reduce(
//       (total, question) => {
//         const questionHints =
//           Array.isArray(
//             question?.hints,
//           )
//             ? question.hints.filter(
//                 Boolean,
//               )
//             : [];

//         return (
//           total +
//           questionHints.length
//         );
//       },
//       0,
//     );

//   if (finished) {
//     return (
//       <FinalPreview
//         huntData={huntData}
//         huntId={huntId}
//         questions={previewQuestions}
//         totalHints={totalHints}
//         selectedTag={selectedTag}
//         onTagChange={setSelectedTag}
//         onBack={handleContinueEditing}
//         onDeleteQuestion={
//           handleDeletePreviewQuestion
//         }
//         onSaveDraft={handleSaveDraft}
//         onPublish={handlePublish}
//         isLoading={
//           isUpdatingStatus ||
//           isUpdatingTag
//         }
//       />
//     );
//   }

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#060608] py-8 pt-24 sm:py-10">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute left-1/2 top-[-260px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[130px]" />

//         <div className="absolute bottom-[-250px] left-[-180px] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />

//         <div className="absolute right-[-180px] top-[35%] h-[450px] w-[450px] rounded-full bg-purple-600/[0.035] blur-[120px]" />

//         <div
//           className="absolute inset-0 opacity-[0.015]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
//             backgroundSize:
//               "70px 70px",
//           }}
//         />
//       </div>

//       <Container>
//         <div className="relative mx-auto max-w-2xl">
//           <BackLink
//             href="/dashboard"
//             label="Back to dashboard"
//             className="mb-6"
//           />

//           <QuestionHeader />

//           <QuestionNumber
//             questionNumber={
//               displayQuestionNumber
//             }
//           />

//           <QuestionMessage
//             message={pageMessage}
//             type={pageMessageType}
//           />

//           <Card className="relative overflow-hidden border-white/10 bg-[#0b0b0e]/95 p-4 pt-8 shadow-[0_20px_65px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6 sm:pt-9">
//             <form
//               onSubmit={handleSubmit(
//                 handleSaveAndNext,
//               )}
//               className="relative"
//             >
//               <QuestionType
//                 register={register}
//               />

//               {questionType ===
//                 "TEXT" && (
//                 <TextQuestion
//                   register={register}
//                   errors={errors}
//                   questionText={
//                     questionText
//                   }
//                   copied={copied}
//                   onCopy={
//                     handleCopyQuestion
//                   }
//                 />
//               )}

//               {questionType ===
//                 "IMAGE" && (
//                 <>
//                   <ImageQuestion
//                     register={register}
//                     imagePreview={
//                       imagePreview
//                     }
//                     imageFile={
//                       imageFile
//                     }
//                     imageSizeError={
//                       imageSizeError
//                     }
//                   />

//                   <TextQuestion
//                     register={register}
//                     errors={errors}
//                     questionText={
//                       questionText
//                     }
//                     copied={copied}
//                     onCopy={
//                       handleCopyQuestion
//                     }
//                     optional
//                   />
//                 </>
//               )}

//               <AnswerField
//                 register={register}
//                 errors={errors}
//               />

//               <HintsSection
//                 hints={hints}
//                 onAdd={handleAddHint}
//                 onRemove={
//                   handleRemoveHint
//                 }
//                 onChange={
//                   handleHintChange
//                 }
//               />

//               <QuestionActions
//                 questionNumber={
//                   displayQuestionNumber
//                 }
//                 isSubmitting={
//                   isSubmitting
//                 }
//                 alreadySaved={isQuestionAlreadySaved(
//                   questionNumber,
//                 )}
//                 savedCount={
//                   savedQuestions.length
//                 }
//                 isUpdatingQuestion={
//                   isUpdatingQuestion
//                 }
//                 onPrevious={
//                   handlePreviousQuestion
//                 }
//                 onChange={handleSubmit(
//                   handleUpdateQuestion,
//                 )}
//                 onPreview={
//                   handlePreview
//                 }
//               />
//             </form>
//           </Card>

//           <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-zinc-800">
//             <div className="h-px w-6 bg-zinc-800" />

//             Build a clever hunt

//             <div className="h-px w-6 bg-zinc-800" />
//           </div>
//         </div>
//       </Container>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import { BackLink } from "~/components/ui/back-link";

import {
  useCreateTextHuntQuestion,
  useUploadImage,
  useGetHuntById,
  useGetHuntQuestionById,
  useDeleteHuntQuestionsById,
  useUpdateHuntQuestionByIdAndIndex,
  useUpdateHuntStatus,
  useUpdateHuntTag,
} from "~/hooks/api/hunt";

import {
  DEFAULT_HUNT_TAG,
  HUNT_TAG_FROM_API,
  HUNT_TAG_TO_API,
  type HuntTagApi,
  type HuntTagLabel,
} from "~/lib/hunt-tags";

import AnswerField from "./AnswerField";
import HintsSection from "./HintsSection";
import ImageQuestion from "./ImageQuestionField";
import QuestionActions from "./QuestionActions";
import QuestionHeader from "./QuestionHeader";
import QuestionMessage from "./QuestionMessage";
import QuestionNumber from "./QuestionNumber";
import QuestionType from "./QuestionTypeSelector";
import TextQuestion from "./TextQuestionField";

import FinalPreview from "./preview/FinalPreview";

import {
  getQuestionStorageKey,
  MAX_HINTS,
  MAX_IMAGE_SIZE,
  type PersistedQuestionState,
  type PreviewQuestion,
  type QuestionDraft,
  type QuestionFormData,
  type QuestionPageProps,
  type SavedQuestion,
} from "./constants";

const MAX_HUNT_QUESTIONS = 5;

export default function CreateQuestion({
  huntId,
}: QuestionPageProps) {
  const router = useRouter();
  const storageKey = getQuestionStorageKey(huntId);

  const [hydrated, setHydrated] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [questionDrafts, setQuestionDrafts] = useState<
    Record<number, QuestionDraft>
  >({});
  const [questionNumber, setQuestionNumber] = useState(0);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageMessage, setPageMessage] = useState<string | null>(null);
  const [pageMessageType, setPageMessageType] = useState<
    "error" | "success"
  >("error");
  const [imageSizeError, setImageSizeError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<HuntTagLabel>(
    DEFAULT_HUNT_TAG,
  );

  const { createTextHuntQuestionAsync } = useCreateTextHuntQuestion();

  const { uploadImage } = useUploadImage();

  const {
    data: huntData,
    refetch: refetchHunt,
  } = useGetHuntById(huntId);

  const {
    data: questionData,
    refetch: refetchQuestions,
  } = useGetHuntQuestionById(huntId);

  const { deleteHuntQuestionsByIdAsync } =
    useDeleteHuntQuestionsById();

  const {
    updateHuntQuestionByIdAndIndexAsync,
    isPending: isUpdatingQuestion,
  } = useUpdateHuntQuestionByIdAndIndex();

  const {
    updateHuntStatusAsync,
    isPending: isUpdatingStatus,
  } = useUpdateHuntStatus();

  const {
    updateHuntTagAsync,
    isPending: isUpdatingTag,
  } = useUpdateHuntTag();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormData>({
    defaultValues: {
      type: "TEXT",
      question: "",
      answer: "",
      image: undefined,
    },
    shouldUnregister: true,
  });

  const questionType = watch("type");
  const questionText = watch("question");
  const answerText = watch("answer");
  const selectedImage = watch("image");
  const imageFile = selectedImage?.[0];

  // IMPORTANT:
  // Clear old validation errors when switching questions or challenge type.
  // This prevents "Question is required" from remaining when IMAGE
  // questions use the optional question text field.
  useEffect(() => {
    clearErrors("question");
  }, [questionNumber, questionType, clearErrors]);

  const showError = (message: string) => {
    setPageMessage(message);
    setPageMessageType("error");
  };

  const showSuccess = (message: string) => {
    setPageMessage(message);
    setPageMessageType("success");
  };

  const clearMessage = () => {
    setPageMessage(null);
  };

  const isQuestionAlreadySaved = (number: number) =>
    savedQuestions.some(
      (question) => question.number === number,
    );

  const getBackendQuestions = (
    data: unknown,
  ): PreviewQuestion[] => {
    if (Array.isArray(data)) {
      return data as PreviewQuestion[];
    }

    const nested = (data as {
      questions?: unknown;
    })?.questions;

    return Array.isArray(nested)
      ? (nested as PreviewQuestion[])
      : [];
  };

  const previewQuestions = useMemo<PreviewQuestion[]>(() => {
    return [...getBackendQuestions(questionData)]
      .sort(
        (a, b) =>
          (a.questionIndex ?? 0) -
          (b.questionIndex ?? 0),
      )
      .slice(0, MAX_HUNT_QUESTIONS);
  }, [questionData]);

  const displayQuestionNumber = questionNumber + 1;

  const savedQuestionsRef = useRef(savedQuestions);
  const questionDraftsRef = useRef(questionDrafts);

  savedQuestionsRef.current = savedQuestions;
  questionDraftsRef.current = questionDrafts;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);

      if (raw) {
        const saved = JSON.parse(raw) as PersistedQuestionState;

        const restoredQuestionNumber = Math.min(
          MAX_HUNT_QUESTIONS - 1,
          Math.max(0, saved.questionNumber ?? 0),
        );

        const restoredDrafts = Object.fromEntries(
          Object.entries(saved.questionDrafts ?? {})
            .filter(
              ([key]) => Number(key) < MAX_HUNT_QUESTIONS,
            )
            .map(([key, draft]) => [
              key,
              { ...draft },
            ]),
        );

        const restoredSavedQuestions =
          (saved.savedQuestions ?? []).filter(
            (question) => question.number < MAX_HUNT_QUESTIONS,
          );

        setQuestionNumber(restoredQuestionNumber);
        setFinished(Boolean(saved.finished));
        setSavedQuestions(restoredSavedQuestions);
        setQuestionDrafts(restoredDrafts);

        if (saved.selectedTag) {
          setSelectedTag(saved.selectedTag);
        }
      }
    } catch (error) {
      console.error(
        "Unable to restore hunt editor state:",
        error,
      );
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!huntData?.tag) {
      return;
    }

    setSelectedTag(
      HUNT_TAG_FROM_API[huntData.tag as HuntTagApi] ??
        DEFAULT_HUNT_TAG,
    );
  }, [huntData?.tag]);

  useEffect(() => {
    if (!hydrated) return;

    const timer = window.setTimeout(() => {
      setQuestionDrafts((previous) => ({
        ...previous,
        [questionNumber]: {
          type: questionType,
          question: questionText ?? "",
          answer: answerText ?? "",
          imageFile,
          imageUrl: previous[questionNumber]?.imageUrl,
          hints: [...hints],
        },
      }));
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    hydrated,
    questionNumber,
    questionType,
    questionText,
    answerText,
    imageFile,
    hints,
  ]);

  useEffect(() => {
    if (!hydrated) return;

    const serializableDrafts = Object.fromEntries(
      Object.entries(questionDrafts).map(
        ([number, draft]) => [
          number,
          {
            type: draft.type,
            question: draft.question,
            answer: draft.answer,
            imageUrl: draft.imageUrl,
            hints: draft.hints,
          },
        ],
      ),
    );

    const payload: PersistedQuestionState = {
      questionNumber,
      finished,
      selectedTag,
      savedQuestions: savedQuestions.slice(
        0,
        MAX_HUNT_QUESTIONS,
      ),
      questionDrafts: serializableDrafts,
      deletedPreviewQuestions: [],
    };

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(payload),
      );
    } catch (error) {
      console.error(
        "Unable to persist hunt editor state:",
        error,
      );
    }
  }, [
    hydrated,
    storageKey,
    questionNumber,
    finished,
    selectedTag,
    savedQuestions,
    questionDrafts,
  ]);

  useEffect(() => {
    if (!imageFile) return;

    if (imageFile.size > MAX_IMAGE_SIZE) {
      setImagePreview(null);

      setImageSizeError(
        "Image file is above 10 MB. Please choose a smaller image.",
      );

      return;
    }

    setImageSizeError(null);

    const url = URL.createObjectURL(imageFile);

    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (questionType === "TEXT") {
      setImagePreview(null);
    }
  }, [questionType]);

  const syncBackendQuestions = (
    questions: PreviewQuestion[],
  ) => {
    const normalized: SavedQuestion[] = [...questions]
      .filter(
        (question) =>
          question.questionIndex !== undefined &&
          question.questionIndex !== null,
      )
      .sort(
        (a, b) =>
          (a.questionIndex ?? 0) -
          (b.questionIndex ?? 0),
      )
      .map((question) => {
        const type =
          question.questionType ??
          question.type ??
          "TEXT";

        const questionValue =
          question.question ?? "";

        return {
          number: question.questionIndex!,
          type,
          question:
            type === "TEXT"
              ? questionValue
              : question.questionText ?? "",
          answer: question.answer ?? "",
          imageUrl:
            type === "IMAGE"
              ? questionValue
              : undefined,
          hints: Array.isArray(question.hints)
            ? (question.hints.filter(Boolean) as string[])
            : [],
        };
      });

    const limitedNormalized = normalized.slice(
      0,
      MAX_HUNT_QUESTIONS,
    );

    setSavedQuestions((previous) => {
      if (
        JSON.stringify(previous) ===
        JSON.stringify(limitedNormalized)
      ) {
        return previous;
      }

      savedQuestionsRef.current = limitedNormalized;

      return limitedNormalized;
    });

    const existingQuestionIndexes = new Set(
      limitedNormalized.map(
        (question) => question.number,
      ),
    );

    setQuestionDrafts((previous) => {
      const next: Record<number, QuestionDraft> = {};

      for (const [key, draft] of Object.entries(previous)) {
        const index = Number(key);

        if (existingQuestionIndexes.has(index)) {
          next[index] = draft;
        }
      }

      if (
        JSON.stringify(previous) ===
        JSON.stringify(next)
      ) {
        return previous;
      }

      return next;
    });
  };

  useEffect(() => {
    if (
      !hydrated ||
      questionData === undefined
    ) {
      return;
    }

    const backendQuestions =
      getBackendQuestions(questionData);

    syncBackendQuestions(backendQuestions);
  }, [hydrated, questionData]);

  const restoreQuestion = (
    number: number,
  ) => {
    clearErrors();

    const draft =
      questionDraftsRef.current[number];

    if (draft) {
      reset({
        type: draft.type,
        question: draft.question,
        answer: draft.answer,
        image: undefined,
      });

      setHints([
        ...(draft.hints ?? []),
      ]);

      setImagePreview(
        draft.imageUrl ?? null,
      );

      setImageSizeError(null);
      setCopied(false);

      return;
    }

    const savedQuestion =
      savedQuestionsRef.current.find(
        (question) =>
          question.number === number,
      );

    if (savedQuestion) {
      reset({
        type: savedQuestion.type,
        question: savedQuestion.question,
        answer: savedQuestion.answer,
        image: undefined,
      });

      setHints([
        ...(savedQuestion.hints ?? []),
      ]);

      setImagePreview(
        savedQuestion.imageUrl ?? null,
      );
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
  };

  useEffect(() => {
    if (!hydrated) return;

    restoreQuestion(questionNumber);
  }, [hydrated, questionNumber]);

  const saveCurrentDraft = () => {
    setQuestionDrafts((previous) => ({
      ...previous,
      [questionNumber]: {
        type: questionType,
        question: questionText ?? "",
        answer: answerText ?? "",
        imageFile,
        imageUrl:
          previous[questionNumber]?.imageUrl,
        hints: [...hints],
      },
    }));
  };

  const handleSaveQuestion = async (
    data: QuestionFormData,
  ) => {
    clearMessage();

    const validHints = hints
      .map((hint) => hint.trim())
      .filter(Boolean);

    if (data.type === "TEXT") {
      if (!data.question.trim()) {
        showError("Question is required.");
        return null;
      }

      if (!data.answer.trim()) {
        showError("Answer is required.");
        return null;
      }

      const result =
        await createTextHuntQuestionAsync({
          huntId,
          questionType: data.type,
          question: data.question.trim(),
          answer: data.answer.trim(),
          hints:
            validHints.length
              ? validHints
              : undefined,
        });

      return {
        imageUrl: undefined,
        result,
      };
    }

    const selectedFile =
      data.image?.[0];

    if (!selectedFile) {
      const existingImage =
        questionDrafts[questionNumber]?.imageUrl ??
        savedQuestions.find(
          (question) =>
            question.number === questionNumber,
        )?.imageUrl;

      if (!existingImage) {
        showError(
          "Please select a question image.",
        );

        return null;
      }

      const result =
        await createTextHuntQuestionAsync({
          huntId,
          questionType: data.type,
          question: existingImage,
          questionText:
            data.question.trim() || undefined,
          answer: data.answer.trim(),
          hints:
            validHints.length
              ? validHints
              : undefined,
        });

      return {
        imageUrl: existingImage,
        result,
      };
    }

    if (
      selectedFile.size >
      MAX_IMAGE_SIZE
    ) {
      showError(
        "Image file is above 10 MB. Please choose a smaller image.",
      );

      return null;
    }

    const imageUrl =
      await uploadImage(selectedFile);

    const result =
      await createTextHuntQuestionAsync({
        huntId,
        questionType: data.type,
        question: imageUrl,
        questionText:
          data.question.trim() || undefined,
        answer: data.answer.trim(),
        hints:
          validHints.length
            ? validHints
            : undefined,
      });

    return {
      imageUrl,
      result,
    };
  };

  const handleUpdateQuestion = async (
    data: QuestionFormData,
  ) => {
    clearMessage();

    const validHints = hints
      .map((hint) => hint.trim())
      .filter(Boolean);

    if (
      data.type === "TEXT" &&
      !data.question.trim()
    ) {
      showError("Question is required.");
      return;
    }

    if (!data.answer.trim()) {
      showError("Answer is required.");
      return;
    }

    try {
      let questionValue =
        data.question.trim();

      if (data.type === "IMAGE") {
        const selectedFile =
          data.image?.[0];

        if (selectedFile) {
          if (
            selectedFile.size >
            MAX_IMAGE_SIZE
          ) {
            showError(
              "Image file is above 10 MB. Please choose a smaller image.",
            );

            return;
          }

          questionValue =
            await uploadImage(
              selectedFile,
            );
        } else {
          questionValue =
            questionDrafts[
              questionNumber
            ]?.imageUrl ??
            savedQuestions.find(
              (question) =>
                question.number ===
                questionNumber,
            )?.imageUrl ??
            "";
        }

        if (!questionValue) {
          showError(
            "Please select a question image.",
          );

          return;
        }
      }

      await updateHuntQuestionByIdAndIndexAsync({
        huntId,
        questionIndex: questionNumber,
        questionType: data.type,
        question: questionValue,
        questionText:
          data.type === "IMAGE"
            ? data.question.trim() || undefined
            : undefined,
        answer: data.answer.trim(),
        hints: validHints,
      });

      setSavedQuestions((previous) =>
        previous.map((question) =>
          question.number === questionNumber
            ? {
                ...question,
                type: data.type,
                question: data.question.trim(),
                answer: data.answer.trim(),
                imageUrl:
                  data.type === "IMAGE"
                    ? questionValue
                    : question.imageUrl,
                hints: validHints,
              }
            : question,
        ),
      );

      setQuestionDrafts((previous) => ({
        ...previous,
        [questionNumber]: {
          ...previous[questionNumber],
          type: data.type,
          question: data.question.trim(),
          answer: data.answer.trim(),
          imageFile: data.image?.[0],
          imageUrl:
            data.type === "IMAGE"
              ? questionValue
              : previous[questionNumber]?.imageUrl,
          hints: validHints,
        },
      }));

      if (data.type === "IMAGE") {
        setImagePreview(questionValue);
      }

      showSuccess(
        `Question ${displayQuestionNumber} updated successfully.`,
      );
    } catch (error) {
      console.error(
        "Failed to update question:",
        error,
      );

      showError(
        "Unable to update the question. Please try again.",
      );
    }
  };

  const getNextQuestionNumber = (
    currentNumber: number,
  ) => {
    const numbers = savedQuestions
      .map(
        (question) =>
          question.number,
      )
      .filter(
        (number) =>
          number > currentNumber,
      )
      .sort((a, b) => a - b);

    return numbers[0] ?? null;
  };

  const getPreviousQuestionNumber = (
    currentNumber: number,
  ) => {
    const numbers = savedQuestions
      .map(
        (question) =>
          question.number,
      )
      .filter(
        (number) =>
          number < currentNumber,
      )
      .sort((a, b) => b - a);

    return numbers[0] ?? null;
  };

  const moveToNextQuestion = () => {
    setQuestionNumber((currentNumber) => {
      if (currentNumber >= MAX_HUNT_QUESTIONS - 1) {
        showError(
          `A hunt can have a maximum of ${MAX_HUNT_QUESTIONS} questions.`,
        );

        return MAX_HUNT_QUESTIONS - 1;
      }

      const numbers =
        savedQuestionsRef.current
          .map(
            (question) =>
              question.number,
          )
          .filter(
            (number) =>
              number > currentNumber &&
              number < MAX_HUNT_QUESTIONS,
          )
          .sort(
            (left, right) =>
              left - right,
          );

      return (
        numbers[0] ??
        Math.min(
          currentNumber + 1,
          MAX_HUNT_QUESTIONS - 1,
        )
      );
    });
  };

  const handleSaveAndNext = async (
    data: QuestionFormData,
  ) => {
    clearMessage();

    if (questionNumber >= MAX_HUNT_QUESTIONS) {
      showError(
        `A hunt can have a maximum of ${MAX_HUNT_QUESTIONS} questions.`,
      );

      return;
    }

    if (
      data.type === "IMAGE" &&
      !data.image?.[0] &&
      !questionDrafts[
        questionNumber
      ]?.imageUrl &&
      !savedQuestions.find(
        (question) =>
          question.number ===
          questionNumber,
      )?.imageUrl
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

    if (!data.answer.trim()) {
      showError(
        "Answer is required.",
      );

      return;
    }

    if (
      isQuestionAlreadySaved(
        questionNumber,
      )
    ) {
      saveCurrentDraft();
      moveToNextQuestion();
      return;
    }

    try {
      const currentDraft: QuestionDraft = {
        type: data.type,
        question:
          data.question?.trim() ??
          "",
        answer: data.answer.trim(),
        imageFile: data.image?.[0],
        imageUrl:
          questionDrafts[
            questionNumber
          ]?.imageUrl,
        hints: hints
          .map((hint) => hint.trim())
          .filter(Boolean),
      };

      setQuestionDrafts(
        (previous) => ({
          ...previous,
          [questionNumber]:
            currentDraft,
        }),
      );

      const saved =
        await handleSaveQuestion(data);

      if (!saved) return;

      const newQuestion: SavedQuestion = {
        number: questionNumber,
        type: data.type,
        question: data.question.trim(),
        answer: data.answer.trim(),
        imageUrl: saved.imageUrl,
        hints: hints
          .map((hint) => hint.trim())
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

          const next = exists
            ? previous.map(
                (question) =>
                  question.number ===
                  questionNumber
                    ? newQuestion
                    : question,
              )
            : [
                ...previous,
                newQuestion,
              ].sort(
                (a, b) =>
                  a.number -
                  b.number,
              );

          savedQuestionsRef.current = next;

          return next;
        },
      );

      setQuestionDrafts(
        (previous) => ({
          ...previous,
          [questionNumber]: {
            ...currentDraft,
            imageUrl:
              saved.imageUrl ??
              currentDraft.imageUrl,
          },
        }),
      );

      showSuccess(
        `Question ${displayQuestionNumber} saved successfully.`,
      );

      moveToNextQuestion();
    } catch (error) {
      console.error(
        "Failed to save question:",
        error,
      );

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the question. Please try again.";

      showError(message);
    }
  };

  const handlePreviousQuestion = () => {
    clearMessage();

    const previousNumber =
      getPreviousQuestionNumber(
        questionNumber,
      );

    if (
      previousNumber === null
    ) {
      showError(
        "You are already on the first question.",
      );

      return;
    }

    saveCurrentDraft();

    setQuestionNumber(
      previousNumber,
    );

    setCopied(false);
    setImageSizeError(null);
  };

  const handleAddHint = () => {
    clearMessage();

    if (hints.length >= MAX_HINTS) {
      showError(
        "You can add a maximum of 3 hints.",
      );

      return;
    }

    setHints((previous) => [
      ...previous,
      "",
    ]);
  };

  const handleRemoveHint = (
    index: number,
  ) => {
    setHints((previous) =>
      previous.filter(
        (_, hintIndex) =>
          hintIndex !== index,
      ),
    );
  };

  const handleHintChange = (
    index: number,
    value: string,
  ) => {
    setHints((previous) =>
      previous.map(
        (hint, hintIndex) =>
          hintIndex === index
            ? value
            : hint,
      ),
    );
  };

  const handleCopyQuestion =
    async () => {
      if (!questionText?.trim()) {
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

        window.setTimeout(
          () => setCopied(false),
          1800,
        );
      } catch {
        showError(
          "Unable to copy the question.",
        );
      }
    };

  const handleDeletePreviewQuestion =
    async (
      questionIndex: number,
    ) => {
      try {
        clearMessage();

        const question =
          previewQuestions.find(
            (item) =>
              item.questionIndex ===
              questionIndex,
          ) ??
          previewQuestions[
            questionIndex
          ];

        const actualQuestionIndex =
          question?.questionIndex ??
          questionIndex;

        if (
          actualQuestionIndex ===
            undefined ||
          actualQuestionIndex === null
        ) {
          showError(
            "Unable to identify the question.",
          );

          return;
        }

        await deleteHuntQuestionsByIdAsync({
          huntId,
          questionIndex:
            actualQuestionIndex,
        });

        const remainingSaved =
          savedQuestions
            .filter(
              (question) =>
                question.number !==
                actualQuestionIndex,
            )
            .sort(
              (left, right) =>
                left.number -
                right.number,
            );

        setSavedQuestions(
          remainingSaved,
        );

        savedQuestionsRef.current =
          remainingSaved;

        setQuestionDrafts(
          (previous) => {
            const next = {
              ...previous,
            };

            delete next[
              actualQuestionIndex
            ];

            return next;
          },
        );

        if (
          questionNumber ===
          actualQuestionIndex
        ) {
          const nextSaved =
            remainingSaved[0];

          if (nextSaved) {
            setQuestionNumber(
              nextSaved.number,
            );

            reset({
              type: nextSaved.type,
              question:
                nextSaved.question,
              answer:
                nextSaved.answer,
              image: undefined,
            });

            setHints(
              nextSaved.hints ?? [],
            );

            setImagePreview(
              nextSaved.imageUrl ??
                null,
            );
          } else {
            setQuestionNumber(0);

            reset({
              type: "TEXT",
              question: "",
              answer: "",
              image: undefined,
            });

            setHints([]);
            setImagePreview(null);
          }
        }

        showSuccess(
          `Question ${actualQuestionIndex + 1} deleted successfully.`,
        );
      } catch (error) {
        console.error(
          "Failed to delete question:",
          error,
        );

        showError(
          "Unable to delete the question. Please try again.",
        );
      }
    };

  const saveCurrentQuestionIfNeeded =
    async () => {
      if (questionNumber >= MAX_HUNT_QUESTIONS) {
        showError(
          `A hunt can have a maximum of ${MAX_HUNT_QUESTIONS} questions.`,
        );

        return false;
      }

      if (
        isQuestionAlreadySaved(
          questionNumber,
        )
      ) {
        return true;
      }

      const currentData: QuestionFormData = {
        type: questionType,
        question:
          questionText ?? "",
        answer:
          answerText ?? "",
        image: selectedImage,
      };

      if (
        currentData.type ===
          "TEXT" &&
        !currentData.question.trim()
      ) {
        showError(
          "Question is required.",
        );

        return false;
      }

      if (
        !currentData.answer.trim()
      ) {
        showError(
          "Answer is required.",
        );

        return false;
      }

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
          currentData.image[0].size >
            MAX_IMAGE_SIZE
        ) {
          showError(
            "Image file is above 10 MB. Please choose a smaller image.",
          );

          return false;
        }
      }

      const saved =
        await handleSaveQuestion(
          currentData,
        );

      if (!saved) return false;

      const newQuestion: SavedQuestion = {
        number: questionNumber,
        type: currentData.type,
        question:
          currentData.type ===
          "TEXT"
            ? currentData.question.trim()
            : "",
        answer:
          currentData.answer.trim(),
        imageUrl:
          saved.imageUrl,
        hints: hints
          .map((hint) => hint.trim())
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

          return exists
            ? previous.map(
                (question) =>
                  question.number ===
                  questionNumber
                    ? newQuestion
                    : question,
              )
            : [
                ...previous,
                newQuestion,
              ].sort(
                (a, b) =>
                  a.number -
                  b.number,
              );
        },
      );

      setQuestionDrafts(
        (previous) => ({
          ...previous,
          [questionNumber]: {
            type: currentData.type,
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
            hints: hints
              .map((hint) =>
                hint.trim(),
              )
              .filter(Boolean),
          },
        }),
      );

      showSuccess(
        `Question ${displayQuestionNumber} saved successfully.`,
      );

      return true;
    };

  const handlePreview = async () => {
    clearMessage();

    try {
      if (savedQuestions.length > MAX_HUNT_QUESTIONS) {
        showError(
          `A hunt can have a maximum of ${MAX_HUNT_QUESTIONS} questions.`,
        );

        return;
      }

      if (savedQuestions.length < 2) {
        showError(
          "Please save at least 2 questions before finishing.",
        );

        return;
      }


      saveCurrentDraft();

      const currentData: QuestionFormData = {
        type: questionType,
        question:
          questionText ?? "",
        answer:
          answerText ?? "",
        image: selectedImage,
      };

      const hasContent =
        currentData.type ===
        "TEXT"
          ? Boolean(
              currentData.question.trim() ||
                currentData.answer.trim(),
            )
          : Boolean(
              currentData.answer.trim() ||
                currentData.image?.[0] ||
                questionDrafts[
                  questionNumber
                ]?.imageUrl ||
                savedQuestions.find(
                  (q) =>
                    q.number ===
                    questionNumber,
                )?.imageUrl,
            );

      if (
        !isQuestionAlreadySaved(
          questionNumber,
        ) &&
        hasContent
      ) {
        const currentQuestionSaved =
          await saveCurrentQuestionIfNeeded();

        if (!currentQuestionSaved) {
          return;
        }
      }

      const [
        huntResult,
        questionResult,
      ] = await Promise.all([
        refetchHunt(),
        refetchQuestions(),
      ]);

      if (!huntResult.data) {
        showError(
          "Unable to load hunt details.",
        );

        return;
      }

      if (!questionResult.data) {
        showError(
          "Unable to load hunt questions.",
        );

        return;
      }

      syncBackendQuestions(
        getBackendQuestions(
          questionResult.data,
        ),
      );

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

  const handleContinueEditing =
    () => {
      clearMessage();
      clearErrors();
      setFinished(false);

      const currentQuestionStillExists =
        savedQuestions.some(
          (question) =>
            question.number ===
            questionNumber,
        );

      if (
        !currentQuestionStillExists
      ) {
        const firstRemainingQuestion =
          [...savedQuestions].sort(
            (a, b) =>
              a.number -
              b.number,
          )[0];

        if (firstRemainingQuestion) {
          setQuestionNumber(
            firstRemainingQuestion.number,
          );

          restoreQuestion(
            firstRemainingQuestion.number,
          );
        } else {
          setQuestionNumber(0);

          reset({
            type: "TEXT",
            question: "",
            answer: "",
            image: undefined,
          });

          setHints([]);
          setImagePreview(null);
        }
      } else {
        restoreQuestion(
          questionNumber,
        );
      }

      setCopied(false);
      setImageSizeError(null);
    };

  const handleSaveDraft = async () => {
    saveCurrentDraft();

    try {
      await updateHuntTagAsync({
        id: huntId,
        tag: HUNT_TAG_TO_API[selectedTag],
      });

      await updateHuntStatusAsync({
        id: huntId,
        status: "DRAFT",
      });

      window.localStorage.removeItem(
        storageKey,
      );

      showSuccess(
        "Your hunt has been saved as a draft.",
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Failed to save draft:",
        error,
      );

      showError(
        "Unable to save draft. Please try again.",
      );
    }
  };

  const handlePublish = async () => {
    if (
      previewQuestions.length > MAX_HUNT_QUESTIONS
    ) {
      showError(
        `A hunt can have a maximum of ${MAX_HUNT_QUESTIONS} questions.`,
      );

      return;
    }

    if (
      previewQuestions.length === 0
    ) {
      showError(
        "Add at least one question before publishing.",
      );

      return;
    }

    try {
      await updateHuntTagAsync({
        id: huntId,
        tag: HUNT_TAG_TO_API[selectedTag],
      });

      await updateHuntStatusAsync({
        id: huntId,
        status: "PUBLISHED",
      });

      window.localStorage.removeItem(
        storageKey,
      );

      showSuccess(
        "Your hunt has been published successfully.",
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Failed to publish hunt:",
        error,
      );

      showError(
        "Unable to publish hunt. Please try again.",
      );
    }
  };

  const totalHints =
    previewQuestions.reduce(
      (total, question) => {
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

  if (finished) {
    return (
      <FinalPreview
        huntData={huntData}
        huntId={huntId}
        questions={previewQuestions}
        totalHints={totalHints}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        onBack={handleContinueEditing}
        onDeleteQuestion={
          handleDeletePreviewQuestion
        }
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        isLoading={
          isUpdatingStatus ||
          isUpdatingTag
        }
      />
    );
  }

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
          <BackLink
            href="/dashboard"
            label="Back to dashboard"
            className="mb-6"
          />

          <QuestionHeader />

          <QuestionNumber
            questionNumber={
              displayQuestionNumber
            }
          />

          <QuestionMessage
            message={pageMessage}
            type={pageMessageType}
          />

          <Card className="relative overflow-hidden border-white/10 bg-[#0b0b0e]/95 p-4 pt-8 shadow-[0_20px_65px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6 sm:pt-9">
            <form
              onSubmit={handleSubmit(
                handleSaveAndNext,
              )}
              className="relative"
            >
              <QuestionType
                register={register}
              />

              {questionType ===
                "TEXT" && (
                <TextQuestion
                  register={register}
                  errors={errors}
                  questionText={
                    questionText
                  }
                  copied={copied}
                  onCopy={
                    handleCopyQuestion
                  }
                />
              )}

              {questionType ===
                "IMAGE" && (
                <>
                  <ImageQuestion
                    register={register}
                    imagePreview={
                      imagePreview
                    }
                    imageFile={
                      imageFile
                    }
                    imageSizeError={
                      imageSizeError
                    }
                  />

                  <TextQuestion
                    register={register}
                    errors={errors}
                    questionText={
                      questionText
                    }
                    copied={copied}
                    onCopy={
                      handleCopyQuestion
                    }
                    optional
                  />
                </>
              )}

              <AnswerField
                register={register}
                errors={errors}
              />

              <HintsSection
                hints={hints}
                onAdd={handleAddHint}
                onRemove={
                  handleRemoveHint
                }
                onChange={
                  handleHintChange
                }
              />

              <QuestionActions
                questionNumber={
                  displayQuestionNumber
                }
                isSubmitting={
                  isSubmitting
                }
                alreadySaved={isQuestionAlreadySaved(
                  questionNumber,
                )}
                savedCount={
                  savedQuestions.length
                }
                isUpdatingQuestion={
                  isUpdatingQuestion
                }
                onPrevious={
                  handlePreviousQuestion
                }
                onChange={handleSubmit(
                  handleUpdateQuestion,
                )}
                onPreview={
                  handlePreview
                }
              />
            </form>
          </Card>

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