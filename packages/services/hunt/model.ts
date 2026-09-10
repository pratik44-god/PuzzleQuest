import { huntsQuestionTable } from "@repo/database/schema"
import {z} from "zod"

const difficultyTypeEnum = z.enum(["EASY", "MEDIUM", "HARD"])

export const createHuntInput = z.object({
    title: z.string() 
    .min(1, "Title is required")
    .max(60, "Title must be 60 characters or less").describe("Title of the Hunt"),

    description: z.string()
    .min(1, "Description is required")
    .max(6000, "Description must be 6000 characters or less").describe("Description of the Hunt"),

    image: z.string().describe("Image of the Hunt"),

    difficulty: difficultyTypeEnum.describe("Difficuly Level"),

    creatorsId: z.string().uuid().describe("UUID of the user")
})

export type CreateHuntInputType = z.infer<typeof createHuntInput>


export const createHuntQuestionsInput = z.object({
    questionType: z.enum(["TEXT", "IMAGE"]).describe("Type of the Question"),

    question: z.string().min(1, "Question is required").max(600, "Question must be 300 characters or less").describe("Question of the Hunt"),

    questionText: z.string().max(600, "Question text must be 600 characters or less").optional().describe("Text prompt for image questions"),

    answer: z.string().min(1, "Answer is required").max(100, "Answer must be 100 characters or less").describe("Answer of the Hunt"),

    hints: z.array(z.string()).optional().describe("Hints of the Hunt"),

    huntId: z.string().uuid().describe("UUID of the Hunt"),

    timeLimitSeconds: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .describe("Optional per-question time limit in seconds"),
})

export type CreateHuntQuestionsInputType = z.infer<typeof createHuntQuestionsInput>


export const updateHuntQuestionByIdAndIndex = z.object({
    huntId: z.string().uuid().describe("UUID of the Hunt"),
    questionIndex: z.number().int().nonnegative().describe("Index of the Question"),
    questionType: z.enum(["TEXT", "IMAGE"]).optional().describe("Type of the Question"),
    question: z.string().min(1, "Question is required").max(600, "Question must be 300 characters or less").optional().describe("Question of the Hunt"),
    questionText: z.string().max(600, "Question text must be 600 characters or less").optional().describe("Text prompt for image questions"),
    answer: z.string().min(1, "Answer is required").max(100, "Answer must be 100 characters or less").optional().describe("Answer of the Hunt"),
    hints: z.array(z.string()).optional().describe("Hints of the Hunt"),
    timeLimitSeconds: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .describe("Optional per-question time limit in seconds"),
})

export type UpdateHuntQuestionByIdAndIndexType = z.infer<typeof updateHuntQuestionByIdAndIndex>

export const updateHuntStatusInput = z.object({
    id: z.string().uuid().describe("UUID of the Hunt"),
    status: z.enum(["DRAFT", "PUBLISHED"]).describe("Publication status of the Hunt"),
})

export type UpdateHuntStatusInputType = z.infer<typeof updateHuntStatusInput>

export const huntTagEnum = z.enum([
    "ADVENTURE",
    "MYSTERY",
    "PIRATES",
    "FANTASY",
])

export const updateHuntTagInput = z.object({
    id: z.string().uuid().describe("UUID of the Hunt"),
    tag: huntTagEnum.describe("Category tag for the Hunt"),
})

export type UpdateHuntTagInputType = z.infer<typeof updateHuntTagInput>


export const verifyAnswerInput = z.object({
    answer: z.string().toLowerCase().describe("Answer of the HuntQuestion"),
    huntId: z.string().uuid().describe("Id of the Hunt"),
    questionIndex: z.number().int()
      .nonnegative().describe("Index of the huntQuestion")
})

export type VerifyAnswerInputType = z.infer<typeof verifyAnswerInput>


export const recordHuntCompletionInput = z.object({
  huntId: z.string().uuid().describe("UUID of the Hunt"),
  questionCount: z
    .number()
    .int()
    .positive()
    .describe("Number of questions completed"),
})

export type RecordHuntCompletionInputType = z.infer<
  typeof recordHuntCompletionInput
>