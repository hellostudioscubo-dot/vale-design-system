import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CharacterSelectionScreen } from "./CharacterSelectionScreen";

const colors = [
  { name: "Lilás", previewImageSrc: "/lilas.png", swatchImageSrc: "/lilas.png" },
  { name: "Âmbar", previewImageSrc: "/ambar.png", swatchImageSrc: "/ambar.png" },
];

const baseProps = {
  colors,
  companionName: "Faísca",
  onCompanionNameChange: vi.fn(),
  onContinue: vi.fn(),
  onSelectColor: vi.fn(),
};

describe("CharacterSelectionScreen", () => {
  it("renders one radio swatch per color", () => {
    render(<CharacterSelectionScreen {...baseProps} selectedColor="Lilás" />);
    expect(screen.getByRole("radio", { name: "Lilás" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Âmbar" })).toBeInTheDocument();
  });

  it("marks only the selected color as checked", () => {
    render(<CharacterSelectionScreen {...baseProps} selectedColor="Âmbar" />);
    expect(screen.getByRole("radio", { name: "Lilás" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("radio", { name: "Âmbar" })).toHaveAttribute("aria-checked", "true");
  });

  it("calls onSelectColor when a swatch is picked", async () => {
    const onSelectColor = vi.fn();
    const user = userEvent.setup();
    render(<CharacterSelectionScreen {...baseProps} selectedColor="Lilás" onSelectColor={onSelectColor} />);

    await user.click(screen.getByRole("radio", { name: "Âmbar" }));

    expect(onSelectColor).toHaveBeenCalledWith("Âmbar");
  });

  it("lets the learner name their companion", () => {
    render(<CharacterSelectionScreen {...baseProps} selectedColor="Lilás" />);
    expect(screen.getByLabelText("Nome do dragão")).toHaveValue("Faísca");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<CharacterSelectionScreen {...baseProps} selectedColor="Lilás" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
