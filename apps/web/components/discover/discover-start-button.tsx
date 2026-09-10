import { Play } from "lucide-react";
import ProtectedLink from "~/components/auth/ProtectedLink";

const startButtonClassName =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25";

type DiscoverStartButtonProps = {
  huntId: string;
  label?: string;
  className?: string;
};

export default function DiscoverStartButton({
  huntId,
  label = "Start",
  className = "",
}: DiscoverStartButtonProps) {
  return (
    <ProtectedLink
      href={`/hunts/${huntId}`}
      className={`${startButtonClassName} ${className}`.trim()}
    >
      <Play size={12} />
      {label}
    </ProtectedLink>
  );
}

export function DiscoverStartButtonInline({
  huntId,
  label = "Start Hunt",
  className = "",
}: DiscoverStartButtonProps) {
  return (
    <ProtectedLink
      href={`/hunts/${huntId}`}
      className={`${startButtonClassName} px-4 py-2 text-sm ${className}`.trim()}
    >
      <Play size={14} />
      {label}
    </ProtectedLink>
  );
}
