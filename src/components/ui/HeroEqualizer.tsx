"use client";

import React, { useEffect, useRef } from "react";
import { getHeroAudioAnalyser } from "@/lib/heroAudio";

interface HeroEqualizerProps {
  className?: string;
}

export function HeroEqualizer({ className = "" }: HeroEqualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isActiveRef = useRef(false);
  const isVisibleRef = useRef(true);
  const animFrameRef = useRef<number | null>(null);

  // Buffer para frecuencias reales del analizador Web Audio
  const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  // Control suave de opacidad interna del canvas (fade in / fade out fluido)
  const currentAlphaRef = useRef(0);

  // Estados de altura y picos dinámicos para física retro VU meter
  const barHeightsRef = useRef<number[]>([]);
  const barPeaksRef = useRef<number[]>([]);
  const barPeakTimesRef = useRef<number[]>([]);

  useEffect(() => {
    const handleAudioEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      const active = Boolean(customEvent.detail?.active);
      isActiveRef.current = active;
      // Despertar bucle de animación si estaba pausado
      if (active && animFrameRef.current === null && isVisibleRef.current) {
        lastTimeRef.current = performance.now();
        animFrameRef.current = requestAnimationFrame(renderRef.current);
      }
    };

    window.addEventListener("hero-audio-active", handleAudioEvent);
    return () => {
      window.removeEventListener("hero-audio-active", handleAudioEvent);
    };
  }, []);

  const lastTimeRef = useRef(0);
  const renderRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    lastTimeRef.current = performance.now();

    const render = (now: number) => {
      if (!isVisibleRef.current) return;

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Transición fluida de opacidad (fade in ~450ms, fade out ~550ms)
      if (isActiveRef.current) {
        currentAlphaRef.current = Math.min(1, currentAlphaRef.current + dt * 2.2);
      } else {
        currentAlphaRef.current = Math.max(0, currentAlphaRef.current - dt * 1.8);
      }

      ctx.clearRect(0, 0, width, height);

      // Si la opacidad es mayor a cero, renderizar el ecualizador
      if (currentAlphaRef.current > 0 && width > 0 && height > 0) {
        ctx.globalAlpha = currentAlphaRef.current;

        // Geometría pegada a los bordes laterales sin margen vacío
        const barWidth = 10;
        const barGap = 4;
        const step = barWidth + barGap;
        const numBars = Math.ceil(width / step) + 1;

        if (barHeightsRef.current.length !== numBars) {
          barHeightsRef.current = new Array(numBars).fill(0);
          barPeaksRef.current = new Array(numBars).fill(0);
          barPeakTimesRef.current = new Array(numBars).fill(0);
        }

        // Altura máxima acotada al fondo inferior (~130px)
        const segHeight = 4;
        const segGap = 2;
        const maxEqHeight = Math.min(height * 0.19, 130);
        const maxSegments = Math.max(8, Math.floor(maxEqHeight / (segHeight + segGap)));

        // 1. Obtener datos reales de frecuencia del analizador Web Audio
        const analyser = getHeroAudioAnalyser();
        let hasRealAudio = false;

        if (analyser) {
          const binCount = analyser.frequencyBinCount;
          if (!freqDataRef.current || freqDataRef.current.length !== binCount) {
            freqDataRef.current = new Uint8Array(new ArrayBuffer(binCount));
          }
          analyser.getByteFrequencyData(freqDataRef.current);

          // Verificar si hay señal de audio activa
          for (let b = 0; b < binCount; b++) {
            if (freqDataRef.current[b] > 12) {
              hasRealAudio = true;
              break;
            }
          }
        }

        const t = now * 0.003;

        for (let i = 0; i < numBars; i++) {
          const normX = i / (numBars - 1);
          let target = 0.04;

          if (hasRealAudio && freqDataRef.current) {
            // Frecuencias musicales útiles (de sub-graves ~150Hz a agudos de estudio ~14kHz)
            const maxBin = Math.min(freqDataRef.current.length - 1, 80);
            const binIndex = Math.min(
              maxBin,
              Math.max(1, Math.floor(Math.pow(normX, 1.35) * maxBin))
            );

            // Interpolación de bins vecinos para mayor suavidad visual
            const v1 = freqDataRef.current[binIndex] || 0;
            const v0 = freqDataRef.current[Math.max(0, binIndex - 1)] || v1;
            const v2 = freqDataRef.current[Math.min(freqDataRef.current.length - 1, binIndex + 1)] || v1;
            const rawLevel = (v0 * 0.25 + v1 * 0.5 + v2 * 0.25) / 255;

            // Expansión dinámica no lineal para evitar que se aplaste en el techo
            const dynamicLevel = Math.pow(rawLevel, 1.35);

            // Caída acústica natural hacia los agudos (estilo analizador de estudio profesional)
            const spectralSlope = 0.88 - normX * 0.15;
            target = Math.max(0.03, Math.min(0.85, dynamicLevel * spectralSlope));
          } else {
            // Fallback sutil si el navegador aún no ha procesado el primer frame de audio
            const bass = Math.exp(-Math.pow((normX - 0.18) * 3.8, 2)) * (Math.sin(t * 4.2) * 0.35 + 0.65);
            const mid = Math.exp(-Math.pow((normX - 0.52) * 3.2, 2)) * (Math.sin(t * 5.8 + 1.2) * 0.3 + 0.6);
            const treble = Math.exp(-Math.pow((normX - 0.82) * 3.5, 2)) * (Math.sin(t * 8.5 + 2.5) * 0.3 + 0.55);
            const ripple = Math.sin(t * 4.5 + normX * 12) * 0.22 + Math.cos(t * 3.1 - normX * 8) * 0.18;
            target = Math.max(0.04, Math.min(0.96, (bass * 0.75 + mid * 0.65 + treble * 0.55 + ripple) * 0.8));
          }

          // Inercia de subida rápida y caída suave reactiva a la música real
          const currentH = barHeightsRef.current[i] || 0;
          const attackDecay = target > currentH ? 24 : 14;
          const newH = currentH + (target - currentH) * Math.min(1, dt * attackDecay);
          barHeightsRef.current[i] = newH;

          // Física de caída de picos retenidos (Peak hold VU meter)
          let peak = barPeaksRef.current[i] || 0;
          if (newH >= peak) {
            peak = newH;
            barPeaksRef.current[i] = peak;
            barPeakTimesRef.current[i] = now;
          } else {
            const timeSincePeak = (now - (barPeakTimesRef.current[i] || now)) / 1000;
            if (timeSincePeak > 0.18) {
              peak = Math.max(newH, peak - dt * 0.8);
              barPeaksRef.current[i] = peak;
            }
          }

          const activeSegments = Math.round(newH * maxSegments);
          const peakSegment = Math.min(maxSegments - 1, Math.round(peak * maxSegments));
          const bx = i * step;

          // Dibujar únicamente los segmentos activos y picos (opacidad 0 para los inactivos)
          for (let s = 0; s < maxSegments; s++) {
            // Pegado 100% al ras del borde inferior (y = height)
            const by = height - segHeight - s * (segHeight + segGap);
            const isFilled = s < activeSegments;
            const isPeak = s === peakSegment && peakSegment > activeSegments;

            if (isFilled) {
              const ratio = s / maxSegments;
              const alpha = 0.15 + ratio * 0.22;
              ctx.fillStyle = `rgba(154, 216, 114, ${alpha})`;
              ctx.fillRect(bx, by, barWidth, segHeight);
            } else if (isPeak) {
              ctx.fillStyle = "rgba(154, 216, 114, 0.70)";
              ctx.fillRect(bx, by, barWidth, segHeight);
            }
            // Inactivos no se pintan (opacidad 0 absoluta)
          }
        }
        ctx.globalAlpha = 1;
      }

      // Continuar renderizando si sigue activo o si está en proceso de fade out
      if (isActiveRef.current || currentAlphaRef.current > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    renderRef.current = render;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTimeRef.current = performance.now();
          if (animFrameRef.current === null && (isActiveRef.current || currentAlphaRef.current > 0)) {
            animFrameRef.current = requestAnimationFrame(render);
          }
        } else {
          if (animFrameRef.current !== null) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        }
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(container);

    if (isActiveRef.current || currentAlphaRef.current > 0) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden ${className}`.trim()}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
