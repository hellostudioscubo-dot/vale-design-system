import { useId } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * LoadingBar — Figma: Fluxo do App - mobile → Splash → "Barra de carregamento".
 * A distinct component from `ProgressBar` (Components → Progress Bar): this
 * one is the pill-shaped, dark-track loader shown once, full-bleed, over the
 * Splash illustration — not the thin inline bar used elsewhere in the app.
 * Built on Radix Progress for the same reason as `ProgressBar`: real
 * role="progressbar" semantics instead of a hand-rolled div.
 */
export interface LoadingBarProps {
  /** Current value, 0–max. */
  value: number;
  max?: number;
  /** Centered label over the track, e.g. "Carregando...". */
  label?: string;
  className?: string;
}

export function LoadingBar({ value, max = 100, label = "Carregando...", className }: LoadingBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const labelId = useId();

  return (
    <div className={cn("relative w-full", className)}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <ProgressPrimitive.Root
        value={value}
        max={max}
        aria-labelledby={labelId}
        className="relative h-10 w-full overflow-hidden rounded-chip border-2 border-palette-areiaClara bg-palette-roxoNoite"
      >
        <ProgressPrimitive.Indicator
          className="h-full rounded-chip bg-gradient-to-r from-warning to-palette-roxoNoite transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
      </ProgressPrimitive.Root>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-body text-auxiliar text-palette-areiaClara"
      >
        {label}
      </span>
    </div>
  );
}
