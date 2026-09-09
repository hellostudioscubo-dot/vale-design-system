import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Components/Molecules/Card",
  component: Card,
  parameters: { layout: "centered" },
  args: {
    track: { label: "Imersão", tone: "primary" },
    title: "Fundamentos de Growth",
    subtitle: "Módulo 2 de 6 · 15 min restantes",
  },
  render: (args) => (
    <div className="w-80">
      <Card {...args} />
    </div>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = { args: { variant: "compact" } };

export const Expanded: Story = {
  args: { variant: "expanded", onContinue: () => alert("Continuar") },
};

export const Completed: Story = {
  args: {
    variant: "completed",
    subtitle: "Concluído em 12 de agosto",
  },
};
