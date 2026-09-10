"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Crown,
  Flame,
  LogOut,
  Map,
  Plus,
  Settings,
  Trophy,
  User,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

import {
  useLogout,
  useUser,
} from "~/hooks/api/auth";

export default function DashboardSidebar() {
  const router = useRouter();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  const { user } = useUser();

  const {
    logoutAsync,
    status: logoutStatus,
  } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutAsync();

      setShowLogoutConfirm(false);
      setProfileOpen(false);

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLoggingOut =
    logoutStatus === "pending";

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 hidden h-screen w-[280px] shrink-0 border-r border-zinc-800/70 bg-[#09090B] lg:flex lg:flex-col">
        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="flex h-20 items-center border-b border-zinc-800/70 px-6">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border transition duration-300 group-hover:rotate-12"
              style={{
                backgroundColor:
                  "var(--theme-soft)",
                borderColor:
                  "var(--theme-border)",
                color: "var(--theme)",
              }}
            >
              <Compass size={21} />
            </div>

            <div>
              <p className="text-sm font-bold">
                PuzzleQuest
              </p>

              <p className="text-[10px] text-zinc-600">
                Your adventure awaits
              </p>
            </div>
          </Link>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Explore */}

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-600">
            Explore
          </p>

          <nav className="space-y-1">
            <SidebarItem
              href="/dashboard"
              icon={<Compass size={18} />}
              label="Dashboard"
            />

            <SidebarItem
              href="/discover"
              icon={<Map size={18} />}
              label="All Hunts"
            />

            <SidebarItem
              href="/leaderboard"
              icon={<Trophy size={18} />}
              label="Leaderboard"
            />
          </nav>

          {/* Your Journey */}

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-600">
            Your Journey
          </p>

          <nav className="space-y-1">
            <SidebarItem
              href="/dashboard/hunts"
              icon={<Flame size={18} />}
              label="My Adventures"
            />

            <SidebarItem
              href="/dashboard/profile"
              icon={<Crown size={18} />}
              label="My Profile"
            />
          </nav>

          {/* =====================================================
              CREATE HUNT
          ===================================================== */}

          <Link
            href="/dashboard/create"
            className="group mt-8 block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-violet-950/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
              <Plus size={18} />
            </div>

            <p className="mt-3 text-sm font-semibold text-zinc-200">
              Create your own
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-600">
              Build an adventure for other
              explorers.
            </p>

            <div className="mt-3 inline-flex items-center text-xs font-semibold text-violet-400 transition group-hover:text-violet-300">
              Create Hunt

              <ArrowRight
                size={14}
                className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>

        {/* =====================================================
            PROFILE AREA
        ===================================================== */}

        <div className="relative border-t border-zinc-800/70 p-4">
          {/* =====================================================
              PROFILE DROPDOWN
          ===================================================== */}

          {profileOpen && (
            <div className="absolute bottom-full left-4 right-4 z-50 mb-3 overflow-hidden rounded-2xl border border-zinc-800 bg-[#111116] shadow-2xl shadow-black/50">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Your Profile
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="rounded-lg p-1.5 text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-3">
                {/* User Information */}

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 text-sm font-bold text-white shadow-lg shadow-violet-500/10">
                    {user?.fullName
                      ?.charAt(0)
                      ?.toUpperCase() ?? "P"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-100">
                      {user?.fullName ??
                        "Pratik Vidhale"}
                    </p>

                    <p className="truncate text-[11px] text-zinc-600">
                      {user?.email ??
                        "user@example.com"}
                    </p>
                  </div>
                </div>

                {/* View Profile */}

                <Link
                  href="/dashboard/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                >
                  <User size={16} />

                  <span className="flex-1">
                    View Profile
                  </span>

                  <ChevronRight size={15} />
                </Link>

                {/* Settings */}

                <Link
                  href="/dashboard/settings"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                >
                  <Settings size={16} />

                  <span className="flex-1">
                    Settings
                  </span>

                  <ChevronRight size={15} />
                </Link>

                {/* Divider */}

                <div className="my-2 h-px bg-zinc-800" />

                {/* Logout */}

                <button
                  type="button"
                  onClick={() =>
                    setShowLogoutConfirm(true)
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut size={16} />

                  <span className="flex-1 text-left">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* =====================================================
              PROFILE BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (previous) => !previous,
              )
            }
            className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-zinc-900"
          >
            {/* Avatar */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 text-sm font-bold text-white shadow-lg shadow-violet-500/10 transition duration-300 group-hover:scale-105">
              {user?.fullName
                ?.charAt(0)
                ?.toUpperCase() ?? ""}
            </div>

            {/* User Name */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-100">
                {user?.fullName ??
                  "user"}
              </p>

              <p className="truncate text-xs text-zinc-600">
                {user?.email ??
                  "user@example.com"}
              </p>
            </div>

            {/* Arrow */}

            <ChevronRight
              size={16}
              className={`shrink-0 text-zinc-700 transition duration-300 ${
                profileOpen
                  ? "-rotate-90 text-violet-400"
                  : "group-hover:translate-x-1 group-hover:text-violet-400"
              }`}
            />
          </button>
        </div>
      </aside>

      {/* =====================================================
          LOGOUT CONFIRMATION MODAL
          OUTSIDE SIDEBAR
      ===================================================== */}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() =>
              setShowLogoutConfirm(false)
            }
          />

          {/* Modal */}

          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-[#111116] shadow-2xl shadow-black/60">
            {/* Glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative p-6">
              {/* Icon */}

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                <LogOut size={21} />
              </div>

              {/* Heading */}

              <h3 className="mt-5 text-lg font-bold text-white">
                Are you sure you want to
                logout?
              </h3>

              {/* Description */}

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                You will be signed out of your
                PuzzleQuest account and will need
                to login again to continue your
                adventure.
              </p>

              {/* Actions */}

              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Cancel */}

                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() =>
                    setShowLogoutConfirm(false)
                  }
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                {/* Logout */}

                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoggingOut
                    ? "Logging out..."
                    : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}