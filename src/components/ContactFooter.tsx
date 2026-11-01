"use client";

import React from "react";
import { personalInfo } from "@/data/portfolioData";
import { Mail, ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { GravityLetters } from "@/components/ui/GravityLetters";
import { VariableTextWave } from "@/components/ui/VariableTextWave";

export function ContactFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contacto" className="border-t border-[var(--border-main)] bg-[var(--bg-primary)]">
      {/* Sección de Contacto Centrada y Monumental */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen min-h-[100vh] min-h-[100dvh] flex flex-col items-center justify-center text-center">
        
        {/* Título Monumental con Efecto Variable Text Wave */}
        <div className="w-full mb-6 flex justify-center">
          <VariableTextWave
            as="h2"
            layout="column"
            words={[
              { text: "CONSTRUYAMOS", isAccent: false },
              { text: "JUNTOS.", isAccent: true },
            ]}
            className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] tracking-tight leading-[0.92]"
          />
        </div>

        {/* Párrafo Descriptivo Centrado */}
        <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed mb-8">
          ¿Tienes una iniciativa en mente, requieres arquitectura web a medida o una consultoría en desarrollo y diseño de producto? Envíame un mensaje y coordinemos.
        </p>

        {/* Botones de Acción (Canal Directo por Correo + WhatsApp) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="font-mono lowercase"
            aria-label={`Redactar correo a ${personalInfo.email}`}
          >
            <Mail className="w-4 h-4 text-accent" />
            <span>{personalInfo.email}</span>
          </Button>

          <Button
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="font-mono"
            aria-label={`Contactar por WhatsApp al ${personalInfo.phone || "+1 (829) 640-7836"}`}
          >
            <WhatsAppIcon className="w-4 h-4 text-accent" />
            <span>+1 (829) 640-7836</span>
          </Button>
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
