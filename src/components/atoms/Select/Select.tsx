import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/icons";

/**
 * Select — Figma: Fluxo do App - mobile → Novo plano/carreira → "Mês"
 * (a label + value + chevron field that opens a picker). Built on the
 * native `<select>` rather than a Radix primitive: for this single-value,
 * flat-list case the native element already gives correct keyboard,
 * screen-reader and mobile behaviour for free — no primitive needed, same
 * reasoning as `Input`'s `:disabled`/`:focus-visible` (see its doc comment).
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  /** Hides the label visually but keeps it for assistive tech. */
  hideLabel?: boolean;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, hideLabel, options, error, helperText, id, required, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex w-full flex-col gap-2">
        <LabelPrimitive.Root
          htmlFor={selectId}
          className={cn(
            "font-body text-auxiliar font-medium text-text-primary",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required && (
            <span aria-hidden className="text-warning-onSurface">
              {" "}
              *
            </span>
          )}
        </LabelPrimitive.Root>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error || undefined}
            aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
            className={cn(
              "min-h-touch w-full appearance-none rounded-button border bg-surface px-4 pr-10 font-body text-corpo text-text-primary",
              "border-border",
              "focus-visible:border-primary-onSurface",
              "disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-bg disabled:text-disabled-text",
              error && "border-warning-onSurface focus-visible:ring-warning-onSurface",
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            width={16}
            height={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>

        {helperText && !error && (
          <p id={helperId} className="font-body text-legenda text-text-secondary">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="font-body text-legenda text-warning-onSurface">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
