type ToneStep = {
  frequency: number;
  duration: number;
  delay?: number;
  type?: OscillatorType;
  volume?: number;
};

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => undefined);
  }

  return audioContext;
}

function playTone(step: ToneStep) {
  const ctx = getAudioContext();
  const startAt = ctx.currentTime + (step.delay ?? 0);
  const volume = step.volume ?? 0.18;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = step.type ?? "sine";
  oscillator.frequency.setValueAtTime(step.frequency, startAt);

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + step.duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startAt);
  oscillator.stop(startAt + step.duration + 0.05);
}

function playSequence(steps: ToneStep[]) {
  for (const step of steps) {
    playTone(step);
  }
}

export function playTimerExpiredSound() {
  playSequence([
    { frequency: 440, duration: 0.12, type: "square", volume: 0.14 },
    { frequency: 330, duration: 0.12, delay: 0.14, type: "square", volume: 0.14 },
    { frequency: 220, duration: 0.28, delay: 0.28, type: "square", volume: 0.16 },
  ]);
}

export function playHuntCompleteSound() {
  playSequence([
    { frequency: 523.25, duration: 0.14, type: "triangle", volume: 0.16 },
    { frequency: 659.25, duration: 0.14, delay: 0.12, type: "triangle", volume: 0.16 },
    { frequency: 783.99, duration: 0.14, delay: 0.24, type: "triangle", volume: 0.17 },
    { frequency: 1046.5, duration: 0.32, delay: 0.36, type: "triangle", volume: 0.2 },
    { frequency: 1318.5, duration: 0.45, delay: 0.52, type: "sine", volume: 0.14 },
  ]);
}
