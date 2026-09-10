import type { Meta, StoryObj } from "@storybook/react";
import { ItemDetailScreen } from "./ItemDetailScreen";

const meta = {
  title: "Templates/ItemDetailScreen",
  component: ItemDetailScreen,
  parameters: { layout: "fullscreen" },
  args: {
    onBack: () => {},
    onArchive: () => {},
    track: { label: "Imersão", tone: "primary" },
    title: "UI Boost — Design Mobile",
    meta: "9h estimadas · 24 aulas · Design Boost",
    onStart: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ItemDetailScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstAccess: Story = {
  args: {
    whyNow: {
      title: "Por que agora?",
      description: "Você já começou. Termine o que está aberto antes de começar um novo.",
    },
    progressLabel: "0h de 0h",
    progressValue: 0,
    ctaLabel: "Começar foco 25 min",
    history: [{ title: "Ainda precisamos começar!", description: "Em breve aqui vai estar cheio" }],
  },
};

export const AfterSomeStudying: Story = {
  args: {
    progressLabel: "3h de 9h",
    progressValue: 3,
    progressMax: 9,
    ctaLabel: "Continuar",
    history: [
      { title: "12 de agosto · 45 min", description: "Terminei o módulo de wireframes." },
      { title: "10 de agosto · 30 min", description: "Terminei o módulo de grid" },
      { title: "8 de agosto · 1h15", description: "Comecei a trabalhar no protótipo." },
    ],
  },
};
