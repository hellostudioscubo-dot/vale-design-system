import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/foundations";
import { cn } from "@/lib/utils";

/**
 * OnboardingCourseFormScreen — Figma: Fluxo do App - mobile → "Onboarding 3
 * de 4" (both the empty/disabled state and the filled/enabled one are the
 * same screen at two points in time, not two screens — `isValid` decides
 * which the CTA shows).
 */
export interface OnboardingCourseFormScreenProps {
  courseName: string;
  onCourseNameChange: (value: string) => void;
  courseHours: string;
  onCourseHoursChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  isValid: boolean;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  skipLabel?: string;
  className?: string;
}

export function OnboardingCourseFormScreen({
  courseName,
  onCourseNameChange,
  courseHours,
  onCourseHoursChange,
  onSubmit,
  onSkip,
  isValid,
  title = "Qual curso você começou e não terminou?",
  subtitle = "Depois você adiciona os outros.",
  submitLabel = "Começar",
  skipLabel = "Não lembro de nenhum",
  className,
}: OnboardingCourseFormScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-4 bg-surface-muted px-6 pb-8 pt-12", className)}>
      <Text as="h1" variant="tituloG">
        {title}
      </Text>
      <Text variant="corpo" className="text-text-secondary">
        {subtitle}
      </Text>

      <Input
        label="Nome do curso"
        hideLabel
        placeholder="Ex: Design Avançado"
        value={courseName}
        onChange={(e) => onCourseNameChange(e.target.value)}
      />
      <Input
        label="Carga horária"
        hideLabel
        placeholder="Ex: 20 horas"
        value={courseHours}
        onChange={(e) => onCourseHoursChange(e.target.value)}
      />

      <Button variant="amber" onClick={onSubmit} disabled={!isValid} className="w-full">
        {submitLabel}
      </Button>

      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center font-body text-auxiliar text-primary-onSurface"
      >
        {skipLabel}
      </button>
    </div>
  );
}
