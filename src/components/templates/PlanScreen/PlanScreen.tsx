import type { ComponentProps } from "react";
import { Card } from "@/components/molecules/Card";
import { MonthStrip } from "@/components/molecules/MonthStrip";
import { Navbar, type NavbarItem } from "@/components/organisms/Navbar";
import { Text } from "@/foundations";
import { AddIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * PlanScreen — Figma: Fluxo do App - mobile → "Plano" and "Carreira". Both
 * frames are the exact same structure (header + description + a list of
 * `MonthStrip` sections of `Card`s + `Navbar`) with only the title,
 * description and content differing — one template covers both, the
 * consuming app decides which copy/data to pass for each nav destination.
 */
export interface PlanScreenItem
  extends Pick<ComponentProps<typeof Card>, "track" | "title" | "subtitle" | "variant" | "onContinue"> {
  key: string;
}

export interface PlanScreenSection {
  month: string;
  completed?: boolean;
  items: PlanScreenItem[];
}

export interface PlanScreenProps {
  title: string;
  description: string;
  onAdd: () => void;
  sections: PlanScreenSection[];
  navbarItems: NavbarItem[];
  selectedNavKey: string;
  onNavSelect: (key: string) => void;
  className?: string;
}

export function PlanScreen({
  title,
  description,
  onAdd,
  sections,
  navbarItems,
  selectedNavKey,
  onNavSelect,
  className,
}: PlanScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col gap-6 bg-surface-muted p-6", className)}>
      <div className="flex items-center justify-between">
        {/* Not forced to h1 (unlike most other templates' page title): each
            section below is a Card, whose title is a fixed h3 (see Card's
            own doc comment) — h1 straight to h3 skips h2 (axe
            heading-order). tituloG's own default element, h2, keeps the
            page's heading order valid without changing Card itself. */}
        <Text variant="tituloG">{title}</Text>
        <button type="button" onClick={onAdd} aria-label="Adicionar item" className="text-text-primary">
          <AddIcon />
        </button>
      </div>

      <Text variant="auxiliar" className="text-text-secondary">
        {description}
      </Text>

      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <MonthStrip key={section.month} month={section.month} itemCount={section.items.length} completed={section.completed}>
            {section.items.map((item) => (
              <Card
                key={item.key}
                track={item.track}
                title={item.title}
                subtitle={item.subtitle}
                variant={item.variant}
                onContinue={item.onContinue}
              />
            ))}
          </MonthStrip>
        ))}
      </div>

      <Navbar items={navbarItems} selectedKey={selectedNavKey} onSelect={onNavSelect} className="mt-auto" />
    </div>
  );
}
