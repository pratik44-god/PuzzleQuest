
"use client";

import type { ReactNode } from "react";

import ProtectedLink from "~/components/auth/ProtectedLink";
import { getButtonLinkClassName } from "~/components/ui/buttton";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ProtectedButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

export default function ProtectedButton({
  href,
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
}: ProtectedButtonProps) {
  return (
    <ProtectedLink
      href={href}
      className={getButtonLinkClassName({
        variant,
        size,
        fullWidth,
        className,
      })}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </ProtectedLink>
  );
}