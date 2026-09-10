import { NumberBlock } from "@/components/atoms/NumberBlock";
import { cn } from "@/lib/utils";

/**
 * CompanionCard — Figma: Fluxo do App - mobile → Hoje → "Cartão de
 * conquistas". A molecule: the companion illustration, optionally followed
 * by a row of `NumberBlock` stats (23h estudando · 3 certificados ·
 * 2 publicações) — shown once the learner has some history; a first-time
 * visitor just sees the illustration (`stats` omitted).
 */
export interface CompanionCardStat {
  value: string | number;
  label: string;
}

export interface CompanionCardProps {
  imageSrc: string;
  imageAlt: string;
  stats?: CompanionCardStat[];
  className?: string;
}

export function CompanionCard({ imageSrc, imageAlt, stats, className }: CompanionCardProps) {
  return (
    <figure
      className={cn(
        "flex w-full flex-col items-center gap-6 rounded-card border border-border bg-surface p-5 shadow-leve",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-[302/257] w-full rounded-button object-cover"
      />
      {stats && stats.length > 0 && (
        <figcaption className="flex w-full items-start justify-around">
          {stats.map((stat) => (
            <NumberBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </figcaption>
      )}
    </figure>
  );
}
