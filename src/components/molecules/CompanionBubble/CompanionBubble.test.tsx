import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CompanionBubble } from "./CompanionBubble";

describe("CompanionBubble", () => {
  it("renders title and description as visible text", () => {
    render(<CompanionBubble title="Esse é o Faísca!" description="Ele é um bebê." />);
    expect(screen.getByText("Esse é o Faísca!")).toBeInTheDocument();
    expect(screen.getByText("Ele é um bebê.")).toBeInTheDocument();
  });

  it("announces itself as a status region for assistive tech", () => {
    render(<CompanionBubble title="Esse é o Faísca!" description="Ele é um bebê." />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it.each(["dark", "light"] as const)("has no a11y violations — tone=%s", async (tone) => {
    const { container } = render(
      <CompanionBubble tone={tone} title="Esse é o Faísca!" description="Ele é um bebê." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
