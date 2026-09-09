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

  /**
   * `primaryOnSurface` / `successOnSurface` / `warningOnSurface` — the
   * theme-aware siblings of `primary` / `successStrong` / `warningStrong`,
   * for the *other* role those play: colored text/icons sitting directly
   * on a page or card surface (a selected NavItem, an outline/text Button,
   * an error message) rather than inside a self-contained tinted pill
   * (Chip, the completed Card, achievement badges). A pill's own tint
   * never changes with theme (see semanticDark's doc comment), so its
   * paired text shouldn't either — but text straight on `surface`/
   * `surface-muted` sits on a background that *does* go dark, and
   * `melQueimado`/`salviaEscura`/`roxo` were only ever tuned for a light
   * one (2.6:1 / 1.9:1 / 2.0:1 against the dark surfaces — all fail AA).
   * In light mode these equal their non-"OnSurface" counterpart exactly;
   * see semanticDark for the dark-mode values.
   */
  primaryOnSurface: palette.roxo,
  successOnSurface: palette.salviaEscura,
  warningOnSurface: palette.melQueimado,

  // Disabled
  disabledBg: palette.areiaClara,
  disabledText: palette.cinzaMedio,
} as const;

export type SemanticToken = keyof typeof semantic;

/**
 * Dark theme — NOT from Figma. The source file only defines a light theme
 * (see the module doc comment), so these values are our own addition,
 * added 2026-09-09 when dark mode was wired up. Scope was kept deliberately
 * narrow — only two kinds of token get redefined for dark:
 *  1. Neutrals whose role is "page/card background, border or body text",
 *     where a value tuned for a light backdrop stops working once the
 *     backdrop itself goes dark.
 *  2. The `*OnSurface` family — brand/state hues used as text/icons
 *     directly on those same neutrals (see their doc comment above).
 * Every other semantic token (brand fills like `primary`, `accent`, and
 * the `*Subtle`/`*Strong` family used as chip/card tints) is used as an
 * opaque surface with its own already-verified internal text contrast —
 * that pairing doesn't change when the *page* around it goes dark, so
 * those tokens intentionally keep one value across both themes.
 *
 * `surfaceMuted`'s dark value reuses `palette.roxoNoite` verbatim — the
 * Figma file's own dark plum. Everything else here (`surface`, `border`,
 * `borderStrong`, `textSecondary`, `disabledBg`) is a new hex chosen to
 * land at roughly the same *relative* distance from its neighbor as the
 * equivalent light-mode pair (e.g. dark `surface` vs `surfaceMuted` sit
 * ~1.13:1 apart, matching light `surface` vs `surfaceMuted` at ~1.11:1) so
 * the two themes read as the same design, not a re-skin. All text/border
 * pairs below were checked against WCAG: textPrimary/textOnMuted ≈14.7:1,
 * textSecondary ≈8.4:1 (AA requires 4.5:1), borderStrong ≈4.1:1 (AA
 * non-text needs 3:1).
 *
 * `surfaceInverse` and `textInverse` are deliberately NOT listed here,
 * even though their names suggest they should flip. Checked against how
 * they're actually consumed: `textInverse` only ever pairs with the
 * *static* `bg-primary` fill (Button's primary variant, ThemeToggle's
 * moon icon) — flipping it to a dark color put dark text on that same
 * dark-ish purple in dark mode and failed AA (1.94:1, caught by the a11y
 * addon). `surfaceInverse` is only used as Modal's backdrop scrim
 * (`bg-surface-inverse/40`), which needs to stay a *dimming* dark tint in
 * both themes, not flip to a light haze. Both keep one value everywhere,
 * same as the brand-fill family.
 */
export const semanticDark = {
  surface: "#2F2540",
  surfaceMuted: palette.roxoNoite,

  border: "#453868",
  borderStrong: "#8B84A0",

  textPrimary: palette.areia,
  textSecondary: "#C9C2D9",
  textOnMuted: palette.areia,

  disabledBg: "#3A314C",
  disabledText: "#8B84A0",

  // `*OnSurface` — lighter tints of the same hue, all reused verbatim from
  // the existing Figma palette rather than invented: `lilas` and `ambar`
  // are already brand/warning primitives one step lighter than `roxo`/
  // `melQueimado`; `salviaClara` is the palette's existing lighter green,
  // unused anywhere else in `semantic`. Checked against both dark
  // surfaces: primaryOnSurface ≈6.5–7.4:1, successOnSurface ≈7.7–8.7:1,
  // warningOnSurface ≈6.7–7.6:1 (AA requires 4.5:1, with room to spare).
  primaryOnSurface: palette.lilas,
  successOnSurface: palette.salviaClara,
  warningOnSurface: palette.ambar,
} satisfies Partial<Record<SemanticToken, string>>;
