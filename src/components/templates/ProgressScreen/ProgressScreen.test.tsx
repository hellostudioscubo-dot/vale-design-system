import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ProgressScreen } from "./ProgressScreen";

const baseProps = {
  onBack: vi.fn(),
  onArchive: vi.fn(),
  metrics: [{ value: "25min", caption: "investidas até aqui" }],
};

describe("ProgressScreen", () => {
  it("renders the title and each metric", () => {
    render(<ProgressScreen {...baseProps} />);
    expect(screen.getByRole("heading", { name: "Progresso" })).toBeInTheDocument();
    expect(screen.getByText("25min")).toBeInTheDocument();
  });

  it("renders the footnote by default", () => {
    render(<ProgressScreen {...baseProps} />);
    expect(screen.getByText(/A previsão acompanha/)).toBeInTheDocument();
  });

  it("calls onBack and onArchive", async () => {
    const onBack = vi.fn();
    const onArchive = vi.fn();
    const user = userEvent.setup();
    render(<ProgressScreen {...baseProps} onBack={onBack} onArchive={onArchive} />);

    await user.click(screen.getByRole("button", { name: "Voltar" }));
    await user.click(screen.getByRole("button", { name: "Arquivar" }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onArchive).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<ProgressScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
