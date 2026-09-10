import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "@/components/molecules/SettingsRow";

describe("SettingsSection", () => {
  it("renders the section title as a heading", () => {
    render(
      <SettingsSection title="SESSÃO">
        <SettingsRow label="Duração da sessão" value="25 min" onClick={() => {}} />
      </SettingsSection>,
    );
    expect(screen.getByRole("heading", { name: "SESSÃO" })).toBeInTheDocument();
  });

  it("renders its rows inside a real list", () => {
    render(
      <SettingsSection title="SESSÃO">
        <SettingsRow label="Duração da sessão" value="25 min" onClick={() => {}} />
        <SettingsRow label="Som ambiente" value="Ligado" onClick={() => {}} />
      </SettingsSection>,
    );
    expect(screen.getByRole("list").children).toHaveLength(2);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <SettingsSection title="SESSÃO">
        <SettingsRow label="Duração da sessão" value="25 min" onClick={() => {}} />
      </SettingsSection>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
