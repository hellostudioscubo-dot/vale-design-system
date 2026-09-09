/**
 * Color tokens — ported 1:1 from the Figma variable collection "Cor"
 * (Foundations → Colors: https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ)
 *
 * Two layers, matching the file's own convention:
 *  - `palette`: raw primitives, named exactly as in Figma (grupo/nome).
 *  - `semantic`: role-based tokens that map onto the palette. Components
 *    should consume `semantic`, never `palette`, so the palette can evolve
 *    without every component needing a rewrite.
 */

export const palette = {
  // Base
  areia: "#F7F3ED",
  roxoNoite: "#241C33",
  brancoCartao: "#FFFFFF",
  // Texto
  grafite: "#2E2A26",
  areiaClara: "#F2EDE4",
  cinzaMedio: "#6B6560",
  // Marca
  roxo: "#5F4B8B",
  roxoProfundo: "#3D2E5C",
  lilas: "#B9A6DC",
  lilasClaro: "#EDE7F6",
  // Ação e estado
  ambar: "#E8A33D",
  melQueimado: "#8A6114",
  dourado: "#C9A961",
  salvia: "#7E9A7A",
  salviaClara: "#B2C2AF",
  salviaFundo: "#EFF5EE",
  /**
   * Not a Figma variable — a text-safe dark green, added for the same reason
   * `melQueimado` already exists next to `ambar`: the mid-tone isn't dark
   * enough for small text on a light tint (fails WCAG AA at 12px/14px).
   */
  salviaEscura: "#3D5A38",
} as const;

export type PaletteToken = keyof typeof palette;

export const semantic = {
  // Surfaces
  surface: palette.brancoCartao,
  surfaceMuted: palette.areia,
  surfaceInverse: palette.roxoNoite,

  // Borders
  border: palette.areiaClara,
  borderStrong: palette.cinzaMedio,

  // Text
  textPrimary: palette.grafite,
  textSecondary: palette.cinzaMedio,
  textInverse: palette.brancoCartao,
  textOnMuted: palette.grafite,

  // Brand / interactive
  primary: palette.roxo,
  primaryHover: palette.roxoProfundo,
  primaryPressed: palette.roxoProfundo,
  primarySubtle: palette.lilasClaro,
  accent: palette.lilas,

  // Feedback / state
  success: palette.salvia,
  successSubtle: palette.salviaFundo,
  /** Use for text/icons on a light background — `success` alone is AA-safe
   *  only for large text (≥18px) and graphical objects, not small labels. */
  successStrong: palette.salviaEscura,
  warning: palette.ambar,
  warningStrong: palette.melQueimado,
  /** Decorative only (2:1 on light surfaces) — use `warningStrong` for
   *  achievement-related text/icons, never this one directly. */
  achievement: palette.dourado,

  // Disabled
  disabledBg: palette.areiaClara,
  disabledText: palette.cinzaMedio,
} as const;

export type SemanticToken = keyof typeof semantic;
