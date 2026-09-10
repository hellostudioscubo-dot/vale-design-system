import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associates the label with the field via htmlFor/id", () => {
    render(<Textarea label="Por que agora" />);
    expect(screen.getByLabelText("Por que agora")).toBeInTheDocument();
  });

  it("calls onChange as the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea label="Por que agora" onChange={onChange} />);

    await user.type(screen.getByLabelText("Por que agora"), "Ana");

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("wires error state to aria-invalid, aria-describedby and an alert", () => {
    render(<Textarea label="Motivo" error="Escreva pelo menos uma frase." />);

    const field = screen.getByLabelText("Motivo");
    expect(field).toHaveAttribute("aria-invalid", "true");

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Escreva pelo menos uma frase.");
    expect(field.getAttribute("aria-describedby")).toContain(alert.id);
  });

  it("disables the field natively", () => {
    render(<Textarea label="Motivo" disabled />);
    expect(screen.getByLabelText("Motivo")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Textarea label="Motivo" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
