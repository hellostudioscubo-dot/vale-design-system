import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { FocusSessionScreen } from "./FocusSessionScreen";

const baseProps = {
  onBack: vi.fn(),
  onArchive: vi.fn(),
  timeLabel: "25:00",
  sessionLabel: "Sessão 1",
  progressValue: 0,
  progressMax: 25,
  companionImageSrc: "/dragao.png",
  companionImageAlt: "Faísca crescendo",
  growthMessage: "Enquanto você estuda, seu dragão está crescendo.",
  onTogglePlay: vi.fn(),
  onEnd: vi.fn(),
};

describe("FocusSessionScreen", () => {
  it("shows the countdown via ProgressRing", () => {
    render(<FocusSessionScreen {...baseProps} isPlaying={false} />);
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("shows 'Iniciar' when paused and 'Pausar' when playing", () => {
    const { rerender } = render(<FocusSessionScreen {...baseProps} isPlaying={false} />);
    expect(screen.getByRole("button", { name: "Iniciar" })).toBeInTheDocument();

    rerender(<FocusSessionScreen {...baseProps} isPlaying />);
    expect(screen.getByRole("button", { name: "Pausar" })).toBeInTheDocument();
  });

  it("calls onTogglePlay and onEnd", async () => {
    const onTogglePlay = vi.fn();
    const onEnd = vi.fn();
    const user = userEvent.setup();
    render(
      <FocusSessionScreen {...baseProps} isPlaying={false} onTogglePlay={onTogglePlay} onEnd={onEnd} />,
    );

    await user.click(screen.getByRole("button", { name: "Iniciar" }));
    await user.click(screen.getByRole("button", { name: "Encerrar" }));

    expect(onTogglePlay).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<FocusSessionScreen {...baseProps} isPlaying={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
