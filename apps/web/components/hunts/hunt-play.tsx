
// "use client";

// import CinematicHuntPlayer from "~/components/hunts/cinematic/cinematic-hunt-player";

// type HuntPlayProps = {
//   huntId: string;
// };

// export default function HuntPlay({
//   huntId,
// }: HuntPlayProps) {
//   return <CinematicHuntPlayer huntId={huntId} />;
// }

"use client";

import { useGetHuntById } from "~/hooks/api/hunt";
import CinematicHuntPlayer from "~/components/hunts/cinematic/cinematic-hunt-player";
import VerifyAnswerPlay from "~/components/VerifyAnswer/verify-answer-play";

type HuntPlayProps = {
  huntId: string;
};

export default function HuntPlay({
  huntId,
}: HuntPlayProps) {
  const { data: hunt, isLoading } = useGetHuntById(huntId);

  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black text-white">
        Loading hunt...
      </div>
    );
  }

  if (!hunt) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black text-white">
        Hunt not found.
      </div>
    );
  }

  if (hunt.tag === "PIRATES") {
    return <CinematicHuntPlayer huntId={huntId} />;
  }

  return <VerifyAnswerPlay huntId={huntId} />;
}