import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Components/Organisms/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Parabéns!",
    description: "Mais 25 minutos dedicados a você. Isso já é o suficiente por hoje.",
    actionLabel: "Encerrar tempo de foco",
    onAction: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Parabens: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Parabéns!"
        description="Mais 25 minutos dedicados a você. Isso já é o suficiente por hoje."
        actionLabel="Encerrar tempo de foco"
        onAction={() => setOpen(false)}
        trigger={<Button>Abrir modal</Button>}
      />
    );
  },
};

export const ParabensCompleto: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Fique tranquilo!"
        description="Você conseguiu dedicar o tempo que podia por hoje."
        actionLabel="Encerrar tempo de foco"
        onAction={() => setOpen(false)}
        trigger={<Button>Abrir modal</Button>}
      />
    );
  },
};
