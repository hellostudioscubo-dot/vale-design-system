import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { StepDots } from "@/components/atoms/StepDots";
import { Text } from "@/foundations";
import { cn } from "@/lib/utils";

/**
 * OnboardingIntroScreen — Figma: Fluxo do App - mobile → "Onboarding 1 de 4"
 * and "Onboarding 2 de 4". Both frames share this exact layout (progress +
 * Pular, an illustration, a title/subtitle pair, a spacer, the CTA) and
 * differ only in illustration/copy — one template, `illustration` supplied
 * as a slot rather than baked in, covers both.
 */
export interface OnboardingIntroScreenProps {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
  illustration: ReactNode;
  onSkip: () => void;
  onContinue: () => void;
  skipLabel?: string;
  continueLabel?: string;
  className?: string;
}

export function OnboardingIntroScreen({
  step,
  totalSteps = 4,
  title,
  subtitle,
  illustration,
  onSkip,
  onContinue,
  skipLabel = "Pular",
  continueLabel = "Continuar",
  className,
}: OnboardingIntroScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col bg-surface-muted", className)}>
      <div className="flex items-center justify-between px-6 pt-6">
        <StepDots step={step} totalSteps={totalSteps} />
        <button
          type="button"
          onClick={onSkip}
          className="font-body text-auxiliar text-primary-onSurface"
        >
          {skipLabel}
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">{illustration}</div>

      <div className="flex flex-col gap-4 px-6 py-8">
        <Text as="h1" variant="tituloG">
          {title}
        </Text>
        <Text variant="corpo" className="text-text-secondary">
          {subtitle}
        </Text>
        <Button variant="amber" onClick={onContinue} className="mt-6 w-full">
          {continueLabel}
        </Button>
      </div>
    </div>
  );
}
