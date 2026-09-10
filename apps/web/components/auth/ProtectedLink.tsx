
"use client";

import Link, { type LinkProps } from "next/link";
import { type MouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "~/hooks/api/auth";

type ProtectedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ProtectedLink({
  children,
  className,
  onClick,
  ...props
}: ProtectedLinkProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (isLoading) {
      event.preventDefault();
      return;
    }

    if (!user) {
      event.preventDefault();
      router.push("/login");
    }
  };

  return (
    <Link
      {...props}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}