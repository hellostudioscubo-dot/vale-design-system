import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { NavItem } from "./NavItem";
import { HomeIcon } from "@/icons";

describe("NavItem", () => {
  it("renders its label and is reachable by accessible name", () => {
    render(<NavItem icon={<HomeIcon />} label="Hoje" />);
    expect(screen.getByRole("button", { name: "Hoje" })).toBeInTheDocument();
  });

  // `selected` must set aria-current, not just a visual style (see the
  // component's own doc comment) — that's what actually tells assistive
  // tech which tab is active.
  it("sets aria-current=page when selected", () => {
    render(<NavItem icon={<HomeIcon />} label="Hoje" selected />);
    expect(screen.getByRole("button", { name: "Hoje" })).toHaveAttribute("aria-current", "page");
  });

  it("has no aria-current when not selected", () => {
    render(<NavItem icon={<HomeIcon />} label="Hoje" />);
    expect(screen.getByRole("button", { name: "Hoje" })).not.toHaveAttribute("aria-current");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<NavItem icon={<HomeIcon />} label="Hoje" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Hoje" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations, selected or not", async () => {
    const { container, rerender } = render(<NavItem icon={<HomeIcon />} label="Hoje" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<NavItem icon={<HomeIcon />} label="Hoje" selected />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
