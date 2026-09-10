import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SettingsScreen } from "./SettingsScreen";
import { SettingsSection } from "@/components/organisms/SettingsSection";
import { SettingsRow } from "@/components/molecules/SettingsRow";

describe("SettingsScreen", () => {
  it("renders the title and its section children", () => {
    render(
      <SettingsScreen onBack={vi.fn()} onArchive={vi.fn()}>
        <SettingsSection title="PERSONAGEM">
          <SettingsRow label="Cor" value="Lilás" onClick={vi.fn()} />
        </SettingsSection>
      </SettingsScreen>,
    );
    expect(screen.getByRole("heading", { name: "Ajustes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PERSONAGEM" })).toBeInTheDocument();
    expect(screen.getByText("Cor")).toBeInTheDocument();
  });

  it("calls onBack and onArchive", async () => {
    const onBack = vi.fn();
    const onArchive = vi.fn();
    const user = userEvent.setup();
    render(
      <SettingsScreen onBack={onBack} onArchive={onArchive}>
        <div />
      </SettingsScreen>,
    );

    await user.click(screen.getByRole("button", { name: "Voltar" }));
    await user.click(screen.getByRole("button", { name: "Arquivar" }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onArchive).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <SettingsScreen onBack={vi.fn()} onArchive={vi.fn()}>
        <SettingsSection title="PERSONAGEM">
          <SettingsRow label="Cor" value="Lilás" onClick={vi.fn()} />
        </SettingsSection>
      </SettingsScreen>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
