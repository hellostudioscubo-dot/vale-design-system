import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { EggCard } from "./EggCard";

describe("EggCard", () => {
  it("composes stage and color into the image's accessible alt text", () => {
    render(<EggCard imageSrc="/egg.png" colorName="Lilás" stage="egg" />);
    expect(screen.getByRole("img", { name: "Ovo — cor Lilás" })).toBeInTheDocument();
  });

  it.each([
    ["egg", "Ovo"],
    ["hatchling", "Dragão Nenê"],
    ["youngAdult", "Dragão Jovem adulto"],
  ] as const)("labels stage=%s as %s", (stage, expectedLabel) => {
    render(<EggCard imageSrc="/x.png" colorName="Âmbar" stage={stage} />);
    expect(screen.getByRole("img", { name: `${expectedLabel} — cor Âmbar` })).toBeInTheDocument();
  });

  it("shows the color name as a visible caption", () => {
    render(<EggCard imageSrc="/egg.png" colorName="Lilás" stage="egg" />);
    expect(screen.getByText("Lilás")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EggCard imageSrc="/egg.png" colorName="Lilás" stage="egg" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
