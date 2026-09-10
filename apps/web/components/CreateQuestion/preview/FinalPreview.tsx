// import { Sparkles } from "lucide-react";
// import Container from "~/components/ui/container";
// import { BackButton } from "~/components/ui/back-link";
// import type { HuntTagLabel } from "~/lib/hunt-tags";
// import type { PreviewQuestion } from "../constants";
// import PreviewHeader from "./PreviewHeader";
// import HuntPreview from "./HuntPreviewCard";
// import PreviewQuestions from "./PreviewQuestions";
// import PreviewActions from "./PreviewActionBar";
// import PreviewTagSelector from "./PreviewTagSelector";

// export default function FinalPreview({
//   huntData,
//   huntId,
//   questions,
//   totalHints,
//   selectedTag,
//   onTagChange,
//   onBack,
//   onDeleteQuestion,
//   onSaveDraft,
//   onPublish,
//   isLoading = false,
// }: {
//   huntData: any;
//   huntId: string;
//   questions: PreviewQuestion[];
//   totalHints: number;
//   selectedTag: HuntTagLabel;
//   onTagChange: (tag: HuntTagLabel) => void;
//   onBack: () => void;
//   onDeleteQuestion: (questionIndex: number) => void;
//   onSaveDraft: () => void;
//   onPublish: () => void;
//   isLoading?: boolean;
// }) {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#03050f] py-8 pt-20 sm:py-10">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute left-[15%] top-[-200px] h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[150px]" />
//         <div className="absolute right-[-150px] top-[25%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.06] blur-[150px]" />
//         <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/[0.05] blur-[150px]" />
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
//             backgroundSize: "42px 42px",
//           }}
//         />
//       </div>

//       <Container>
//         <div className="relative mx-auto max-w-[1480px]">
//           <BackButton
//             onClick={onBack}
//             label="Back to Questions"
//             size="md"
//             disabled={isLoading}
//             className="mb-8"
//           />

//           <PreviewHeader />

//           <PreviewTagSelector
//             selectedTag={selectedTag}
//             onTagChange={onTagChange}
//             disabled={isLoading}
//           />

//           <div className="mt-6 grid w-full items-stretch gap-6 lg:grid-cols-2">
//             <HuntPreview
//               huntData={huntData}
//               questionCount={questions.length}
//               totalHints={totalHints}
//               selectedTag={selectedTag}
//             />

//             <PreviewQuestions
//               huntId={huntId}
//               questions={questions}
//               onDelete={onDeleteQuestion}
//             />
//           </div>

//           <PreviewActions
//             onContinue={onBack}
//             onSaveDraft={onSaveDraft}
//             onPublish={onPublish}
//             isLoading={isLoading}
//           />

//           <div className="mt-5 flex items-center justify-center gap-3 text-sm text-zinc-500">
//             <Sparkles size={15} className="text-violet-400" />
//             Your adventure is almost ready
//             <Sparkles size={15} className="text-violet-400" />
//           </div>
//         </div>
//       </Container>
//     </main>
//   );
// }

"use client";

import { Sparkles } from "lucide-react";

import Container from "~/components/ui/container";
import { BackButton } from "~/components/ui/back-link";
import type { HuntTagLabel } from "~/lib/hunt-tags";
import type { PreviewQuestion } from "../constants";
import PreviewHeader from "./PreviewHeader";
import HuntPreview from "./HuntPreviewCard";
import PreviewQuestions from "./PreviewQuestions";
import PreviewActions from "./PreviewActionBar";
import PreviewTagSelector from "./PreviewTagSelector";

export default function FinalPreview({
  huntData,
  huntId,
  questions,
  totalHints,
  selectedTag,
  onTagChange,
  onBack,
  onDeleteQuestion,
  onSaveDraft,
  onPublish,
  isLoading = false,
}: {
  huntData: any;
  huntId: string;
  questions: PreviewQuestion[];
  totalHints: number;
  selectedTag: HuntTagLabel;
  onTagChange: (tag: HuntTagLabel) => void;
  onBack: () => void;
  onDeleteQuestion: (questionIndex: number) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isLoading?: boolean;
}) {
  const isPirateHunt = selectedTag === "Pirates";
  const pirateQuestionCountValid = questions.length === 5;

  const handlePublish = () => {
    if (isPirateHunt && !pirateQuestionCountValid) {
      return;
    }

    onPublish();
  };

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
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <Container>
        <div className="relative mx-auto max-w-[1480px]">
          <BackButton
            onClick={onBack}
            label="Back to Questions"
            size="md"
            disabled={isLoading}
            className="mb-8"
          />

          <PreviewHeader />

          <PreviewTagSelector
            selectedTag={selectedTag}
            onTagChange={onTagChange}
            disabled={isLoading}
          />

          {isPirateHunt ? (
            <div
              className={`mt-4 rounded-2xl border px-5 py-4 ${
                pirateQuestionCountValid
                  ? "border-emerald-500/20 bg-emerald-500/[0.05]"
                  : "border-amber-500/20 bg-amber-500/[0.05]"
              }`}
            >
              {pirateQuestionCountValid ? (
                <p className="text-xs font-medium text-emerald-300">
                  Pirate hunt ready — 5 questions are connected to the
                  cinematic sequence.
                </p>
              ) : (
                <p className="text-xs font-medium text-amber-300">
                  Pirate hunts require exactly 5 questions. Add or remove
                  questions before publishing.
                </p>
              )}
            </div>
          ) : null}

          <div className="mt-6 grid w-full items-stretch gap-6 lg:grid-cols-2">
            <HuntPreview
              huntData={huntData}
              questionCount={questions.length}
              totalHints={totalHints}
              selectedTag={selectedTag}
            />

            <PreviewQuestions
              huntId={huntId}
              questions={questions}
              onDelete={onDeleteQuestion}
            />
          </div>

          <PreviewActions
            onContinue={onBack}
            onSaveDraft={onSaveDraft}
            onPublish={handlePublish}
            isLoading={
              isLoading ||
              (isPirateHunt && !pirateQuestionCountValid)
            }
          />

          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-zinc-500">
            <Sparkles size={15} className="text-violet-400" />
            Your adventure is almost ready
            <Sparkles size={15} className="text-violet-400" />
          </div>
        </div>
      </Container>
    </main>
  );
}