"use client";

import { notFound } from "next/navigation";

import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import TreasureIntro from "~/components/dashboard/TreasureIntro";
import DiscoverHuntStats from "~/components/discover/discover-hunt-stats";
import { DiscoverStartButtonInline } from "~/components/discover/discover-start-button";
import { BackLink } from "~/components/ui/back-link";
import { mapApiHuntToDisplay } from "~/lib/hunt-display";
import { useGetHuntById, useGetPublishedHunts } from "~/hooks/api/hunt";

type HuntDetailPageProps = {
  huntId: string;
};

export default function HuntDetailPage({
  huntId,
}: HuntDetailPageProps) {
  const { data: huntData, isLoading, isError } = useGetHuntById(huntId);
  const { data: publishedHunts } = useGetPublishedHunts();

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100">
        <div className="flex min-h-screen items-center justify-center lg:ml-[280px]">
          <div className="h-72 w-full max-w-3xl animate-pulse rounded-[30px] border border-zinc-800 bg-[#0D0D14]" />
        </div>
      </main>
    );
  }

  if (isError || !huntData || huntData.status !== "PUBLISHED") {
    notFound();
  }

  const publishedHunt = publishedHunts?.find((item) => item.id === huntId);

  const hunt = mapApiHuntToDisplay({
    ...huntData,
    playCount: publishedHunt?.playCount ?? 0,
    questionCount: publishedHunt?.questionCount ?? 0,
    hintCount: publishedHunt?.hintCount ?? 0,
    creatorName: publishedHunt?.creatorName ?? null,
    creatorEmail: publishedHunt?.creatorEmail ?? null,
    creatorAvatar: publishedHunt?.creatorAvatar ?? null,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100">
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          <div className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
            <BackLink
              href="/discover"
              label="Back to hunts"
              className="mb-6"
            />

            <section className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-[#0D0D14]">
              <div className="relative flex h-[300px] items-center justify-center overflow-hidden bg-transparent sm:h-[400px]">
                {hunt.image ? (
                  <>
                    <img
                      src={hunt.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-20 blur-2xl brightness-125"
                    />
                    <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-xl" />
                    <div className="relative flex h-full w-full items-center justify-center p-6">
                      <img
                        src={hunt.image}
                        alt={hunt.title}
                        className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${hunt.accent}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_55%)]" />
                    <span className="relative text-[110px] drop-shadow-2xl sm:text-[150px]">
                      {hunt.icon ?? "🗺️"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                    {hunt.category}
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                  {hunt.title}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {hunt.description}
                </p>

                <div className="mt-7">
                  <DiscoverHuntStats hunt={hunt} size="md" />
                </div>

                <div className="mt-8">
                  <DiscoverStartButtonInline huntId={hunt.id} />
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
