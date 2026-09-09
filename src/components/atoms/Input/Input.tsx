import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * Input — Figma: Components → Input (Campo de texto).
 *
 * States map onto native/CSS mechanisms rather than a `state` prop, so the
 * component behaves correctly for every input method (mouse, keyboard,
 * screen reader) instead of only whichever state a designer remembered to
 * set: `:focus-visible` ⇔ Estado=Foco, `:disabled` ⇔ Estado=Desabilitado,
 * `value` present ⇔ Estado=Preenchido. `error` is the one state that has no
 * native equivalent, so it stays an explicit prop wired to `aria-invalid`
 * and `aria-describedby`.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Hides the label visually but keeps it for assistive tech. */
  hideLabel?: boolean;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, hideLabel, error, helperText, id, required, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex w-full flex-col gap-2">
        <LabelPrimitive.Root
          htmlFor={inputId}
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

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
          className={cn(
            "min-h-touch w-full rounded-button border bg-surface px-4 font-body text-corpo text-text-primary",
            "border-border placeholder:text-text-secondary",
            "focus-visible:border-primary-onSurface",
            "disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-bg disabled:text-disabled-text",
            error && "border-warning-onSurface focus-visible:ring-warning-onSurface",
            className,
          )}
          {...props}
        />

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
Input.displayName = "Input";
