import { Sparkline, type SparklinePoint } from "@/components/atoms/Sparkline";
import { cn } from "@/lib/utils";

/**
 * TrendStat — Figma: Fluxo do App - mobile → Progresso → "Bloco numérico"
 * (a big number, its caption, and the 3-month trend line under it — "23h
 * investidas até aqui", "3 de 33 itens concluídos", "maio de 2027 previsão
 * de término"). The chart is decorative (see `Sparkline`'s doc comment); the
 * number/caption pair is what actually states the value to every user.
 */
export interface TrendStatProps {
  value: string;
  caption: string;
  trend?: SparklinePoint[];
  className?: string;
}

export function TrendStat({ value, caption, trend, className }: TrendStatProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-card border border-border bg-surface p-5",
        className,
      )}
    >
      <span className="font-display text-numero text-text-primary">{value}</span>
      <span className="text-center font-body text-legenda text-text-secondary">{caption}</span>
      {trend && trend.length > 0 && <Sparkline points={trend} className="mt-4" />}
    </div>
  );
}
