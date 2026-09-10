export type HuntPlayQuestion = {
  questionType: "TEXT" | "IMAGE";
  question: string;
  questionText?: string | null;
  hints: string[] | null;
  questionIndex: number;
  timeLimitSeconds?: number | null;
};

