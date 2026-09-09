import type { Config } from "tailwindcss";
import { semantic, palette } from "./src/tokens/colors";
import { spacing } from "./src/tokens/spacing";
import { radius } from "./src/tokens/radius";
import { shadows } from "./src/tokens/shadows";
import { fontFamily } from "./src/tokens/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — what components should reach for.
        surface: semantic.surface,
        "surface-muted": semantic.surfaceMuted,
        "surface-inverse": semantic.surfaceInverse,
        border: semantic.border,
        "border-strong": semantic.borderStrong,
        "text-primary": semantic.textPrimary,
        "text-secondary": semantic.textSecondary,
        "text-inverse": semantic.textInverse,
        primary: {
          DEFAULT: semantic.primary,
          hover: semantic.primaryHover,
          pressed: semantic.primaryPressed,
          subtle: semantic.primarySubtle,
        },
        accent: semantic.accent,
        success: {
          DEFAULT: semantic.success,
          subtle: semantic.successSubtle,
          strong: semantic.successStrong,
        },
        warning: {
          DEFAULT: semantic.warning,
          strong: semantic.warningStrong,
        },
        achievement: semantic.achievement,
        disabled: {
          bg: semantic.disabledBg,
          text: semantic.disabledText,
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
