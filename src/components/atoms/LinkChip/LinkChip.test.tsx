import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { LinkChip } from "./LinkChip";
import { PlanIcon } from "@/icons";

describe("LinkChip", () => {
  it("renders as an accessible button with its text as the name", () => {
    render(<LinkChip icon={<PlanIcon />}>Progresso</LinkChip>);
    expect(screen.getByRole("button", { name: "Progresso" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <LinkChip icon={<PlanIcon />} onClick={onClick}>
        Progresso
      </LinkChip>,
    );

    await user.click(screen.getByRole("button", { name: "Progresso" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<LinkChip icon={<PlanIcon />}>Progresso</LinkChip>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
