import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("exposes value/min/max via role=progressbar (Radix Progress)", () => {
    render(<ProgressBar value={40} max={100} label="Progresso" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders the label as visible text", () => {
    render(<ProgressBar value={40} label="Progresso" />);
    expect(screen.getByText("Progresso")).toBeInTheDocument();
  });

  it("defaults max to 100", () => {
    render(<ProgressBar value={40} label="Progresso" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<ProgressBar value={40} label="Progresso" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
