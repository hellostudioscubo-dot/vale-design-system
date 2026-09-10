import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Select } from "./Select";

const options = [
  { value: "ago", label: "Agosto" },
  { value: "set", label: "Setembro" },
];

describe("Select", () => {
  it("associates the label with the field via htmlFor/id", () => {
    render(<Select label="Mês" options={options} />);
    expect(screen.getByLabelText("Mês")).toBeInTheDocument();
  });

  it("renders every option", () => {
    render(<Select label="Mês" options={options} />);
    expect(screen.getByRole("option", { name: "Agosto" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Setembro" })).toBeInTheDocument();
  });

  it("calls onChange when a new option is picked", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select label="Mês" options={options} onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText("Mês"), "set");

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("wires error state to aria-invalid and an alert", () => {
    render(<Select label="Mês" options={options} error="Selecione um mês." />);
    expect(screen.getByLabelText("Mês")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Selecione um mês.");
  });

  it("disables the field natively", () => {
    render(<Select label="Mês" options={options} disabled />);
    expect(screen.getByLabelText("Mês")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Select label="Mês" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
