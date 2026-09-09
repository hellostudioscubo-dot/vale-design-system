import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Chip, ChipToggle } from "./Chip";

describe("Chip", () => {
  it("renders its label as static text, not an interactive control", () => {
    render(<Chip tone="primary">Imersão</Chip>);
    const chip = screen.getByText("Imersão");
    expect(chip.tagName).toBe("SPAN");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it.each(["neutral", "primary", "success", "warning", "achievement"] as const)(
    "has no a11y violations — tone=%s",
    async (tone) => {
      const { container } = render(<Chip tone={tone}>Imersão</Chip>);
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

describe("ChipToggle", () => {
  it("exposes its pressed state via aria-pressed", () => {
    render(
      <ChipToggle tone="primary" pressed>
        Imersão
      </ChipToggle>,
    );
    expect(screen.getByRole("button", { name: "Imersão" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipToggle tone="primary" pressed={false} onClick={onClick}>
        Imersão
      </ChipToggle>,
    );

    await user.click(screen.getByRole("button", { name: "Imersão" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations, pressed or not", async () => {
    const { container, rerender } = render(
      <ChipToggle tone="primary" pressed={false}>
        Imersão
      </ChipToggle>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <ChipToggle tone="primary" pressed>
        Imersão
      </ChipToggle>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
