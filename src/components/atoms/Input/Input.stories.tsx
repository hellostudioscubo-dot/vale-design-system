import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Components/Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: {
    label: "Nome completo",
    placeholder: "Seu nome completo",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { defaultValue: "Marina Duarte" },
};

export const WithError: Story = {
  args: { error: "Preenchimento obrigatório.", defaultValue: "" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Input label="Vazio" placeholder="Seu nome completo" />
      <Input label="Preenchido" defaultValue="Marina Duarte" />
      <Input label="Com erro" error="Preenchimento obrigatório." />
      <Input label="Desabilitado" placeholder="Seu nome completo" disabled />
    </div>
  ),
};
