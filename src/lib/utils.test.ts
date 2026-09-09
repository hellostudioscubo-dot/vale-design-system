import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("merges plain class strings", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy values (conditional classes)", () => {
    expect(cn("flex", false && "hidden", undefined, null, "gap-2")).toBe("flex gap-2");
  });

  it("lets a later conflicting Tailwind class win over an earlier one", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  // Regression test for the bug documented in utils.ts: tailwind-merge's
  // default classGroups treat our custom font-size tokens (text-auxiliar,
  // text-corpo…) as text-COLOR utilities, because both start with "text-"
  // and only the color group registers that prefix by default. That made
  // `cn("text-auxiliar", "text-primary")` silently drop the color half —
  // every component's text color was affected until extendTailwindMerge()
  // was taught to route our font-size tokens to the right group. If this
  // regresses, it's the very bug the comment in utils.ts warns about.
  it("keeps a text-color class distinct from a font-size token class (not a real conflict)", () => {
    expect(cn("text-auxiliar", "text-primary")).toBe("text-auxiliar text-primary");
    expect(cn("text-corpo", "text-text-inverse")).toBe("text-corpo text-text-inverse");
    expect(cn("text-legenda", "text-warning-strong")).toBe("text-legenda text-warning-strong");
  });

  it("still lets two real font-size tokens conflict normally (later wins)", () => {
    expect(cn("text-auxiliar", "text-corpo")).toBe("text-corpo");
  });

  it("still lets two real text-color classes conflict normally (later wins)", () => {
    expect(cn("text-primary", "text-text-secondary")).toBe("text-text-secondary");
  });
});
