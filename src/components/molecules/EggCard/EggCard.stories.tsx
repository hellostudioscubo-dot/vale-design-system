import type { Meta, StoryObj } from "@storybook/react";
import { EggCard } from "./EggCard";

/** Storybook-only placeholder — real apps pass the actual illustration URL. */
function placeholder(hex: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="342" height="260"><rect width="342" height="260" fill="${hex}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const meta = {
  title: "Components/Molecules/EggCard",
  component: EggCard,
  parameters: { layout: "centered" },
  args: {
    imageSrc: placeholder("#B9A6DC"),
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

export const Egg: Story = { args: { stage: "egg" } };
export const Hatchling: Story = { args: { stage: "hatchling" } };
export const YoungAdult: Story = { args: { stage: "youngAdult" } };

/** All six character colors, matching Foundations → Colors → Marca / Ação e estado. */
export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[
        ["Lilás", "#B9A6DC"],
        ["Âmbar", "#E8A33D"],
        ["Sálvia", "#7E9A7A"],
        ["Ameixa", "#5F4B8B"],
        ["Areia", "#F7F3ED"],
        ["Dourado", "#C9A961"],
      ].map(([name, hex]) => (
        <EggCard key={name} imageSrc={placeholder(hex)} colorName={name} stage="hatchling" />
      ))}
    </div>
  ),
};
