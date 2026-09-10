import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Sparkline — Figma: Fluxo do App - mobile → Progresso → "Gráfico/..." (the
 * small 3-point trend line under each stat, one per month). Decorative by
 * default (`aria-hidden`): the numbers it illustrates are already stated as
 * visible text by `TrendStat`, so screen readers get that text instead of a
 * chart shape they can't perceive — see `points`' own doc comment for the
 * one case where that's not enough.
 */
export interface SparklinePoint {
  /** X-axis tick label, e.g. a month abbreviation ("jun"). */
  label: string;
  value: number;
}

export interface SparklineProps {
  points: SparklinePoint[];
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ points, width = 294, height = 80, className }: SparklineProps) {
  const gradientId = useId();
  const chartHeight = height - 24; // leaves room for the month labels below
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coords = points.map((point, index) => ({
    x: points.length > 1 ? (index / (points.length - 1)) * width : width / 2,
    y: chartHeight - ((point.value - min) / range) * chartHeight,
  }));

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const areaPath = `${linePath} L${coords[coords.length - 1].x},${chartHeight} L${coords[0].x},${chartHeight} Z`;

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${chartHeight}`}
        width="100%"
        height={chartHeight}
        aria-hidden
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0.18} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} className="text-primary" />
        <path
          d={linePath}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c, i) => (
          <circle key={points[i].label} cx={c.x} cy={c.y} r={3} className="fill-primary" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between font-body text-legenda text-text-secondary">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
