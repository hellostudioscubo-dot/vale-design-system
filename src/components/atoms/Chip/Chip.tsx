import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Chip — Figma: Components → Chip (Chip de trilha).
 * Identifies a content track (Imersão, IA Creative, LinkedIn, Portfólio,
 * Currículo, Rede…). `tone` is deliberately open-ended (not one variant per
 * track) so new tracks never require a design-system release.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-chip px-3 py-1 font-body text-legenda font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-text-secondary",
        primary: "bg-primary-subtle text-primary",
        success: "bg-success-subtle text-success-strong",
        warning: "bg-warning/15 text-warning-strong",
        achievement: "bg-achievement/15 text-warning-strong",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

type ChipOwnProps = VariantProps<typeof chipVariants> & { children: React.ReactNode };

/** Static, non-interactive chip — a label, not a control. */
export function Chip({
  className,
  tone,
  ...props
}: ChipOwnProps & HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(chipVariants({ tone }), className)} {...props} />;
}

export interface ChipToggleProps
  extends ChipOwnProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  pressed: boolean;
}

/** Interactive variant — a two-state toggle (e.g. filter by track). */
export const ChipToggle = forwardRef<HTMLButtonElement, ChipToggleProps>(
  ({ className, tone, pressed, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={pressed}
      className={cn(
        chipVariants({ tone }),
        "min-h-touch transition-opacity hover:opacity-80",
        !pressed && "opacity-60",
        className,
      )}
      {...props}
    />
  ),
);
ChipToggle.displayName = "ChipToggle";
