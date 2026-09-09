/**
 * Vale Design System — library entry point.
 *
 * This is what `npm install vale-design-system` resolves to; it is NOT
 * used by the demo app (src/main.tsx imports ./App directly) or by
 * Storybook (each story imports its component directly). Keep it a
 * barrel of re-exports only — no component definitions here.
 *
 * Consumers also need the compiled stylesheet once, e.g.:
 *   import "vale-design-system/dist/style.css";
 * (see vite.config.lib.ts — Tailwind's utility classes referenced by
 * these components are compiled into that file at publish time, so
 * consuming apps don't need Tailwind configured themselves.)
 */
import "./index.css";

export * from "./components";
export * from "./foundations";
export * from "./tokens";
export * from "./icons";
export * from "./hooks/useTheme";
export { cn } from "./lib/utils";
