"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeListeners = new Set<() => void>();

function subscribe(callback: () => void) {
  themeListeners.add(callback);
  const handleStorage = () => callback();
  window.addEventListener("storage", handleStorage);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("robindev-theme");
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    const updateDOM = () => {
      localStorage.setItem("robindev-theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      themeListeners.forEach((listener) => listener());
    };

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateDOM();
      return;
    }

    // Coordenadas de origen: desde el clic del botón de toggle o la esquina superior
    const x = event ? event.clientX : window.innerWidth;
    const y = event ? event.clientY : 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
