import type { HuntBadgeId } from "~/lib/hunt-badges";
import { getHuntBadgeMeta } from "~/lib/hunt-badges";

type HuntBadgeProps = {
  badge: HuntBadgeId;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
};

export default function HuntBadge({
  badge,
  size = "md",
  showDescription = false,
}: HuntBadgeProps) {
  const meta = getHuntBadgeMeta(badge);
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-3 ${meta.ringClassName} ${meta.bgClassName} ${
        isSm ? "px-3 py-2" : isLg ? "px-5 py-4" : ""
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-xl bg-black/20 ${
          isSm ? "h-9 w-9 text-lg" : isLg ? "h-14 w-14 text-3xl" : "h-11 w-11 text-2xl"
        }`}
      >
        {meta.icon}
      </span>

      <div className="text-left">
        <p
          className={`font-bold ${meta.textClassName} ${
            isSm ? "text-xs" : isLg ? "text-lg" : "text-sm"
          }`}
        >
          {meta.label}
        </p>

        {showDescription ? (
          <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-400">
            {meta.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function HuntBadgeChip({
  badge,
}: {
  badge: HuntBadgeId;
}) {
  const meta = getHuntBadgeMeta(badge);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.ringClassName} ${meta.bgClassName} ${meta.textClassName}`}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}
