import { cn } from "@/lib/utils";

/**
 * CompanionBubble — Figma: Fluxo do App - mobile → Hoje/Vale →
 * "Notificação/Explicação do dragão" and "Notificação/Compartilhar no
 * LinkedIn". A floating speech-bubble callout, positioned by the consumer
 * (it only owns its own box — no portal, no auto-placement, same
 * responsibility split as `Modal` owning its dialog but not its trigger's
 * position). The sharp top-left corner (no `rounded-tl`) is what reads as
 * "pointing at" whatever it's anchored near.
 *
 * `tone` mirrors the two contexts seen in Figma: `dark` introduces the
 * companion on a light page (Hoje), `light` congratulates on a dark/photo
 * backdrop (Vale) — both are static colors (not the theme-flipping semantic
 * tokens), since a floating callout's own internal contrast doesn't change
 * when the *page* around it goes dark, same reasoning as Card's `completed`
 * variant.
 */
export interface CompanionBubbleProps {
  title: string;
  description: string;
  tone?: "dark" | "light";
  className?: string;
}

export function CompanionBubble({ title, description, tone = "dark", className }: CompanionBubbleProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex max-w-[342px] flex-col gap-1 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl p-4 shadow-forte",
        tone === "dark"
          ? "bg-palette-roxoProfundo text-palette-areiaClara"
          : "bg-palette-areiaClara text-palette-roxoProfundo",
        className,
      )}
    >
      <p className="font-body text-corpo font-medium">{title}</p>
      <p className={cn("font-body text-auxiliar", tone === "dark" ? "opacity-85" : "opacity-80")}>
        {description}
      </p>
    </div>
  );
}
