import { cn } from "@/lib/utils";

/**
 * StepDots — Figma: Fluxo do App - mobile → Onboarding → the small progress
 * indicator next to "Pular" ("passo 1 de 4"...). Exposed as
 * `role="progressbar"` (a determinate, discrete progress indicator is
 * exactly what this is), same reasoning as `ProgressRing`'s hand-applied
 * ARIA contract — no Radix primitive covers a segmented-dots shape either.
 */
export interface StepDotsProps {
  step: number;
  totalSteps: number;
  className?: string;
}

export function StepDots({ step, totalSteps, className }: StepDotsProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Passo ${step} de ${totalSteps}`}
      className={cn("flex gap-1", className)}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            index < step ? "bg-primary" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}
