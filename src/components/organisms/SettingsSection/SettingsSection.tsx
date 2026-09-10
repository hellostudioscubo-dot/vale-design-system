import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SettingsSection — Figma: Fluxo do App - mobile → Ajustes → "Seção/..."
 * groups (PERSONAGEM, SESSÃO, NOTIFICAÇÕES, ACESSIBILIDADE, CONTA). An
 * organism: the uppercase section title plus a card of `SettingsRow`
 * children, mirroring how `Navbar` composes `NavItem`.
 */
export interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({ title, children, className }: SettingsSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <h2 className="font-body text-legenda font-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </h2>
      <ul className="divide-y divide-border rounded-card border border-border bg-surface">
        {children}
      </ul>
    </section>
  );
}
