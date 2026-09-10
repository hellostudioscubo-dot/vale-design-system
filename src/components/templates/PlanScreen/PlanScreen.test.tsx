import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { PlanScreen } from "./PlanScreen";
import { HomeIcon, PlanIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
];

const baseProps = {
  title: "Plano",
  description: "Esse é o plano dos próximos meses.",
  onAdd: vi.fn(),
  navbarItems,
  selectedNavKey: "plano",
  onNavSelect: vi.fn(),
  sections: [
    {
      month: "Agosto",
      items: [
        {
          key: "1",
          track: { label: "Imersão" },
          title: "UI Boost — Design Mobile",
          subtitle: "Módulo 2 de 6",
          variant: "expanded" as const,
          onContinue: vi.fn(),
        },
      ],
    },
  ],
};

describe("PlanScreen", () => {
  it("renders the title, description and each item's title", () => {
    render(<PlanScreen {...baseProps} />);
    expect(screen.getByRole("heading", { name: "Plano" })).toBeInTheDocument();
    expect(screen.getByText("Esse é o plano dos próximos meses.")).toBeInTheDocument();
    expect(screen.getByText("UI Boost — Design Mobile")).toBeInTheDocument();
  });

  it("groups items under a MonthStrip labeled with the month", () => {
    render(<PlanScreen {...baseProps} />);
    expect(screen.getByRole("button", { name: /Agosto/ })).toBeInTheDocument();
  });

  it("calls onAdd", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<PlanScreen {...baseProps} onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: "Adicionar item" }));

    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("also works for the Carreira content (same template, different data)", () => {
    render(
      <PlanScreen
        {...baseProps}
        title="Carreira"
        description="Mini-tarefas de carreira."
        selectedNavKey="carreira"
      />,
    );
    expect(screen.getByRole("heading", { name: "Carreira" })).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<PlanScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
