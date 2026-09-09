import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ProgressRing } from "./ProgressRing";

describe("ProgressRing", () => {
  // No Radix primitive covers this (see the component's own doc comment),
  // so the ARIA contract is hand-applied — worth testing directly rather
  // than trusting a primitive to have gotten it right.
  it("exposes value/min/max via a hand-applied role=progressbar", () => {
    render(<ProgressRing value={65} max={100} valueLabel="24:31" />);
    const ring = screen.getByRole("progressbar");
    expect(ring).toHaveAttribute("aria-valuenow", "65");
    expect(ring).toHaveAttribute("aria-valuemin", "0");
    expect(ring).toHaveAttribute("aria-valuemax", "100");
  });

  it("shows the value label as visible text", () => {
    render(<ProgressRing value={65} valueLabel="24:31" caption="Sessão 1" />);
    expect(screen.getByText("24:31")).toBeInTheDocument();
    expect(screen.getByText("Sessão 1")).toBeInTheDocument();
  });

  it("falls back to a generic accessible name when there is no caption", () => {
    render(<ProgressRing value={65} valueLabel="24:31" />);
    expect(screen.getByRole("progressbar", { name: "Progresso" })).toBeInTheDocument();
  });

  it("uses the caption as the accessible name when provided", () => {
    render(<ProgressRing value={65} valueLabel="24:31" caption="Sessão 1" />);
    expect(screen.getByRole("progressbar", { name: "Sessão 1" })).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <ProgressRing value={65} valueLabel="24:31" caption="Sessão 1" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
