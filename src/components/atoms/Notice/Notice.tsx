import { cn } from "@/lib/utils";

/**
 * Notice — Figma: Fluxo do App - mobile → Sessão em foco → "Aviso de
 * crescimento" (a small dot + line of text, e.g. "Enquanto você estuda, seu
 * dragão está crescendo."). Purely informational — not a `role="alert"`,
 * since nothing here demands the user's immediate attention.
 */
export interface NoticeProps {
  children: React.ReactNode;
  className?: string;
}

export function Notice({ children, className }: NoticeProps) {
  return (
    <p className={cn("flex items-center gap-2 font-body text-legenda text-text-secondary", className)}>
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-warning" />
      {children}
    </p>
  );
}
