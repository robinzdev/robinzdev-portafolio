"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface GravityLettersProps {
  /** Texto de la primera línea (ej: "ROBIN") */
  line1?: string;
  /** Texto opcional de la segunda línea (ej: "DEV") */
  line2?: string;
  /** Porcentaje del ancho total del contenedor que abarcará el texto (0.5 a 0.98, por defecto 0.94 = 94%) */
  widthPercent?: number;

  /** Ancho de la cuchilla de corte del cursor en px (por defecto 14) */
  cutWidth?: number;
  /** Fuerza de expulsión al cortar o colapsar (0 a 3, por defecto 1.2) */
  throwForce?: number;
  /** Habilitar colapso total en cascada al hacer clic (por defecto true) */
  clickToCollapse?: boolean;
  /** Velocidad de propagación de la onda de corte en px/s al hacer clic (por defecto 1600) */
  collapseSpeed?: number;
  /** Tasa de erosión (por defecto 0) */
  erosion?: number;
  /** Segundos que reposa cada fragmento cortado en el fondo antes de regresar (por defecto 4.0) */
  healDelay?: number;
  /** Segundos de reposo tras colapso antes de reconstruir (por defecto 4.0) */
  holdTime?: number;
  /** Duración en segundos del vuelo de retorno de cada grano (por defecto 0.75) */
  returnDuration?: number;
  /** Pausar el motor de animación (por defecto false) */
  paused?: boolean;
  /** Escala de resolución del lienzo (0.25 a 1, por defecto 1) */
  quality?: number;

  /** Tamaño de fuente en px de cada carácter/glifo individual (por defecto 11) */
  charSize?: number;
  /** Distancia horizontal en px entre caracteres en la matriz de muestreo (por defecto 10) */
  charStepX?: number;
  /** Distancia vertical en px entre caracteres en la matriz de muestreo (por defecto 15) */
  charStepY?: number;
  /** Opacidad global de renderizado del canvas (0.0 a 1.0, por defecto 1.0) */
  opacity?: number;
  /** Color principal de los caracteres (por defecto detecta tema claro/oscuro del sistema) */
  color?: string;
  /** Color acento secundario retro-tech (por defecto "#9AD872") */
  accentColor?: string;
  /** Proporción de caracteres que adoptan el color de acento (0.0 a 1.0, por defecto 0.18) */
  accentRatio?: number;
  /** Intensidad de la aceleración por gravedad (por defecto 0.48) */
  gravity?: number;
  /** Fricción del aire aplicada al movimiento horizontal (por defecto 0.985) */
  friction?: number;
  /** Familia tipográfica base para el muestreo de siluetas (por defecto "'Unbounded', sans-serif") */
  fontFamily?: string;
  /** Altura mínima del contenedor en px (por defecto 280) */
  minHeight?: number;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

interface Particle {
  char: string;
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number;
  isAccent: boolean;
  isAnchor: boolean;
  neighbors: number[];
  pileCol: number;
  healTime: number;
  returnStartTime: number;
  returnStartX: number;
  returnStartY: number;
  returnStartAngle: number;
  curveOffsetX: number;
  curveOffsetY: number;
  flightDuration: number;
  state: "idle" | "falling" | "ground" | "returning";
}

interface CollapseWave {
  active: boolean;
  originX: number;
  originY: number;
  startTime: number;
}

const GLYPH_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*+=/\\<>[]~!";
const GLYPH_MAP: Record<string, number> = {};
for (let i = 0; i < GLYPH_CHARS.length; i++) {
  GLYPH_MAP[GLYPH_CHARS[i]] = i;
}

const ATLAS_ANGLES = 8;
const ATLAS_COLS = 32;

// Función de suavizado cúbico de salida: inicia con energía y desacelera a cero sin rebotar
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Cálculo de distancia al cuadrado hacia un segmento sin ninguna asignación en memoria (0 allocations)
function distToSegmentSq(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const ddx = px - x1;
    const ddy = py - y1;
    return ddx * ddx + ddy * ddy;
  }
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  const diffX = px - projX;
  const diffY = py - projY;
  return diffX * diffX + diffY * diffY;
}

