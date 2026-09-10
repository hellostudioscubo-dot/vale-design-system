import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * Textarea — Figma: Fluxo do App - mobile → Novo plano/carreira →
 * "Por que agora — campo" (a multi-line field the single-line `Input`
 * doesn't cover). Mirrors `Input`'s API and state model exactly — see its
 * doc comment for why states map onto native/CSS mechanisms instead of a
 * `state` prop.
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  /** Hides the label visually but keeps it for assistive tech. */
  hideLabel?: boolean;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, hideLabel, error, helperText, id, required, rows = 3, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="flex w-full flex-col gap-2">
        <LabelPrimitive.Root
          htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={cn(helperText && helperId, error && errorId) || undefined}
          className={cn(
            "w-full resize-y rounded-button border bg-surface px-4 py-3 font-body text-corpo text-text-primary",
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
Textarea.displayName = "Textarea";
