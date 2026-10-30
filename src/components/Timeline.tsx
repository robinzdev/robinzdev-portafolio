"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceData } from "@/data/portfolioData";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { MovingGrid } from "@/components/ui/MovingGrid";
import { TechIcon } from "@/components/icons/TechIcons";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });

  // Avance progresivo continuo sin cortes entre marcadores
  const progress1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const progress2 = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <MovingGrid
      id="experiencia"
      gridSize={40}
      speed={6}
      initialDirection="up-left"
      className="py-20 border-b border-[var(--border-main)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera de Sección */}
        <div className="flex justify-end mb-16 pb-6 border-b border-[var(--border-main)]">
          <div className="space-y-2 text-right">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs font-semibold text-[var(--text-primary)] opacity-60 tracking-wider block"
            >
              [02 // TRAYECTORIA]
            </motion.span>
            <h2 className="font-['Unbounded',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight uppercase text-[var(--text-primary)] leading-[1.06]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Experiencia
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="block text-accent"
              >
                Laboral
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Timeline Container con línea continua progresiva */}
        <div ref={containerRef} className="flex flex-col">
          {experienceData.map((exp, index) => {
            const isLast = index === experienceData.length - 1;
            const progress = index === 0 ? progress1 : progress2;

            return (
              <div key={exp.id} className="flex gap-4 sm:gap-8 items-stretch group">
                {/* Columna Izquierda: Marcador y Línea Continua Progresiva */}
                <div className="flex flex-col items-center shrink-0 w-6 sm:w-8 relative">
                  {/* Marcador retro-tech */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px 0px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--bg-surface)] border-2 border-[var(--border-main)] flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold text-accent shadow-[2px_2px_0px_0px_var(--neo-shadow-color)] group-hover:bg-accent group-hover:text-[#131515] transition-colors z-10 shrink-0"
                  >
                    0{index + 1}
                  </motion.div>

                  {/* Línea que conecta de forma continua y progresiva con el siguiente marcador */}
                  {!isLast && (
                    <div className="w-[2px] flex-1 relative overflow-hidden -mb-1">
                      {/* Riel base continuo visible */}
                      <div className="absolute inset-0 bg-[var(--border-main)] opacity-20" />
                      {/* Línea de avance progresivo verde sin cortes */}
                      <motion.div
                        style={{ scaleY: progress, originY: 0 }}
                        className="absolute inset-0 bg-accent"
                      />
                    </div>
                  )}
                </div>

                {/* Columna Derecha: Tarjeta de Experiencia */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex-1 ${isLast ? "pb-0" : "pb-8 sm:pb-12"}`}
                >
                  <div className="neo-card p-6 sm:p-8">
                    {/* Metadatos superiores */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b-2 border-[var(--border-main)]">
                      <div>
                        <h3 className="font-['Unbounded',sans-serif] text-lg sm:text-xl font-bold uppercase text-[var(--text-primary)]">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm font-semibold text-accent mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Resumen */}
                    <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Logros Clave */}
                    <div className="space-y-2 mb-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold block mb-2">
                        Resultados e Impacto:
                      </span>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack utilizado con iconos y texto */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pt-4 border-t border-[var(--border-main)]/40">
                      {exp.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1.5 group/tech select-none"
                          title={skill}
                        >
                          <TechIcon
                            name={skill}
                            className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/tech:scale-110"
                          />
                          <span className="font-mono text-xs font-normal text-[var(--text-muted)] group-hover/tech:text-[var(--text-primary)] transition-colors">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </MovingGrid>
  );
}
