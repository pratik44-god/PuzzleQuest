// "use client";

// import { Tag } from "lucide-react";

// import {
//   formatTagDisplay,
//   HUNT_TAGS,
//   type HuntTagLabel,
// } from "~/lib/hunt-tags";

// type PreviewTagSelectorProps = {
//   selectedTag: HuntTagLabel;
//   onTagChange: (tag: HuntTagLabel) => void;
//   disabled?: boolean;
// };

// export default function PreviewTagSelector({
//   selectedTag,
//   onTagChange,
//   disabled = false,
// }: PreviewTagSelectorProps) {
//   return (
//     <section className="rounded-2xl border border-white/10 bg-[#0b0d18]/80 p-5 backdrop-blur-xl">
//       <div className="mb-4 flex items-center gap-2">
//         <Tag size={16} className="text-violet-400" />
//         <div>
//           <h3 className="text-sm font-semibold text-white">
//             Hunt tag
//           </h3>
//           <p className="text-xs text-zinc-500">
//             Choose one — adventure, mystery, pirates, or fantasy.
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2">
//         {HUNT_TAGS.map((tag) => {
//           const active = selectedTag === tag;

//           return (
//             <button
//               key={tag}
//               type="button"
//               disabled={disabled}
//               onClick={() => onTagChange(tag)}
//               className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold capitalize transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
//                 active
//                   ? "border-violet-500/40 bg-violet-500/15 text-violet-200 shadow-lg shadow-violet-950/20"
//                   : "border-zinc-800 bg-[#0D0D14] text-zinc-500 hover:border-violet-500/30 hover:text-zinc-200"
//               }`}
//             >
//               {formatTagDisplay(tag)}
//             </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

"use client";

import { Tag } from "lucide-react";

import {
  formatTagDisplay,
  HUNT_TAGS,
  type HuntTagLabel,
} from "~/lib/hunt-tags";

type PreviewTagSelectorProps = {
  selectedTag: HuntTagLabel;
  onTagChange: (tag: HuntTagLabel) => void;
  disabled?: boolean;
};

export default function PreviewTagSelector({
  selectedTag,
  onTagChange,
  disabled = false,
}: PreviewTagSelectorProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0b0d18]/80 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Tag size={16} className="text-violet-400" />

        <div>
          <h3 className="text-sm font-semibold text-white">
            Hunt tag
          </h3>

          <p className="text-xs text-zinc-500">
            Choose one — adventure, mystery, pirates, or fantasy.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {HUNT_TAGS.map((tag) => {
          const active = selectedTag === tag;

          return (
            <button
              key={tag}
              type="button"
              disabled={disabled}
              onClick={() => onTagChange(tag)}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold capitalize transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                active
                  ? "border-violet-500/40 bg-violet-500/15 text-violet-200 shadow-lg shadow-violet-950/20"
                  : "border-zinc-800 bg-[#0D0D14] text-zinc-500 hover:border-violet-500/30 hover:text-zinc-200"
              }`}
            >
              {formatTagDisplay(tag)}
            </button>
          );
        })}
      </div>
    </section>
  );
}