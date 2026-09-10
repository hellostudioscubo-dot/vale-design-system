import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { LoginScreen } from "./LoginScreen";

describe("LoginScreen", () => {
  it("calls the matching callback for each auth action", async () => {
    const onGoogle = vi.fn();
    const onApple = vi.fn();
    const onEmail = vi.fn();
    const onContinueWithoutAccount = vi.fn();
    const user = userEvent.setup();
    render(
      <LoginScreen
        onGoogle={onGoogle}
        onApple={onApple}
        onEmail={onEmail}
        onContinueWithoutAccount={onContinueWithoutAccount}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Continuar com Google/ }));
    await user.click(screen.getByRole("button", { name: /Continuar com Apple/ }));
    await user.click(screen.getByRole("button", { name: "Criar conta com e-mail" }));
    await user.click(screen.getByRole("button", { name: "Continuar sem conta" }));

    expect(onGoogle).toHaveBeenCalledTimes(1);
    expect(onApple).toHaveBeenCalledTimes(1);
    expect(onEmail).toHaveBeenCalledTimes(1);
    expect(onContinueWithoutAccount).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <LoginScreen onGoogle={vi.fn()} onApple={vi.fn()} onEmail={vi.fn()} onContinueWithoutAccount={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
