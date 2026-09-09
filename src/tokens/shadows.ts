/**
 * Shadow tokens — Figma effect styles (Foundations → Shadows).
 * An elevation scale from resting card to modal/popover.
 */
export const shadows = {
  none: "none",
  leve: "0px 2px 6px 0px rgba(25, 22, 51, 0.08)", // resting card
  media: "0px 4px 12px 0px rgba(25, 22, 51, 0.12)", // raised card
  forte: "0px 8px 24px 0px rgba(25, 22, 51, 0.18)", // modal / popover
} as const;

export type ShadowToken = keyof typeof shadows;
