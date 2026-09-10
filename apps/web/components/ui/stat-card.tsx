import type { LucideIcon } from "lucide-react";

import Card from "~/components/ui/cardd";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  index?: number;
};

export default function StatCard({
  icon: Icon,
  value,
  label,
  index = 0,
}: StatCardProps) {
  return (
    <div
      className="animate-[huntReveal_0.65s_ease-out_both]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="group p-8 text-center transition-all hover:-translate-y-2 hover:border-violet-500/30">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
          <Icon size={32} />
        </div>

        <h3 className="mt-6 text-5xl font-bold text-white">
          {value}
        </h3>

        <p className="mt-3 text-zinc-400">
          {label}
        </p>
      </Card>
    </div>
  );
}
