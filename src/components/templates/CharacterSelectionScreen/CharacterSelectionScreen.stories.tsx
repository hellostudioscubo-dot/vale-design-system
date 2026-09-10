import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CharacterSelectionScreen } from "./CharacterSelectionScreen";
import { companionImages, type CompanionColor } from "@/assets/companions";

const colorNames: CompanionColor[] = ["Lilás", "Âmbar", "Sálvia", "Ameixa", "Areia", "Dourado"];
const colors = colorNames.map((name) => ({
  name,
  previewImageSrc: companionImages.egg[name],
  swatchImageSrc: companionImages.egg[name],
}));

const meta = {
  title: "Templates/CharacterSelectionScreen",
  component: CharacterSelectionScreen,
  parameters: { layout: "fullscreen" },
  args: { colors, companionName: "Faísca", onCompanionNameChange: () => {}, onContinue: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterSelectionScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LilacSelected: Story = {
  args: { selectedColor: "Lilás", onSelectColor: () => {} },
};

/** Interactive — clicking a swatch updates the preview and selection. */
export const Interactive: Story = {
  args: { selectedColor: "Lilás", onSelectColor: () => {} },
  render: function Render() {
    const [selected, setSelected] = useState<CompanionColor>("Lilás");
    const [name, setName] = useState("Faísca");
    return (
      <CharacterSelectionScreen
        colors={colors}
        selectedColor={selected}
        onSelectColor={(value) => setSelected(value as CompanionColor)}
        companionName={name}
        onCompanionNameChange={setName}
        onContinue={() => {}}
      />
    );
  },
};
