import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { OnboardingCourseFormScreen } from "./OnboardingCourseFormScreen";

const baseProps = {
  courseName: "",
  onCourseNameChange: vi.fn(),
  courseHours: "",
  onCourseHoursChange: vi.fn(),
  onSubmit: vi.fn(),
  onSkip: vi.fn(),
};

describe("OnboardingCourseFormScreen", () => {
  it("disables the CTA when isValid is false", () => {
    render(<OnboardingCourseFormScreen {...baseProps} isValid={false} />);
    expect(screen.getByRole("button", { name: "Começar" })).toBeDisabled();
  });

  it("enables the CTA when isValid is true", () => {
    render(<OnboardingCourseFormScreen {...baseProps} isValid />);
    expect(screen.getByRole("button", { name: "Começar" })).toBeEnabled();
  });

  it("calls onSubmit when the enabled CTA is clicked", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OnboardingCourseFormScreen {...baseProps} isValid onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Começar" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onSkip", async () => {
    const onSkip = vi.fn();
    const user = userEvent.setup();
    render(<OnboardingCourseFormScreen {...baseProps} isValid={false} onSkip={onSkip} />);

    await user.click(screen.getByRole("button", { name: "Não lembro de nenhum" }));

    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<OnboardingCourseFormScreen {...baseProps} isValid={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
