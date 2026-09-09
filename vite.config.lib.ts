import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";

/**
 * Library build config — produces what `npm publish` ships (dist/).
 * Separate from vite.config.ts, which builds the demo app (dist/ from
 * index.html) for `npm run dev`/`preview`; that one is untouched so the
 * already-verified demo build keeps working exactly as before.
 *
 * Run via `npm run build:lib`.
 */
export default defineConfig({
  plugins: [
    react(),
    dts({
      // Type declarations for the public API only — story files and the
      // demo App aren't part of what gets published (see package.json's
      // "files"), so don't waste time/type-check them here either.
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/*.test.ts",
        "src/test/**",
        "src/App.tsx",
        "src/main.tsx",
      ],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ValeDesignSystem",
      // `.cjs`, not `.cjs.js` — package.json has "type": "module", so a
      // plain `.js` extension makes Node's CJS/ESM auto-detection treat
      // even a CommonJS-syntax file as ESM. `require()` doesn't error in
      // that case, it just silently returns an empty module object (no
      // `export` statements found) — caught by testing the actual built
      // output at runtime, not just its types.
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // Consumers bring their own React — bundling it in would risk two
      // copies (broken hooks/context) and bloats every install for
      // nothing, since it's already a peerDependency (see package.json).
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // Real target: TS types + published components, not demo bundle size.
    sourcemap: true,
  },
});
