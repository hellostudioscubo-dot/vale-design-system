import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SessionEndScreen } from "./SessionEndScreen";

const baseProps = {
  companionImageSrc: "/dragao.png",
  companionImageAlt: "Faísca comemorando",
  learnerName: "Isabel",
  minutes: 25,
  courseName: "UI Boost | Design Mobile",
  noteValue: "",
  onNoteChange: vi.fn(),
  onYes: vi.fn(),
  onNo: vi.fn(),
};

describe("SessionEndScreen", () => {
  it("composes the congrats line from its parts", () => {
    render(<SessionEndScreen {...baseProps} />);
    expect(screen.getByText("Parabéns, Isabel!", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("25 minutos em UI Boost | Design Mobile")).toBeInTheDocument();
  });

  it("calls onYes and onNo", async () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const user = userEvent.setup();
    render(<SessionEndScreen {...baseProps} onYes={onYes} onNo={onNo} />);

    await user.click(screen.getByRole("button", { name: "Sim, terminei" }));
    await user.click(screen.getByRole("button", { name: "Ainda não" }));

    expect(onYes).toHaveBeenCalledTimes(1);
    expect(onNo).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SessionEndScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
