import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/Molecules/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  args: {
    icon: "✨",
    message: "Depois que você concluir suas metas de conquistas elas vão aparecer aqui!",
  },
  render: (args) => (
    <div className="w-80">
      <EmptyState {...args} />
    </div>
  ),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Achievements: Story = {};
