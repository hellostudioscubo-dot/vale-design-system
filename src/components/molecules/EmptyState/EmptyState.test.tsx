import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the message as visible text", () => {
    render(<EmptyState icon="✨" message="Nada por aqui ainda." />);
    expect(screen.getByText("Nada por aqui ainda.")).toBeInTheDocument();
  });

  it("hides the decorative emoji from assistive tech", () => {
    const { container } = render(<EmptyState icon="✨" message="Nada por aqui ainda." />);
    expect(container.querySelector("span[aria-hidden]")).toHaveTextContent("✨");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EmptyState icon="✨" message="Nada por aqui ainda." />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
