/**
 * Radius tokens — Figma variable collection "Raio" (Foundations → Radius).
 */
export const radius = {
  none: "0px",
  button: "8px", // raio/botao
  card: "12px", // raio/cartao
  chip: "999px", // raio/chip — pill / fully rounded
} as const;

export type RadiusToken = keyof typeof radius;

/** Standard hairline border width used across the system (borda/padrao). */
export const borderWidth = {
  standard: "1px",
} as const;
