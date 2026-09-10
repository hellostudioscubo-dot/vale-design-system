import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

/**
 * SegmentedControl — Figma: Fluxo do App - mobile → Novo plano/carreira →
 * "Seletor de tipo" (Curso / Ação de carreira). Built on Radix Toggle Group
 * (`type="single"`, exclusive selection): gives real `role="radiogroup"` /
 * `role="radio"` semantics, roving-tabindex keyboard navigation and
 * `aria-checked` for free — the same reason `Toggle` is built on Radix
 * Switch rather than a hand-rolled div.
 *
 * Both fills are static (same value in both themes — see semanticDark's
 * doc comment in src/tokens/colors.ts): the track is `primary-subtle`, the
 * selected pill `primary`. Their text stays static too —
 * `palette.roxoProfundo` unselected, `text-inverse` selected (the one token
 * documented to only ever pair with `bg-primary`) — never the
 * theme-flipping `primary-onSurface`, which is tuned for text sitting
 * directly on the *page* surface, not inside a self-contained tinted pill.
 */
export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  /** Accessible name for the group — announced once, not per option. */
  label: string;
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  label,
  options,
  value,
  onValueChange,
  className,
}: SegmentedControlProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(next) => {
        // Radix emits "" when re-clicking the already-selected item — ignore
        // it so the group can never end up with nothing selected.
        if (next) onValueChange(next);
      }}
      className={cn(
        "flex h-11 w-full rounded-button bg-primary-subtle p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            "flex-1 rounded-button font-body text-corpo font-medium text-palette-roxoProfundo transition-colors",
            "data-[state=on]:bg-primary data-[state=on]:text-text-inverse",
          )}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
