"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

import { formatCountdown } from "~/lib/question-timers";
import { playTimerExpiredSound } from "~/lib/hunt-sounds";

type AnswerTimerProps = {
  timeLimitSeconds: number;
  onExpire: () => void;
  paused?: boolean;
};

export default function AnswerTimer({
  timeLimitSeconds,
  onExpire,
  paused = false,
}: AnswerTimerProps) {
  const [remaining, setRemaining] = useState(timeLimitSeconds);
  const [expired, setExpired] = useState(false);
  const onExpireRef = useRef(onExpire);

  onExpireRef.current = onExpire;

  useEffect(() => {
    if (paused) {
      return;
    }

    let ticks = timeLimitSeconds;
    let finished = false;

    setRemaining(ticks);
    setExpired(false);

    const interval = window.setInterval(() => {
      if (finished) {
        return;
      }

      ticks -= 1;
      setRemaining(ticks);

      if (ticks <= 0) {
        finished = true;
        window.clearInterval(interval);
        setExpired(true);
        playTimerExpiredSound();
        onExpireRef.current();
      }
    }, 1000);

    return () => {
      finished = true;
      window.clearInterval(interval);
    };
  }, [timeLimitSeconds, paused]);

  const isUrgent = remaining <= 10 && !expired;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-lg transition-all ${
        expired
          ? "animate-[timerExpireShake_0.45s_ease-in-out] border-rose-500/30 bg-rose-500/10 text-rose-300 shadow-rose-950/20"
          : isUrgent
            ? "animate-pulse border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-amber-950/20"
            : "border-violet-500/30 bg-violet-500/10 text-violet-300 shadow-violet-950/30"
      }`}
    >
      <Clock size={16} />
      {expired ? "Time's up!" : formatCountdown(remaining)}
    </div>
  );
}
