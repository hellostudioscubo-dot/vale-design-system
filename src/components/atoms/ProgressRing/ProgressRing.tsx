import { cn } from "@/lib/utils";

/**
 * ProgressRing — Figma: Components → Progress Ring (Anel de progresso).
 * Used on session cards to show remaining time. No Radix primitive covers
 * a circular indicator, so the ARIA contract (role="progressbar" +
 * aria-valuenow/min/max) is applied by hand here instead.
 */
export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  /** Big text in the center, e.g. a countdown ("24:31"). */
  valueLabel: string;
  /** Small caption under the value, e.g. "Sessão 1". */
  caption?: string;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 160,
  strokeWidth = 10,
  valueLabel,
  caption,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, Math.max(0, value / max));
  const dashOffset = circumference * (1 - percent);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={caption ?? "Progresso"}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="fill-none stroke-primary transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-numero text-text-primary">{valueLabel}</span>
        {caption && (
          <span className="font-body text-legenda text-text-secondary">{caption}</span>
        )}
      </div>
    </div>
  );
}
