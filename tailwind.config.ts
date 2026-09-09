import type { Config } from "tailwindcss";
import { semantic, palette } from "./src/tokens/colors";
import { spacing } from "./src/tokens/spacing";
import { radius } from "./src/tokens/radius";
import { shadows } from "./src/tokens/shadows";
import { fontFamily } from "./src/tokens/typography";

/**
 * Reach for a CSS custom property instead of a literal hex, so the same
 * class (`bg-surface`, `text-text-secondary`, …) resolves to a different
 * color under `.dark` without every component needing a `dark:` variant.
 * The literal `<alpha-value>` placeholder is Tailwind's own shorthand for
 * this — it substitutes the opacity modifier in at generate time (so
 * `bg-surface/50` keeps working), without needing a config-function value
 * (whose return type isn't part of the published `Config` typings and
 * would break `tsc --noEmit`). See src/index.css for where `--color-*` is
 * actually defined, once per theme, and src/tokens/colors.ts
 * (`semanticDark`) for why only these particular tokens vary by theme.
 */
function withOpacity(cssVar: string) {
  return `rgb(var(${cssVar}) / <alpha-value>)`;
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — what components should reach for. The ones
        // that vary between light/dark are backed by CSS vars (see
        // withOpacity above); tokens that don't change by theme (brand
        // fills, `*Subtle`/`*Strong` tints — see semanticDark's doc
        // comment) stay literal hex, same as before.
        surface: withOpacity("--color-surface"),
        "surface-muted": withOpacity("--color-surface-muted"),
        // NOT CSS-var backed — see semanticDark's doc comment in
        // src/tokens/colors.ts for why this one stays literal.
        "surface-inverse": semantic.surfaceInverse,
        border: withOpacity("--color-border"),
        "border-strong": withOpacity("--color-border-strong"),
        "text-primary": withOpacity("--color-text-primary"),
        "text-secondary": withOpacity("--color-text-secondary"),
        // NOT CSS-var backed — see semanticDark's doc comment in
        // src/tokens/colors.ts for why this one stays literal.
        "text-inverse": semantic.textInverse,
        primary: {
          DEFAULT: semantic.primary,
          hover: semantic.primaryHover,
          pressed: semantic.primaryPressed,
          subtle: semantic.primarySubtle,
          // CSS-var backed, unlike its siblings above — this is the "as
          // text directly on surface/surface-muted" role, not a fill.
          // See semantic.primaryOnSurface's doc comment in
          // src/tokens/colors.ts.
          onSurface: withOpacity("--color-primary-on-surface"),
        },
        accent: semantic.accent,
        success: {
          DEFAULT: semantic.success,
          subtle: semantic.successSubtle,
          strong: semantic.successStrong,
          onSurface: withOpacity("--color-success-on-surface"),
        },
        warning: {
          DEFAULT: semantic.warning,
          strong: semantic.warningStrong,
          onSurface: withOpacity("--color-warning-on-surface"),
        },
        achievement: semantic.achievement,
        disabled: {
          bg: withOpacity("--color-disabled-bg"),
          text: withOpacity("--color-disabled-text"),
        },
        // Raw palette — escape hatch for one-off illustration/marketing needs.
        palette,
      },
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      fontFamily: {
        display: fontFamily.display.split(",").map((f) => f.trim().replace(/"/g, "")),
        body: fontFamily.body.split(",").map((f) => f.trim().replace(/"/g, "")),
      },
      fontSize: {
        display: ["44px", { lineHeight: "1.2" }],
        "titulo-g": ["28px", { lineHeight: "1.3" }],
        "titulo-m": ["22px", { lineHeight: "1.3" }],
        numero: ["36px", { lineHeight: "1.1" }],
        timer: ["56px", { lineHeight: "1.1" }],
        corpo: ["16px", { lineHeight: "1.6" }],
        auxiliar: ["14px", { lineHeight: "1.5" }],
        legenda: ["12px", { lineHeight: "1.4" }],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
} satisfies Config;
