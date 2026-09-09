import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip, ChipToggle } from "./Chip";

const meta = {
  title: "Components/Atoms/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  args: { children: "Imersão", tone: "primary" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tracks: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip tone="primary">Imersão</Chip>
      <Chip tone="success">IA Creative</Chip>
      <Chip tone="neutral">LinkedIn</Chip>
      <Chip tone="warning">Portfólio</Chip>
      <Chip tone="achievement">Currículo</Chip>
      <Chip tone="primary">Rede</Chip>
    </div>
  ),
};

export const Toggleable: Story = {
  render: function Render() {
    const [pressed, setPressed] = useState(false);
    return (
      <ChipToggle tone="primary" pressed={pressed} onClick={() => setPressed((p) => !p)}>
        Imersão
      </ChipToggle>
    );
  },
};
