import { useCallback, useEffect, useState } from "react";

/**
 * Dark mode toggle. There's no Figma "theme" component property to mirror
 * here (see semanticDark in src/tokens/colors.ts) — this is plain
 * infrastructure: add/remove `.dark` on <html>, persist the viewer's
 * explicit choice, and otherwise follow the OS preference.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "vale-theme";

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/** Reads the stored explicit preference, if any — without falling back to
 *  the system setting. Exported so the initial render (and an optional
 *  pre-hydration inline script) can avoid a light→dark flash. */
export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? (systemPrefersDark() ? "dark" : "light");
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? "light" : getInitialTheme(),
  );

  // Keep the DOM class in sync with state (covers the first render too,
  // since Storybook/tests may mount without the inline anti-flash script).
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Only tokens that live in this browser's storage. If the viewer never
  // made an explicit choice, follow the OS setting live.
  useEffect(() => {
    if (getStoredTheme() !== null) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setThemeState(e.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
