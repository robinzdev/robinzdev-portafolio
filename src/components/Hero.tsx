"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Sparkles, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { MorphIcon } from "@/components/MorphIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { MovingGrid } from "@/components/ui/MovingGrid";

export function Hero() {
  return (
    <MovingGrid
      gridSize={36}
      speed={7}
      initialDirection="down-right"
      className="w-full min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex flex-col justify-center border-b border-[var(--border-main)] py-12 sm:py-16 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Información Principal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Titular Principal en Unbounded */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] opacity-60 font-semibold">
                Arquitectura Web & Sistemas Visuales
              </span>
              <h1 className="font-['Unbounded',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight uppercase text-[var(--text-primary)] leading-[1.02]">
                Robin <span className="text-accent block sm:inline">Dev.</span>
              </h1>
            </div>

            {/* Biografía Corta */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Botones de Acción (CTAs) */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button href="#proyectos" variant="primary" size="md">
                <span>Explorar Proyectos</span>
                <MorphIcon type="arrow-corner" size={16} />
              </Button>

              <Button
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Descargar CV</span>
              </Button>

              <Button href="#contacto" variant="secondary" size="md">
                <Mail className="w-4 h-4 text-accent" />
                <span>Iniciar Contacto</span>
              </Button>

              <Button
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="icon"
                aria-label="Perfil de GitHub robinzdev"
              >
                <GithubIcon className="w-5 h-5" size={20} />
              </Button>
            </div>

            {/* Micro-especificación retro-tech */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>Vite + React</span>
              </span>
              <span className="opacity-40">/</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Figma & Design Systems</span>
              </span>
              <span className="opacity-40">/</span>
              <span>Castillo, RD</span>
            </div>
          </motion.div>

          {/* Columna Derecha: Contenedor Neobrutalista para Foto / Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Marco de fondo decorativo */}
              <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 border-2 border-[var(--border-main)]" />

              {/* Contenedor principal de imagen */}
              <div className="relative neo-card p-6 bg-[var(--bg-surface)]">
                {/* Cabecera de consola retro-tech */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[var(--border-main)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-main)]" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    DEV_ID // ROBINZDEV
                  </span>
                </div>

                {/* Área de imagen / avatar geométrico */}
                <div className="relative aspect-square w-full border-2 border-[var(--border-main)] bg-[var(--bg-primary)] overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Marcas de registro en esquinas */}
                  <span className="absolute top-1 left-1 font-mono text-[9px] text-[var(--text-muted)] select-none">+</span>
                  <span className="absolute top-1 right-1 font-mono text-[9px] text-[var(--text-muted)] select-none">+</span>
                  <span className="absolute bottom-1 left-1 font-mono text-[9px] text-[var(--text-muted)] select-none">+</span>
                  <span className="absolute bottom-1 right-1 font-mono text-[9px] text-[var(--text-muted)] select-none">+</span>

                  {/* Composición visual retro-tech minimalista */}
                  <div className="w-28 h-28 border-2 border-[var(--border-main)] bg-accent shadow-[4px_4px_0px_0px_var(--border-main)] flex items-center justify-center mb-3">
                    <span className="font-['Unbounded',sans-serif] font-black text-4xl text-[#131515]">
                      RZ
                    </span>
                  </div>

                  <p className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide text-center">
                    Robin Z.
                  </p>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] text-center">
                    Full-Stack & UI/UX Designer
                  </p>
                </div>

                {/* Badge inferior de credencial */}
                <div className="mt-4 pt-3 border-t-2 border-[var(--border-main)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--text-muted)]">STATUS</span>
                  <span className="font-bold text-[var(--accent-green)]">ONLINE (60 FPS)</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </MovingGrid>
  );
}
