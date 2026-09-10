import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { ColorSwatch } from "@/components/atoms/ColorSwatch";
import { EggCard } from "@/components/molecules/EggCard";
import { Text } from "@/foundations";
import { cn } from "@/lib/utils";

/**
 * CharacterSelectionScreen — Figma: Fluxo do App - mobile → "Escolha do
 * personagem" (+ its six "— <Cor>" color variants, one per `colors` entry —
 * the variants only ever differ by which color is previewed/selected, not
 * in structure, so this one template covers all of them via props).
 */
export interface CharacterSelectionColorOption {
  name: string;
  previewImageSrc: string;
  swatchImageSrc: string;
}

export interface CharacterSelectionScreenProps {
  colors: CharacterSelectionColorOption[];
  selectedColor: string;
  onSelectColor: (name: string) => void;
  companionName: string;
  onCompanionNameChange: (value: string) => void;
  onContinue: () => void;
  title?: string;
  subtitle?: string;
  continueLabel?: string;
  className?: string;
}

export function CharacterSelectionScreen({
  colors,
  selectedColor,
  onSelectColor,
  companionName,
  onCompanionNameChange,
  onContinue,
  title = "Escolha a cor do seu dragão",
  subtitle = "Dá para mudar depois.",
  continueLabel = "Continuar",
  className,
}: CharacterSelectionScreenProps) {
  const selected = colors.find((c) => c.name === selectedColor) ?? colors[0];

  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-4 bg-surface-muted px-6 pb-8 pt-12", className)}>
      <Text as="h1" variant="tituloG">
        {title}
      </Text>
      <Text variant="corpo" className="text-text-secondary">
        {subtitle}
      </Text>

      {selected && (
        <EggCard imageSrc={selected.previewImageSrc} colorName={selected.name} stage="egg" />
      )}

      <Input
        label="Nome do dragão"
        placeholder="Dê um nome ao seu dragão"
        value={companionName}
        onChange={(e) => onCompanionNameChange(e.target.value)}
      />

      <div
        role="radiogroup"
        aria-label="Cor do dragão"
        className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 py-2"
      >
        {colors.map((color) => (
          <ColorSwatch
            key={color.name}
            colorName={color.name}
            imageSrc={color.swatchImageSrc}
            selected={color.name === selectedColor}
            onClick={() => onSelectColor(color.name)}
          />
        ))}
      </div>

      <Button variant="amber" onClick={onContinue} className="mt-auto w-full">
        {continueLabel}
      </Button>
    </div>
  );
}
