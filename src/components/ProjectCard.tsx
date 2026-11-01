"use client";

import React from "react";
import { Project } from "@/types/portfolio";
import { ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { TechIcon } from "@/components/icons/TechIcons";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
  isActive?: boolean;
}

export function ProjectCard({
  project,
  featured = false,
  className = "",
  isActive = true,
}: ProjectCardProps) {
  return (
    <article
      className={`bg-[var(--bg-surface)] flex flex-col justify-between p-6 sm:p-7 relative h-full transition-colors ${
        featured ? "lg:col-span-2" : "col-span-1"
      } ${className}`.trim()}
    >
      <div className="flex flex-col h-full">
        {/* Encabezado de la tarjeta */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[var(--border-main)]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
              {project.role}
            </span>
          </div>
          <span className="font-mono text-xs px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-main)] font-semibold text-[var(--text-primary)]">
            {project.year}
          </span>
        </div>

        {/* Título y Resumen */}
        <div className="space-y-2 mb-4">
          <h3 className="font-['Unbounded',sans-serif] text-xl sm:text-2xl font-bold tracking-tight uppercase text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-accent font-semibold">
            {project.tagline}
          </p>
        </div>

        {/* Descripción */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Stack tecnológico solo con iconos (con color en activo y monocromo plano con opacidad en inactivo) */}
        <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-7 gap-y-3 mb-6">
          {project.tags.map((tag) => (
            <div
              key={tag}
              title={tag}
              className={`group/tech select-none flex items-center justify-center transition-all duration-300 text-[var(--text-primary)] ${
                isActive
                  ? "opacity-100 hover:scale-115 cursor-default"
                  : "opacity-40 hover:opacity-75 cursor-pointer"
              }`}
            >
              <TechIcon
                name={tag}
                monochrome={!isActive}
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces y Acciones */}
      <div className="pt-4 border-t-2 border-[var(--border-main)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="icon"
              aria-label={`Código fuente de ${project.title} en GitHub`}
            >
              <GithubIcon className="w-4 h-4" size={16} />
            </Button>
          )}
        </div>

        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
          >
            <span>Ver Proyecto</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </article>
  );
}
