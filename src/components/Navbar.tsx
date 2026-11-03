"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Menu, X, Folder, Briefcase, Cpu, Send } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";

interface NavLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Cerrar menú al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLinkItem[] = [
    {
      label: "Proyectos",
      href: "#proyectos",
      icon: Folder,
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
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-[var(--border-main)] bg-[var(--bg-primary)]/95 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Isotipo adaptativo al tema */}
          <div className="relative w-7 h-7 shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/robinzdev_forwhite.svg"
              alt="robinzdev logo"
              width={28}
              height={28}
              priority
              className="dark:hidden w-7 h-7 object-contain"
            />
            <Image
              src="/robinzdev_forblack.svg"
              alt="robinzdev logo"
              width={28}
              height={28}
              priority
              className="hidden dark:block w-7 h-7 object-contain"
            />
          </div>
          <span className="font-['Unbounded',sans-serif] font-semibold text-lg sm:text-base tracking-tight lowercase text-[var(--text-primary)]">
            robinz<span className="text-accent">dev</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-stretch h-full self-stretch gap-1 lg:gap-2" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="h-full flex items-center gap-2 px-3.5 lg:px-4 text-xs uppercase font-mono tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon
                  className="w-4 h-4 transition-all duration-200 group-hover:scale-110 shrink-0 fill-transparent group-hover:fill-current"
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

      {/* Mobile drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop para cerrar al hacer clic fuera */}
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-[2px] md:hidden z-40 pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-50 md:hidden border-t-2 border-[var(--border-main)] bg-[var(--bg-surface)] px-4 py-5 shadow-xl">
            <nav className="flex flex-col space-y-2.5" aria-label="Navegación móvil">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3.5 text-xs uppercase font-['Unbounded',sans-serif] font-bold tracking-wide text-[var(--text-primary)] border-2 border-[var(--border-main)] bg-[var(--bg-primary)] hover:bg-[var(--bg-surface-elevated)] active:translate-x-[1px] active:translate-y-[1px] px-4 py-3 rounded-[8px] shadow-[2px_2px_0px_0px_var(--neo-shadow-color)] hover:shadow-none transition-all group"
                  >
                    <Icon
                      className="w-4 h-4 shrink-0 transition-all duration-200 group-hover:scale-110 fill-transparent group-hover:fill-current"
                      style={{ color: link.color }}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
