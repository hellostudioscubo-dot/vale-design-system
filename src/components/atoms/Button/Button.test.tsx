import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children as accessible button text", () => {
    render(<Button>Continuar</Button>);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Continuar</Button>);

    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={onClick} disabled>
        Continuar
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  // `disabled` must be the native attribute (see Button's own doc comment:
  // "never a visual-only style") — this is what actually keeps it out of
  // the tab order and announced correctly, not a class name.
  it("sets the native disabled attribute, not just a visual style", () => {
    render(<Button disabled>Continuar</Button>);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled();
  });

  it("renders as its child element when asChild is set (Radix Slot)", () => {
    render(
      <Button asChild>
        <a href="/plano">Ver plano</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Ver plano" });
    expect(link).toHaveAttribute("href", "/plano");
  });

  it.each(["primary", "secondary", "text", "amber", "outline", "outlineMuted"] as const)(
    "has no a11y violations — variant=%s",
    async (variant) => {
      const { container } = render(<Button variant={variant}>Continuar</Button>);
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it("has no a11y violations when disabled", async () => {
    const { container } = render(<Button disabled>Continuar</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
