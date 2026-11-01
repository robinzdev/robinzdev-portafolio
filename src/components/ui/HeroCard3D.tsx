"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HeroCard3DProps {
  className?: string;
}

export function HeroCard3D({ className = "" }: HeroCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

          {/* Área contenedora para la foto */}
          <div className="relative aspect-square w-full border-2 border-[var(--border-main)] bg-[var(--bg-primary)] overflow-hidden">
            <Image
              src="/mifoto.jpg"
              alt="Robinzon Gabino - Desarrollador & Diseñador"
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 85vw, 380px"
            />

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
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              ONLINE (60 FPS)
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
