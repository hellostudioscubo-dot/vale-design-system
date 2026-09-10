import { TrendStat, type TrendStatProps } from "@/components/molecules/TrendStat";
import { Text } from "@/foundations";
import { BackIcon, ArchiveIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * ProgressScreen — Figma: Fluxo do App - mobile → "Progresso primeiro
 * acesso" and "...- acesso após ter feito algumas horas de estudos". One
 * template: the first-access frame is this one with a single `metrics`
 * entry and no trend data yet (see `TrendStat`'s own optional `trend`).
 */
export interface ProgressScreenProps {
  onBack: () => void;
  onArchive: () => void;
  metrics: Pick<TrendStatProps, "value" | "caption" | "trend">[];
  footnote?: string;
  title?: string;
  className?: string;
}

export function ProgressScreen({
  onBack,
  onArchive,
  metrics,
  footnote = "A previsão acompanha seu ritmo real, não o planejado.",
  title = "Progresso",
  className,
}: ProgressScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-6 bg-surface-muted p-6", className)}>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} aria-label="Voltar" className="text-text-primary">
          <BackIcon />
        </button>
        <button type="button" onClick={onArchive} aria-label="Arquivar" className="text-text-primary">
          <ArchiveIcon />
        </button>
      </div>

      <Text as="h1" variant="tituloG">
        {title}
      </Text>

      <div className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <TrendStat key={metric.caption} value={metric.value} caption={metric.caption} trend={metric.trend} />
        ))}
      </div>

      {footnote && (
        <Text variant="legenda" className="text-center text-text-secondary">
          {footnote}
        </Text>
      )}
    </div>
  );
}
