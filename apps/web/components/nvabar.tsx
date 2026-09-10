"use client";

import Link from "next/link";
import {
  Compass,
  LogIn,
  Plus,
  Trophy,
} from "lucide-react";

import ProtectedButton from "~/components/auth/ProtectedButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all duration-300 group-hover:rotate-6 group-hover:border-violet-500/40 group-hover:bg-violet-500/20 group-hover:shadow-lg group-hover:shadow-violet-500/20">
            <Compass size={22} />
          </div>

          <div>
            <p className="font-bold text-white transition-colors group-hover:text-violet-300">
              PuzzleQuest
            </p>

            <p className="text-[10px] text-zinc-600">
              Your adventure awaits
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">

          {/* PUBLIC */}
          <Link
            href="/discover"
            className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            Explore Hunts
          </Link>

          {/* PROTECTED */}
          <ProtectedButton
            href="/hunts/create"
            variant="ghost"
            size="md"
            leftIcon={
              <Plus
                size={17}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            }
            className="group"
          >
            Create Hunt
          </ProtectedButton>

          {/* PROTECTED */}
          <ProtectedButton
            href="/leaderboard"
            variant="ghost"
            size="md"
            leftIcon={
              <Trophy
                size={17}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            }
            className="group"
          >
            Leaderboard
          </ProtectedButton>

        </nav>

        {/* Sign In */}
        <Link
          href="/login"
          className="group flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-violet-500/20 hover:text-white hover:shadow-lg hover:shadow-violet-500/10"
        >
          <LogIn
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />

          <span>Sign In</span>
        </Link>
      </div>
    </header>
  );
}