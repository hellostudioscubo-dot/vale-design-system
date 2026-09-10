import type { ReactElement } from "react";
import { AchievementGroup } from "@/components/organisms/AchievementGroup";
import { AchievementListItem } from "@/components/molecules/AchievementListItem";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Text } from "@/foundations";
import { BackIcon, ArchiveIcon, type IconProps } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * CertificatesScreen — Figma: Fluxo do App - mobile → "Certificados -
 * acesso após ter feito algumas horas de estudos" and "Certificados
 * primeiro acesso". One template: an empty `groups` array renders Figma's
 * own "Estado vazio/Próximas conquistas" via `EmptyState` instead of this
 * being a second screen.
 */
export interface CertificatesScreenItem {
  icon: ReactElement<IconProps>;
  title: string;
  meta: string;
}

export interface CertificatesScreenGroup {
  month: string;
  items: CertificatesScreenItem[];
}

export interface CertificatesScreenProps {
  onBack: () => void;
  onArchive: () => void;
  groups: CertificatesScreenGroup[];
  summary?: string;
  title?: string;
  subtitle?: string;
  emptyIcon?: string;
  emptyMessage?: string;
  className?: string;
}

export function CertificatesScreen({
  onBack,
  onArchive,
  groups,
  summary,
  title = "Conquistas",
  subtitle,
  emptyIcon = "✨",
  emptyMessage = "Depois que você concluir suas metas de conquistas elas vão aparecer aqui!",
  className,
}: CertificatesScreenProps) {
  const isEmpty = groups.every((group) => group.items.length === 0);

  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-4 bg-surface-muted p-6", className)}>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} aria-label="Voltar" className="text-text-primary">
          <BackIcon />
        </button>
        <button type="button" onClick={onArchive} aria-label="Arquivar" className="text-text-primary">
          <ArchiveIcon />
        </button>
      </div>

      <Text as="h1" variant="tituloG">
        {title}
      </Text>
      {subtitle && (
        <Text variant="auxiliar" className="text-text-secondary">
          {subtitle}
        </Text>
      )}
      {summary && (
        <Text variant="corpoM" className="text-text-secondary">
          {summary}
        </Text>
      )}

      {isEmpty ? (
        <EmptyState icon={emptyIcon} message={emptyMessage} />
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(
            (group) =>
              group.items.length > 0 && (
                <AchievementGroup key={group.month} month={group.month}>
                  {group.items.map((item, index) => (
                    <AchievementListItem key={index} icon={item.icon} title={item.title} meta={item.meta} />
                  ))}
                </AchievementGroup>
              ),
          )}
        </div>
      )}
    </div>
  );
}
