import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";
import { CheckIcon } from "@/icons";
import type { ComponentProps } from "react";

/**
 * Card — Figma: Components → Card (Cartão de item).
 * A molecule: composes Chip + Button (atoms) into the item card used across
 * Plano and Carreira. Three variants mirror the Figma component set exactly:
 * Compacto (list row), Expandido (with primary action), Concluído (done state).
 */
const cardVariants = cva(
  "flex w-full flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-leve",
  {
    variants: {
      variant: {
        compact: "",
        expanded: "gap-4 p-5 shadow-media",
        completed: "border-success/40 bg-success-subtle",
      },
    },
    defaultVariants: { variant: "compact" },
  },
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  track: { label: string; tone?: ComponentProps<typeof Chip>["tone"] };
  title: string;
  /** Progress caption ("Módulo 2 de 6 · 15 min restantes") or completion date. */
  subtitle: string;
  /** Only rendered for `variant="expanded"`. */
  onContinue?: () => void;
  className?: string;
}

export function Card({ track, title, subtitle, variant, onContinue, className }: CardProps) {
  const isCompleted = variant === "completed";

  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="flex items-center justify-between gap-2">
        <Chip tone={track.tone}>{track.label}</Chip>
        {isCompleted && (
          <span className="flex items-center gap-1 text-success-strong">
            <CheckIcon width={16} height={16} aria-hidden />
            <span className="sr-only">Concluído</span>
          </span>
        )}
      </div>

      <h3 className="font-body text-corpo-m font-semibold text-text-primary">{title}</h3>
      <p className="font-body text-legenda text-text-secondary">{subtitle}</p>

      {variant === "expanded" && onContinue && (
        <Button variant="primary" onClick={onContinue} className="w-full">
          Continuar
        </Button>
      )}
    </div>
  );
}
