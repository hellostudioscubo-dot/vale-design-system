import { createElement, forwardRef } from "react";
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { TypeScaleToken } from "@/tokens/typography";

const styleToClassName: Record<TypeScaleToken, string> = {
  display: "font-display text-display text-text-primary",
  tituloG: "font-display text-titulo-g text-text-primary",
  tituloM: "font-display text-titulo-m text-text-primary",
  numero: "font-display text-numero text-text-primary",
  // `achievement` (dourado) is documented in Figma as decorative — it isn't
  // text-safe even at this size (2.0:1, needs 3:1). `warning-strong`
  // (mel-queimado) is the family's dedicated text-safe dark variant.
  numeroConquista: "font-display text-numero font-bold text-warning-strong",
  timer: "font-display text-timer text-text-primary",
  corpo: "font-body text-corpo text-text-primary",
  corpoM: "font-body text-corpo font-medium text-text-primary",
  auxiliar: "font-body text-auxiliar text-text-secondary",
  legenda: "font-body text-legenda text-text-secondary",
};

const defaultElement: Record<TypeScaleToken, ElementType> = {
  display: "h1",
  tituloG: "h2",
  tituloM: "h3",
  numero: "span",
  numeroConquista: "span",
  timer: "span",
  corpo: "p",
  corpoM: "p",
  auxiliar: "p",
  legenda: "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Which entry of the Figma type scale to render (Foundations → Typography). */
  variant: TypeScaleToken;
  /** Override the rendered element — the visual style and the semantics are independent. */
  as?: ElementType;
}

/** Foundations → Typography, exposed as a usable primitive instead of only documentation. */
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant, as, className, ...props }, ref) => {
    const Element = as ?? defaultElement[variant];
    return createElement(Element, {
      ref,
      className: cn(styleToClassName[variant], className),
      ...props,
    });
  },
);
Text.displayName = "Text";
