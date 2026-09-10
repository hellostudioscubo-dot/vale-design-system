import type { ComponentProps } from "react";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { InfoBox } from "@/components/molecules/InfoBox";
import { SessionHistoryItem } from "@/components/molecules/SessionHistoryItem";
import { Text } from "@/foundations";
import { BackIcon, ArchiveIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * ItemDetailScreen — Figma: Fluxo do App - mobile → "Detalhe do item
 * primeiro acesso" and "...- acesso após ter feito algumas horas de
 * estudos". One template: `whyNow` and real `history` entries only appear
 * once there's something to show — the first-access frame passes a single
 * placeholder history entry instead of an empty list (matching Figma's own
 * "Ainda precisamos começar!" row).
 */
export interface ItemDetailScreenHistoryEntry {
  title: string;
  description: string;
}

export interface ItemDetailScreenProps {
  onBack: () => void;
  onArchive: () => void;
  whyNow?: { title: string; description: string };
  track: { label: string; tone?: ComponentProps<typeof Chip>["tone"] };
  title: string;
  meta: string;
  progressLabel: string;
  progressValue: number;
  progressMax?: number;
  ctaLabel: string;
  onStart: () => void;
  history: ItemDetailScreenHistoryEntry[];
  className?: string;
}

export function ItemDetailScreen({
  onBack,
  onArchive,
  whyNow,
  track,
  title,
  meta,
  progressLabel,
  progressValue,
  progressMax = 100,
  ctaLabel,
  onStart,
  history,
  className,
}: ItemDetailScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-6 bg-surface-muted px-6 pb-8 pt-6", className)}>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} aria-label="Voltar" className="text-text-primary">
          <BackIcon />
        </button>
        <button type="button" onClick={onArchive} aria-label="Arquivar" className="text-text-primary">
          <ArchiveIcon />
        </button>
      </div>

      {whyNow && <InfoBox title={whyNow.title} description={whyNow.description} />}

      <div className="flex flex-col gap-3">
        <Chip tone={track.tone}>{track.label}</Chip>
        <Text as="h1" variant="tituloM">
          {title}
        </Text>
        <Text variant="auxiliar" className="text-text-secondary">
          {meta}
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Text as="p" variant="tituloM">
          {progressLabel}
        </Text>
        <ProgressBar value={progressValue} max={progressMax} label={progressLabel} />
      </div>

      <Button variant="amber" onClick={onStart} className="w-full">
        {ctaLabel}
      </Button>

      <div className="flex flex-col gap-2">
        <Text variant="corpoM">Histórico de estudos</Text>
        <ul className="flex flex-col gap-2">
          {history.map((entry, index) => (
            <SessionHistoryItem key={index} title={entry.title} description={entry.description} />
          ))}
        </ul>
      </div>
    </div>
  );
}
