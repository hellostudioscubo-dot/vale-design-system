import type { Meta, StoryObj } from "@storybook/react";
import { MonthStrip } from "./MonthStrip";
import { Card } from "@/components/molecules/Card";

const meta = {
  title: "Components/Molecules/MonthStrip",
  component: MonthStrip,
  parameters: { layout: "centered" },
  args: { month: "Agosto", itemCount: 8, children: null },
  render: (args) => (
    <div className="w-96">
      <MonthStrip {...args}>
        <Card
          track={{ label: "Imersão", tone: "primary" }}
          title="Fundamentos de Growth"
          subtitle="Módulo 2 de 6 · 15 min restantes"
          variant="compact"
        />
      </MonthStrip>
    </div>
  ),
} satisfies Meta<typeof MonthStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { defaultOpen: true } };
export const Collapsed: Story = { args: { defaultOpen: false } };
export const Completed: Story = { args: { completed: true } };
