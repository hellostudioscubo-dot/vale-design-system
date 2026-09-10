import { cn } from "@/lib/utils";

/**
 * SessionHistoryItem — Figma: Fluxo do App - mobile → Detalhe do item →
 * "Histórico" ("12 de agosto · 45 min" rows). One entry in the study
 * history list — a title (date · duration) and what the learner did in it.
 */
export interface SessionHistoryItemProps {
  title: string;
  description: string;
  className?: string;
}

export function SessionHistoryItem({ title, description, className }: SessionHistoryItemProps) {
  return (
    <li
      className={cn(
        "flex flex-col gap-1 rounded-card border border-border bg-surface px-4 py-3.5",
        className,
      )}
    >
      <p className="font-body text-corpo font-medium text-text-primary">{title}</p>
      <p className="font-body text-legenda text-text-secondary">{description}</p>
    </li>
  );
}
