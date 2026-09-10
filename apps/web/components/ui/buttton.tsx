"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit";
};

function getButtonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled = false,
}: Pick<
  ButtonProps,
  "variant" | "size" | "fullWidth" | "className" | "disabled"
>) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-violet-500/40";

  const variants = {
    primary:
      "bg-violet-600 text-white shadow-lg shadow-violet-950/30 hover:bg-violet-500 hover:shadow-violet-500/20",
    secondary:
      "border border-zinc-700/80 bg-zinc-900/80 text-zinc-100 hover:border-violet-500/40 hover:bg-zinc-800",
    ghost: "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-sm",
  };

  return `
    ${base}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
    ${disabled ? "pointer-events-none opacity-50" : ""}
  `;
}

export default function Button({
  children,
  href,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );

  const classes = getButtonClassName({
    variant,
    size,
    fullWidth,
    className,
    disabled: disabled || loading,
  });

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${classes} disabled:cursor-not-allowed`}
    >
      {content}
    </button>
  );
}

export function getButtonLinkClassName(
  props: Pick<ButtonProps, "variant" | "size" | "fullWidth" | "className">,
) {
  return getButtonClassName({ ...props, disabled: false });
}
