"use client";

import React from "react";
import { skillCategories, educationData, certificatesData } from "@/data/portfolioData";
import { GraduationCap, Award, Cpu, Palette } from "lucide-react";

export function SkillsAndEducation() {
  return (
    <section id="habilidades" className="py-20 border-b-2 border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b-2 border-[var(--border-main)]">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-accent">
              [03 // COMPETENCIAS]
            </span>
            <h2 className="font-['Unbounded',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight uppercase text-[var(--text-primary)]">
              Skills, Estudios & Credenciales
            </h2>
          </div>
          
          <p className="font-mono text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Dominio técnico multidisciplinario: ingeniería de software robusta y diseño visual contemporáneo.
          </p>
        </div>

        {/* Bloque 1: Habilidades Técnicas y Creativas en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="neo-card p-6 sm:p-8">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b-2 border-[var(--border-main)]">
                {category.category === "core" ? (
                  <div className="p-2 border-2 border-[var(--border-main)] bg-accent text-[#131515]">
                    <Cpu className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2 border-2 border-[var(--border-main)] bg-accent text-[#131515]">
                    <Palette className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {category.category === "core" ? "Desarrollo & Arquitectura" : "Diseño Gráfico & UI/UX"}
                  </span>
                </div>
              </div>

              {/* Grid de habilidades */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 border-2 border-[var(--border-main)] bg-[var(--bg-primary)] hover:border-accent transition-colors flex items-center justify-between"
                  >
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)]">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bloque 2: Formación Académica & Certificados */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Educación (UASD Recinto Santiago) */}
          <div className="lg:col-span-7 neo-card p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b-2 border-[var(--border-main)]">
              <div className="p-2 border-2 border-[var(--border-main)] bg-[var(--bg-primary)] text-accent">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[var(--text-primary)]">
                  Formación Académica
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Educación Superior Universitaria
                </span>
              </div>
            </div>

            {educationData.map((edu, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-['Unbounded',sans-serif] text-lg font-bold uppercase text-[var(--text-primary)]">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs px-2 py-0.5 bg-accent text-[#131515] font-bold border border-[var(--border-main)] w-fit">
                    {edu.status}
                  </span>
                </div>

                <p className="font-mono text-sm font-semibold text-accent">
                  {edu.institution}
                </p>

                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {edu.location} · {edu.period}
                </p>

                {edu.honors && (
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] pt-3 border-t border-[var(--border-main)]/30 leading-relaxed">
                    {edu.honors}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Certificados y Credenciales */}
          <div className="lg:col-span-5 neo-card p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b-2 border-[var(--border-main)]">
              <div className="p-2 border-2 border-[var(--border-main)] bg-[var(--bg-primary)] text-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[var(--text-primary)]">
                  Certificaciones
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Especializaciones Continuas
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 border-2 border-[var(--border-main)] bg-[var(--bg-primary)] flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <p className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      {cert.title}
                    </p>
                    <p className="font-mono text-[11px] text-[var(--text-muted)]">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="font-mono text-xs px-1.5 py-0.5 border border-[var(--border-main)] font-semibold shrink-0">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
