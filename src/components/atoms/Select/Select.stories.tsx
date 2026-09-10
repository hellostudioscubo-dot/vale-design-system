import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const months = [
  { value: "ago", label: "Agosto" },
  { value: "set", label: "Setembro" },
  { value: "out", label: "Outubro" },
];

const meta = {
  title: "Components/Atoms/Select",
  component: Select,
  parameters: { layout: "centered" },
  args: {
    label: "Mês (opcional)",
    options: months,
    defaultValue: "set",
  },
  render: (args) => (
    <div className="w-80">
      <Select {...args} />
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: "Selecione um mês válido." },
};

export const Disabled: Story = {
  args: { disabled: true },
};
