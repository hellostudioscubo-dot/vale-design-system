import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Components/Atoms/ProgressRing",
  component: ProgressRing,
  parameters: { layout: "centered" },
  args: { value: 65, max: 100, valueLabel: "24:31", caption: "Sessão 1" },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlmostDone: Story = { args: { value: 95 } };
