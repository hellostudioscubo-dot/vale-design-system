import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Notice } from "./Notice";

describe("Notice", () => {
  it("renders its children as visible text", () => {
    render(<Notice>Enquanto você estuda, seu dragão está crescendo.</Notice>);
    expect(
      screen.getByText("Enquanto você estuda, seu dragão está crescendo."),
    ).toBeInTheDocument();
  });

  it("hides the decorative dot from assistive tech", () => {
    const { container } = render(<Notice>Aviso</Notice>);
    expect(container.querySelector("span[aria-hidden]")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Notice>Aviso</Notice>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
