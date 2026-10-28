"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export type GridDirection =
  | "down-right"
  | "down-left"
  | "up-left"
  | "up-right"
  | "right"
  | "left"
  | "down"
  | "up";

export interface MovingGridProps {
  /** Tamaño de cada celda del grid en píxeles */
  gridSize?: number;
  /** Velocidad de desplazamiento en píxeles por segundo (más suave/alpaso por defecto) */
  speed?: number;
  /** Dirección inicial del movimiento */
  initialDirection?: GridDirection;
  /** Secuencia de direcciones a alternar en cada clic */
  directionOrder?: GridDirection[];
  /** Color de las líneas del grid o variable CSS */
  strokeColor?: string;
  /** Grosor de línea base */
  lineWidth?: number;
  /** Permitir cambio de dirección al hacer clic */
  enableClickChange?: boolean;
  /** Habilitar resaltado en verde de la celda bajo el cursor */
  enableHoverHighlight?: boolean;
  /** Color de fondo del bloque resaltado */
  highlightFillColor?: string;
  /** Color del borde del bloque resaltado */
  highlightBorderColor?: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
  /** Contenido hijo superpuesto sobre el grid */
  children?: React.ReactNode;
}

const DIRECTION_VECTORS: Record<GridDirection, { x: number; y: number }> = {
  "down-right": { x: 1, y: 1 },
  "down-left": { x: -1, y: 1 },
  "up-left": { x: -1, y: -1 },
  "up-right": { x: 1, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
};

const DEFAULT_CYCLE: GridDirection[] = [
  "down-right",
  "down-left",
  "up-left",
  "up-right",
];

export function MovingGrid({
  gridSize = 36,
  speed = 7, // Desplazamiento más lento y suave (alpaso)
  initialDirection = "down-right",
  directionOrder = DEFAULT_CYCLE,
  strokeColor,
  lineWidth = 1,
  enableClickChange = true,
  enableHoverHighlight = true,
  highlightFillColor,
  highlightBorderColor,
  className = "",
  children,
}: MovingGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentDirection, setCurrentDirection] = useState<GridDirection>(initialDirection);
  const directionRef = useRef<GridDirection>(initialDirection);

  useEffect(() => {
    directionRef.current = currentDirection;
  }, [currentDirection]);

  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Registro de posición del cursor sobre el contenedor
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableHoverHighlight || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerLeave = () => {
    mousePosRef.current = null;
  };

  // Alterna a la siguiente dirección en la secuencia al dar clic
  const handleToggleDirection = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableClickChange || directionOrder.length === 0) return;
    // Si el clic ocurrió sobre un botón o enlace interactivo hijo, no cambiar dirección
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea")) {
      return;
    }
    const currentIndex = directionOrder.indexOf(directionRef.current);
    const nextIndex = (currentIndex + 1) % directionOrder.length;
    const nextDir = directionOrder[nextIndex];
    directionRef.current = nextDir;
    setCurrentDirection(nextDir);
  }, [enableClickChange, directionOrder]);

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

    const resolveColor = () => {
      if (strokeColor) return strokeColor;
      const computed = getComputedStyle(canvas).getPropertyValue("--grid-line-color").trim();
      return computed || "rgba(128, 128, 128, 0.08)";
    };

    const resolveHighlightColor = () => {
      if (highlightFillColor) return highlightFillColor;
      const rgb = getComputedStyle(canvas).getPropertyValue("--color-accent-rgb").trim();
      return `rgba(${rgb || "118, 196, 87"}, 0.12)`;
    };

    // Bucle continuo a 60 FPS con pausa en viewport
    const render = (now: number) => {
      if (!isVisibleRef.current) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }
      const deltaSec = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const vector = DIRECTION_VECTORS[directionRef.current];
      offsetRef.current.x = (offsetRef.current.x + vector.x * speed * deltaSec) % gridSize;
      offsetRef.current.y = (offsetRef.current.y + vector.y * speed * deltaSec) % gridSize;

      ctx.clearRect(0, 0, width, height);

      const startX = ((offsetRef.current.x % gridSize) + gridSize) % gridSize;
      const startY = ((offsetRef.current.y % gridSize) + gridSize) % gridSize;

      // 1. Resaltado en verde del bloque que tiene el cursor encima
      if (enableHoverHighlight && mousePosRef.current) {
        const { x: mx, y: my } = mousePosRef.current;
        if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
          const k = Math.floor((mx - startX) / gridSize);
          const m = Math.floor((my - startY) / gridSize);
          const cellX = startX + k * gridSize;
          const cellY = startY + m * gridSize;

          // Relleno verde acento limpio (sin borde)
          ctx.fillStyle = resolveHighlightColor();
          ctx.fillRect(cellX, cellY, gridSize, gridSize);

          if (highlightBorderColor) {
            ctx.strokeStyle = highlightBorderColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(cellX + 0.5, cellY + 0.5, gridSize - 1, gridSize - 1);
          }
        }
      }

      // 2. Líneas de la cuadrícula
      ctx.strokeStyle = resolveColor();
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      for (let x = startX - gridSize; x <= width + gridSize; x += gridSize) {
        const px = Math.floor(x) + 0.5;
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
      }

      for (let y = startY - gridSize; y <= height + gridSize; y += gridSize) {
        const py = Math.floor(y) + 0.5;
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
      }

      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    // IntersectionObserver: 0% CPU al salir de pantalla
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        isVisibleRef.current = isIntersecting;

        if (isIntersecting) {
          lastTimeRef.current = performance.now();
          if (animFrameRef.current === null) {
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
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [gridSize, speed, strokeColor, lineWidth, enableHoverHighlight, highlightFillColor, highlightBorderColor]);

  return (
    <div
      ref={containerRef}
      onClick={handleToggleDirection}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
