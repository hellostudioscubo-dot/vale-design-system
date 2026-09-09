import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Components/Atoms/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  args: { value: 40, max: 100, label: "Módulo 2 de 6" },
  render: (args) => (
    <div className="w-80">
      <ProgressBar {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100, label: "Concluído" } };
