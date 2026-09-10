import {z} from "zod"

export const createHuntInputModel = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than 255 characters"}).describe("Title of the hunt"),
    description: z.string().min(1, {message: "Description is required"}).max(6000, {message: "Description must be less than 6000 characters"}).describe("Description of the hunt"),
    image: z.string().min(1, {message: "Image is required"}).describe("Image of the hunt"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {message: "Difficulty must be one of EASY, MEDIUM, HARD"}).describe("Difficulty of the hunt"),
    // creatorsId: z.string().uuid().describe("UUID of the user")
})


export const createHuntOutputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt")
})



export const uploadImageInputModel = z.object({
  image: z
    .string()
    .min(1, {
      message: "Image is required",
    })
    .describe("Base64 image"),
});

export const uploadImageOutputModel = z.object({
  imageUrl: z
    .string()
    .url({
      message: "Image URL must be a valid URL",
    })
    .describe("URL of the uploaded image"),
});

export const createHuntQuestionsInputModel = z.object({
    questionType: z.enum(["TEXT", "IMAGE"], {message: "Question type must be one of TEXT, IMAGE"}).describe("Type of the question"),
    question: z.string().min(1, {message: "Question is required"}).max(600, {message: "Question must be less than 600 characters"}).describe("Question of the hunt"),
    questionText: z.string().max(600, {message: "Question text must be less than 600 characters"}).optional().describe("Text prompt for image questions"),
    answer: z.string().min(1, {message: "Answer is required"}).max(100, {message: "Answer must be less than 100 characters"}).describe("Answer of the hunt"),
    hints: z.array(z.string()).optional().describe("Hints of the hunt"),
    huntId: z.string().uuid({message: "Hunt ID must be a valid UUID"}).describe("UUID of the hunt"),
    timeLimitSeconds: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .describe("Optional per-question time limit in seconds"),
})

export const createHuntQuestionsOutputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt question")
})  


export const getHuntByIdInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt")
})

export const getHuntByIdOutputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt"),
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than 255 characters"}).describe("Title of the hunt"),
    description: z.string().min(1, {message: "Description is required"}).max(6000, {message: "Description must be less than 6000 characters"}).describe("Description of the hunt"),
    image: z.string().min(1, {message: "Image is required"}).describe("Image of the hunt"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {message: "Difficulty must be one of EASY, MEDIUM, HARD"}).describe("Difficulty of the hunt"),
    status: z.enum(["DRAFT", "PUBLISHED"]).describe("Publication status of the hunt"),
    tag: z.enum(["ADVENTURE", "MYSTERY", "PIRATES", "FANTASY"]).describe("Category tag of the hunt"),
    createdAt: z.date().nullable().describe("Creation date of the hunt")
})

export const huntListItemModel = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    tag: z.enum(["ADVENTURE", "MYSTERY", "PIRATES", "FANTASY"]),
    playCount: z.number(),
    createdAt: z.date().nullable(),
    creatorId: z.string().uuid().nullable(),
    creatorName: z.string().nullable(),
    creatorEmail: z.string().nullable(),
    creatorAvatar: z.string().nullable(),
    questionCount: z.number(),
    hintCount: z.number(),
})

export const getPublishedHuntsOutputModel = z.array(huntListItemModel)

export const getMyHuntsOutputModel = z.array(huntListItemModel)

export const updateHuntStatusInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt"),
    status: z.enum(["DRAFT", "PUBLISHED"], {message: "Status must be DRAFT or PUBLISHED"}).describe("Publication status of the hunt"),
})

export const updateHuntStatusOutputModel = z.object({
    id: z.string().uuid(),
    status: z.enum(["DRAFT", "PUBLISHED"]),
})

export const updateHuntTagInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt"),
    tag: z.enum(["ADVENTURE", "MYSTERY", "PIRATES", "FANTASY"], {message: "Tag must be one of ADVENTURE, MYSTERY, PIRATES, FANTASY"}).describe("Category tag of the hunt"),
})

export const updateHuntTagOutputModel = z.object({
    id: z.string().uuid(),
    tag: z.enum(["ADVENTURE", "MYSTERY", "PIRATES", "FANTASY"]),
})

export const recordHuntPlayInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt"),
})

export const recordHuntPlayOutputModel = z.object({
    id: z.string().uuid(),
    playCount: z.number(),
})

export const getHuntQuestionByIdInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt question")
})

