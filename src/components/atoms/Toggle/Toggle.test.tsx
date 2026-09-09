import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders as a labeled switch", () => {
    render(<Toggle label="Notificações" />);
    expect(screen.getByRole("switch", { name: "Notificações" })).toBeInTheDocument();
  });

  it("starts unchecked by default and toggles on click", async () => {
    const user = userEvent.setup();
    render(<Toggle label="Notificações" />);

    const toggle = screen.getByRole("switch", { name: "Notificações" });
    expect(toggle).not.toBeChecked();

    await user.click(toggle);

    expect(toggle).toBeChecked();
  });

  it("respects defaultChecked", () => {
    render(<Toggle label="Notificações" defaultChecked />);
    expect(screen.getByRole("switch", { name: "Notificações" })).toBeChecked();
  });

  it("calls onCheckedChange when toggled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle label="Notificações" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole("switch", { name: "Notificações" }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("keeps the label in the accessibility tree even when hidden visually", () => {
    render(<Toggle label="Notificações" hideLabel />);
    // Still queryable by accessible name — sr-only, not aria-hidden.
    expect(screen.getByRole("switch", { name: "Notificações" })).toBeInTheDocument();
  });

  it("does not toggle when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle label="Notificações" disabled onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole("switch", { name: "Notificações" }));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Toggle label="Notificações" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
