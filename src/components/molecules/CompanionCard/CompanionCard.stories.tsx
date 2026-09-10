import type { Meta, StoryObj } from "@storybook/react";
import { CompanionCard } from "./CompanionCard";
import { companionImages } from "@/assets/companions";

const meta = {
  title: "Components/Molecules/CompanionCard",
  component: CompanionCard,
  parameters: { layout: "centered" },
  args: {
    imageSrc: companionImages.hatchling["Lilás"],
    imageAlt: "Faísca, seu dragão bebê",
  },
  render: (args) => (
    <div className="w-[342px]">
      <CompanionCard {...args} />
    </div>
  ),
} satisfies Meta<typeof CompanionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** First access — no history yet, so no stats row. */
export const FirstAccess: Story = {};

/** After a few study sessions — stats appear under the illustration. */
export const WithStats: Story = {
  args: {
    stats: [
      { value: "23h", label: "estudando" },
      { value: 3, label: "certificados" },
      { value: 2, label: "publicações" },
    ],
  },
};
