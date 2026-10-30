"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const scrollToProject = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      setCurrentIndex(index);
    }
  }, []);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    scrollToProject(prevIndex);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projectsData.length;
    scrollToProject(nextIndex);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleCardClick = (e: React.MouseEvent, idx: number) => {
    // Si el clic fue en un enlace o botón interno, respetamos su navegación
    if ((e.target as HTMLElement).closest("a, button")) {
      setTimerResetKey((prev) => prev + 1);
      return;
    }

    if (idx !== currentIndex) {
      scrollToProject(idx);
    } else {
      // Si se hace clic en la tarjeta activa, avanza al siguiente proyecto
      const nextIndex = (currentIndex + 1) % projectsData.length;
      scrollToProject(nextIndex);
    }
    setTimerResetKey((prev) => prev + 1);
  };

  // Pausar auto-play cuando la sección no esté visible en el viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Transición automática cada 20 segundos con reinicio ante interacción manual
  useEffect(() => {
    if (!isInView) return;

    const AUTO_PLAY_INTERVAL = 20000;
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % projectsData.length;
      scrollToProject(nextIndex);
    }, AUTO_PLAY_INTERVAL);

    return () => clearTimeout(timer);
  }, [currentIndex, isInView, timerResetKey, scrollToProject]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const cards = Array.from(container.children) as HTMLElement[];
        if (cards.length === 0) return;

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, idx) => {
          const distance = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });

        setCurrentIndex(closestIndex);
      }, 50);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="py-20 border-b border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="mb-12 pb-6 border-b border-[var(--border-main)]">
          <div className="space-y-2 max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs font-semibold text-[var(--text-primary)] opacity-60 tracking-wider block"
            >
              [01 // PORTFOLIO]
            </motion.span>
            <h2 className="font-['Unbounded',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight uppercase text-[var(--text-primary)] leading-[1.06]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Proyectos
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="block text-accent"
              >
                Destacados
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Carrusel Horizontal de Proyectos con padding generoso para evitar cualquier corte de bordes o sombras */}
        <div
          ref={carouselRef}
          tabIndex={0}
          aria-label="Carrusel de proyectos destacados"
          className="flex gap-6 sm:gap-8 items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 px-4 sm:px-6 md:px-8 -mx-4 sm:-mx-6 md:-mx-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projectsData.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={project.id}
                onClick={(e) => handleCardClick(e, idx)}
                className={`shrink-0 snap-start flex transition-all duration-300 ease-out cursor-pointer ${
                  isActive
                    ? "w-[88vw] sm:w-[520px] md:w-[600px] lg:w-[660px] opacity-100 z-10"
                    : "w-[80vw] sm:w-[440px] md:w-[500px] lg:w-[540px] opacity-60 hover:opacity-85"
                }`}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  className="w-full border-2 border-[var(--border-main)] shadow-[4px_4px_0px_0px_var(--neo-shadow-color)] transition-all duration-300"
                />
              </div>
            );
          })}
        </div>

        {/* Controles de Navegación del Carrusel (Abajo a la Izquierda) */}
        <div className="flex items-center gap-3.5 mt-6 pt-2">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Proyecto anterior"
              className="p-3 border-2 border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[3px_3px_0px_0px_var(--neo-shadow-color)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[8px]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente proyecto"
              className="p-3 border-2 border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[3px_3px_0px_0px_var(--neo-shadow-color)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[8px]"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Numeración simple */}
          <div className="flex items-center gap-1.5 font-mono text-sm font-semibold select-none ml-1">
            <span className="text-accent font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--text-muted)] opacity-50">/</span>
            <span className="text-[var(--text-muted)]">
              {String(projectsData.length).padStart(2, "0")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
