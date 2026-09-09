import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "@/icons";
import type { ReactNode } from "react";

/**
 * MonthStrip — Figma: Components → Month Strip (Faixa de mês).
 * Groups timeline items by month. Built on Radix Collapsible: the trigger
 * gets `aria-expanded`/`aria-controls` for free, and the whole month's
 * children can be marked done via `completed` (chevron → check).
 */
export interface MonthStripProps {
  month: string;
  itemCount: number;
  completed?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function MonthStrip({
  month,
  itemCount,
  completed,
  defaultOpen = true,
  children,
  className,
}: MonthStripProps) {
  return (
    <CollapsiblePrimitive.Root defaultOpen={defaultOpen} className={cn("w-full", className)}>
      <CollapsiblePrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-touch w-full items-center justify-between rounded-button px-3",
            "font-body text-auxiliar font-semibold text-text-primary hover:bg-surface-muted",
            "group",
          )}
        >
          <span>
            {month} <span className="font-normal text-text-secondary">· {itemCount} itens</span>
          </span>
          {completed ? (
            <CheckIcon width={18} height={18} className="text-success-strong" aria-hidden />
          ) : (
            <ChevronDownIcon
              width={18}
              height={18}
              className="transition-transform group-data-[state=open]:rotate-180"
              aria-hidden
            />
          )}
        </button>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="flex flex-col gap-3 pt-3">
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
