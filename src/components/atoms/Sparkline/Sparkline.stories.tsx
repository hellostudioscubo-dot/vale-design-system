import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const meta = {
  title: "Components/Atoms/Sparkline",
  component: Sparkline,
  parameters: { layout: "centered" },
  args: {
    points: [
      { label: "jun", value: 4 },
      { label: "jul", value: 14 },
      { label: "ago", value: 23 },
    ],
  },
  render: (args) => (
    <div className="w-[294px] rounded-card border border-border bg-surface p-4">
      <Sparkline {...args} />
    </div>
  ),
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Trending: Story = {};

export const Flat: Story = {
  args: {
    points: [
      { label: "jun", value: 10 },
      { label: "jul", value: 10 },
      { label: "ago", value: 10 },
    ],
  },
};

export const Declining: Story = {
  args: {
    points: [
      { label: "jun", value: 30 },
      { label: "jul", value: 18 },
      { label: "ago", value: 6 },
    ],
  },
};
