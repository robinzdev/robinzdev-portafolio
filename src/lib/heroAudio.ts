// src/lib/heroAudio.ts
// Singleton de Web Audio API para análisis de frecuencias en tiempo real

let audioContext: AudioContext | null = null;
let analyserNode: AnalyserNode | null = null;
let sourceConnected = false;

export function connectAudioElementToAnalyser(audioElement: HTMLAudioElement): AnalyserNode | null {
  if (typeof window === "undefined") return null;

  try {
    if (!audioContext) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      audioContext = new AudioCtx();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }

    if (!analyserNode) {
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.76;
    }

    if (!sourceConnected) {
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyserNode);
      analyserNode.connect(audioContext.destination);
      sourceConnected = true;
    }

    return analyserNode;
  } catch {
    return analyserNode;
  }
}

export function getHeroAudioAnalyser(): AnalyserNode | null {
  return analyserNode;
}

export function resumeHeroAudioContext(): void {
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

export function suspendHeroAudioContext(): void {
  if (audioContext && audioContext.state === "running") {
    audioContext.suspend().catch(() => {});
  }
}
