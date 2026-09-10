import type { Meta, StoryObj } from "@storybook/react";
import { PlanScreen } from "./PlanScreen";
import { HomeIcon, PlanIcon, CareerIcon, ValeIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
  { key: "carreira", icon: <CareerIcon />, label: "Carreira" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

const meta = {
  title: "Templates/PlanScreen",
  component: PlanScreen,
  parameters: { layout: "fullscreen" },
  args: { onAdd: () => {}, navbarItems, onNavSelect: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlanScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Plano". */
export const Plan: Story = {
  args: {
    title: "Plano",
    description:
      "Esse é o plano dos próximos meses dos seus estudos. Fique tranquilo é só para você visualizar o que precisa fazer neste mês.",
    selectedNavKey: "plano",
    sections: [
      {
        month: "Agosto",
        items: [
          {
            key: "1",
            track: { label: "Imersão" },
            title: "UI Boost — Design Mobile",
            subtitle: "Módulo 2 de 6 · 15 min restantes",
            variant: "expanded",
            onContinue: () => {},
          },
          {
            key: "2",
            track: { label: "Currículo", tone: "achievement" },
            title: "Storytelling para portfólio",
            subtitle: "Concluído em 12 de agosto",
            variant: "completed",
          },
        ],
      },
      { month: "Setembro", items: [] },
    ],
  },
};

/** "Carreira" — same template, different content. */
export const Career: Story = {
  args: {
    title: "Carreira",
    description:
      "Aqui estão as mini-tarefas para potencializar sua carreira. Fique tranquilo são tarefas que podem ser feitas aos poucos.",
    selectedNavKey: "carreira",
    sections: [
      {
        month: "Agosto",
        items: [
          {
            key: "1",
            track: { label: "LinkedIn", tone: "primary" },
            title: "Atualizar perfil do LinkedIn",
            subtitle: "2h estimadas",
            variant: "compact",
          },
        ],
      },
    ],
  },
};
