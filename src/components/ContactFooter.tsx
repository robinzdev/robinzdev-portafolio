"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Copy, Check, Send, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { GravityLetters } from "@/components/ui/GravityLetters";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contacto" className="border-t border-[var(--border-main)] bg-[var(--bg-primary)]">
      {/* Sección de Contacto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs font-semibold text-[var(--text-primary)] opacity-60 tracking-wider block"
              >
                [04 // CONTACTO]
              </motion.span>
              <h2 className="font-['Unbounded',sans-serif] text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight uppercase text-[var(--text-primary)] leading-[1.06]">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Construyamos
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-accent"
                >
                  juntos.
                </motion.span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              ¿Tienes una iniciativa en mente, requieres arquitectura web a medida o una consultoría en desarrollo y diseño de producto? Envíame un mensaje y coordinemos.
            </p>

            {/* Caja de Correo Copiable */}
            <div className="p-4 border-2 border-[var(--border-main)] bg-[var(--bg-surface)] shadow-[3px_3px_0px_0px_var(--neo-shadow-color)] space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] block font-bold">
                CANAL DIRECTO:
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                  {personalInfo.email}
                </span>
                <Button
                  type="button"
                  onClick={handleCopyEmail}
                  variant="primary"
                  size="sm"
                  aria-label="Copiar correo al portapapeles"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Redes y enlaces */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <GithubIcon className="w-4 h-4" size={16} />
                <span>github.com/robinzdev</span>
              </Button>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-6">
            <div className="neo-card p-6 sm:p-8">
              <div className="pb-4 mb-6 border-b-2 border-[var(--border-main)] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text-primary)]">
                  FORMULARIO DE CONTACTO DIRECTO
                </span>
                <span className="font-mono text-[10px] text-accent font-semibold">
                  ENCRIPTACIÓN SSL / TLS
                </span>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-[var(--bg-primary)] border-2 border-[var(--border-main)]">
                  <div className="w-12 h-12 mx-auto border-2 border-[var(--border-main)] bg-accent text-[#131515] flex items-center justify-center font-bold">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Unbounded',sans-serif] text-lg font-bold uppercase text-[var(--text-primary)]">
                    Mensaje Recibido
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Gracias por comunicarte. Responderé a tu solicitud en un plazo máximo de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">
                        Nombre completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Alexander Hamilton"
                        className="w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border-2 border-[var(--border-main)] text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)]/50 focus-visible:outline-none focus-visible:border-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@empresa.com"
                        className="w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border-2 border-[var(--border-main)] text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)]/50 focus-visible:outline-none focus-visible:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">
                      Detalles del proyecto o requerimiento
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe el alcance de tu proyecto, objetivos y tiempos estimados..."
                      className="w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border-2 border-[var(--border-main)] text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)]/50 focus-visible:outline-none focus-visible:border-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Bloque Unificado de Cierre del Footer con Gravity Letters */}
      <div className="border-t-2 border-[var(--border-main)] bg-[var(--bg-surface)] pt-6">
        {/* Barra superior de créditos y botón volver arriba integrada */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Unbounded',sans-serif] font-bold text-xs tracking-tight text-[var(--text-primary)]">
              ROBIN.DEV
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              © 2025 · Todos los derechos reservados
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              Next.js 16 · Tailwind CSS · Framer Motion
            </span>
            <Button
              type="button"
              onClick={scrollToTop}
              variant="secondary"
              size="icon"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4 text-accent" />
            </Button>
          </div>
        </div>

        {/* Efecto Gravity Letters integrado en el mismo bloque */}
        <GravityLetters
          line1="ROBIN"
          line2="DEV"
          widthPercent={0.94}
          cutWidth={14}
          throwForce={1.2}
          clickToCollapse={true}
          collapseSpeed={1500}
          erosion={0}
          healDelay={4.0}
          holdTime={4.0}
          returnDuration={0.75}
          charSize={11}
          charStepX={9}
          charStepY={14}
          gravity={0.48}
          accentColor="#9AD872"
          accentRatio={0.18}
          className="w-full"
        />
      </div>
    </footer>
  );
}
