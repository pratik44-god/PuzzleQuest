"use client";

import { Search, X } from "lucide-react";

type DiscoverSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DiscoverSearch({
  value,
  onChange,
}: DiscoverSearchProps) {
  return (
    <section className="mt-8">
      <div className="group relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 transition group-focus-within:text-violet-400"
        />

        <input
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          type="text"
          placeholder="Search hunts, mysteries, adventures..."
          className="h-13 w-full rounded-2xl border border-zinc-800 bg-[#0D0D14] pl-11 pr-12 text-sm text-zinc-100 outline-none transition duration-300 placeholder:text-zinc-600 hover:border-zinc-700 focus:border-violet-500/50 focus:bg-[#101018] focus:ring-4 focus:ring-violet-500/5"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-white"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </section>
  );
}