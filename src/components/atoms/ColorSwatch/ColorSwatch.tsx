import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * ColorSwatch — Figma: Fluxo do App - mobile → Escolha do personagem →
 * "Grade de cores" (one entry in the 6-color companion picker: lilás, âmbar,
 * sálvia, ameixa, areia, dourado — the same six colors as `EggCard`'s
 * `colorName`). A single option, meant to be rendered in a loop inside a
 * `role="radiogroup"` wrapper (see `CharacterSelectionScreen`) — same
 * one-option-per-atom shape as `SegmentedControl`'s items, but exposed
 * separately here since the picker also needs a live preview (`EggCard`)
 * the segmented control has no equivalent of.
 */
export interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc: string;
  colorName: string;
  selected?: boolean;
}

export const ColorSwatch = forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, imageSrc, colorName, selected, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      role="radio"
      aria-checked={!!selected}
      className={cn(
        "flex flex-col items-center gap-2 rounded-button p-1",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "block size-16 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-surface transition-all",
          selected ? "ring-primary" : "ring-transparent",
        )}
      >
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      </span>
      <span
        className={cn(
          "font-body text-legenda text-text-secondary",
          selected && "font-semibold text-primary-onSurface",
        )}
      >
        {colorName}
      </span>
    </button>
  ),
);
ColorSwatch.displayName = "ColorSwatch";
