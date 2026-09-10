import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "curso", label: "Curso" },
  { value: "carreira", label: "Ação de carreira" },
];

describe("SegmentedControl", () => {
  it("renders each option as a button with the group's accessible name", () => {
    render(
      <SegmentedControl label="Tipo de item" options={options} value="curso" onValueChange={vi.fn()} />,
    );
    expect(screen.getByRole("radiogroup", { name: "Tipo de item" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Curso" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Ação de carreira" })).toBeInTheDocument();
  });

  it("marks the current value as pressed/checked", () => {
    render(
      <SegmentedControl label="Tipo de item" options={options} value="carreira" onValueChange={vi.fn()} />,
    );
    expect(screen.getByRole("radio", { name: "Ação de carreira" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Curso" })).toHaveAttribute("aria-checked", "false");
  });

  it("calls onValueChange with the newly picked option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SegmentedControl label="Tipo de item" options={options} value="curso" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("radio", { name: "Ação de carreira" }));

    expect(onValueChange).toHaveBeenCalledWith("carreira");
  });

  it("never calls onValueChange with an empty value (re-clicking the active option)", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SegmentedControl label="Tipo de item" options={options} value="curso" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("radio", { name: "Curso" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <SegmentedControl label="Tipo de item" options={options} value="curso" onValueChange={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
