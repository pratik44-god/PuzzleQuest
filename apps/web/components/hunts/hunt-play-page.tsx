"use client";

import HuntPlay from "~/components/hunts/hunt-play";
import { BackLink } from "~/components/ui/back-link";

type HuntPlayPageProps = {
  huntId: string;
};

export default function HuntPlayPage({
  huntId,
}: HuntPlayPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060608] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[110px]" />

        <div className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-indigo-600/10 blur-[90px]" />

        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
        <BackLink
          href="/dashboard"
          label="Back to dashboard"
          className="mb-5"
        />

        <HuntPlay huntId={huntId} />
      </div>
    </main>
  );
}