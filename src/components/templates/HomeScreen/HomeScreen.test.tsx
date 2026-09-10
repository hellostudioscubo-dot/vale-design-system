import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { HomeScreen } from "./HomeScreen";
import { HomeIcon, PlanIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
];

const baseProps = {
  greeting: "Boa noite, Isabel.",
  onSettingsClick: vi.fn(),
  companionImageSrc: "/dragao.png",
  companionImageAlt: "Faísca",
  navbarItems,
  selectedNavKey: "hoje",
  onNavSelect: vi.fn(),
  cards: [
    {
      key: "1",
      track: { label: "Imersão" as const },
      title: "UI Boost — Design Mobile",
      subtitle: "9h estimadas · 3h investidas",
      onContinue: vi.fn(),
    },
  ],
};

describe("HomeScreen", () => {
  it("renders the greeting and each card's content", () => {
    render(<HomeScreen {...baseProps} />);
    expect(screen.getByText("Boa noite, Isabel.")).toBeInTheDocument();
    expect(screen.getByText("UI Boost — Design Mobile")).toBeInTheDocument();
  });

  it("omits stats and the companion intro on first access", () => {
    render(<HomeScreen {...baseProps} />);
    expect(screen.queryByText("estudando")).not.toBeInTheDocument();
    expect(screen.queryByText("Esse é o Faísca!")).not.toBeInTheDocument();
  });

  it("shows the companion intro bubble when provided", () => {
    render(
      <HomeScreen
        {...baseProps}
        companionIntro={{ title: "Esse é o Faísca!", description: "Ele é um bebê." }}
      />,
    );
    expect(screen.getByText("Esse é o Faísca!")).toBeInTheDocument();
  });

  it("calls onSettingsClick", async () => {
    const onSettingsClick = vi.fn();
    const user = userEvent.setup();
    render(<HomeScreen {...baseProps} onSettingsClick={onSettingsClick} />);

    await user.click(screen.getByRole("button", { name: "Ajustes" }));

    expect(onSettingsClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<HomeScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
