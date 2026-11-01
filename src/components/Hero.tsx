"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Sparkles, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { MorphIcon } from "@/components/MorphIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedInIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/Button";
import { MovingGrid } from "@/components/ui/MovingGrid";
import { VariableTextWave } from "@/components/ui/VariableTextWave";
import { HeroCard3D } from "@/components/ui/HeroCard3D";

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
            {/* Titular Principal con Efecto Variable Text Wave */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] opacity-60 font-semibold block">
                &gt; LICENCIADO EN INFORMÁTICA &amp; UI/UX DESIGNER // LOCATED IN CASTILLO, RD
              </span>
              <VariableTextWave />
            </div>

            {/* Párrafo de Impacto */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Hay devs que no saben alinear un botón y diseñadores que no entienden de bases de datos. Yo hago ambas cosas, y las hago bien. Construyo sistemas web rápidos, limpios y con alma retro-tech, mezclando la lógica de backend con una obsesión enfermiza por el diseño gráfico.
            </p>

            {/* Botones de Acción (CTAs) */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button href="#proyectos" variant="primary" size="md">
                <span>Proyectos</span>
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
                <span>CV</span>
              </Button>

              <Button href="#contacto" variant="secondary" size="md">
                <Mail className="w-4 h-4 text-accent" />
                <span>Contacto</span>
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

              {personalInfo.linkedin && (
                <Button
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="icon"
                  aria-label="Perfil de LinkedIn robinzdev"
                >
                  <LinkedInIcon className="w-5 h-5" size={20} />
                </Button>
              )}

              {personalInfo.instagram && (
                <Button
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="icon"
                  aria-label="Perfil de Instagram robinfdezz"
                >
                  <InstagramIcon className="w-5 h-5" size={20} />
                </Button>
              )}
            </div>

            {/* Especificación retro-tech inferior (estilo anterior con iconos y separadores) */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>React / Next.js</span>
              </span>
              <span className="opacity-40">/</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>UI/UX Systems</span>
              </span>
              <span className="opacity-40">/</span>
              <span>Full-Stack</span>
            </div>
          </motion.div>

          {/* Columna Derecha: Tarjeta 3D Neobrutalista Interactiva */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <HeroCard3D />
          </motion.div>

        </div>
      </div>
    </MovingGrid>
  );
}
