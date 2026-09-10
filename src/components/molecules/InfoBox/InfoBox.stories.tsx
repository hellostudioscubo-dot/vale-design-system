import type { Meta, StoryObj } from "@storybook/react";
import { InfoBox } from "./InfoBox";

const meta = {
  title: "Components/Molecules/InfoBox",
  component: InfoBox,
  parameters: { layout: "centered" },
  args: {
    title: "Por que agora?",
    description: "Você já começou. Termine o que está aberto antes de começar um novo.",
  },
  render: (args) => (
    <div className="w-80">
      <InfoBox {...args} />
    </div>
  ),
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
