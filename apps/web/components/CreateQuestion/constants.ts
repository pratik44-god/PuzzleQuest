// export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
// export const MAX_HINTS = 3;

// export const QUESTION_STORAGE_PREFIX = "hunt-create-question";

// export type QuestionType = "TEXT" | "IMAGE";

// export type QuestionFormData = {
//   type: QuestionType;
//   question: string;
//   image: FileList;
//   answer: string;
// };

// export type SavedQuestion = {
//   number: number;
//   type: QuestionType;
//   question: string;
//   answer: string;
//   imageUrl?: string;
//   hints: string[];
// };

// export type QuestionDraft = {
//   type: QuestionType;
//   question: string;
//   answer: string;
//   imageFile?: File;
//   imageUrl?: string;
//   hints: string[];
// };

// export type PreviewQuestion = {
//   questionType?: "TEXT" | "IMAGE";
//   type?: "TEXT" | "IMAGE";
//   question?: string;
//   answer?: string;
//   hints?: string[] | null;
//   createdAt?: Date | string | null;
// };

// export type QuestionPageProps = {
//   huntId: string;
// };

// export type PersistedQuestionState = {
//   questionNumber: number;
//   finished: boolean;
//   savedQuestions: SavedQuestion[];
//   questionDrafts: Record<
//     number,
//     Omit<QuestionDraft, "imageFile">
//   >;
//   deletedPreviewQuestions: string[];
// };

// export function getQuestionStorageKey(huntId: string) {
//   return `${QUESTION_STORAGE_PREFIX}:${huntId}`;
// }

import type { HuntTagLabel } from "~/lib/hunt-tags";

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_HINTS = 3;
export const MIN_QUESTIONS = 2;

export const QUESTION_STORAGE_PREFIX = "hunt-create-question";

export type QuestionType = "TEXT" | "IMAGE";

export type QuestionFormData = {
  type: QuestionType;
  question: string;
  image: FileList;
  answer: string;
};

export type SavedQuestion = {
  number: number;
  type: QuestionType;
  question: string;
  answer: string;
  imageUrl?: string;
  hints: string[];
};

export type QuestionDraft = {
  type: QuestionType;
  question: string;
  answer: string;
  imageFile?: File;
  imageUrl?: string;
  hints: string[];
};

export type PreviewQuestion = {
  questionIndex: number;
  id?: string;
  _id?: string;
  questionType?: "TEXT" | "IMAGE";
  type?: "TEXT" | "IMAGE";
  question?: string;
  questionText?: string | null;
  answer?: string;
  hints?: string[] | null;
  createdAt?: Date | string | null;
  timeLimitSeconds?: number | null;
};

export type QuestionPageProps = {
  huntId: string;
};

export type PersistedQuestionState = {
  questionNumber: number;
  finished: boolean;
  selectedTag?: HuntTagLabel;
  savedQuestions: SavedQuestion[];
  questionDrafts: Record<
    number,
    Omit<QuestionDraft, "imageFile">
  >;
  deletedPreviewQuestions: string[];
};

export function getQuestionStorageKey(huntId: string) {
  return `${QUESTION_STORAGE_PREFIX}:${huntId}`;
}