import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/icons";

/**
 * AchievementListItem — Figma: Fluxo do App - mobile → Certificados →
 * "Conquista/..." rows (a certificate, publication or project earned:
 * icon + title + "date · kind"). Grouped by month by `AchievementGroup`.
 */
export interface AchievementListItemProps {
  icon: ReactElement<IconProps>;
  title: string;
  meta: string;
  className?: string;
}

export function AchievementListItem({ icon, title, meta, className }: AchievementListItemProps) {
  return (
    <li className={cn("flex items-center gap-4 py-3", className)}>
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-chip bg-primary-subtle text-palette-roxoProfundo"
      >
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-body text-corpo font-medium text-text-primary">{title}</span>
        <span className="font-body text-legenda text-text-secondary">{meta}</span>
      </span>
    </li>
  );
}
