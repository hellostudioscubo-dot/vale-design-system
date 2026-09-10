import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Atoms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  args: {
    label: "Por que agora (opcional)",
    placeholder: "Escreva uma mensagem para você ler em um dia ruim pra você continuar",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const Filled: Story = {
  args: { defaultValue: "Porque eu já paguei o curso e não vou desistir agora." },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { error: "Escreva pelo menos uma frase." },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};
