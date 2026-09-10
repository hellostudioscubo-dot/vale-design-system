import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { SessionHistoryItem } from "./SessionHistoryItem";

describe("SessionHistoryItem", () => {
  it("renders title and description as visible text", () => {
    render(
      <ul>
        <SessionHistoryItem title="12 de agosto · 45 min" description="Terminei o módulo." />
      </ul>,
    );
    expect(screen.getByText("12 de agosto · 45 min")).toBeInTheDocument();
    expect(screen.getByText("Terminei o módulo.")).toBeInTheDocument();
  });

  it("renders as a list item so a wrapping <ul>/<ol> stays valid", () => {
    render(
      <ul>
        <SessionHistoryItem title="12 de agosto · 45 min" description="Terminei o módulo." />
      </ul>,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <ul>
        <SessionHistoryItem title="12 de agosto · 45 min" description="Terminei o módulo." />
      </ul>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
