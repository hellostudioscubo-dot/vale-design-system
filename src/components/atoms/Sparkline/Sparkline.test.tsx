import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Sparkline } from "./Sparkline";

const points = [
  { label: "jun", value: 4 },
  { label: "jul", value: 14 },
  { label: "ago", value: 23 },
];

describe("Sparkline", () => {
  it("renders the month labels as visible text", () => {
    render(<Sparkline points={points} />);
    expect(screen.getByText("jun")).toBeInTheDocument();
    expect(screen.getByText("jul")).toBeInTheDocument();
    expect(screen.getByText("ago")).toBeInTheDocument();
  });

  it("hides the chart itself from assistive tech (the numbers are stated as text elsewhere)", () => {
    const { container } = render(<Sparkline points={points} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("does not throw with a single point", () => {
    render(<Sparkline points={[{ label: "ago", value: 5 }]} />);
    expect(screen.getByText("ago")).toBeInTheDocument();
  });

  it("does not throw when every value is equal (zero range)", () => {
    render(
      <Sparkline
        points={[
          { label: "jun", value: 10 },
          { label: "jul", value: 10 },
        ]}
      />,
    );
    expect(screen.getByText("jul")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Sparkline points={points} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
