/**
 * Spacing tokens — Figma variable collection "Espaço" (Foundations → Spacing).
 * Scale is a multiple-of-4 system, used for padding, gap and margins.
 */
export const spacing = {
  0: "0px",
  1: "4px", // espaco/4
  2: "8px", // espaco/8
  3: "12px", // espaco/12
  4: "16px", // espaco/16
  5: "20px", // espaco/20
  6: "24px", // espaco/24
  8: "32px", // espaco/32
  12: "48px", // espaco/48
} as const;

export type SpacingToken = keyof typeof spacing;

/** Minimum touch target size (accessibility rule documented in Figma). */
export const minTouchTarget = "44px";
