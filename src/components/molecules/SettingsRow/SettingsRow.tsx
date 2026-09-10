import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/icons";

/**
 * SettingsRow — Figma: Fluxo do App - mobile → Ajustes → every row inside a
 * "Seção/..." group (Nome do dragão, Som ambiente, Reduzir movimento,
 * Entrar ou criar conta...). Three shapes seen in Figma, chosen by which
 * props are passed rather than a `variant` enum, since the difference is
 * really "what goes in the trailing slot":
 *  - `value` (+ implicit chevron) — opens a picker (Cor, Tema...).
 *  - `control` — an already-interactive element the row hosts, most often
 *    `<Toggle hideLabel .../>` (Som ambiente, Lembrete diário...). The row
 *    itself is a plain `<li>` here: the control owns its own accessible
 *    name/state, a wrapping `onClick` would just add a confusing second way
 *    to activate it.
 *  - `onClick` with neither of the above — a plain navigation/action row
 *    (Entrar ou criar conta, Exportar meus dados), rendered as a real
 *    `<button>` so it's reachable and activatable like any control.
 */
export interface SettingsRowProps {
  label: string;
  description?: string;
  value?: string;
  control?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SettingsRow({ label, description, value, control, onClick, className }: SettingsRowProps) {
  const content = (
    <>
      <span className="flex flex-col gap-0.5 text-left">
        <span className="font-body text-corpo font-medium text-text-primary">{label}</span>
        {description && (
          <span className="font-body text-legenda text-text-secondary">{description}</span>
        )}
      </span>
      {control ?? (
        <span className="flex items-center gap-1.5 text-text-secondary">
          {value && <span className="font-body text-auxiliar">{value}</span>}
          {(value || onClick) && <ChevronRightIcon width={14} height={14} />}
        </span>
      )}
    </>
  );

  const rowClassName = cn(
    "flex min-h-touch w-full items-center justify-between gap-4 px-4 py-3.5",
    className,
  );

  if (control) {
    return <li className={rowClassName}>{content}</li>;
  }

  if (onClick) {
    return (
      <li>
        <button
          type="button"
          onClick={onClick}
          // The label and value sit in separate <span>s with no whitespace
          // text node between them, so the accessible-name algorithm would
          // otherwise concatenate them with no space ("CorLilás") — an
          // explicit aria-label states the real, spaced name directly.
          aria-label={value ? `${label} ${value}` : undefined}
          className={cn(rowClassName, "hover:bg-surface-muted")}
        >
          {content}
        </button>
      </li>
    );
  }

  return <li className={rowClassName}>{content}</li>;
}
