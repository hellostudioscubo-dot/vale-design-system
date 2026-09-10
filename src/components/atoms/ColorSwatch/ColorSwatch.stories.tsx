import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColorSwatch } from "./ColorSwatch";
import { companionImages, type CompanionColor } from "@/assets/companions";

const colors: CompanionColor[] = ["Lilás", "Âmbar", "Sálvia", "Ameixa", "Areia", "Dourado"];

const meta = {
  title: "Components/Atoms/ColorSwatch",
  component: ColorSwatch,
  parameters: { layout: "centered" },
  args: { colorName: "Lilás", imageSrc: companionImages.egg["Lilás"], selected: false },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };

/** The full 6-color grid — a `role="radiogroup"`, one swatch checked at a time. */
export const ColorGrid: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<CompanionColor>("Lilás");
    return (
      <div role="radiogroup" aria-label="Cor do dragão" className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            colorName={color}
            imageSrc={companionImages.egg[color]}
            selected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </div>
    );
  },
};
