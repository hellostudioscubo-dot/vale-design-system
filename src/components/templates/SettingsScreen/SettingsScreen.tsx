import type { ReactNode } from "react";
import { Text } from "@/foundations";
import { BackIcon, ArchiveIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * SettingsScreen — Figma: Fluxo do App - mobile → "Ajustes". Unlike the
 * other templates, its sections (PERSONAGEM, SESSÃO, NOTIFICAÇÕES,
 * ACESSIBILIDADE, CONTA) aren't fixed data the design system should own —
 * every app's settings differ — so this template only owns the page shell
 * (header + title) and takes the sections as `children`
 * (`SettingsSection` organisms), the same composition-over-config choice
 * `Navbar` makes for its items.
 */
export interface SettingsScreenProps {
  onBack: () => void;
  onArchive: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

export function SettingsScreen({ onBack, onArchive, children, title = "Ajustes", className }: SettingsScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-6 bg-surface-muted p-6", className)}>
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

      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
