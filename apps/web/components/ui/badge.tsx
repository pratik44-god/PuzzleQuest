import { ReactNode } from "react";
import { cn } from "~/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300",
        className
      )}
    >
      {children}
    </span>
  );
}