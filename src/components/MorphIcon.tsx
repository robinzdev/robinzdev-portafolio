"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface MorphIconProps {
  type: "sun-moon" | "arrow-corner" | "code-terminal" | "check-circle" | "spark";
  active?: boolean;
  className?: string;
  size?: number;
}

export function MorphIcon({ type, active = false, className = "", size = 20 }: MorphIconProps) {
  const commonProps: SVGMotionProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `inline-block transition-colors ${className}`,
  };

  if (type === "sun-moon") {
    return (
      <motion.svg
        {...commonProps}
        key={active ? "moon" : "sun"}
        initial={{ rotate: -25, scale: 0.85, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {active ? (
          // Moon icon en orientación vertical natural
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          // Sun icon
          <g>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        )}
      </motion.svg>
    );
  }

  if (type === "arrow-corner") {
    return (
      <motion.svg
        {...commonProps}
        whileHover={{ x: 2, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </motion.svg>
    );
  }

  if (type === "code-terminal") {
    return (
      <motion.svg
        {...commonProps}
        animate={{ y: active ? [0, -2, 0] : 0 }}
        transition={{ repeat: active ? Infinity : 0, duration: 1.5 }}
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </motion.svg>
    );
  }

  if (type === "spark") {
    return (
      <motion.svg
        {...commonProps}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      >
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
      </motion.svg>
    );
  }

  return (
    <motion.svg {...commonProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </motion.svg>
  );
}
