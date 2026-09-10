"use client";

import { usePathname } from "next/navigation";

import ProtectedLink from "~/components/auth/ProtectedLink";

type SidebarItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export default function SidebarItem({
  href,
  icon,
  label,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <ProtectedLink
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-300 ${
        active
          ? "bg-violet-500/10 text-zinc-100"
          : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
      }`}
    >
      <span
        className="transition duration-300 group-hover:scale-110"
        style={
          active
            ? { color: "var(--theme)" }
            : undefined
        }
      >
        {icon}
      </span>

      <span className="flex-1">
        {label}
      </span>

      {active && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
      )}
    </ProtectedLink>
  );
}