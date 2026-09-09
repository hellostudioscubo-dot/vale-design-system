import { cn } from "@/lib/utils";

/**
 * NumberBlock — Figma: Components → Number Block (Bloco numérico).
 * Highlights a metric or counter (e.g. streaks, certificates earned).
 */
export interface NumberBlockProps {
  value: string | number;
  label: string;
  /** Use the bold "conquista" treatment for milestone/achievement counts. */
  emphasis?: boolean;
  className?: string;
}

export function NumberBlock({ value, label, emphasis, className }: NumberBlockProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <span
        className={cn(
          "font-display text-numero text-text-primary",
          // `achievement` (dourado) is decorative-only in Figma — not
          // text-safe. `warning-onSurface`, not `-strong`: this sits
          // directly on the page/card surface (see semantic.warningOnSurface
          // in src/tokens/colors.ts).
          emphasis && "font-bold text-warning-onSurface",
        )}
      >
        {value}
      </span>
      <span className="font-body text-legenda text-text-secondary">{label}</span>
    </div>
  );
}
