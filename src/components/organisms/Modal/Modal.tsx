import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/atoms/Button";
import { CheckIcon, CloseIcon } from "@/icons";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Modal — Figma: Components → Modal (Modal/Parabéns, Modal/Parabéns completo).
 * Built on Radix Dialog: focus trap, Escape-to-close, `aria-modal`, and
 * label/description wiring all come from the primitive instead of being
 * hand-rolled. `title`/`description` mirror the component's own `Título` /
 * `Descrição` text properties in Figma.
 */
export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: ReactNode;
  trigger?: ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  onAction,
  icon,
  trigger,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-surface-inverse/40" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 w-[min(90vw,320px)] -translate-x-1/2 -translate-y-1/2",
            "flex flex-col items-center gap-4 rounded-card bg-surface p-6 text-center shadow-forte",
          )}
        >
          <div
            aria-hidden
            className="flex h-14 w-14 items-center justify-center rounded-chip bg-success-subtle text-success-strong"
          >
            {icon ?? <CheckIcon width={28} height={28} />}
          </div>

          <DialogPrimitive.Title className="font-body text-corpo-m font-semibold text-text-primary">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="font-body text-auxiliar text-text-secondary">
            {description}
          </DialogPrimitive.Description>

          <Button variant="primary" onClick={onAction} className="w-full">
            {actionLabel}
          </Button>

          <DialogPrimitive.Close asChild>
            <button
              type="button"
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-button p-1 text-text-secondary hover:bg-surface-muted"
            >
              <CloseIcon width={18} height={18} />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
