"use client";

import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";

export interface VariableTextWaveProps {
  className?: string;
  words?: { text: string; isAccent?: boolean }[];
  as?: "h1" | "h2" | "h3";
  layout?: "row" | "column" | "wrap";
  restWght?: number;
  restWdth?: number;
}

export function VariableTextWave({
  className = "",
  words,
  as: Component = "h1",
  layout = "wrap",
  restWght,
  restWdth,
}: VariableTextWaveProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const animFrameId = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(true);

  // Palabras y caracteres configurables
  const textGroups = useMemo(
    () =>
      words && words.length > 0
        ? words
        : [
            { text: "ROBIN", isAccent: false },
            { text: "DEV.", isAccent: true },
          ],
    [words]
  );

  const flatLetters = useMemo(() => {
    const list: { char: string; isAccent: boolean; groupIndex: number }[] = [];
    textGroups.forEach((group, gIdx) => {
      group.text.split("").forEach((char) => {
        list.push({ char, isAccent: !!group.isAccent, groupIndex: gIdx });
      });
    });
    return list;
  }, [textGroups]);

  // Rangos de interpolación (idénticos a la arquitectura de Kern Society con Roboto Flex):
  // Reposo: configurable, por defecto 300 (Light) para una presencia más ligera y refinada
  // Cerca del cursor: wght 1000, wdth 151 (extendido & black)
  // Lejos del cursor: afinado para compensar el ancho
  const REST_WGHT = restWght ?? 300;
  const REST_WDTH = restWdth ?? 100;

  const MAX_WGHT = 1000;
  const MAX_WDTH = 151;

  const MIN_WGHT = Math.max(100, REST_WGHT - 150);
  const MIN_WDTH = 35;

  const RADIUS = 180; // Radio de proximidad en px
  const LERP_FACTOR = 0.12; // Velocidad de interpolación elástica

  // Estados dinámicos de cada letra (wght, wdth)
  const currentWght = useRef<number[]>(flatLetters.map(() => REST_WGHT));
  const currentWdth = useRef<number[]>(flatLetters.map(() => REST_WDTH));

  // Pausa por IntersectionObserver para 0% CPU fuera de viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updatePhysics = useCallback(() => {
    if (!isInView) {
      animFrameId.current = null;
      return;
    }

    let hasMovement = false;
    const mouse = mousePos.current;

    // Resincronizar arrays si la cantidad de letras difiere
    if (currentWght.current.length !== flatLetters.length) {
      currentWght.current = flatLetters.map(() => REST_WGHT);
      currentWdth.current = flatLetters.map(() => REST_WDTH);
    }

    flatLetters.forEach((_, idx) => {
      const span = letterRefs.current[idx];
      if (!span) return;

      let targetWght = REST_WGHT;
      let targetWdth = REST_WDTH;

      if (mouse) {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY);

        if (distance < RADIUS) {
          // Curva cosenoidal suave (de 0 a 1) para las letras cerca del cursor
          const factor = Math.cos((distance / RADIUS) * (Math.PI / 2));
          targetWght = REST_WGHT + (MAX_WGHT - REST_WGHT) * factor;
          targetWdth = REST_WDTH + (MAX_WDTH - REST_WDTH) * factor;
        } else {
          // Compensación de condensación fluida
          const farDistance = Math.min(distance - RADIUS, RADIUS * 1.5);
          const compressFactor = Math.sin((farDistance / (RADIUS * 1.5)) * (Math.PI / 2)) * 0.45;
          targetWght = REST_WGHT - (REST_WGHT - MIN_WGHT) * compressFactor;
          targetWdth = REST_WDTH - (REST_WDTH - MIN_WDTH) * compressFactor;
        }
      }

      // Lerp continuo para fluidez absoluta a 60 FPS
      const prevWght = currentWght.current[idx] ?? REST_WGHT;
      const prevWdth = currentWdth.current[idx] ?? REST_WDTH;

      const newWght = prevWght + (targetWght - prevWght) * LERP_FACTOR;
      const newWdth = prevWdth + (targetWdth - prevWdth) * LERP_FACTOR;

      currentWght.current[idx] = newWght;
      currentWdth.current[idx] = newWdth;

      if (
        Math.abs(newWght - targetWght) > 0.5 ||
        Math.abs(newWdth - targetWdth) > 0.5
      ) {
        hasMovement = true;
      }

      // Aplicar los ejes de variación de Roboto Flex nativos
      span.style.fontVariationSettings = `"wght" ${newWght.toFixed(1)}, "wdth" ${newWdth.toFixed(1)}`;
    });

    if (hasMovement || mouse !== null) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameId.current = null;
    }
  }, [flatLetters, isInView]);

  const handlePointerMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!animFrameId.current && isInView) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  };

  const handlePointerLeave = () => {
    mousePos.current = null;
    if (!animFrameId.current && isInView) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  let globalIndex = 0;
  const defaultSizeClasses = "text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem]";

  return (
    <Component
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`font-['Roboto_Flex',sans-serif] tracking-tight uppercase leading-[0.95] cursor-default select-none ${
        layout === "column"
          ? "flex flex-col items-center justify-center w-full"
          : "inline-flex flex-wrap items-baseline gap-x-4 sm:gap-x-7"
      } ${className || defaultSizeClasses}`.trim()}
    >
      {textGroups.map((group, groupIdx) => {
        const letters = group.text.split("");
        return (
          <span
            key={groupIdx}
            className={`inline-flex whitespace-nowrap ${
              group.isAccent ? "text-accent" : "text-[var(--text-primary)]"
            }`}
          >
            {letters.map((char) => {
              const currentIndex = globalIndex++;

              return (
                <span
                  key={currentIndex}
                  ref={(el) => {
                    letterRefs.current[currentIndex] = el;
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: `"wght" ${REST_WGHT}, "wdth" ${REST_WDTH}`,
                    willChange: "font-variation-settings",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
