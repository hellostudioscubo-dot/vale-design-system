import { NumberBlock } from "@/components/atoms/NumberBlock";
import { LinkChip } from "@/components/atoms/LinkChip";
import { CompanionBubble } from "@/components/molecules/CompanionBubble";
import { Navbar, type NavbarItem } from "@/components/organisms/Navbar";
import { SettingsIcon, PlanIcon, CertificateIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * VaultScreen — Figma: Fluxo do App - mobile → "Vale primeiro acesso" and
 * "Vale (tela) - acesso após ter feito algumas horas de estudos". One
 * template: the first-access frame is this one with a single `stats` entry
 * and no `achievementNotice`.
 */
export interface VaultScreenStat {
  value: string | number;
  label: string;
}

export interface VaultScreenProps {
  sceneImageSrc: string;
  sceneImageAlt: string;
  greeting: string;
  onSettingsClick: () => void;
  stats: VaultScreenStat[];
  onProgressClick: () => void;
  onCertificatesClick: () => void;
  achievementNotice?: { title: string; description: string };
  navbarItems: NavbarItem[];
  selectedNavKey: string;
  onNavSelect: (key: string) => void;
  className?: string;
}

export function VaultScreen({
  sceneImageSrc,
  sceneImageAlt,
  greeting,
  onSettingsClick,
  stats,
  onProgressClick,
  onCertificatesClick,
  achievementNotice,
  navbarItems,
  selectedNavKey,
  onNavSelect,
  className,
}: VaultScreenProps) {
  return (
    <div className={cn("relative flex h-full min-h-[844px] w-full flex-col bg-surface-muted", className)}>
      <div className="relative flex-1 overflow-hidden">
        <img src={sceneImageSrc} alt={sceneImageAlt} className="absolute inset-0 h-full w-full object-cover" />

        <div className="relative flex items-center justify-between px-6 pt-6">
          <p className="font-body text-auxiliar text-palette-areiaClara">{greeting}</p>
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Ajustes"
            className="text-palette-areiaClara"
          >
            <SettingsIcon />
          </button>
        </div>

        {achievementNotice && (
          <CompanionBubble
            tone="light"
            title={achievementNotice.title}
            description={achievementNotice.description}
            className="absolute left-6 top-20"
          />
        )}

        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
          <div className="flex items-start gap-6 rounded-card bg-surface p-5">
            {stats.map((stat) => (
              <NumberBlock key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
          <div className="flex gap-3">
            <LinkChip icon={<PlanIcon width={18} height={18} />} onClick={onProgressClick}>
              Progresso
            </LinkChip>
            <LinkChip icon={<CertificateIcon width={18} height={18} />} onClick={onCertificatesClick}>
              Conquistas
            </LinkChip>
          </div>
        </div>
      </div>

      <Navbar items={navbarItems} selectedKey={selectedNavKey} onSelect={onNavSelect} className="m-6 mt-0" />
    </div>
  );
}
