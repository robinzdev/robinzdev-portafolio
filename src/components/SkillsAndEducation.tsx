"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategories, educationData, certificatesData } from "@/data/portfolioData";
import { GraduationCap, Award, Cpu, Palette } from "lucide-react";
import { TechIcon } from "@/components/icons/TechIcons";

export function SkillsAndEducation() {
  return (
    <section
      id="habilidades"
      className="py-20 border-b border-[var(--border-main)] bg-accent text-[#131515] transition-colors"
      style={{
        ["--border-main" as string]: "#131515",
        ["--text-primary" as string]: "#131515",
        ["--text-muted" as string]: "#262b2b",
        ["--neo-shadow-color" as string]: "#131515",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="mb-16 pb-6 border-b-2 border-[#131515]">
          <div className="space-y-2 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs font-bold text-[#131515] opacity-80 tracking-wider block"
            >
              [03 // COMPETENCIAS]
            </motion.span>
            <h2 className="font-['Unbounded',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight uppercase text-[#131515] leading-[1.06]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Skills, Estudios &amp;
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#131515] opacity-90"
              >
                Credenciales
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Bloque 1: Panel Unificado de Formación Académica & Certificaciones */}
        <div className="bg-white border-2 border-[#131515] shadow-[4px_4px_0px_0px_#131515] p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Columna Izquierda: Formación Académica (UASD) */}
            <div className="lg:col-span-6 lg:border-r-2 lg:border-[#131515]/15 lg:pr-10">
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#131515]">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-[#131515] bg-accent text-[#131515]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[#131515]">
                      Formación Académica
                    </h3>
                    <span className="font-mono text-xs text-[#4A5151]">
                      Educación Superior Universitaria
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-accent text-[#131515] font-bold border-2 border-[#131515] shadow-[2px_2px_0px_0px_#131515]">
                  Titulado
                </span>
              </div>

              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-3">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-['Unbounded',sans-serif] text-lg sm:text-xl font-bold uppercase text-[#131515]">
                        {edu.degree}
                      </h4>
                    </div>

                    <p className="font-mono text-sm font-bold text-[#131515]">
                      {edu.institution}
                    </p>
                    <p className="font-mono text-xs text-[#4A5151]">
                      {edu.location}
                    </p>
                  </div>

                  {edu.honors && (
                    <p className="text-xs sm:text-sm text-[#4A5151] pt-3 border-t border-[#131515]/20 leading-relaxed">
                      {edu.honors}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Columna Derecha: Certificaciones y Especializaciones */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#131515]">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-[#131515] bg-accent text-[#131515]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[#131515]">
                      Certificaciones
                    </h3>
                    <span className="font-mono text-xs text-[#4A5151]">
                      Especializaciones Continuas
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-[#FFFAF0] text-[#131515] font-bold border-2 border-[#131515] shadow-[2px_2px_0px_0px_#131515]">
                  Acreditaciones
                </span>
              </div>

              <div className="space-y-2.5 max-h-[195px] sm:max-h-[215px] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#131515_#FFFAF0] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#131515] [&::-webkit-scrollbar-track]:bg-[#FFFAF0]">
                {certificatesData.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 border-2 border-[#131515] bg-[#FFFAF0] flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#131515] hover:bg-white transition-all"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-mono text-xs font-bold text-[#131515] truncate">
                        {cert.title}
                      </p>
                      <p className="font-mono text-[11px] text-[#4A5151] truncate">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 border border-[#131515] font-bold text-[#131515] bg-white shrink-0">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bloque 2: Stack Técnico y Creativo en Badges Dinámicos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white border-2 border-[#131515] shadow-[4px_4px_0px_0px_#131515] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#131515]">
                  <div className="flex items-center gap-3">
                    {category.category === "core" ? (
                      <div className="p-2 border-2 border-[#131515] bg-accent text-[#131515]">
                        <Cpu className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="p-2 border-2 border-[#131515] bg-accent text-[#131515]">
                        <Palette className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-['Unbounded',sans-serif] text-base sm:text-lg font-bold uppercase text-[#131515]">
                        {category.title}
                      </h3>
                      <span className="font-mono text-xs text-[#4A5151]">
                        {category.category === "core" ? "Desarrollo & Arquitectura" : "Diseño Gráfico & UI/UX"}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-2.5 py-1 bg-[#FFFAF0] text-[#131515] font-bold border-2 border-[#131515] shadow-[2px_2px_0px_0px_#131515] shrink-0">
                    {category.skills.length} Tecnologías
                  </span>
                </div>

                {/* Badges dinámicos de tecnologías */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-[#131515] bg-[#FFFAF0] hover:bg-white transition-all duration-150 shadow-[2px_2px_0px_0px_#131515] select-none"
                    >
                      <TechIcon name={skill.name} className="w-4 h-4 shrink-0 text-[#131515]" />
                      <span className="font-mono text-xs font-bold text-[#131515]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
