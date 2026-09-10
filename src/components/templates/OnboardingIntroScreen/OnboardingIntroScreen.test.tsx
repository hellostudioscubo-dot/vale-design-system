import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { OnboardingIntroScreen } from "./OnboardingIntroScreen";

const baseProps = {
  step: 1,
  title: "Estudar depois do trabalho é difícil...",
  subtitle: "Não é falta de vontade. É falta de energia.",
  illustration: <div>ilustração</div>,
};

describe("OnboardingIntroScreen", () => {
  it("renders the title and subtitle as visible text", () => {
    render(<OnboardingIntroScreen {...baseProps} onSkip={vi.fn()} onContinue={vi.fn()} />);
    expect(screen.getByText("Estudar depois do trabalho é difícil...")).toBeInTheDocument();
    expect(screen.getByText("Não é falta de vontade. É falta de energia.")).toBeInTheDocument();
  });

  it("shows the current step via StepDots", () => {
    render(<OnboardingIntroScreen {...baseProps} step={2} onSkip={vi.fn()} onContinue={vi.fn()} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
  });

  it("calls onSkip and onContinue", async () => {
    const onSkip = vi.fn();
    const onContinue = vi.fn();
    const user = userEvent.setup();
    render(<OnboardingIntroScreen {...baseProps} onSkip={onSkip} onContinue={onContinue} />);

    await user.click(screen.getByRole("button", { name: "Pular" }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onSkip).toHaveBeenCalledTimes(1);
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <OnboardingIntroScreen {...baseProps} onSkip={vi.fn()} onContinue={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
