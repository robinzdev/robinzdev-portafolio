"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HeroCard3DProps {
  className?: string;
}

export function HeroCard3D({ className = "" }: HeroCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepDuration, setSweepDuration] = useState(2.8);
  const [sweepKey, setSweepKey] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<"photo" | "video">("photo");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaCycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scheduleNextMediaSwitchRef = useRef<() => void>(() => {});
  const isVisibleRef = useRef<boolean>(true);

  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sweepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ambientGlitchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Valores de movimiento del ratón normalizados [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Profundidad de separación de la capa trasera (Z):
  // En reposo: -12px (cercana)
  // En hover: se aleja pronunciadamente a -80px con mayor sensación de desacople 3D
  const hoverTargetZ = useMotionValue(-12);
  const smoothZ = useSpring(hoverTargetZ, { damping: 20, stiffness: 140, mass: 0.6 });

  // Físicas suaves con resorte reactivo
  const springConfig = { damping: 20, stiffness: 160, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotación base en el plano: 3 grados a la derecha (+3deg)
  const rotateZ = useTransform(smoothX, [-0.5, 0.5], [1.8, 4.2]); // centrado en +3deg

  // Rotaciones 3D reactivas al cursor
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  // Desplazamiento de la capa verde trasera: pasa de 10px en reposo a 28px en hover con paralaje reactivo
  const baseOffset = useTransform(smoothZ, [-12, -80], [10, 28]);
  const backLayerX = useTransform([smoothX, baseOffset], ([x, off]) => (off as number) + (x as number) * 16);
  const backLayerY = useTransform([smoothY, baseOffset], ([y, off]) => (off as number) + (y as number) * 16);

  // Disparador del micro-glitch de aberración cromática RGB
  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    glitchTimerRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, 400);
  }, []);

  // Transición quirúrgica tipo glitch entre foto y video holográfico
  const triggerMediaTransition = useCallback(() => {
    if (!isVisibleRef.current) return;

    // Fase 1: perturbación electromagnética (glitch intenso y split RGB)
    setIsGlitching(true);
    setIsTransitioning(true);

    // Fase 2: Conmutar media a mitad del glitch (140ms)
    setTimeout(() => {
      setCurrentMedia((prev) => {
        const next = prev === "photo" ? "video" : "photo";
        if (next === "video") {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
          // Regreso a foto: programar siguiente ciclo aleatorio entre 15s y 50s
          scheduleNextMediaSwitchRef.current();
        }
        return next;
      });
    }, 140);

    // Fase 3: Estabilizar señal
    setTimeout(() => {
      setIsGlitching(false);
      setIsTransitioning(false);
    }, 360);
  }, []);

  // Programador orgánico con cadencia aleatoria de 30 a 60 segundos
  const scheduleNextMediaSwitch = useCallback(() => {
    if (mediaCycleTimerRef.current) clearTimeout(mediaCycleTimerRef.current);
    if (!isVisibleRef.current) return;

    // Aleatorio entre 30 y 60 segundos (30000 a 60000 ms)
    const delay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;

    mediaCycleTimerRef.current = setTimeout(() => {
      triggerMediaTransition();
    }, delay);
  }, [triggerMediaTransition]);

  useEffect(() => {
    scheduleNextMediaSwitchRef.current = scheduleNextMediaSwitch;
  }, [scheduleNextMediaSwitch]);

  // Programador orgánico del haz de escáner con cadencia y velocidad aleatorias
  const scheduleNextSweep = useCallback((customDelay?: number) => {
    if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);

    // Pausa aleatoria natural entre barridos (2.5s a 6.5s) para evitar sensación de bucle rígido
    const delay = customDelay ?? Math.floor(Math.random() * 4000 + 2500);

    sweepTimerRef.current = setTimeout(() => {
      // Duración orgánica variable entre 2.2s y 3.5s
      const nextDuration = Math.round((Math.random() * 1.3 + 2.2) * 10) / 10;
      setSweepDuration(nextDuration);
      setSweepKey((prev) => prev + 1);
      setIsSweeping(true);
    }, delay);
  }, []);

  const handleSweepComplete = useCallback(() => {
    setIsSweeping(false);
    scheduleNextSweep();
  }, [scheduleNextSweep]);

  // Ciclo de vida: primer barrido suave, micro-glitches e IntersectionObserver (0% CPU)
  useEffect(() => {
    scheduleNextSweep(1400);
    scheduleNextMediaSwitch();

    // Pequeñas fluctuaciones de sintonización analógica espontáneas cada 12-22s
    const scheduleNextAmbientGlitch = () => {
      const nextDelay = Math.floor(Math.random() * 10000 + 12000);
      ambientGlitchTimerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 220);
        scheduleNextAmbientGlitch();
      }, nextDelay);
    };

    scheduleNextAmbientGlitch();

    // IntersectionObserver para pausar animaciones y video al salir del viewport (0% CPU en reposo)
    const card = cardRef.current;
    let observer: IntersectionObserver | null = null;
    if (card && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
            if (!entry.isIntersecting) {
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
              }
              if (mediaCycleTimerRef.current) clearTimeout(mediaCycleTimerRef.current);
              if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
              if (ambientGlitchTimerRef.current) clearTimeout(ambientGlitchTimerRef.current);
            } else {
              if (currentMedia === "video" && videoRef.current) {
                videoRef.current.play().catch(() => {});
              } else {
                scheduleNextMediaSwitch();
              }
              scheduleNextSweep(1200);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(card);
    }

    return () => {
      if (observer) observer.disconnect();
      if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
      if (ambientGlitchTimerRef.current) clearTimeout(ambientGlitchTimerRef.current);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
      if (mediaCycleTimerRef.current) clearTimeout(mediaCycleTimerRef.current);
    };
  }, [scheduleNextSweep, scheduleNextMediaSwitch, currentMedia]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handlePointerEnter = () => {
    setIsHovered(true);
    hoverTargetZ.set(-80);
    triggerGlitch();

    // En hover activa un barrido rápido y sensible
    if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
    setSweepDuration(1.6);
    setSweepKey((prev) => prev + 1);
    setIsSweeping(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    hoverTargetZ.set(-12);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={triggerGlitch}
      className={`relative w-full max-w-[420px] select-none cursor-pointer [perspective:1100px] ${className}`.trim()}
      style={{ touchAction: "none" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        {/* Capa 1 (Trasera ÚNICA): Placa verde acento sin ninguna capa blanca intermedia */}
        <motion.div
          style={{
            x: backLayerX,
            y: backLayerY,
            translateZ: smoothZ,
          }}
          className="absolute inset-0 bg-accent border-2 border-[var(--border-main)] pointer-events-none transition-colors"
        />

        {/* Capa 2 (Principal): Consola retro-tech 3D sin sombra rígida que simule una 3ra capa */}
        <div
          style={{
            transform: "translateZ(0px)",
          }}
          className="relative border-2 border-[var(--border-main)] bg-[var(--bg-surface)] p-6 transition-colors"
        >
          {/* Cabecera de consola retro-tech */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[var(--border-main)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-light">
              DEV_ID // ROBINZDEV
            </span>
          </div>

          {/* Área contenedora para la foto/video con efectos CRT y Aberración Cromática */}
          <div className="relative aspect-square w-full border-2 border-[var(--border-main)] bg-[var(--bg-primary)] overflow-hidden group">
            {/* Imagen Base (Foto) */}
            <Image
              src="/mifoto.webp"
              alt="Robinzon Gabino - Desarrollador & Diseñador"
              fill
              priority
              unoptimized
              className={`object-cover object-center transition-all duration-300 ${
                currentMedia === "photo" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02] pointer-events-none"
              } ${isGlitching ? "scale-[1.04]" : ""}`}
              sizes="(max-width: 768px) 85vw, 380px"
            />

            {/* Video WebM optimizado (Avatar Holográfico) */}
            <video
              ref={videoRef}
              src="/mipersonajeanimado.webm"
              playsInline
              muted
              preload="auto"
              onEnded={triggerMediaTransition}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ${
                currentMedia === "video" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02] pointer-events-none"
              } ${isGlitching ? "scale-[1.04]" : ""}`}
              style={{
                filter:
                  isGlitching && currentMedia === "video"
                    ? "drop-shadow(-3px 0 0 rgba(255, 40, 40, 0.7)) drop-shadow(3px 0 0 rgba(40, 255, 255, 0.7)) saturate(150%)"
                    : "none",
              }}
            />

            {/* Pulso de interferencia electromagnética durante la conmutación */}
            {isTransitioning && (
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-20 bg-accent/20 mix-blend-screen animate-pulse"
              />
            )}

            {/* Capas de Aberración Cromática (Glitch RGB) - Solo activas durante el pulso de glitch, nunca fijas en hover */}
            {isGlitching && currentMedia === "photo" && (
              <>
                {/* Canal Rojo / Magenta (Desplazado a la izquierda) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75 overflow-hidden transition-transform duration-100"
                  style={{
                    transform: "translate(-4px, 1.5px)",
                    filter: "drop-shadow(-2px 0 0 rgba(255, 40, 40, 0.8)) saturate(180%)",
                    clipPath:
                      "polygon(0 12%, 100% 12%, 100% 28%, 0 28%, 0 58%, 100% 58%, 100% 74%, 0 74%)",
                  }}
                >
                  <Image
                    src="/mifoto.webp"
                    alt=""
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>

                {/* Canal Cian / Verde (Desplazado a la derecha) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75 overflow-hidden transition-transform duration-100"
                  style={{
                    transform: "translate(4px, -1.5px)",
                    filter: "drop-shadow(2px 0 0 rgba(40, 255, 255, 0.8)) saturate(180%)",
                    clipPath:
                      "polygon(0 22%, 100% 22%, 100% 42%, 0 42%, 0 72%, 100% 72%, 100% 88%, 0 88%)",
                  }}
                >
                  <Image
                    src="/mifoto.webp"
                    alt=""
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
              </>
            )}

            {/* Capa de Líneas de Escaneo CRT + Fósforo Triada */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-65 transition-opacity duration-300"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(255, 0, 0, 0.03) 0px, rgba(0, 255, 0, 0.02) 2px, rgba(0, 0, 255, 0.03) 4px, transparent 4px, transparent 6px)",
              }}
            />

            {/* Viñeta de tubo curvo CRT */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 62%, rgba(0, 0, 0, 0.5) 100%)",
              }}
            />

            {/* Haz de barrido electrónico con desvanecimiento suave de entrada y salida */}
            {isSweeping && (
              <motion.div
                key={sweepKey}
                initial={{ y: "-120%", opacity: 0 }}
                animate={{
                  y: "360%",
                  opacity: [0, 0.75, 0.75, 0],
                }}
                transition={{
                  duration: sweepDuration,
                  ease: [0.35, 0.05, 0.25, 1],
                  times: [0, 0.15, 0.85, 1],
                }}
                onAnimationComplete={handleSweepComplete}
                className="absolute left-0 right-0 h-16 pointer-events-none z-10 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
              />
            )}

            {/* Marcas de registro en esquinas estilo blueprint */}
            <span className="absolute top-2 left-2 font-mono text-[10px] text-white/70 select-none leading-none opacity-60 font-light pointer-events-none z-10">
              +
            </span>
            <span className="absolute top-2 right-2 font-mono text-[10px] text-white/70 select-none leading-none opacity-60 font-light pointer-events-none z-10">
              +
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 select-none leading-none opacity-60 font-light pointer-events-none z-10">
              +
            </span>
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-white/70 select-none leading-none opacity-60 font-light pointer-events-none z-10">
              +
            </span>
          </div>

          {/* Pie de credencial */}
          <div className="mt-4 pt-3 border-t-2 border-[var(--border-main)] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--text-muted)] font-light">STATUS</span>
            <span className="font-light text-[var(--accent-green)] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${currentMedia === "video" ? "bg-accent animate-ping" : "bg-accent animate-pulse"}`} />
              {currentMedia === "video" ? "AVATAR // STREAMING" : "ONLINE (60 FPS)"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
