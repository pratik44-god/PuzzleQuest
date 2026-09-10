export const QUESTION_TIMER_OPTIONS = [
  { value: null, label: "None" },
  { value: 15, label: "15s" },
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
] as const;

export type QuestionTimeLimitSeconds =
  (typeof QUESTION_TIMER_OPTIONS)[number]["value"];

export function formatQuestionTimer(seconds: number | null | undefined) {
  if (!seconds) {
    return "None";
  }

  if (seconds < 60) {
    return `${seconds}s`;
  }

  return `${seconds / 60}m`;
}

export function formatCountdown(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return `${secs}s`;
}
