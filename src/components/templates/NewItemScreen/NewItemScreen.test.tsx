import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { NewItemScreen } from "./NewItemScreen";

const typeOptions = [
  { value: "curso", label: "Curso" },
  { value: "carreira", label: "Ação de carreira" },
];
const tracks = [
  { value: "imersao", label: "Imersão" },
  { value: "linkedin", label: "LinkedIn" },
];
const priorities = [
  { value: "critica", label: "Crítica" },
  { value: "media", label: "Média" },
];
const months = [{ value: "set", label: "Setembro" }];

const baseProps = {
  type: "curso",
  onTypeChange: vi.fn(),
  typeOptions,
  name: "",
  onNameChange: vi.fn(),
  tracks,
  onSelectTrack: vi.fn(),
  hours: "",
  onHoursChange: vi.fn(),
  months,
  month: "set",
  onMonthChange: vi.fn(),
  priorities,
  onSelectPriority: vi.fn(),
  whyNow: "",
  onWhyNowChange: vi.fn(),
  onCancel: vi.fn(),
  onSubmit: vi.fn(),
};

describe("NewItemScreen", () => {
  it("switches the type via the segmented control", async () => {
    const onTypeChange = vi.fn();
    const user = userEvent.setup();
    render(<NewItemScreen {...baseProps} onTypeChange={onTypeChange} />);

    await user.click(screen.getByRole("radio", { name: "Ação de carreira" }));

    expect(onTypeChange).toHaveBeenCalledWith("carreira");
  });

  it("calls onSelectTrack when a track chip is picked", async () => {
    const onSelectTrack = vi.fn();
    const user = userEvent.setup();
    render(<NewItemScreen {...baseProps} onSelectTrack={onSelectTrack} />);

    await user.click(screen.getByRole("button", { name: "LinkedIn" }));

    expect(onSelectTrack).toHaveBeenCalledWith("linkedin");
  });

  it("calls onCancel and onSubmit", async () => {
    const onCancel = vi.fn();
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<NewItemScreen {...baseProps} onCancel={onCancel} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    await user.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<NewItemScreen {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
