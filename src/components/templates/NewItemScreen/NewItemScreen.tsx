import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Select, type SelectOption } from "@/components/atoms/Select";
import { SegmentedControl, type SegmentedControlOption } from "@/components/atoms/SegmentedControl";
import { ChipToggle } from "@/components/atoms/Chip";
import { Text } from "@/foundations";
import { cn } from "@/lib/utils";

/**
 * NewItemScreen — Figma: Fluxo do App - mobile → "Novo plano - cursos" and
 * "Novo carreira - ações de carreira". Both frames are the same form with
 * the type selector on a different tab — one template, `type` is state the
 * consuming app owns (not two components), same reasoning as `PlanScreen`
 * covering both Plano and Carreira.
 */
export interface NewItemChoice {
  value: string;
  label: string;
}

export interface NewItemScreenProps {
  type: string;
  onTypeChange: (value: string) => void;
  typeOptions: SegmentedControlOption[];
  name: string;
  onNameChange: (value: string) => void;
  tracks: NewItemChoice[];
  selectedTrack?: string;
  onSelectTrack: (value: string) => void;
  hours: string;
  onHoursChange: (value: string) => void;
  months: SelectOption[];
  month: string;
  onMonthChange: (value: string) => void;
  priorities: NewItemChoice[];
  priority?: string;
  onSelectPriority: (value: string) => void;
  whyNow: string;
  onWhyNowChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  title?: string;
  submitLabel?: string;
  className?: string;
}

export function NewItemScreen({
  type,
  onTypeChange,
  typeOptions,
  name,
  onNameChange,
  tracks,
  selectedTrack,
  onSelectTrack,
  hours,
  onHoursChange,
  months,
  month,
  onMonthChange,
  priorities,
  priority,
  onSelectPriority,
  whyNow,
  onWhyNowChange,
  onCancel,
  onSubmit,
  title = "Novo item",
  submitLabel = "Adicionar",
  className,
}: NewItemScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-5 bg-surface-muted p-6", className)}>
      <div className="flex items-center">
        <button type="button" onClick={onCancel} className="font-body text-corpo font-medium text-primary-onSurface">
          Cancelar
        </button>
        <Text variant="corpoM" className="flex-1 text-center">
          {title}
        </Text>
        <span aria-hidden className="w-[75px]" />
      </div>

      <SegmentedControl label="Tipo de item" options={typeOptions} value={type} onValueChange={onTypeChange} />

      <Input label="Nome" value={name} onChange={(e) => onNameChange(e.target.value)} />

      <div className="flex flex-col gap-2">
        <Text variant="legenda">Trilha (opcional)</Text>
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <ChipToggle
              key={track.value}
              pressed={track.value === selectedTrack}
              onClick={() => onSelectTrack(track.value)}
            >
              {track.label}
            </ChipToggle>
          ))}
        </div>
      </div>

      <Input
        label="Carga estimada em horas (opcional)"
        value={hours}
        onChange={(e) => onHoursChange(e.target.value)}
      />

      <Select label="Mês (opcional)" options={months} value={month} onChange={(e) => onMonthChange(e.target.value)} />

      <div className="flex flex-col gap-2">
        <Text variant="legenda">Prioridade (opcional)</Text>
        <div className="flex flex-wrap gap-2">
          {priorities.map((option) => (
            <ChipToggle
              key={option.value}
              pressed={option.value === priority}
              onClick={() => onSelectPriority(option.value)}
            >
              {option.label}
            </ChipToggle>
          ))}
        </div>
      </div>

      <Textarea
        label="Por que agora (opcional)"
        placeholder="Escreva uma mensagem para você ler em um dia ruim pra você continuar"
        value={whyNow}
        onChange={(e) => onWhyNowChange(e.target.value)}
      />

      <Button variant="amber" onClick={onSubmit} className="w-full">
        {submitLabel}
      </Button>
    </div>
  );
}
