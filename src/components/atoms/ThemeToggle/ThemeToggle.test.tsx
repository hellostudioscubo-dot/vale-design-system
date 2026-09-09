import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ThemeToggle } from "./ThemeToggle";

// useTheme reads localStorage and mutates document.documentElement on
// mount/toggle — reset both so tests don't leak into each other (jsdom
// has no matchMedia, so useTheme's system-preference check is already a
// no-op here; only the persisted-choice path needs resetting).
beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("ThemeToggle", () => {
  it("renders as a switch, starting in light mode (no stored/system preference in jsdom)", () => {
    render(<ThemeToggle />);
    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();
    expect(toggle).toHaveAccessibleName("Mudar para tema escuro");
  });

  it("adds .dark to <html> and flips its own accessible name when toggled on", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("switch"));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("switch")).toBeChecked();
    expect(screen.getByRole("switch")).toHaveAccessibleName("Mudar para tema claro");
  });

  it("persists the choice to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("switch"));

    expect(localStorage.getItem("vale-theme")).toBe("dark");
  });

  it("removes .dark and reverts when toggled back off", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const toggle = screen.getByRole("switch");

    await user.click(toggle);
    await user.click(toggle);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(toggle).not.toBeChecked();
  });

  it("has no a11y violations, light or dark", async () => {
    const user = userEvent.setup();
    const { container } = render(<ThemeToggle />);
    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("switch"));
    expect(await axe(container)).toHaveNoViolations();
  });
});
