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
  /**
   * `timer` swaps the center text to the bigger "texto/timer" style (56px) —
   * used by "Sessão em foco"'s full-screen 240px ring. Default `numero`
   * (36px) matches every other, smaller use of this component.
   */
  valueVariant?: "numero" | "timer";
  /**
   * `onDark` — "Sessão em foco" is a full-bleed dark takeover
   * (bg-primary-pressed), not the normal page surface, so the default
   * `stroke-border`/`stroke-primary`/`text-text-primary` tokens (tuned for a
   * light or dark *page*) don't apply here — this swaps in fixed
   * light-on-dark colors instead, same reasoning as Button's `outline`
   * variant doc comment.
   */
  tone?: "default" | "onDark";
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 160,
  strokeWidth = 10,
  valueLabel,
  caption,
  valueVariant = "numero",
  tone = "default",
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, Math.max(0, value / max));
  const dashOffset = circumference * (1 - percent);
  const onDark = tone === "onDark";

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
          className={cn("fill-none", onDark ? "stroke-palette-lilasClaro/20" : "stroke-border")}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn(
            "fill-none transition-[stroke-dashoffset] duration-500 ease-out",
            onDark ? "stroke-palette-areiaClara" : "stroke-primary",
          )}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={cn(
            "font-display",
            valueVariant === "timer" ? "text-timer tracking-tight" : "text-numero",
            onDark ? "text-palette-areiaClara" : "text-text-primary",
          )}
        >
          {valueLabel}
        </span>
        {caption && (
          <span
            className={cn(
              "font-body text-legenda",
              onDark ? "text-palette-areiaClara/70" : "text-text-secondary",
            )}
          >
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
