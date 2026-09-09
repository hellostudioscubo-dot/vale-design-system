import { forwardRef, useId } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * Toggle — Figma: Components → Toggle. Built on Radix Switch so keyboard,
 * screen-reader and touch behaviour (role="switch", Space/Enter, drag-free
 * activation) come for free instead of being re-implemented on a <div>.
 */
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label: string;
  /** Hides the label visually but keeps it for assistive tech. */
  hideLabel?: boolean;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label, hideLabel, id, ...props }, ref) => {
    const generatedId = useId();
    const toggleId = id ?? generatedId;

    return (
      <div className="flex items-center gap-3">
        <SwitchPrimitive.Root
          ref={ref}
          id={toggleId}
          className={cn(
            "peer relative h-7 w-12 shrink-0 rounded-chip bg-border transition-colors",
            "data-[state=checked]:bg-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              "block h-5 w-5 translate-x-1 rounded-chip bg-surface shadow-leve transition-transform",
              "data-[state=checked]:translate-x-6",
            )}
          />
        </SwitchPrimitive.Root>
        <LabelPrimitive.Root
          htmlFor={toggleId}
          className={cn(
            "font-body text-auxiliar text-text-primary peer-disabled:text-disabled-text",
            hideLabel && "sr-only",
          )}
        >
          {label}
        </LabelPrimitive.Root>
      </div>
    );
  },
);
Toggle.displayName = "Toggle";
