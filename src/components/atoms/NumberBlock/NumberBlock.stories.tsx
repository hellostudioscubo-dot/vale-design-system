import type { Meta, StoryObj } from "@storybook/react";
import { NumberBlock } from "./NumberBlock";

const meta = {
  title: "Components/Atoms/NumberBlock",
  component: NumberBlock,
  parameters: { layout: "centered" },
  args: { value: 12, label: "dias seguidos" },
} satisfies Meta<typeof NumberBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Achievement: Story = {
  args: { value: 3, label: "certificados", emphasis: true },
};
