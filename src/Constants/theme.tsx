// src/constants/theme.tsx
import type { HTMLAttributes } from "react";

/**
 * theme.tsx
 * Single source of truth for design tokens + semantic component classes
 * Usage:
 *   import { theme, cx } from "@/constants/theme";
 *   <button className={cx(theme.components.btn.base, theme.components.btn.primary)}>Save</button>
 */

/* -------------------------
   Types
   ------------------------- */
type BtnVariant = "primary" | "outline" | "ghost" | "icon";
type CardVariant = "default" | "compact";

/* -------------------------
   Helpers
   ------------------------- */
export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/* -------------------------
   Design tokens (single source)
   ------------------------- */
export const tokens = {
  fonts: {
    sans: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
  },
  sizes: {
    textSm: "14px",
    textMd: "16px",
    textLg: "20px",
  },
  radii: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
  },
  motion: {
    spin: "spin 1s linear infinite",
    fadeIn: "fade-in 1s",
  },
  colors: {
    primary: "rgba(76,175,79,1)", // can be used directly in style attributes if needed
    primaryHover: "rgba(65,150,68,1)",
    neutral900: "rgb(38 50 56)",
    neutral700: "rgb(113 113 113)",
    muted100: "rgb(245 247 250)",
    bg: "hsl(0 0% 100%)",
    fg: "hsl(222.2 47.4% 11.2%)",
  },
  cssVars: {
    // map of CSS variables (if you want to inject into :root)
    "--font-sans": `Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
    "--bg": "0 0% 100%",
    "--fg": "222.2 47.4% 11.2%",
  },
} as const;

/* -------------------------
   Component class registry (semantic + Tailwind utility strings)
   Keep all component-level classes here so team members reuse them.
   Use `cx(theme.components.btn.base, theme.components.btn.primary)` in components.
   ------------------------- */
export const components = {
  btn: {
    base:
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 text-sm",
    primary:
      "bg-[rgba(76,175,79,1)] text-white hover:bg-[rgba(65,150,68,1)] shadow-sm border-[1px] border-[rgba(0,0,0,0.04)]",
    outline:
      "bg-transparent border border-[rgba(113,113,113,0.16)] text-[rgb(113,113,113)] hover:bg-[rgba(0,0,0,0.03)]",
    ghost: "bg-transparent text-[rgb(113,113,113)] hover:bg-[rgba(0,0,0,0.02)]",
    icon: "w-10 h-10 p-0 rounded-full inline-flex items-center justify-center",
    lg: "px-6 py-3 text-base rounded-lg",
    sm: "px-3 py-1.5 text-sm rounded",
  },
  card: {
    base: "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
    header: "px-6 py-4 border-b",
    body: "p-6",
    footer: "px-6 py-4 border-t flex items-center justify-end gap-2",
    compact: "rounded-lg p-4",
  },
  modal: {
    backdrop: "fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50",
    panel:
      "bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden dark:bg-slate-900 dark:text-white",
    header: "px-6 py-4 border-b",
    body: "p-6",
    footer: "px-6 py-4 border-t",
  },
  form: {
    input:
      "block w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-1 focus:outline-none",
    label: "block text-sm font-medium mb-1",
    helper: "text-xs text-muted-foreground mt-1",
    textarea:
      "block w-full min-h-[120px] rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-1 focus:outline-none",
  },
  layout: {
    containerMax: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
  badge: {
    base: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
    muted: "bg-muted text-muted-foreground",
  },
  avatar: {
    base: "inline-flex items-center justify-center rounded-full overflow-hidden w-10 h-10",
  },
  util: {
    srOnly: "sr-only",
    imgResponsive: "max-w-full h-auto block",
  },
} as const;

/* -------------------------
   Export the theme object
   ------------------------- */
export const theme = {
  tokens,
  components,
} as const;

export type Theme = typeof theme;

/* -------------------------
   Example usage helpers (typed)
   ------------------------- */
export const btnClass = (variant: BtnVariant | "primary" | "outline" | "ghost" | "icon", extra?: string) =>
  cx(components.btn.base, (components.btn as any)[variant] ?? "", extra);

export const cardClass = (variant?: CardVariant, extra?: string) =>
  cx(components.card.base, variant === "compact" ? components.card.compact : "", extra);

/* -------------------------
   Small usage docs for developers (exported strings)
   ------------------------- */
/**
 * Examples:
 *
 * import { theme, btnClass, cx } from "@/constants/theme";
 *
 * // Simple button:
 * <button className={btnClass("primary")}>Save</button>
 *
 * // Add extra classes:
 * <button className={btnClass("outline", "w-full")}>Cancel</button>
 *
 * // Card usage:
 * <div className={cardClass()}>
 *   <div className={theme.components.card.header}>Title</div>
 *   <div className={theme.components.card.body}>Content</div>
 *   <div className={theme.components.card.footer}>
 *     <button className={btnClass("primary")}>Action</button>
 *   </div>
 * </div>
 *
 * // Input:
 * <label className={theme.components.form.label}>Email</label>
 * <input className={theme.components.form.input} />
 * <p className={theme.components.form.helper}>Helper text</p>
 */
