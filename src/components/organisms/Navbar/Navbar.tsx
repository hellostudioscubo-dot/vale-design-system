import { NavItem } from "@/components/atoms/NavItem";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/icons";
import type { ReactElement } from "react";

/**
 * Navbar — Figma: Components → Navbar (Barra de navegação).
 * An organism: composes NavItem (atom) into the app's primary bottom
 * navigation. Rendered as a landmark `<nav>` with an accessible label, so
 * screen-reader users can jump to it directly.
 */
export interface NavbarItem {
  key: string;
  icon: ReactElement<IconProps>;
  label: string;
}

export interface NavbarProps {
  items: NavbarItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

export function Navbar({ items, selectedKey, onSelect, className }: NavbarProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "flex w-full items-center gap-1 rounded-card border border-border bg-surface p-2 shadow-media",
        className,
      )}
    >
      {items.map((item) => (
        <NavItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          selected={item.key === selectedKey}
          onClick={() => onSelect(item.key)}
        />
      ))}
    </nav>
  );
}
