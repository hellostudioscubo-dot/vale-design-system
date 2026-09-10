import type { Meta, StoryObj } from "@storybook/react";
import { SessionHistoryItem } from "./SessionHistoryItem";

const meta = {
  title: "Components/Molecules/SessionHistoryItem",
  component: SessionHistoryItem,
  parameters: { layout: "centered" },
  args: {
    title: "12 de agosto · 45 min",
    description: "Terminei o módulo de wireframes.",
  },
  render: (args) => (
    <ul className="w-80">
      <SessionHistoryItem {...args} />
    </ul>
  ),
} satisfies Meta<typeof SessionHistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Detalhe do item primeiro acesso — no real history yet. */
export const EmptyState: Story = {
  args: {
    title: "Ainda precisamos começar!",
    description: "Em breve aqui vai estar cheio",
  },
};

export const List: Story = {
  render: () => (
    <ul className="flex w-80 flex-col gap-2">
      <SessionHistoryItem title="12 de agosto · 45 min" description="Terminei o módulo de wireframes." />
      <SessionHistoryItem title="10 de agosto · 30 min" description="Terminei o módulo de grid" />
      <SessionHistoryItem title="8 de agosto · 1h15" description="Comecei a trabalhar no protótipo." />
    </ul>
  ),
};
