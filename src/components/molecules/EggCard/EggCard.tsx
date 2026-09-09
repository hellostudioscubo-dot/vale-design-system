import { cn } from "@/lib/utils";

/**
 * EggCard — Figma: Components → Egg Card (Cartão do ovo / Cartão do dragão).
 * The collectible-companion card, shared across its three life stages
 * (Ovo → Dragão Nenê → Dragão Jovem adulto) and six character colors.
 * The artwork is supplied by the consuming app (`imageSrc`); this molecule
 * only owns the frame, aspect ratio and accessible caption.
 */
export type CompanionStage = "egg" | "hatchling" | "youngAdult";

const stageLabel: Record<CompanionStage, string> = {
  egg: "Ovo",
  hatchling: "Dragão Nenê",
  youngAdult: "Dragão Jovem adulto",
};

export interface EggCardProps {
  imageSrc: string;
  /** Character color name, e.g. "Lilás", "Âmbar" — shown as the caption. */
  colorName: string;
  stage: CompanionStage;
  className?: string;
}

export function EggCard({ imageSrc, colorName, stage, className }: EggCardProps) {
  return (
    <figure className={cn("flex w-full flex-col items-center gap-2", className)}>
      <div className="aspect-[342/260] w-full overflow-hidden rounded-card bg-surface-muted">
        <img
          src={imageSrc}
          alt={`${stageLabel[stage]} — cor ${colorName}`}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="font-body text-legenda text-text-secondary">
        {colorName}
      </figcaption>
    </figure>
  );
}
