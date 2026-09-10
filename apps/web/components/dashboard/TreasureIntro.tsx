"use client";

import { useEffect, useState } from "react";

export default function TreasureIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex animate-[introExit_3.2s_ease-in-out_forwards] items-center justify-center bg-[#050509]">
      <div className="relative text-center">
        <div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.5), transparent 70%)",
          }}
        />

        <div className="relative animate-[treasureFloat_1.8s_ease-in-out_infinite] text-7xl">
          🗝️
        </div>

        <p className="mt-6 animate-pulse text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
          Preparing your adventure
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
          The treasure awaits...
        </h2>

        <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-full origin-left animate-[loadingBar_2.5s_ease-in-out] rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" />
        </div>
      </div>
    </div>
  );
}
