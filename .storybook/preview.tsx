import type { Preview } from "@storybook/react";
import React from "react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      // No forced `default` — the addon injects it as a `!important` rule
      // on `.sb-show-main`, which fought with dark mode (it overrode the
      // token-driven `body` background from src/index.css regardless of
      // the theme toolbar). Leaving it unset lets `body`'s own
      // `bg-surface-muted` — already theme-aware — show through; these
      // swatches stay available in the toolbar for a manual one-off check
      // against a *specific* surface, light or dark.
      values: [
        { name: "surface-muted (light)", value: "#F7F3ED" },
        { name: "surface (light)", value: "#FFFFFF" },
        { name: "surface-muted (dark)", value: "#241C33" },
        { name: "surface (dark)", value: "#2F2540" },
      ],
    },
    a11y: {
      // Fails the a11y addon's checks panel on violations, not just warns.
      test: "error",
      options: {
        // Gate on WCAG 2.1 AA — the bar this system is actually designed to
        // (and the one the Figma file itself targets). Leaving axe's default
        // rule set on also runs "-enhanced" (AAA, 7:1 contrast) checks, which
        // would fail on colors nobody ever audited against a 7:1 target.
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      },
    },
  },
  // Not from Figma (light theme only) — a toolbar control so every story
  // can be previewed in dark mode too. See src/tokens/colors.ts
  // (semanticDark) and src/hooks/useTheme.ts for the actual token/toggle
  // implementation this just exercises inside Storybook's iframe.
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      // Applied directly in the render body, not a useEffect — the a11y
      // addon's scan can fire before an effect gets a chance to run, and
      // catches the DOM one render behind (found via a stale "1 violation"
      // that a manual `axe.run()` against the settled DOM couldn't
      // reproduce). This runs synchronously before the Story below ever
      // paints, matching index.html's own anti-flash script for the real
      // app (see src/hooks/useTheme.ts).
      const theme = context.globals.theme === "dark" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", theme === "dark");
      return <Story />;
    },
  ],
};

export default preview;
