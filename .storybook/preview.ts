import type { Preview } from "@storybook/react";
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
      default: "surface-muted",
      values: [
        { name: "surface-muted", value: "#F7F3ED" },
        { name: "surface", value: "#FFFFFF" },
        { name: "surface-inverse", value: "#241C33" },
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
};

export default preview;
