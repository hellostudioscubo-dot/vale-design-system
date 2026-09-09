import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { NumberBlock } from "./NumberBlock";

describe("NumberBlock", () => {
  it("renders the value and label as visible text", () => {
    render(<NumberBlock value={12} label="dias seguidos" />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("dias seguidos")).toBeInTheDocument();
  });

  it("accepts a string value (e.g. a formatted count)", () => {
    render(<NumberBlock value="1.2k" label="visualizações" />);
    expect(screen.getByText("1.2k")).toBeInTheDocument();
  });

  it("has no a11y violations, plain or emphasized", async () => {
    const { container, rerender } = render(<NumberBlock value={12} label="dias seguidos" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<NumberBlock value={3} label="certificados" emphasis />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
