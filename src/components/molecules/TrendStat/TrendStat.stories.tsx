import type { Meta, StoryObj } from "@storybook/react";
import { TrendStat } from "./TrendStat";

const meta = {
  title: "Components/Molecules/TrendStat",
  component: TrendStat,
  parameters: { layout: "centered" },
  args: {
    value: "23h",
    caption: "investidas até aqui",
    trend: [
      { label: "jun", value: 4 },
      { label: "jul", value: 14 },
      { label: "ago", value: 23 },
    ],
  },
  render: (args) => (
    <div className="w-[342px]">
      <TrendStat {...args} />
    </div>
  ),
} satisfies Meta<typeof TrendStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HoursInvested: Story = {};

export const ItemsCompleted: Story = {
  args: {
    value: "3 de 33",
    caption: "itens concluídos",
    trend: [
      { label: "jun", value: 1 },
      { label: "jul", value: 2 },
      { label: "ago", value: 3 },
    ],
  },
};

export const NoTrendYet: Story = {
  args: { value: "25min", caption: "investidas até aqui", trend: undefined },
};
