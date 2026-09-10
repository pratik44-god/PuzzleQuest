"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Play,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { notFound, useParams } from "next/navigation";

import Button from "~/components/ui/buttton";
import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import TreasureIntro from "~/components/dashboard/TreasureIntro";

import { hunts } from "../discover-hunts";

export default function HuntPage() {
  const params = useParams();

  const huntId = params.huntId as string;

  const hunt = hunts.find(
    (item) => item.id === huntId,
  );

  if (!hunt) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100">
      <TreasureIntro />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 lg:ml-[280px]">
          <div className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
            <Link
              href="/discover"
              className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-400"
            >
              <ArrowLeft size={16} />
              Back to hunts
            </Link>

            <section className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-[#0D0D14]">
              {/* Artwork */}
              <div
                className={`relative flex h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br sm:h-[400px] ${hunt.accent}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_55%)]" />

                <div className="absolute h-72 w-72 rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />

                <div className="absolute h-52 w-52 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />

                <span className="relative text-[110px] drop-shadow-2xl animate-[treasureFloat_2.5s_ease-in-out_infinite] sm:text-[150px]">
                  {hunt.icon}
                </span>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                    {hunt.category}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400">
                    <Star
                      size={11}
                      className="fill-current"
                    />
                    {hunt.rating}
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                  {hunt.title}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {hunt.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <InfoItem
                    icon={<Clock size={16} />}
                    label="Duration"
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

                  <InfoItem
                    icon={<Star size={16} />}
                    label="Rating"
                    value={hunt.rating}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Play size={18} />}
                  >
                    Start Hunt
                  </Button>

                  <Link href="/discover">
                    <Button
                      variant="secondary"
                      size="lg"
                    >
                      Explore More
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
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