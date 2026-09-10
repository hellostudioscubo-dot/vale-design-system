import type { ComponentProps } from "react";
import { CompanionCard, type CompanionCardStat } from "@/components/molecules/CompanionCard";
import { CompanionBubble } from "@/components/molecules/CompanionBubble";
import { Card } from "@/components/molecules/Card";
import { Navbar, type NavbarItem } from "@/components/organisms/Navbar";
import { SettingsIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * HomeScreen — Figma: Fluxo do App - mobile → "Hoje primeiro acesso" and
 * "Hoje - acesso após ter feito algumas horas de estudos". One template:
 * the first-access frame is just this one with `stats` and `companionIntro`
 * omitted and a single card, not a different screen.
 */
export interface HomeScreenCard {
  key: string;
  track: ComponentProps<typeof Card>["track"];
  title: string;
  subtitle: string;
  onContinue: () => void;
}

export interface HomeScreenProps {
  greeting: string;
  onSettingsClick: () => void;
  companionImageSrc: string;
  companionImageAlt: string;
  stats?: CompanionCardStat[];
  cards: HomeScreenCard[];
  companionIntro?: { title: string; description: string };
  navbarItems: NavbarItem[];
  selectedNavKey: string;
  onNavSelect: (key: string) => void;
  className?: string;
}

export function HomeScreen({
  greeting,
  onSettingsClick,
  companionImageSrc,
  companionImageAlt,
  stats,
  cards,
  companionIntro,
  navbarItems,
  selectedNavKey,
  onNavSelect,
  className,
}: HomeScreenProps) {
  return (
    <div className={cn("relative flex h-full min-h-[844px] w-full flex-col gap-6 bg-surface-muted p-6", className)}>
      <div className="flex items-center justify-between">
        <p className="font-body text-auxiliar text-text-secondary">{greeting}</p>
        <button type="button" onClick={onSettingsClick} aria-label="Ajustes" className="text-text-primary">
          <SettingsIcon />
        </button>
      </div>

      <CompanionCard imageSrc={companionImageSrc} imageAlt={companionImageAlt} stats={stats} />

      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <Card
            key={card.key}
            variant="expanded"
            track={card.track}
            title={card.title}
            subtitle={card.subtitle}
            onContinue={card.onContinue}
          />
        ))}
      </div>

      <Navbar items={navbarItems} selectedKey={selectedNavKey} onSelect={onNavSelect} className="mt-auto" />

      {companionIntro && (
        <CompanionBubble
          tone="dark"
          title={companionIntro.title}
          description={companionIntro.description}
          className="absolute left-16 top-24"
        />
      )}
    </div>
  );
}
