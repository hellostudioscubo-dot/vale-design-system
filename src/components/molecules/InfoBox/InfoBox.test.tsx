import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { InfoBox } from "./InfoBox";

describe("InfoBox", () => {
  it("renders title and description as visible text", () => {
    render(<InfoBox title="Por que agora?" description="Você já começou." />);
    expect(screen.getByText("Por que agora?")).toBeInTheDocument();
    expect(screen.getByText("Você já começou.")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<InfoBox title="Por que agora?" description="Você já começou." />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
