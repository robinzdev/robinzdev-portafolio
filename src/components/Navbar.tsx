"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Download, Menu, X, FolderGit2, Briefcase, Cpu, Send } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { personalInfo } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";

interface NavLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLinkItem[] = [
    {
      label: "Proyectos",
      href: "#proyectos",
      icon: FolderGit2,
      color: "#00D2FF",
    },
    {
      label: "Experiencia",
      href: "#experiencia",
      icon: Briefcase,
      color: "#F59E0B",
    },
    {
      label: "Habilidades",
      href: "#habilidades",
      icon: Cpu,
      color: "#A855F7",
    },
    {
      label: "Contacto",
      href: "#contacto",
      icon: Send,
      color: "var(--color-accent-brand)",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[var(--border-main)] bg-[var(--bg-primary)]/95 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="w-8 h-8 border-2 border-[var(--border-main)] bg-accent flex items-center justify-center font-black text-[#131515] text-sm shadow-[2px_2px_0px_0px_var(--neo-shadow-color)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
            R
          </div>
          <span className="font-['Unbounded',sans-serif] font-bold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
            ROBIN<span className="text-accent">.DEV</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase font-mono tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-transparent hover:border-[var(--border-main)] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon
                  className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0"
                  style={{ color: link.color }}
                />
                <span className="font-semibold">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Button
            href={personalInfo.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[var(--border-main)] bg-[var(--bg-surface)] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Navegación móvil">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm uppercase font-mono tracking-wider font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] px-3 py-2.5 border border-transparent hover:border-[var(--border-main)] transition-all"
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center border border-[var(--border-main)] bg-[var(--bg-primary)] shrink-0 shadow-[1px_1px_0px_0px_var(--neo-shadow-color)]"
                    style={{ color: link.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2">
            <Button
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              fullWidth
            >
              <Download className="w-4 h-4" />
              <span>Descargar Currículum</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

