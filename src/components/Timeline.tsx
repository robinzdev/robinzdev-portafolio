"use client";

import React from "react";
import { experienceData } from "@/data/portfolioData";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { MovingGrid } from "@/components/ui/MovingGrid";

export function Timeline() {
  return (
    <MovingGrid
      gridSize={40}
      speed={6}
      initialDirection="up-left"
      className="py-20 border-b-2 border-[var(--border-main)]"
    >
      <div id="experiencia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b-2 border-[var(--border-main)]">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-accent">
              [02 // TRAYECTORIA]
            </span>
            <h2 className="font-['Unbounded',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight uppercase text-[var(--text-primary)]">
              Experiencia Laboral
            </h2>
          </div>
          
          <p className="font-mono text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Historial de desarrollo y liderazgo de producto, desde consultoría técnica hasta arquitectura frontend y backend.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10 sm:space-y-12 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--border-main)]">
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Marcador retro-tech en la línea de tiempo */}
              <div className="absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 sm:w-7 sm:h-7 bg-[var(--bg-surface)] border-2 border-[var(--border-main)] flex items-center justify-center font-mono text-[10px] font-bold text-accent shadow-[2px_2px_0px_0px_var(--neo-shadow-color)] group-hover:bg-accent group-hover:text-[#131515] transition-colors">
                0{index + 1}
              </div>

              {/* Tarjeta de Experiencia */}
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

                {/* Stack utilizado */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-main)]/40">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-main)] text-[var(--text-primary)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </MovingGrid>
  );
}
