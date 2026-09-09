import { useId } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * ProgressBar — Figma: Components → Progress Bar (Barra de progresso).
 * Built on Radix Progress: exposes role="progressbar" with
 * aria-valuenow/min/max automatically, so screen readers announce it as a
 * real progress indicator rather than a decorative bar.
 */
export interface ProgressBarProps {
  /** Current value, 0–max. */
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, className }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const labelId = useId();

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <span id={labelId} className="font-body text-legenda text-text-secondary">
          {label}
        </span>
      )}
      <ProgressPrimitive.Root
        value={value}
        max={max}
        // Radix's own aria-valuenow/min/max don't include a name — the
        // visible label above is only a sibling <span> until this points
        // at it. Caught by axe's aria-progressbar-name check, not just
        // eyeballed: a progressbar with no label prop still has no name,
        // same as before (no prop wired up here to invent one from thin air).
        aria-labelledby={label ? labelId : undefined}
        className={cn(
          "h-1.5 w-full overflow-hidden rounded-chip bg-border",
          className,
        )}
      >
        <ProgressPrimitive.Indicator
          className="h-full rounded-chip bg-primary transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
