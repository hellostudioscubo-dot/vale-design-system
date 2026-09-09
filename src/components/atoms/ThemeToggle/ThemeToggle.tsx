import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { SunIcon, MoonIcon } from "@/icons";

/**
 * ThemeToggle — infrastructure, not a Figma component (the file only
 * defines a light theme; see semanticDark in src/tokens/colors.ts). Built
 * on the same Radix Switch primitive as `Toggle` for the same reason:
 * role="switch", keyboard and screen-reader behaviour for free.
 */
export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className={cn(
        // Static bg across themes (bg-border / bg-primary, same pattern as
        // `Toggle`) rather than a theme-flipping token — this switch's own
        // "on" state must look the same regardless of which theme is
        // currently active, or the affordance contradicts itself.
        "relative flex h-8 w-14 shrink-0 items-center rounded-chip bg-border px-1 transition-colors",
        "data-[state=checked]:bg-primary",
        className,
      )}
    >
      <SunIcon
        width={14}
        height={14}
        className={cn(
          "absolute left-1.5 text-warning-strong transition-opacity",
          isDark && "opacity-0",
        )}
      />
      <MoonIcon
        width={14}
        height={14}
        className={cn(
          "absolute right-1.5 text-text-inverse transition-opacity",
          !isDark && "opacity-0",
        )}
      />
      <SwitchPrimitive.Thumb
        className={cn(
          "z-10 block h-6 w-6 translate-x-0 rounded-chip bg-surface shadow-leve transition-transform",
          "data-[state=checked]:translate-x-6",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