export const getHuntQuestionByIdOutputModel = z.array(z.object({
    questionType: z.enum(["TEXT", "IMAGE"], {message: "Question type must be one of TEXT, IMAGE"}).describe("Type of the question"),
    question: z.string().min(1, {message: "Question is required"}).max(600, {message: "Question must be less than 600 characters"}).describe("Question of the hunt"),
    questionText: z.string().max(600, {message: "Question text must be less than 600 characters"}).nullable().optional().describe("Text prompt for image questions"),
    answer: z.string().min(1, {message: "Answer is required"}).max(100, {message: "Answer must be less than 100 characters"}).describe("Answer of the hunt"),
    hints: z.array(z.string()).nullable().describe("Hints of the hunt"),
    createdAt: z.date().nullable().describe("Creation date of the hunt question"),
    questionIndex: z
      .number()
      .int()
      .nonnegative()
      .describe("Index of the question"),
    timeLimitSeconds: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .describe("Optional per-question time limit in seconds"),
  
}))


export const deleteHuntByIdInputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the hunt")
})

export const deleteHuntByIdOutputModel = z.object({
    id: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the deleted hunt")
})

export const deleteHuntQuestionsByIdInputModel = z.object({
    huntId: z.string().uuid({message: "Hunt ID must be a valid UUID"}).describe("UUID of the hunt"),
   questionIndex: z
    .number()
    .int()
    .nonnegative()
    .describe("Index of the question to delete"),
})

export const deleteHuntQuestionsByIdOutputModel = z.object({
    huntId: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the deleted hunt question")
    
})

export const updateHuntQuestionByIdAndIndexInputModel = z.object({
    huntId: z.string().uuid({message: "Hunt ID must be a valid UUID"}).describe("UUID of the hunt"),
    questionIndex: z
      .number()
      .int()
      .nonnegative()
      .describe("Index of the question to update"),
    questionType: z.enum(["TEXT", "IMAGE"], {message: "Question type must be one of TEXT, IMAGE"}).describe("Type of the question"),
    question: z.string().min(1, {message: "Question is required"}).max(600, {message: "Question must be less than 600 characters"}).describe("Question of the hunt"),
    questionText: z.string().max(600, {message: "Question text must be less than 600 characters"}).optional().describe("Text prompt for image questions"),
    answer: z.string().min(1, {message: "Answer is required"}).max(100, {message: "Answer must be less than 100 characters"}).describe("Answer of the hunt"),
    hints: z.array(z.string()).optional().describe("Hints of the hunt"),
    timeLimitSeconds: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .describe("Optional per-question time limit in seconds"),
})

export const updateHuntQuestionByIdAndIndexOutputModel = z.object({
    huntId: z.string().uuid({message: "Id must be a valid UUID"}).describe("Id of the updated hunt question")
})

export const verifyAnswerInputModel = z.object({
    answer: z.string().min(1, {message: "Answer is required"}).max(100, {message: "Answer must be less than 100 characters"}).describe("Answer of the hunt"),
    huntId: z.string().uuid({message: "Hunt ID must be a valid UUID"}).describe("UUID of the hunt"),
    questionIndex: z
      .number()
      .int()
      .nonnegative()
      .describe("Index of the question"),
})

export const verifyAnswerOutputModel = z.object({
    verifyAns: z.string().describe("Answer of the question")
})

export const huntBadgeModel = z.enum([
  "EXPLORER",
  "PATHFINDER",
  "TREASURE_HUNTER",
  "LEGEND",
])

export const recordHuntCompletionInputModel = z.object({
  huntId: z.string().uuid({ message: "Hunt ID must be a valid UUID" }),
  questionCount: z
    .number()
    .int()
    .positive()
    .describe("Number of questions completed"),
})

export const recordHuntCompletionOutputModel = z.object({
  id: z.string().uuid(),
  score: z.number(),
  xpEarned: z.number(),
  badge: huntBadgeModel,
  questionCount: z.number(),
  totalXp: z.number(),
  huntsCompleted: z.number(),
})

export const leaderboardPlayerModel = z.object({
  rank: z.number(),
  userId: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
  totalXp: z.number(),
  huntsCompleted: z.number(),
  badge: huntBadgeModel.nullable(),
  badges: z.array(huntBadgeModel).default([]),
})

export const getLeaderboardOutputModel = z.object({
  players: z.array(leaderboardPlayerModel),
  currentPlayer: leaderboardPlayerModel.nullable(),
})