import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { VaultScreen } from "./VaultScreen";
import { HomeIcon, ValeIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

const baseProps = {
  sceneImageSrc: "/vale.png",
  sceneImageAlt: "O vale",
  greeting: "Boa noite, Isabel.",
  onSettingsClick: vi.fn(),
  onProgressClick: vi.fn(),
  onCertificatesClick: vi.fn(),
  navbarItems,
  selectedNavKey: "vale",
  onNavSelect: vi.fn(),
  stats: [{ value: "25min", label: "investidos" }],
};

describe("VaultScreen", () => {
  it("renders the greeting and each stat", () => {
    render(<VaultScreen {...baseProps} />);
    expect(screen.getByText("Boa noite, Isabel.")).toBeInTheDocument();
    expect(screen.getByText("25min")).toBeInTheDocument();
  });

  it("omits the achievement notice when not provided", () => {
    render(<VaultScreen {...baseProps} />);
    expect(screen.queryByText("Conquista desbloqueada!")).not.toBeInTheDocument();
  });

  it("shows the achievement notice when provided", () => {
    render(
      <VaultScreen
        {...baseProps}
        achievementNotice={{ title: "Conquista desbloqueada!", description: "Compartilhe." }}
      />,
    );
    expect(screen.getByText("Conquista desbloqueada!")).toBeInTheDocument();
  });

  it("calls onProgressClick and onCertificatesClick", async () => {
    const onProgressClick = vi.fn();
    const onCertificatesClick = vi.fn();
    const user = userEvent.setup();
    render(
      <VaultScreen {...baseProps} onProgressClick={onProgressClick} onCertificatesClick={onCertificatesClick} />,
    );

    await user.click(screen.getByRole("button", { name: "Progresso" }));
    await user.click(screen.getByRole("button", { name: "Conquistas" }));

    expect(onProgressClick).toHaveBeenCalledTimes(1);
    expect(onCertificatesClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<VaultScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
