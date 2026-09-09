import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Test config — separate from vite.config.ts (the demo app) and
 * vite.config.lib.ts (the published library) so `npm test` doesn't need
 * to know about either of those builds, and vice versa.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // jest-dom's side-effect import (in setup.ts) calls a global
    // `expect.extend()` — without this, it throws "expect is not defined"
    // before a single test runs. Test files still import
    // describe/it/expect explicitly (kept, for clarity of where they come
    // from); `globals` only adds the globals jest-dom itself needs.
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Without `include`, v8 scans the whole working directory — it was
      // picking up storybook-static/'s minified vendor bundles (a stray
      // leftover build artifact) as "0% covered" noise.
      include: ["src/**/*.{ts,tsx}"],
      // Docs-only story files and the demo app aren't "logic" — excluding
      // them keeps the coverage number meaningful (components + tokens +
      // lib only) instead of diluted by JSX that just renders swatches.
      exclude: [
        "**/*.stories.tsx",
        "**/*.test.{ts,tsx}",
        "src/App.tsx",
        "src/main.tsx",
        "src/index.ts",
        "src/test/**",
        "src/foundations/**",
        "src/icons/**",
        "src/assets/**",
        "**/*.d.ts",
      ],
    },
  },
});
