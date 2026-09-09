import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// jsdom doesn't implement matchMedia at all (every real browser does) —
// without this, useTheme's prefers-color-scheme listener throws on mount.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

// Testing Library doesn't auto-cleanup outside Jest's global afterEach —
// without this, a component left mounted by one test (e.g. an open Modal)
// bleeds into the next test's DOM queries.
afterEach(() => {
  cleanup();
});
