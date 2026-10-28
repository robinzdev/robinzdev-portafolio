"use client";

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "dark" | "outline";
export type ButtonSize = "icon" | "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  fullWidth = false,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  // Estilo del botón frontal que se desplaza hacia abajo-derecha para encajarse en el recuadro posterior
  const baseFrontStyles = "relative z-10 inline-flex items-center justify-center gap-2 font-['Unbounded',sans-serif] font-bold uppercase tracking-wider -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-150 ease-out cursor-pointer select-none border-2";

  const sizeStyles: Record<ButtonSize, string> = {
    icon: "p-2 sm:p-2.5 shrink-0",
    sm: "text-xs py-1.5 px-3",
    md: "text-xs sm:text-sm py-2 px-4 sm:px-5",
    lg: "text-sm sm:text-base py-3 px-6 sm:px-7",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-accent text-[#131515] border-[var(--border-main)] group-hover:bg-[var(--color-accent-hover)]",
    secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-main)] group-hover:bg-[var(--bg-surface-elevated)]",
    dark: "bg-[#131515] text-[#FFFFFF] border-[#FFFFFF]",
    outline: "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-main)]",
  };

  const frontClasses = `${baseFrontStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim();
  const wrapperClasses = `relative ${fullWidth ? "w-full block" : "inline-block"} group mr-1 mb-1 align-middle`;

  // Recuadro fijo del fondo (el marco donde se encaja el botón al hacer hover)
  const backFrame = (
    <span
      aria-hidden="true"
      className="absolute inset-0 bg-[var(--neo-shadow-color)] border-2 border-[var(--neo-shadow-color)] pointer-events-none transition-colors"
    />
  );

  if (href) {
    return (
      <span className={wrapperClasses}>
        {backFrame}
        <a
          href={href}
          target={target}
          rel={rel}
          className={frontClasses}
          aria-label={props["aria-label"]}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      </span>
    );
  }

  return (
    <span className={wrapperClasses}>
      {backFrame}
      <button
        type={type}
        className={frontClasses}
        {...props}
      >
        {children}
      </button>
    </span>
  );
}
