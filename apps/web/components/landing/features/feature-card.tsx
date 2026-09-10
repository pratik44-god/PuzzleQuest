import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Card from "~/components/ui/cardd";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className="
          group h-full p-6
          transition-all duration-300
          hover:-translate-y-2
          hover:border-violet-500/30
          hover:bg-zinc-900
          hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
        "
      >
        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl bg-violet-500/10
            text-violet-400
            transition-all duration-300
            group-hover:scale-105
            group-hover:bg-violet-500/15
          "
        >
          <Icon size={28} />
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-zinc-400">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 font-medium text-violet-400">
          Learn More

          <ArrowUpRight
            size={18}
            className="
              transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </Card>
    </Link>
  );
}