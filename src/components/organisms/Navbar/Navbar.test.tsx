import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Navbar } from "./Navbar";
import { HomeIcon, PlanIcon } from "@/icons";

const items = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
];

describe("Navbar", () => {
  it("renders as a labeled navigation landmark", () => {
    render(<Navbar items={items} selectedKey="hoje" onSelect={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
  });

  it("renders every item and marks selectedKey as current", () => {
    render(<Navbar items={items} selectedKey="plano" onSelect={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Hoje" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Plano" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("calls onSelect with the clicked item's key", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Navbar items={items} selectedKey="hoje" onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "Plano" }));

    expect(onSelect).toHaveBeenCalledWith("plano");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Navbar items={items} selectedKey="hoje" onSelect={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
