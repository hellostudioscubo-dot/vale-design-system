import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/foundations";
import { cn } from "@/lib/utils";

/**
 * SessionEndScreen — Figma: Fluxo do App - mobile → "Fim de sessão". The
 * congrats line is built from three plain props (`learnerName`, `minutes`,
 * `courseName`) rather than accepted as one pre-formatted string, so the
 * design system — not every consuming screen — owns how the two-size
 * Fraunces/Poppins mix is composed.
 */
export interface SessionEndScreenProps {
  companionImageSrc: string;
  companionImageAlt: string;
  learnerName: string;
  minutes: number;
  courseName: string;
  moduleQuestion?: string;
  noteValue: string;
  onNoteChange: (value: string) => void;
  onYes: () => void;
  onNo: () => void;
  yesLabel?: string;
  noLabel?: string;
  className?: string;
}

export function SessionEndScreen({
  companionImageSrc,
  companionImageAlt,
  learnerName,
  minutes,
  courseName,
  moduleQuestion = "Terminou o módulo?",
  noteValue,
  onNoteChange,
  onYes,
  onNo,
  yesLabel = "Sim, terminei",
  noLabel = "Ainda não",
  className,
}: SessionEndScreenProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[844px] w-full flex-col items-center justify-center gap-6 bg-surface-muted px-6 py-8",
        className,
      )}
    >
      <img
        src={companionImageSrc}
        alt={companionImageAlt}
        className="aspect-square w-full max-w-[338px] rounded-card border border-border object-cover"
      />

      <p className="text-center">
        <Text as="span" variant="tituloG">
          {`Parabéns, ${learnerName}! `}
        </Text>
        <Text as="span" variant="tituloM">
          {`${minutes} minutos em ${courseName}`}
        </Text>
      </p>

      <Text variant="corpo" className="text-center">
        {moduleQuestion}
      </Text>

      <Input
        label="Onde você parou?"
        hideLabel
        placeholder="Onde você parou? (opcional)"
        value={noteValue}
        onChange={(e) => onNoteChange(e.target.value)}
      />

      <div className="flex w-full flex-col gap-3">
        <Button variant="amber" onClick={onYes} className="w-full">
          {yesLabel}
        </Button>
        <Button variant="secondary" onClick={onNo} className="w-full">
          {noLabel}
        </Button>
      </div>
    </div>
  );
}
