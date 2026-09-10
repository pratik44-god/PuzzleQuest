import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function QuestionMessage({
  message,
  type,
}: {
  message: string | null;
  type: "error" | "success";
}) {
  if (!message) return null;

  return (
    <div
      className={`relative z-20 mb-3 flex items-start gap-2 rounded-xl border p-3 text-xs ${
        type === "error"
          ? "border-red-500/20 bg-red-500/[0.06] text-red-300"
          : "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
      }`}
    >
      {type === "error" ? (
        <AlertCircle size={15} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
      )}
      <p>{message}</p>
    </div>
  );
}