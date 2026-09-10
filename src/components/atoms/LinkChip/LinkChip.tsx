import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, type IconProps } from "@/icons";

/**
 * LinkChip — Figma: Fluxo do App - mobile → Vale → "Links de navegação"
 * ("Progresso" / "Conquistas"). An interactive pill that navigates rather
 * than filters — unlike `ChipToggle`, it's not a two-state toggle, so it
 * renders as a plain button (or, via `asChild`-style usage, whatever the
 * consuming app's router needs) with its own chevron affordance instead of
 * `aria-pressed`.
 *
 * `bg-primary-subtle` is a static fill (same value in both themes — see
 * semanticDark's doc comment in src/tokens/colors.ts), so its text stays
 * the static `palette.roxoProfundo` too, not the theme-flipping
 * `primary-onSurface` (tuned for text sitting directly on the *page*
 * surface) — same reasoning as `InfoBox`'s doc comment.
 */
export interface LinkChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<IconProps>;
  children: React.ReactNode;
}

export const LinkChip = forwardRef<HTMLButtonElement, LinkChipProps>(
  ({ className, icon, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-touch items-center gap-1.5 rounded-chip bg-primary-subtle px-3 py-2",
        "font-body text-auxiliar text-palette-roxoProfundo transition-opacity hover:opacity-80",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      <ChevronRightIcon width={12} height={12} className="opacity-70" />
    </button>
  ),
);
LinkChip.displayName = "LinkChip";
