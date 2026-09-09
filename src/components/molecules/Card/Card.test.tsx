import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Card } from "./Card";

const track = { label: "Imersão", tone: "primary" } as const;

describe("Card", () => {
  it("renders track chip, title and subtitle", () => {
    render(
      <Card
        track={track}
        title="Fundamentos de Growth"
        subtitle="Módulo 2 de 6 · 15 min restantes"
      />,
    );
    expect(screen.getByText("Imersão")).toBeInTheDocument();
    expect(screen.getByText("Fundamentos de Growth")).toBeInTheDocument();
    expect(screen.getByText("Módulo 2 de 6 · 15 min restantes")).toBeInTheDocument();
  });

  it("only shows the continue button on the expanded variant", () => {
    const { rerender } = render(
      <Card track={track} title="T" subtitle="S" variant="compact" onContinue={vi.fn()} />,
    );
    expect(screen.queryByRole("button", { name: "Continuar" })).not.toBeInTheDocument();

    rerender(
      <Card track={track} title="T" subtitle="S" variant="expanded" onContinue={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
  });

  it("calls onContinue when the expanded variant's button is clicked", async () => {
    const onContinue = vi.fn();
    const user = userEvent.setup();
    render(
      <Card track={track} title="T" subtitle="S" variant="expanded" onContinue={onContinue} />,
    );

    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("announces completion for screen readers on the completed variant", () => {
    render(<Card track={track} title="T" subtitle="Concluído em 12 de agosto" variant="completed" />);
    expect(screen.getByText("Concluído")).toBeInTheDocument();
  });

  it.each(["compact", "expanded", "completed"] as const)(
    "has no a11y violations — variant=%s",
    async (variant) => {
      const { container } = render(
        <Card track={track} title="T" subtitle="S" variant={variant} onContinue={vi.fn()} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
