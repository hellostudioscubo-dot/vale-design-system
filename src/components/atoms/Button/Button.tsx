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
