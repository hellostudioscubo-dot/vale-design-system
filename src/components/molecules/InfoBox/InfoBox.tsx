import { cn } from "@/lib/utils";

/**
 * InfoBox — Figma: Fluxo do App - mobile → Detalhe do item → "Por que
 * agora" (a tinted callout explaining why this item was surfaced now — a
 * gentler cousin of `Input`'s error message, informational rather than
 * corrective).
 *
 * `bg-primary-subtle` is a static fill (same value in both themes — see
 * semanticDark's doc comment in src/tokens/colors.ts), so its text stays
 * static too: `palette.roxoProfundo`/`palette.grafite`, not the
 * theme-flipping `primary-onSurface`/`text-primary` tokens, which are tuned
 * for text sitting directly on the *page* surface — same reasoning as
 * Card's `completed` variant.
 */
export interface InfoBoxProps {
  title: string;
  description: string;
  className?: string;
}

export function InfoBox({ title, description, className }: InfoBoxProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 rounded-card bg-primary-subtle p-4", className)}>
      <p className="font-body text-legenda text-palette-roxoProfundo">{title}</p>
      <p className="font-body text-auxiliar text-palette-grafite">{description}</p>
    </div>
  );
}
