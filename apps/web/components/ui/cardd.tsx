import { ReactNode } from "react";
import { cn } from "~/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div 
      className={cn(
        "rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl shadow-violet-950/20 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}