export default function QuestionNumber({
  questionNumber,
}: {
  questionNumber: number;
}) {
  return (
    <div className="relative z-10 mb-[-17px] flex flex-col items-center">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/25 bg-[#101014] shadow-[0_8px_25px_rgba(139,92,246,0.15)]">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/[0.08]">
          <span className="text-xs font-bold text-violet-300">
            {questionNumber}
          </span>
        </div>
      </div>

      <span className="mt-1 rounded-full border border-white/[0.06] bg-[#09090b] px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-zinc-600">
        Question {questionNumber}
      </span>
    </div>
  );
}