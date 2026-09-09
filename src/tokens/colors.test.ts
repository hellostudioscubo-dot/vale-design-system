import { describe, it, expect } from "vitest";
import { palette, semantic, semanticDark } from "./colors";

/**
 * WCAG 2.1 relative luminance + contrast ratio — the standard formula
 * (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance), not a
 * third-party dependency, so this test has no opinion beyond the spec
 * itself about what "passes."
 */
function relativeLuminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255);
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const [R, G, B] = [r, g, b].map(linear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA: string, hexB: string): number {
  const [l1, l2] = [relativeLuminance(hexA), relativeLuminance(hexB)];
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

const AA_NORMAL_TEXT = 4.5;
const AA_NON_TEXT = 3;

describe("light theme text contrast (semantic)", () => {
  it.each([
    ["textPrimary on surface", semantic.textPrimary, semantic.surface],
    ["textPrimary on surfaceMuted", semantic.textPrimary, semantic.surfaceMuted],
    ["textSecondary on surface", semantic.textSecondary, semantic.surface],
    ["textInverse on primary (button fill)", semantic.textInverse, semantic.primary],
    ["successStrong on successSubtle", semantic.successStrong, semantic.successSubtle],
    ["warningStrong on surface", semantic.warningStrong, semantic.surface],
  ])("%s meets AA (4.5:1)", (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  // Documented in colors.ts as intentionally NOT text-safe — decorative
  // only. This test pins that down: if it ever starts passing, the
  // component code that avoids using it directly as text may be stale.
  it("achievement (dourado) does NOT meet AA as text on surface (decorative-only, by design)", () => {
    expect(contrastRatio(semantic.achievement, semantic.surface)).toBeLessThan(AA_NORMAL_TEXT);
  });
});

describe("dark theme text contrast (semanticDark)", () => {
  it.each([
    ["textPrimary on surface", semanticDark.textPrimary, semanticDark.surface],
    ["textPrimary on surfaceMuted", semanticDark.textPrimary, semanticDark.surfaceMuted],
    ["textSecondary on surface", semanticDark.textSecondary, semanticDark.surface],
    ["textSecondary on surfaceMuted", semanticDark.textSecondary, semanticDark.surfaceMuted],
  ])("%s meets AA (4.5:1)", (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("borderStrong meets the non-text minimum (3:1) against surface", () => {
    expect(contrastRatio(semanticDark.borderStrong, semanticDark.surface)).toBeGreaterThanOrEqual(
      AA_NON_TEXT,
    );
  });

  // The three bugs this session actually found via the Storybook a11y
  // addon, pinned down so they can't silently come back. Each pairs an
  // "OnSurface" color directly against a *flipping* page/card surface —
  // the exact context that broke before `primaryOnSurface`/
  // `successOnSurface`/`warningOnSurface` existed. See the doc comments on
  // `semantic` and `semanticDark` in colors.ts for the full story.
  describe("*OnSurface family — text/icons placed directly on a themed surface", () => {
    it.each([
      ["primaryOnSurface on surface", semanticDark.primaryOnSurface, semanticDark.surface],
      ["primaryOnSurface on surfaceMuted", semanticDark.primaryOnSurface, semanticDark.surfaceMuted],
      ["successOnSurface on surface", semanticDark.successOnSurface, semanticDark.surface],
      ["successOnSurface on surfaceMuted", semanticDark.successOnSurface, semanticDark.surfaceMuted],
      ["warningOnSurface on surface", semanticDark.warningOnSurface, semanticDark.surface],
      ["warningOnSurface on surfaceMuted", semanticDark.warningOnSurface, semanticDark.surfaceMuted],
    ])("%s meets AA (4.5:1)", (_label, fg, bg) => {
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    // The regression itself: the *static* light-mode color (tuned only
    // for a light backdrop) genuinely fails against the dark surfaces —
    // proving `*OnSurface` earns its place rather than just duplicating
    // `primary`/`successStrong`/`warningStrong`.
    it("the static (non-OnSurface) primary/successStrong/warningStrong genuinely fail AA on dark surfaces", () => {
      expect(contrastRatio(semantic.primary, semanticDark.surface)).toBeLessThan(AA_NORMAL_TEXT);
      expect(contrastRatio(semantic.successStrong, semanticDark.surface)).toBeLessThan(
        AA_NORMAL_TEXT,
      );
      expect(contrastRatio(semantic.warningStrong, semanticDark.surface)).toBeLessThan(
        AA_NORMAL_TEXT,
      );
    });
  });

  // textInverse/surfaceInverse are documented as deliberately NOT dark-mode
  // aware (see semanticDark's doc comment) — they stay paired with their
  // one static partner in both themes. Pin that pairing down.
  it("textInverse on primary (button fill) still meets AA — unaffected by theme", () => {
    expect(contrastRatio(semantic.textInverse, semantic.primary)).toBeGreaterThanOrEqual(
      AA_NORMAL_TEXT,
    );
  });
});

describe("palette", () => {
  it("every hex value is a valid 6-digit hex color", () => {
    for (const [name, hex] of Object.entries(palette)) {
      expect(hex, `palette.${name}`).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
