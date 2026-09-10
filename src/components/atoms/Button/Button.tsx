import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — Figma: Components → Button (Botão primário / secundário / texto).
 *
 * Maps 1:1 onto the component's own variant + state model:
 *  - `variant` ⇔ the Figma component set ("Botão primário", "secundário", "texto")
 *  - disabled ⇔ Estado=Desabilitado (native `disabled`, never a visual-only style)
 *  - hover/active ⇔ Estado=Pressionado (native `:hover` / `:active`)
 *
 * Two more variants come from "Fluxo do App - mobile", not from the
 * Components page, and are documented separately because they don't fit the
 * primary/secondary/text model above:
 *  - `amber`: every screen-flow CTA (onboarding, Hoje, Detalhe do item, Fim
 *    de sessão, Novo item) overrides "Botão primário" to an amber fill with
 *    dark (`grafite`) text instead of this file's own roxo `primary` — kept
 *    as a separate variant rather than changing `primary`'s color, since
 *    that would be a breaking visual change for anyone already consuming
 *    `variant="primary"`. Static fill + static text, same reasoning as
 *    Card's `completed` variant (see its doc comment).
 *  - `outline`/`outlineMuted`: the "Sessão em foco" screen is a full-bleed
 *    dark takeover (bg-primary-pressed, not the normal page surface), so
 *    `secondary`'s `-onSurface` tokens (tuned for the light/dark *page*
 *    surface) don't apply — these two use fixed light-on-dark colors
 *    instead, matching that screen's own two buttons ("Iniciar" / "Encerrar").
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-button font-body text-auxiliar font-semibold",
    "min-h-touch px-6",
    "transition-colors duration-150",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-text-inverse",
          "hover:bg-primary-hover active:bg-primary-pressed",
          "disabled:bg-disabled-bg disabled:text-disabled-text",
        ],
        secondary: [
          // Base state sits on whatever page/card surface shows through
          // `bg-transparent`, so it needs the dark-mode-safe `onSurface`
          // color (`primary` alone fails AA there — see
          // semantic.primaryOnSurface in src/tokens/colors.ts). Hover/active
          // switch to the *static* `primary-subtle` fill instead, which
          // stays pale in both themes, so they revert to the plain `primary`/
          // `primary` pairing that tint was already verified against.
          "bg-transparent text-primary-onSurface border border-primary-onSurface",
          "hover:bg-primary-subtle hover:text-primary hover:border-primary",
          "active:bg-primary-subtle active:text-primary active:border-primary",
          "disabled:border-disabled-text disabled:text-disabled-text",
        ],
        text: [
          "bg-transparent text-primary-onSurface px-2 underline-offset-4",
          // Opacity instead of `primaryPressed` (roxoProfundo) for the
          // pressed feedback — that color is darker still than `primary`,
          // which already isn't dark-mode safe on its own here; dimming
          // works as "pressed" feedback in both themes without needing a
          // third onSurface shade just for this one momentary state.
          "hover:underline active:opacity-70",
          "disabled:text-disabled-text",
        ],
        amber: [
          "bg-warning text-palette-grafite",
          "hover:opacity-90 active:opacity-80",
          "disabled:bg-disabled-bg disabled:text-disabled-text disabled:opacity-100",
        ],
        outline: [
          "border border-palette-lilas text-palette-areiaClara bg-transparent",
          "hover:bg-palette-lilas/10 active:bg-palette-lilas/20",
          "disabled:border-palette-cinzaMedio disabled:text-palette-cinzaMedio",
        ],
        outlineMuted: [
          "border border-palette-cinzaMedio text-palette-cinzaMedio bg-transparent",
          "hover:bg-palette-cinzaMedio/10 active:bg-palette-cinzaMedio/20",
          "disabled:opacity-50",
        ],
      },
      size: {
        md: "h-11 text-auxiliar",
        sm: "h-9 px-4 text-legenda",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element instead of a <button> (Radix Slot). */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-disabled={props.disabled || undefined}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
