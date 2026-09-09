import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the field via htmlFor/id", () => {
    render(<Input label="Nome completo" />);
    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
  });

  it("calls onChange as the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Nome completo" onChange={onChange} />);

    await user.type(screen.getByLabelText("Nome completo"), "Ana");

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  // `error` has no native HTML equivalent (see Input's own doc comment),
  // so it's the one state that depends entirely on correct aria-* wiring
  // rather than a browser default — worth pinning down directly.
  it("wires error state to aria-invalid, aria-describedby and an alert", () => {
    render(<Input label="E-mail" error="E-mail inválido" />);

    const field = screen.getByLabelText("E-mail");
    expect(field).toHaveAttribute("aria-invalid", "true");

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("E-mail inválido");
    expect(field.getAttribute("aria-describedby")).toContain(alert.id);
  });

  it("wires helperText to aria-describedby when there is no error", () => {
    render(<Input label="Senha" helperText="Mínimo de 8 caracteres" />);

    const field = screen.getByLabelText("Senha");
    const helper = screen.getByText("Mínimo de 8 caracteres");
    expect(field.getAttribute("aria-describedby")).toContain(helper.id);
  });

  it("does not render the error message when there is no error", () => {
    render(<Input label="Nome completo" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("disables the field natively", () => {
    render(<Input label="Nome completo" disabled />);
    expect(screen.getByLabelText("Nome completo")).toBeDisabled();
  });

  it("has no a11y violations, empty", async () => {
    const { container } = render(<Input label="Nome completo" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations, with an error", async () => {
    const { container } = render(<Input label="E-mail" error="E-mail inválido" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
