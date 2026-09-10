import { cn } from "@/lib/utils";

/**
 * EmptyState — Figma: Fluxo do App - mobile → Certificados primeiro acesso →
 * "Estado vazio/Próximas conquistas" (an emoji + a line explaining what will
 * show up here later). Generic enough to reuse anywhere a list can be empty,
 * not only Certificados.
 */
export interface EmptyStateProps {
  /** A single emoji, e.g. "✨" — decorative, so it's hidden from assistive tech. */
  icon: string;
  message: string;
  className?: string;
}

export function EmptyState({ icon, message, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-card bg-surface-muted px-6 py-8 text-center",
        className,
      )}
    >
      <span aria-hidden className="text-[28px] leading-none">
        {icon}
      </span>
      <p className="font-body text-auxiliar text-text-secondary">{message}</p>
    </div>
  );
}
