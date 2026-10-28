"use client";

import React from "react";
import { projectsData } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="proyectos" className="py-20 border-b-2 border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b-2 border-[var(--border-main)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">
                [01 // PORTFOLIO]
              </span>
            </div>
            <h2 className="font-['Unbounded',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight uppercase text-[var(--text-primary)]">
              Proyectos Destacados
            </h2>
          </div>
          
          <p className="font-mono text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Desarrollo full-stack con arquitectura limpia, bases de datos relacionales y diseño centrado en el usuario.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
