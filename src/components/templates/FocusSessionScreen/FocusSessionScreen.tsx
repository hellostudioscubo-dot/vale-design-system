import { Button } from "@/components/atoms/Button";
import { ProgressRing } from "@/components/atoms/ProgressRing";
import { Notice } from "@/components/atoms/Notice";
import { Text } from "@/foundations";
import { BackIcon, ArchiveIcon, PlayIcon, StopIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * FocusSessionScreen — Figma: Fluxo do App - mobile → "Sessão em foco
 * pausada" and "...dar play". A full-bleed dark takeover (see `Button`'s
 * `outline`/`outlineMuted` and `ProgressRing`'s `tone="onDark"` doc
 * comments) — `isPlaying` swaps the primary action between "Iniciar" and
 * "Pausar" rather than these being two separate screens.
 */
export interface FocusSessionScreenProps {
  onBack: () => void;
  onArchive: () => void;
  timeLabel: string;
  sessionLabel: string;
  progressValue: number;
  progressMax: number;
  companionImageSrc: string;
  companionImageAlt: string;
  growthMessage: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onEnd: () => void;
  title?: string;
  playLabel?: string;
  pauseLabel?: string;
  endLabel?: string;
  className?: string;
}

export function FocusSessionScreen({
  onBack,
  onArchive,
  timeLabel,
  sessionLabel,
  progressValue,
  progressMax,
  companionImageSrc,
  companionImageAlt,
  growthMessage,
  isPlaying,
  onTogglePlay,
  onEnd,
  title = "Tempo de foco",
  playLabel = "Iniciar",
  pauseLabel = "Pausar",
  endLabel = "Encerrar",
  className,
}: FocusSessionScreenProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[844px] w-full flex-col items-center gap-8 bg-primary-pressed px-6 py-8",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between">
        <button type="button" onClick={onBack} aria-label="Voltar" className="text-palette-areiaClara">
          <BackIcon />
        </button>
        <button type="button" onClick={onArchive} aria-label="Arquivar" className="text-palette-areiaClara">
          <ArchiveIcon />
        </button>
      </div>

      <Text variant="tituloM" className="text-center text-palette-areiaClara opacity-70">
        {title}
      </Text>

      <ProgressRing
        value={progressValue}
        max={progressMax}
        size={240}
        strokeWidth={8}
        valueVariant="timer"
        tone="onDark"
        valueLabel={timeLabel}
        caption={sessionLabel}
      />

      <figure className="flex flex-col items-center gap-3">
        <img
          src={companionImageSrc}
          alt={companionImageAlt}
          className="aspect-square w-52 rounded-full object-cover"
        />
        <Notice className="text-palette-areiaClara/75">{growthMessage}</Notice>
      </figure>

      <div className="mt-auto flex w-full justify-center gap-4">
        <Button variant="outline" onClick={onTogglePlay} className="w-[103px] gap-2">
          {isPlaying ? null : <PlayIcon width={20} height={20} />}
          {isPlaying ? pauseLabel : playLabel}
        </Button>
        <Button variant="outlineMuted" onClick={onEnd} className="w-[103px] gap-2">
          <StopIcon width={20} height={20} />
          {endLabel}
        </Button>
      </div>
    </div>
  );
}
