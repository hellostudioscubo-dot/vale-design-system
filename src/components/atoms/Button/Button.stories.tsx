import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "text", "amber", "outline", "outlineMuted"],
    },
    size: { control: "select", options: ["md", "sm"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Continuar",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Continuar" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Ver detalhes" },
};

export const Text: Story = {
  args: { variant: "text", children: "Pular por agora" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Continuar" },
};

/** "Fluxo do App - mobile" override for every screen-flow CTA — see Button's doc comment. */
export const Amber: Story = {
  args: { variant: "amber", children: "Vou estudar agora" },
};

/** Only used on "Sessão em foco" — a full-bleed dark takeover, not the normal page surface. */
export const Outline: Story = {
  args: { variant: "outline", children: "Iniciar" },
  decorators: [
    (Story) => (
      <div className="rounded-card bg-primary-pressed p-6">
        <Story />
      </div>
    ),
  ],
};

export const OutlineMuted: Story = {
  args: { variant: "outlineMuted", children: "Encerrar" },
  decorators: [
    (Story) => (
      <div className="rounded-card bg-primary-pressed p-6">
        <Story />
      </div>
    ),
  ],
};

/** All three variants side by side, matching the Figma Button page. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Button variant="primary">Continuar</Button>
        <Button variant="primary" disabled>
          Continuar
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">Ver detalhes</Button>
        <Button variant="secondary" disabled>
          Ver detalhes
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="text">Pular por agora</Button>
        <Button variant="text" disabled>
          Pular por agora
        </Button>
      </div>
    </div>
  ),
};
