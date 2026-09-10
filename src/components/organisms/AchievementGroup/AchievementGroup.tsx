import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * AchievementGroup — Figma: Fluxo do App - mobile → Certificados → the
 * "Agosto 2026" / "Julho 2026" month headers grouping `AchievementListItem`
 * rows. An organism, same shape as `SettingsSection`: a title plus a list
 * of molecule children.
 */
export interface AchievementGroupProps {
  month: string;
  children: ReactNode;
  className?: string;
}

export function AchievementGroup({ month, children, className }: AchievementGroupProps) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="font-body text-auxiliar font-medium text-text-secondary">{month}</h2>
      <ul className="divide-y divide-border">{children}</ul>
    </section>
  );
}
