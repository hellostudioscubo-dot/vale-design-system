import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ColorSwatch } from "./ColorSwatch";

describe("ColorSwatch", () => {
  it("renders as a radio with the color name as its accessible name", () => {
    render(<ColorSwatch imageSrc="/lilas.png" colorName="Lilás" />);
    expect(screen.getByRole("radio", { name: "Lilás" })).toBeInTheDocument();
  });

  it("reflects the selected state via aria-checked", () => {
    render(<ColorSwatch imageSrc="/lilas.png" colorName="Lilás" selected />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });

  it("defaults to unchecked", () => {
    render(<ColorSwatch imageSrc="/lilas.png" colorName="Lilás" />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onClick when picked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ColorSwatch imageSrc="/lilas.png" colorName="Lilás" onClick={onClick} />);

    await user.click(screen.getByRole("radio"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no a11y violations inside a radiogroup", async () => {
    const { container } = render(
      <div role="radiogroup" aria-label="Cor do dragão">
        <ColorSwatch imageSrc="/lilas.png" colorName="Lilás" selected />
        <ColorSwatch imageSrc="/ambar.png" colorName="Âmbar" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
