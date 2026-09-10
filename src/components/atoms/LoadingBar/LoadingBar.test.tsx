import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { LoadingBar } from "./LoadingBar";

describe("LoadingBar", () => {
  it("exposes value/min/max via Radix Progress's role=progressbar", () => {
    render(<LoadingBar value={65} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "65");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("uses the label as the accessible name", () => {
    render(<LoadingBar value={40} label="Carregando..." />);
    expect(screen.getByRole("progressbar", { name: "Carregando..." })).toBeInTheDocument();
  });

  it("shows the label as visible text too, not only for assistive tech", () => {
    render(<LoadingBar value={40} label="Carregando..." />);
    expect(screen.getAllByText("Carregando...").length).toBeGreaterThan(0);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<LoadingBar value={65} label="Carregando..." />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
