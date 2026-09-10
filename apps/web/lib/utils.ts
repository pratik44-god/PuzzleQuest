import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function truncateText(
  text: string,
  maxLength: number,
  emptyFallback = "",
) {
  const trimmed = text.trim();

  if (!trimmed) {
    return emptyFallback;
  }

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const truncated =
    lastSpace > Math.floor(maxLength * 0.55)
      ? slice.slice(0, lastSpace)
      : slice;

  return `${truncated.trimEnd()}...`;
}
