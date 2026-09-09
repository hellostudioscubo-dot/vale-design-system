import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/icons";

/**
 * NavItem — Figma: Components → Nav Item (Item de navegação).
 * The atomic building block of Navbar. `selected` sets `aria-current="page"`
 * instead of only a visual style, so assistive tech knows which tab is active.
 */
export interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<IconProps>;
  label: string;
  selected?: boolean;
}

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ className, icon, label, selected, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-current={selected ? "page" : undefined}
      className={cn(
        "flex min-h-touch min-w-touch flex-1 flex-col items-center justify-center gap-1 rounded-button py-2",
        "text-text-secondary transition-colors hover:text-primary",
        selected && "text-primary",
        className,
      )}
      {...props}
    >
      {icon}
      <span className={cn("font-body text-legenda", selected && "font-semibold")}>
        {label}
      </span>
    </button>
  ),
);
NavItem.displayName = "NavItem";
