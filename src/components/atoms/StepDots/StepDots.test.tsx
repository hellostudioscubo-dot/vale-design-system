import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { StepDots } from "./StepDots";

describe("StepDots", () => {
  it("exposes step/total via role=progressbar", () => {
    render(<StepDots step={2} totalSteps={4} />);
    const dots = screen.getByRole("progressbar");
    expect(dots).toHaveAttribute("aria-valuenow", "2");
    expect(dots).toHaveAttribute("aria-valuemin", "1");
    expect(dots).toHaveAttribute("aria-valuemax", "4");
  });

  it("names itself with the current step for assistive tech", () => {
    render(<StepDots step={2} totalSteps={4} />);
    expect(screen.getByRole("progressbar", { name: "Passo 2 de 4" })).toBeInTheDocument();
  });

  it("renders one dot per step", () => {
    const { container } = render(<StepDots step={1} totalSteps={4} />);
    expect(container.querySelectorAll("span")).toHaveLength(4);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<StepDots step={2} totalSteps={4} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
