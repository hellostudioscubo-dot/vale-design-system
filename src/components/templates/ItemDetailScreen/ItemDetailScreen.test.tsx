import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ItemDetailScreen } from "./ItemDetailScreen";

const baseProps = {
  onBack: vi.fn(),
  onArchive: vi.fn(),
  track: { label: "Imersão" },
  title: "UI Boost — Design Mobile",
  meta: "9h estimadas · 24 aulas",
  progressLabel: "3h de 9h",
  progressValue: 3,
  progressMax: 9,
  ctaLabel: "Continuar",
  onStart: vi.fn(),
  history: [{ title: "12 de agosto · 45 min", description: "Terminei o módulo." }],
};

describe("ItemDetailScreen", () => {
  it("renders the title, meta and history entries", () => {
    render(<ItemDetailScreen {...baseProps} />);
    expect(screen.getByText("UI Boost — Design Mobile")).toBeInTheDocument();
    expect(screen.getByText("9h estimadas · 24 aulas")).toBeInTheDocument();
    expect(screen.getByText("Terminei o módulo.")).toBeInTheDocument();
  });

  it("omits the InfoBox when whyNow is not provided", () => {
    render(<ItemDetailScreen {...baseProps} />);
    expect(screen.queryByText("Por que agora?")).not.toBeInTheDocument();
  });

  it("shows the InfoBox when whyNow is provided", () => {
    render(
      <ItemDetailScreen
        {...baseProps}
        whyNow={{ title: "Por que agora?", description: "Você já começou." }}
      />,
    );
    expect(screen.getByText("Por que agora?")).toBeInTheDocument();
  });

  it("calls onBack, onArchive and onStart", async () => {
    const onBack = vi.fn();
    const onArchive = vi.fn();
    const onStart = vi.fn();
    const user = userEvent.setup();
    render(<ItemDetailScreen {...baseProps} onBack={onBack} onArchive={onArchive} onStart={onStart} />);

    await user.click(screen.getByRole("button", { name: "Voltar" }));
    await user.click(screen.getByRole("button", { name: "Arquivar" }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onArchive).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<ItemDetailScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