export function GravityLetters({
  line1 = "ROBIN",
  line2 = "DEV",
  widthPercent = 0.94,
  cutWidth = 14,
  throwForce = 1.2,
  clickToCollapse = true,
  collapseSpeed = 1600,
  erosion = 0,
  healDelay = 4.0,
  holdTime = 4.0,
  returnDuration = 0.75,
  paused = false,
  quality = 1,
  charSize = 11,
  charStepX = 10,
  charStepY = 15,
  opacity = 1.0,
  color,
  accentColor = "#9AD872",
  accentRatio = 0.18,
  gravity = 0.48,
  friction = 0.985,
  fontFamily = "'Unbounded', sans-serif",
  minHeight = 280,
  className = "",
}: GravityLettersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atlasCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellSizeRef = useRef<number>(24);
  const particlesRef = useRef<Particle[]>([]);
  const pileHeightsRef = useRef<Float32Array>(new Float32Array(0));
  const bfsVisitedRef = useRef<Uint8Array>(new Uint8Array(0));
  const bfsQueueRef = useRef<Int32Array>(new Int32Array(0));
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const collapseWaveRef = useRef<CollapseWave>({ active: false, originX: 0, originY: 0, startTime: 0 });

  const mousePosRef = useRef<{
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    active: boolean;
    hasMoved: boolean;
  }>({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    active: false,
    hasMoved: false,
  });

  const colWidth = Math.max(charStepX, 8);

  // Generación y actualización reactiva del Sprite Atlas de caracteres (soporta cambio de tema claro/oscuro en tiempo real)
  const buildAtlas = useCallback(() => {
    const cellSize = Math.ceil(charSize * 2.0);
    cellSizeRef.current = cellSize;
    const halfCell = cellSize / 2;

    const atlasCanvas = document.createElement("canvas");
    const numGlyphs = GLYPH_CHARS.length;
    const totalSprites = numGlyphs * 2 * ATLAS_ANGLES;
    const rows = Math.ceil(totalSprites / ATLAS_COLS);

    atlasCanvas.width = ATLAS_COLS * cellSize;
    atlasCanvas.height = rows * cellSize;
    const aCtx = atlasCanvas.getContext("2d");

    if (aCtx) {
      aCtx.font = `bold ${charSize}px monospace`;
      aCtx.textAlign = "center";
      aCtx.textBaseline = "middle";

      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
      const defaultColor = color || (isDark ? "#FFFAF0" : "#131515");
      const isStandardAccent = !accentColor || accentColor === "#9AD872";
      const resolvedAccent = isDark
        ? (accentColor || "#9AD872")
        : (isStandardAccent ? "#4E872A" : accentColor);
      const colors = [defaultColor, resolvedAccent];

      for (let g = 0; g < numGlyphs; g++) {
        const char = GLYPH_CHARS[g];
        for (let c = 0; c < 2; c++) {
          aCtx.fillStyle = colors[c];
          for (let a = 0; a < ATLAS_ANGLES; a++) {
            const angle = a * ((2 * Math.PI) / ATLAS_ANGLES);
            const spriteIndex = (g * 2 + c) * ATLAS_ANGLES + a;
            const sx = (spriteIndex % ATLAS_COLS) * cellSize + halfCell;
            const sy = Math.floor(spriteIndex / ATLAS_COLS) * cellSize + halfCell;

            aCtx.save();
            aCtx.translate(sx, sy);
            aCtx.rotate(angle);
            aCtx.fillText(char, 0, 0);
            aCtx.restore();
          }
        }
      }
      atlasCanvasRef.current = atlasCanvas;
    }
  }, [charSize, color, accentColor]);

  // Inicialización y muestreo con grafo de conectividad estructural
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) * Math.max(0.25, Math.min(quality, 1)) : 1;
    const width = rect.width || window.innerWidth;

    if (width <= 0) return;

    // 1. Crear Sprite Atlas de caracteres pre-renderizados con rotación para evitar lag de transformaciones
    buildAtlas();

    // 2. Medir y muestrear silueta tipográfica a pantalla completa
    const testCanvas = document.createElement("canvas");
    const testCtx = testCanvas.getContext("2d");
    if (!testCtx) return;

    const testFontSize = 100;
    testCtx.font = `900 ${testFontSize}px ${fontFamily}`;
    const testWidth1 = testCtx.measureText(line1).width;
    const testWidth2 = line2 ? testCtx.measureText(line2).width : 0;
    const maxTestWidth = Math.max(testWidth1, testWidth2);

    const targetWidth = width * Math.min(Math.max(widthPercent, 0.5), 0.98);
    const fontSize = Math.max(Math.floor(testFontSize * (targetWidth / Math.max(maxTestWidth, 1))), 36);
    const lineHeight = fontSize * 0.95;

    const textHeight = line2 ? fontSize + lineHeight : fontSize;
    const fallZone = Math.max(60, Math.min(width * 0.08, 110));
    const totalRequiredHeight = Math.max(minHeight, Math.ceil(textHeight + fallZone + 15));

    container.style.height = `${totalRequiredHeight}px`;
    canvas.width = width * dpr;
    canvas.height = totalRequiredHeight * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${totalRequiredHeight}px`;

    const numCols = Math.ceil(width / colWidth);
    pileHeightsRef.current = new Float32Array(numCols);

    const offCanvas = document.createElement("canvas");
    offCanvas.width = width;
    offCanvas.height = totalRequiredHeight;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    offCtx.fillStyle = "#FFFFFF";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = `900 ${fontSize}px ${fontFamily}`;

    const topPadding = Math.max(30, fontSize * 0.15);
    const line1Y = topPadding + fontSize * 0.45;
    const line2Y = line2 ? line1Y + lineHeight : line1Y;
    offCtx.fillText(line1, width / 2, line1Y);

    if (line2) {
      offCtx.fillText(line2, width / 2, line2Y);
    }

    const imgData = offCtx.getImageData(0, 0, width, totalRequiredHeight);
    const data = imgData.data;
    const newParticles: Particle[] = [];

    for (let y = 0; y < totalRequiredHeight; y += charStepY) {
      for (let x = 0; x < width; x += charStepX) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 85) {
          const char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
          const isAccent = Math.random() < accentRatio;
          const pileCol = Math.floor(x / colWidth);

          newParticles.push({
            char,
            originX: x,
            originY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            angle: 0,
            va: 0,
            isAccent,
            isAnchor: false,
            neighbors: [],
            pileCol,
            healTime: 0,
            returnStartTime: 0,
            returnStartX: x,
            returnStartY: y,
            returnStartAngle: 0,
            curveOffsetX: 0,
            curveOffsetY: 0,
            flightDuration: returnDuration * 1000,
            state: "idle",
          });
        }
      }
    }

    // 3. Construir grafo de conectividad estructural para separación de bloques (Enfoque B)
    const gridMap = new Map<string, number>();
    const numP = newParticles.length;

    for (let i = 0; i < numP; i++) {
      const p = newParticles[i];
      const gx = Math.round(p.originX / charStepX);
      const gy = Math.round(p.originY / charStepY);
      gridMap.set(`${gx},${gy}`, i);
    }

    // Identificar la cota superior real de cada línea para anclas verdaderas (sin huecos falsos)
    const thresholdY = line2 ? (line1Y + line2Y) / 2 : Infinity;
    let minLine1Y = Infinity;
    let minLine2Y = Infinity;

    for (let i = 0; i < numP; i++) {
      const y = newParticles[i].originY;
      if (y < thresholdY) {
        if (y < minLine1Y) minLine1Y = y;
      } else {
        if (y < minLine2Y) minLine2Y = y;
      }
    }

    // Anclas estructurales: exclusivamente las 2 filas superiores de cada palabra
    const anchorBand = charStepY * 2.2;

    for (let i = 0; i < numP; i++) {
      const p = newParticles[i];
      const gx = Math.round(p.originX / charStepX);
      const gy = Math.round(p.originY / charStepY);

      // Conexión en 8 direcciones para un contorno natural y fidedigno del trazo
      const nList: number[] = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nIdx = gridMap.get(`${gx + dx},${gy + dy}`);
          if (nIdx !== undefined) nList.push(nIdx);
        }
      }
      p.neighbors = nList;

      // Ancla solo si está en la cresta superior real de la palabra (no en huecos de letras como D u O)
      const y = p.originY;
      if (y < thresholdY) {
        p.isAnchor = y <= minLine1Y + anchorBand;
      } else {
        p.isAnchor = y <= minLine2Y + anchorBand;
      }
    }

    bfsVisitedRef.current = new Uint8Array(numP);
    bfsQueueRef.current = new Int32Array(numP);

    particlesRef.current = newParticles;
    collapseWaveRef.current.active = false;
  }, [line1, line2, widthPercent, charStepX, charStepY, accentRatio, colWidth, fontFamily, minHeight, quality, returnDuration, buildAtlas]);

  // Manejador del colapso natural por clic
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!clickToCollapse || paused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    collapseWaveRef.current = {
      active: true,
      originX: clickX,
      originY: clickY,
      startTime: performance.now(),
    };
  };

  // Bucle principal de físicas aceleradas con detección de islas conexas (BFS Chunk Separation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const animate = () => {
      if (!running) return;

      if (!isVisibleRef.current || paused) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) * Math.max(0.25, Math.min(quality, 1)) : 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const now = performance.now();
      const atlas = atlasCanvasRef.current;
      const cellSize = cellSizeRef.current;
      const halfCell = cellSize / 2;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      const floorY = height - Math.floor(charSize * 0.5);
      const mouse = mousePosRef.current;
      const hasSlice = mouse.active && mouse.hasMoved;
      const sliceVectorX = mouse.x - mouse.prevX;
      const sliceVectorY = mouse.y - mouse.prevY;
      const sliceSpeed = Math.hypot(sliceVectorX, sliceVectorY);
      const effectiveCut = Math.max(cutWidth, 8);
      const effectiveCutSq = effectiveCut * effectiveCut;

      const wave = collapseWaveRef.current;
      let waveRadiusSq = -1;
      if (wave.active) {
        const elapsedSec = (now - wave.startTime) / 1000;
        const waveRadius = elapsedSec * collapseSpeed;
        waveRadiusSq = waveRadius * waveRadius;
        if (waveRadius > Math.max(width, height) * 1.5) {
          wave.active = false;
        }
      }

      const particles = particlesRef.current;
      const len = particles.length;
      const pileHeights = pileHeightsRef.current;
      const numCols = pileHeights.length;
      const baseFlightMs = returnDuration * 1000;
      let newCutOccurred = false;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // 1. Colapso natural por clic sin freeze
        if (wave.active && p.state === "idle") {
          const ddx = p.x - wave.originX;
          const ddy = p.y - wave.originY;
          if (ddx * ddx + ddy * ddy <= waveRadiusSq) {
            p.state = "falling";
            p.healTime = 0;
            p.vx = (Math.random() - 0.5) * 3.0;
            p.vy = Math.random() * 2.0;
            p.va = (Math.random() - 0.5) * 0.4;
          }
        }

        // 2. Corte vectorial por cursor sobre el texto principal
        if (hasSlice && p.state === "idle") {
          const distSq = distToSegmentSq(p.x, p.y, mouse.prevX, mouse.prevY, mouse.x, mouse.y);
          if (distSq < effectiveCutSq) {
            p.state = "falling";
            p.healTime = 0;
            newCutOccurred = true;

            const speedFactor = Math.min(sliceSpeed * 0.05, 3.5);
            p.vx = (sliceVectorX * 0.4 + (Math.random() - 0.5) * 5) * throwForce * speedFactor;
            p.vy = (sliceVectorY * 0.35 - Math.random() * 3.5 - 1.2) * throwForce;
            p.va = (Math.random() - 0.5) * 0.5;
          }
        }

        // 3. Inicio del retorno individual al cumplirse los 4 segundos en el suelo
        if (p.state === "ground" && p.healTime > 0 && now >= p.healTime) {
          p.state = "returning";
          p.healTime = 0;
          p.returnStartTime = now;
          p.returnStartX = p.x;
          p.returnStartY = p.y;
          p.returnStartAngle = p.angle;

          if (p.pileCol >= 0 && p.pileCol < numCols) {
            pileHeights[p.pileCol] = Math.max(0, pileHeights[p.pileCol] - charStepY);
          }

          const travelDist = Math.hypot(p.originX - p.x, p.originY - p.y);
          p.curveOffsetX = (Math.random() - 0.5) * Math.min(100, travelDist * 0.3);
          p.curveOffsetY = -Math.min(80, Math.max(30, travelDist * 0.22));
          p.flightDuration = Math.max(650, Math.min(baseFlightMs * 1.3, baseFlightMs + travelDist * 0.35));
        }

        // 4. Físicas de caída orgánica y acumulación natural en montículos
        if (p.state === "falling") {
          p.vy += gravity;
          p.vx *= friction;
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.va;
          p.va *= 0.99;

          if (p.x < 12) {
            p.x = 12;
            p.vx = Math.abs(p.vx) * 0.3;
          } else if (p.x > width - 12) {
            p.x = width - 12;
            p.vx = -Math.abs(p.vx) * 0.3;
          }

          const col = Math.floor(p.x / colWidth);
          if (col >= 0 && col < numCols) {
            const currentPileHeight = pileHeights[col];
            const targetGround = floorY - currentPileHeight;

            if (p.y >= targetGround) {
              const leftCol = Math.max(0, col - 1);
              const rightCol = Math.min(numCols - 1, col + 1);

              if (col > 0 && currentPileHeight - pileHeights[leftCol] > charSize * 1.5 && Math.random() < 0.6) {
                p.x = Math.max(12, p.x - colWidth * 0.7);
                p.vx = -1.4;
                p.y = Math.min(p.y, targetGround + charSize * 0.5);
              } else if (col < numCols - 1 && currentPileHeight - pileHeights[rightCol] > charSize * 1.5 && Math.random() < 0.6) {
                p.x = Math.min(width - 12, p.x + colWidth * 0.7);
                p.vx = 1.4;
                p.y = Math.min(p.y, targetGround + charSize * 0.5);
              } else {
                p.state = "ground";
                p.y = targetGround;
                p.x += (Math.random() - 0.5) * 3;
                p.angle += (Math.random() - 0.5) * 0.35;
                pileHeights[col] += charSize * 0.65;
                p.pileCol = col;
                p.vy = 0;
                p.vx = 0;
                p.va = 0;
                p.healTime = now + (healDelay * 1000) - Math.min(800, (floorY - targetGround) * 7);
              }
            }
          }

          if (p.y >= floorY) {
            p.y = floorY;
            p.state = "ground";
            p.vy = 0;
            p.vx = 0;
            p.va = 0;
            if (p.healTime === 0) {
              p.healTime = now + (healDelay * 1000);
            }
          }
        } else if (p.state === "ground") {
          // 4.1 Asentamiento y reorganización orgánica de la arena en el fondo mientras otras despegan
          const col = p.pileCol;
          if (col >= 0 && col < numCols) {
            const currentPileHeight = pileHeights[col];
            const targetGround = floorY - currentPileHeight;

            // Si el suelo bajo este grano descendió (porque otros granos ya despegaron), se asienta
            if (p.y < targetGround - 1) {
              p.y += Math.min(3.0, (targetGround - p.y) * 0.22);
              p.x += (Math.random() - 0.5) * 0.5;
              p.angle += (Math.random() - 0.5) * 0.05;
            }

            // Deslizamiento natural por pendiente si la columna contigua se vació
            const leftCol = Math.max(0, col - 1);
            const rightCol = Math.min(numCols - 1, col + 1);

            if (col > 0 && currentPileHeight - pileHeights[leftCol] > charSize * 1.8 && Math.random() < 0.06) {
              pileHeights[col] = Math.max(0, pileHeights[col] - charSize * 0.5);
              pileHeights[leftCol] += charSize * 0.5;
              p.pileCol = leftCol;
              p.x -= colWidth * 0.6;
              p.y = Math.min(floorY, p.y + charSize * 0.5);
            } else if (col < numCols - 1 && currentPileHeight - pileHeights[rightCol] > charSize * 1.8 && Math.random() < 0.06) {
              pileHeights[col] = Math.max(0, pileHeights[col] - charSize * 0.5);
              pileHeights[rightCol] += charSize * 0.5;
              p.pileCol = rightCol;
              p.x += colWidth * 0.6;
              p.y = Math.min(floorY, p.y + charSize * 0.5);
            }
          }
        } else if (p.state === "returning") {
          const elapsed = now - p.returnStartTime;
          const progress = Math.min(1, Math.max(0, elapsed / p.flightDuration));
          const ease = easeOutCubic(progress);
          const arcProgress = Math.sin(progress * Math.PI);

          p.x = p.returnStartX + (p.originX - p.returnStartX) * ease + p.curveOffsetX * arcProgress;
          p.y = p.returnStartY + (p.originY - p.returnStartY) * ease + p.curveOffsetY * arcProgress;
          p.angle = p.returnStartAngle * (1 - ease);

          if (progress >= 1) {
            p.x = p.originX;
            p.y = p.originY;
            p.angle = 0;
            p.vx = 0;
            p.vy = 0;
            p.va = 0;
            p.state = "idle";
          }
        }

        // 5. Renderizado ultra-rápido por Texture Atlas (0 lag de GPU)
        if (atlas) {
          const gIdx = GLYPH_MAP[p.char] ?? 0;
          const colorIdx = (p.state !== "idle" || p.isAccent) ? 1 : 0;
          const normalizedAngle = (p.angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
          const angleIdx = Math.floor((normalizedAngle / (2 * Math.PI)) * ATLAS_ANGLES) % ATLAS_ANGLES;
          const spriteIndex = (gIdx * 2 + colorIdx) * ATLAS_ANGLES + angleIdx;
          const sx = (spriteIndex % ATLAS_COLS) * cellSize;
          const sy = Math.floor(spriteIndex / ATLAS_COLS) * cellSize;

          ctx.drawImage(atlas, sx, sy, cellSize, cellSize, p.x - halfCell, p.y - halfCell, cellSize, cellSize);
        }
      }

      // 6. Enfoque B: Detección BFS de fragmentos desconectados (islas separadas que deben caer juntas)
      if (newCutOccurred) {
        const visited = bfsVisitedRef.current;
        const queue = bfsQueueRef.current;
        if (visited.length === len && queue.length === len) {
          visited.fill(0);
          let qHead = 0;
          let qTail = 0;

          // Sembrar la cola con todos los granos intactos que actúan como anclas estructurales
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            if (p.state === "idle" && p.isAnchor) {
              visited[i] = 1;
              queue[qTail++] = i;
            }
          }

          // Propagar conectividad hacia los vecinos intactos
          while (qHead < qTail) {
            const currIdx = queue[qHead++];
            const neighs = particles[currIdx].neighbors;
            const nLen = neighs.length;

            for (let j = 0; j < nLen; j++) {
              const nIdx = neighs[j];
              if (particles[nIdx].state === "idle" && visited[nIdx] === 0) {
                visited[nIdx] = 1;
                queue[qTail++] = nIdx;
              }
            }
          }

          // Todo fragmento que haya quedado sin conexión a un ancla superior se desprende en bloque
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            if (p.state === "idle" && visited[i] === 0) {
              p.state = "falling";
              p.healTime = 0;
              p.vx = (sliceVectorX * 0.2 + (Math.random() - 0.5) * 3) * throwForce;
              p.vy = Math.max(1.2, sliceVectorY * 0.25 + Math.random() * 2.5);
              p.va = (Math.random() - 0.5) * 0.35;
            }
          }
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.hasMoved = false;

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    colWidth,
    gravity,
    friction,
    opacity,
    cutWidth,
    throwForce,
    charStepY,
    healDelay,
    paused,
    quality,
    collapseSpeed,
    returnDuration,
    charSize,
  ]);

  // Observer de visibilidad para 0% CPU fuera de pantalla
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Redimensionado reactivo y espera a que las fuentes estén cargadas
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    } else {
      initParticles();
    }

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initParticles();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles]);

  // Observador reactivo de cambio de tema (claro / oscuro) en document.documentElement
  useEffect(() => {
    buildAtlas();

    if (typeof document === "undefined") return;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          buildAtlas();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [buildAtlas]);

  // Manejadores de interacción táctil y ratón para corte
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    if (!mousePosRef.current.active) {
      mousePosRef.current.prevX = currX;
      mousePosRef.current.prevY = currY;
    }

    mousePosRef.current.x = currX;
    mousePosRef.current.y = currY;
    mousePosRef.current.active = true;
    mousePosRef.current.hasMoved = true;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
    mousePosRef.current.hasMoved = false;
    mousePosRef.current.x = -1000;
    mousePosRef.current.y = -1000;
    mousePosRef.current.prevX = -1000;
    mousePosRef.current.prevY = -1000;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const currX = e.touches[0].clientX - rect.left;
    const currY = e.touches[0].clientY - rect.top;

    if (!mousePosRef.current.active) {
      mousePosRef.current.prevX = currX;
      mousePosRef.current.prevY = currY;
    }

    mousePosRef.current.x = currX;
    mousePosRef.current.y = currY;
    mousePosRef.current.active = true;
    mousePosRef.current.hasMoved = true;
  };

  const handleTouchEnd = () => {
    mousePosRef.current.active = false;
    mousePosRef.current.hasMoved = false;
    mousePosRef.current.x = -1000;
    mousePosRef.current.y = -1000;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none bg-transparent ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full cursor-crosshair block"
      />
    </div>
  );
}
