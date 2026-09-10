"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackNavSize = "sm" | "md";

const sizeClasses: Record<BackNavSize, string> = {
  sm: "px-3.5 py-2 text-xs font-medium",
  md: "px-5 py-3 text-sm font-medium",
};

const iconSizes: Record<BackNavSize, number> = {
  sm: 12,
  md: 14,
};

function backNavClassName(size: BackNavSize, className?: string) {
  return [
    "group inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] text-zinc-500 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300",
    "hover:-translate-x-0.5 hover:border-violet-500/25 hover:bg-violet-500/[0.06] hover:text-violet-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type BackLinkProps = {
  href: string;
  label: string;
  size?: BackNavSize;
  className?: string;
};

export function BackLink({
  href,
  label,
  size = "sm",
  className,
}: BackLinkProps) {
  return (
    <Link href={href} className={backNavClassName(size, className)}>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.05] transition-colors duration-300 group-hover:bg-violet-500/10"
      >
        <ArrowLeft
          size={iconSizes[size]}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </span>

      <span>{label}</span>
    </Link>
  );
}

type BackButtonProps = {
  onClick: () => void;
  label: string;
  size?: BackNavSize;
  className?: string;
  disabled?: boolean;
};

export function BackButton({
  onClick,
  label,
  size = "md",
  className,
  disabled = false,
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${backNavClassName(size, className)} disabled:pointer-events-none disabled:opacity-50`}
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.05] transition-colors duration-300 group-hover:bg-violet-500/10"
      >
        <ArrowLeft
          size={iconSizes[size]}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </span>

      <span>{label}</span>
    </button>
  );
}
