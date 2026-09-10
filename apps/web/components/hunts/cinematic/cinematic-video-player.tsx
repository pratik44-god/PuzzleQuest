"use client";

import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

type CinematicVideoPlayerProps = {
  src: string;
  onEnded: () => void;
  onSkip?: () => void;
  allowSkip?: boolean;
};

export default function CinematicVideoPlayer({
  src,
  onEnded,
  onSkip,
  allowSkip = true,
}: CinematicVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [needsInteraction, setNeedsInteraction] =
    useState(false);
  const [isReady, setIsReady] = useState(false);

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current !== null) {
      window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  const hideControlsLater = () => {
    clearControlsTimeout();

    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const playVideo = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();

      setIsPaused(false);
      setNeedsInteraction(false);

      hideControlsLater();
    } catch {
      /*
       * Most browsers block autoplay with sound.
       * Show a cinematic play button instead.
       */
      setNeedsInteraction(true);
      setShowControls(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    clearControlsTimeout();

    setIsPaused(false);
    setIsMuted(false);
    setShowControls(true);
    setNeedsInteraction(false);
    setIsReady(false);

    video.pause();
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;

    const handleCanPlay = () => {
      setIsReady(true);
      void playVideo();
    };

    video.addEventListener("canplay", handleCanPlay);

    video.load();

    return () => {
      video.removeEventListener(
        "canplay",
        handleCanPlay,
      );

      video.pause();

      clearControlsTimeout();
    };
  }, [src]);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void playVideo();
      return;
    }

    video.pause();

    setIsPaused(true);
    setShowControls(true);

    clearControlsTimeout();
  };

  const handleToggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !video.muted;

    video.muted = nextMuted;

    setIsMuted(nextMuted);
    setShowControls(true);

    hideControlsLater();
  };

  const handleScreenClick = () => {
    if (needsInteraction) {
      return;
    }

    setShowControls((current) => {
      const next = !current;

      if (next) {
        hideControlsLater();
      } else {
        clearControlsTimeout();
      }

      return next;
    });
  };

  const handleMouseMove = () => {
    if (needsInteraction) {
      return;
    }

    setShowControls(true);
    hideControlsLater();
  };

  return (
    <section
      className="fixed inset-0 z-[9999] h-[100dvh] w-[100vw] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* FULLSCREEN VIDEO */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="auto"
        onEnded={onEnded}
        onClick={handleScreenClick}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />

      {/* LOADING SCREEN */}
      {!isReady ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-amber-400" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Entering the story
            </p>
          </div>
        </div>
      ) : null}

      {/* CINEMATIC DARKNESS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/50" />

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />

      {/* AUTOPLAY INTERACTION */}
      {needsInteraction ? (
        <button
          type="button"
          onClick={() => void playVideo()}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/20"
        >
          <div className="group flex flex-col items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition duration-300 group-hover:scale-110">
              <Play
                size={30}
                fill="currentColor"
              />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
              Enter the adventure
            </p>
          </div>
        </button>
      ) : null}

      {/* CONTROLS */}
      {showControls &&
      isReady &&
      !needsInteraction ? (
        <>
          {/* TOP CONTROLS */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent p-5 sm:p-8">
            <p className="pointer-events-none text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
              Captain Vane&apos;s Last Map
            </p>

            {allowSkip && onSkip ? (
              <button
                type="button"
                onClick={onSkip}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 text-xs font-bold text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
              >
                Skip scene

                <SkipForward size={15} />
              </button>
            ) : null}
          </div>

          {/* BOTTOM CONTROLS */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/75 to-transparent px-5 pb-6 pt-20 sm:px-8 sm:pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/10"
                  aria-label={
                    isPaused
                      ? "Play video"
                      : "Pause video"
                  }
                >
                  {isPaused ? (
                    <Play
                      size={17}
                      fill="currentColor"
                    />
                  ) : (
                    <Pause size={17} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
                  aria-label={
                    isMuted
                      ? "Unmute video"
                      : "Mute video"
                  }
                >
                  {isMuted ? (
                    <VolumeX size={17} />
                  ) : (
                    <Volume2 size={17} />
                  )}
                </button>
              </div>

              <p className="hidden text-[9px] font-bold uppercase tracking-[0.28em] text-white/30 sm:block">
                Cinematic Sequence
              </p>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}