import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { TrendStat } from "./TrendStat";

describe("TrendStat", () => {
  it("renders the value and caption as visible text", () => {
    render(<TrendStat value="23h" caption="investidas até aqui" />);
    expect(screen.getByText("23h")).toBeInTheDocument();
    expect(screen.getByText("investidas até aqui")).toBeInTheDocument();
  });

  it("omits the trend chart when there is no trend data", () => {
    const { container } = render(<TrendStat value="25min" caption="investidas até aqui" />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders the trend chart when trend data is provided", () => {
    const { container } = render(
      <TrendStat
        value="23h"
        caption="investidas até aqui"
        trend={[
          { label: "jun", value: 4 },
          { label: "ago", value: 23 },
        ]}
      />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <TrendStat
        value="23h"
        caption="investidas até aqui"
        trend={[{ label: "ago", value: 23 }]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
