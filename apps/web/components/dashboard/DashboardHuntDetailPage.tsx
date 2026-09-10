"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Clock,
  Play,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";

import Button from "~/components/ui/buttton";
import { BackLink } from "~/components/ui/back-link";
import DeleteHuntDialog from "~/components/dashboard/DeleteHuntDialog";
import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import TreasureIntro from "~/components/dashboard/TreasureIntro";
import { mapApiHuntToDisplay } from "~/lib/hunt-display";
import {
  useDeleteHuntById,
  useGetHuntById,
  useGetMyHunts,
} from "~/hooks/api/hunt";

type DashboardHuntDetailPageProps = {
  huntId: string;
};

export default function DashboardHuntDetailPage({
  huntId,
}: DashboardHuntDetailPageProps) {
  const router = useRouter();
  const { data: huntData, isLoading, isError } = useGetHuntById(huntId);
  const { data: myHunts } = useGetMyHunts();
  const { deleteHuntByIdAsync, isPending: isDeleting } =
    useDeleteHuntById();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100">
        <div className="flex min-h-screen items-center justify-center lg:ml-[280px]">
          <div className="h-72 w-full max-w-3xl animate-pulse rounded-[30px] border border-zinc-800 bg-[#0D0D14]" />
        </div>
      </main>
    );
  }

  if (isError || !huntData) {
    notFound();
  }

  const ownedHunt = myHunts?.find((hunt) => hunt.id === huntId);
  const isOwner = Boolean(ownedHunt);

  if (!isOwner) {
    notFound();
  }

  const hunt = mapApiHuntToDisplay({
    ...huntData,
    playCount: ownedHunt?.playCount ?? 0,
    questionCount: ownedHunt?.questionCount ?? 0,
    hintCount: ownedHunt?.hintCount ?? 0,
    creatorId: ownedHunt?.creatorId ?? null,
    creatorName: ownedHunt?.creatorName ?? null,
    creatorEmail: ownedHunt?.creatorEmail ?? null,
    creatorAvatar: ownedHunt?.creatorAvatar ?? null,
  });

  const handleDelete = async () => {
    try {
      await deleteHuntByIdAsync({ id: hunt.id });
      setShowDeleteDialog(false);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete hunt:", error);
    }
  };

  return (
    <>
      <DeleteHuntDialog
        open={showDeleteDialog}
        huntTitle={hunt.title}
        isDeleting={isDeleting}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />

      <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100">
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          <div className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
            <BackLink
              href="/dashboard"
              label="Back to dashboard"
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

                  {huntData.status === "DRAFT" ? (
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Draft
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Published
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                  {hunt.title}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {hunt.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <InfoItem
                    icon={<Clock size={16} />}
                    label="Created"
                    value={hunt.time}
                  />

                  <InfoItem
                    icon={<Users size={16} />}
                    label="Explorers"
                    value={hunt.players}
                  />

                  <InfoItem
                    icon={<Shield size={16} />}
                    label="Difficulty"
                    value={hunt.difficulty}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {huntData.status === "DRAFT" ? (
                    <Button
                      variant="primary"
                      size="lg"
                      href={`/dashboard/create/${hunt.id}/question`}
                    >
                      Edit Hunt
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="lg"
                        href={`/discover/${hunt.id}`}
                      >
                        View
                      </Button>

                      <Button
                        variant="primary"
                        size="lg"
                        href={`/hunts/${hunt.id}`}
                        leftIcon={<Play size={18} />}
                      >
                        Start Hunt
                      </Button>
                    </>
                  )}

                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Trash2 size={18} />}
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isDeleting}
                    className="border-red-500/30 bg-red-500/10 text-red-300 hover:border-red-500/50 hover:bg-red-500/20"
                  >
                    Delete Hunt
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-2 text-violet-400">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-zinc-200">
        {value}
      </p>
    </div>
  );
}
