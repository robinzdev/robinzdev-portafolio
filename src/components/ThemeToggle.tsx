"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { MorphIcon } from "@/components/MorphIcon";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      onClick={(e) => toggleTheme(e)}
      variant="secondary"
      size="sm"
      className="rounded-[8px]"
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
    >
      <MorphIcon type="sun-moon" active={isDark} size={15} />
      <span className="font-bold">{isDark ? "DARK" : "LIGHT"}</span>
    </Button>
  );
}
