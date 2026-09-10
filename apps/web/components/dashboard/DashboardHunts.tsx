// "use client";

// import { mapApiHuntToDisplay } from "~/lib/hunt-display";
// import { useGetMyHunts } from "~/hooks/api/hunt";

// import FeaturedHunts from "./FeaturedHunts";
// import DraftHunts from "./DraftHunts";

// export default function DashboardHunts() {
//   const { data: myHunts, isLoading } = useGetMyHunts();

//   const publishedHunts = (myHunts ?? [])
//     .filter((hunt) => hunt.status === "PUBLISHED")
//     .map(mapApiHuntToDisplay);

//   const draftHunts = (myHunts ?? [])
//     .filter((hunt) => hunt.status === "DRAFT")
//     .map(mapApiHuntToDisplay);

//   if (isLoading) {
//     return (
//       <section className="mt-11">
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <div
//               key={index}
//               className="h-72 animate-pulse rounded-2xl border border-zinc-800 bg-[#0D0D14]"
//             />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <FeaturedHunts
//         hunts={publishedHunts}
//         title="Your published hunts"
//         subtitle="Live adventures visible on your dashboard and discover."
//         emptyMessage="No published hunts yet. Finish creating a hunt and publish it to see it here."
//         showExploreLink={false}
//         showPublishedActions
//       />

//       <DraftHunts hunts={draftHunts} />
//     </>
//   );
// }

"use client";

import { mapApiHuntToDisplay } from "~/lib/hunt-display";
import { useGetMyHunts } from "~/hooks/api/hunt";

import FeaturedHunts from "./FeaturedHunts";
import DraftHunts from "./DraftHunts";

export default function DashboardHunts() {
  const { data: myHunts, isLoading } = useGetMyHunts();

  const publishedHunts = (myHunts ?? [])
    .filter((hunt) => hunt.status === "PUBLISHED")
    .map(mapApiHuntToDisplay);

  const draftHunts = (myHunts ?? [])
    .filter((hunt) => hunt.status === "DRAFT")
    .map(mapApiHuntToDisplay);

  if (isLoading) {
    return (
      <section className="mt-11">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[430px] animate-pulse rounded-2xl border border-zinc-800 bg-[#0D0D14]"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <FeaturedHunts
        hunts={publishedHunts}
        title="Your published hunts"
        subtitle="Live adventures visible on your dashboard and discover."
        emptyMessage="No published hunts yet. Finish creating a hunt and publish it to see it here."
        showExploreLink={false}
        showPublishedActions
      />

      <DraftHunts hunts={draftHunts} />
    </>
  );
}