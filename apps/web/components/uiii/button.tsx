"use client";

import { Loader2 } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30",

    secondary:
      "border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}

      {children}
    </button>
  );
}