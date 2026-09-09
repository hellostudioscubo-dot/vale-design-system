import type { Meta, StoryObj } from "@storybook/react";
import { EggCard } from "./EggCard";
import { companionImages } from "@/assets/companions";

const meta = {
  title: "Components/Molecules/EggCard",
  component: EggCard,
  parameters: { layout: "centered" },
  args: {
    imageSrc: companionImages.egg.Lilás,
    colorName: "Lilás",
    stage: "egg",
  },
  render: (args) => (
    <div className="w-56">
      <EggCard {...args} />
    </div>
  ),
} satisfies Meta<typeof EggCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Egg: Story = { args: { stage: "egg", imageSrc: companionImages.egg.Lilás } };
export const Hatchling: Story = {
  args: { stage: "hatchling", imageSrc: companionImages.hatchling.Lilás },
};
export const YoungAdult: Story = {
  args: { stage: "youngAdult", imageSrc: companionImages.youngAdult.Lilás },
};

/** All six character colors, matching Foundations → Colors → Marca / Ação e estado. */
export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(Object.keys(companionImages.hatchling) as Array<keyof typeof companionImages.hatchling>).map(
        (name) => (
          <EggCard
            key={name}
            imageSrc={companionImages.hatchling[name]}
            colorName={name}
            stage="hatchling"
          />
        ),
      )}
    </div>
  ),
};
