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
  const baseStyles = "inline-flex items-center justify-center gap-2 font-['Unbounded',sans-serif] font-bold uppercase tracking-wider cursor-pointer select-none border-2 rounded-[8px] shadow-[3px_3px_0px_0px_var(--neo-shadow-color)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 ease-out";

  const sizeStyles: Record<ButtonSize, string> = {
    icon: "p-2 sm:p-2.5 shrink-0",
    sm: "text-xs py-1.5 px-3",
    md: "text-xs sm:text-sm py-2 px-4 sm:px-5",
    lg: "text-sm sm:text-base py-3 px-6 sm:px-7",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[var(--color-accent-brand)] text-[#131515] border-[var(--border-main)] hover:bg-[var(--color-accent-brand)]",
    secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-main)] hover:bg-[var(--bg-surface-elevated)]",
    dark: "bg-[#131515] text-[#FFFFFF] border-[#FFFFFF]",
    outline: "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-main)]",
  };

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        aria-label={props["aria-label"]}
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
