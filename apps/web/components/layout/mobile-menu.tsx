"use client";

import Link from "next/link";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
      <div className="absolute right-0 h-full w-72 border-l border-white/10 bg-[#09090B] p-6">

        <button
          onClick={onClose}
          className="mb-8 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-6">
          <Link href="/" onClick={onClose}>
            Home
          </Link>

          <Link href="/discover" onClick={onClose}>
            Discover
          </Link>

          <Link href="/leaderboard" onClick={onClose}>
            Leaderboard
          </Link>

          <Link href="/about" onClick={onClose}>
            About
          </Link>
        </nav>

      </div>
    </div>
  );
}