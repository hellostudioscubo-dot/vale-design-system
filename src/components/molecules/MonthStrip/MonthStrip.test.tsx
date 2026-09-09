import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { MonthStrip } from "./MonthStrip";

describe("MonthStrip", () => {
  it("shows the month and item count", () => {
    render(
      <MonthStrip month="Agosto" itemCount={2}>
        <div>item</div>
      </MonthStrip>,
    );
    expect(screen.getByText("Agosto")).toBeInTheDocument();
    expect(screen.getByText("· 2 itens")).toBeInTheDocument();
  });

  it("is open by default (Radix Collapsible defaultOpen)", () => {
    render(
      <MonthStrip month="Agosto" itemCount={2}>
        <div>item</div>
      </MonthStrip>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("respects defaultOpen={false}", () => {
    render(
      <MonthStrip month="Agosto" itemCount={2} defaultOpen={false}>
        <div>item</div>
      </MonthStrip>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles aria-expanded when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MonthStrip month="Agosto" itemCount={2}>
        <div>item</div>
      </MonthStrip>,
    );
    const trigger = screen.getByRole("button");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no a11y violations, open, closed, or completed", async () => {
    const { container, rerender } = render(
      <MonthStrip month="Agosto" itemCount={2}>
        <div>item</div>
      </MonthStrip>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <MonthStrip month="Agosto" itemCount={2} defaultOpen={false}>
        <div>item</div>
      </MonthStrip>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <MonthStrip month="Agosto" itemCount={2} completed>
        <div>item</div>
      </MonthStrip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
